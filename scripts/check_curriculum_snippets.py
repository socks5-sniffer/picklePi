"""Check every complete Python lesson embedded in the TypeScript curriculum."""

from __future__ import annotations

import ast
from contextlib import redirect_stdout
from io import StringIO
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import types


CURRICULUM = Path(__file__).resolve().parents[1] / "src/data/curriculum.ts"
CODE_PAGE = re.compile(
    r"id: '(p\d+-code)',[\s\S]*?code: `([\s\S]*?)`,\s*codeWalkthrough:",
)
TEMPLATE_ESCAPE = re.compile(r"\\(\\|n|r|t|`|\$)")


def cooked_template(source: str) -> str:
    """Apply the escapes used by the TypeScript template literals before parsing."""
    replacements = {"\\": "\\", "n": "\n", "r": "\r", "t": "\t", "`": "`", "$": "$"}
    return TEMPLATE_ESCAPE.sub(lambda match: replacements[match.group(1)], source)


def check_alarm_runtime(snippet: str) -> None:
    """Exercise cancellation and disarming using gpiozero's real mock pins."""
    from gpiozero import Device
    from gpiozero.pins.mock import MockFactory, MockPWMPin

    for scenario in ("cancel_arming", "disarm_alarm"):
        factory = MockFactory(pin_class=MockPWMPin)
        Device.pin_factory = factory
        clock = 0.0
        ticks = 0
        scope: dict[str, object] = {}

        def monotonic() -> float:
            return clock

        def sleep(seconds: float) -> None:
            nonlocal clock, ticks
            clock += seconds
            ticks += 1
            if ticks == 1:
                scope["button_pressed"].set()
            if scenario == "cancel_arming" and ticks == 2:
                scope["button_pressed"].set()
            if scenario == "disarm_alarm" and ticks == 103:
                scope["motion_detected"].set()
            if scenario == "disarm_alarm" and ticks == 105:
                scope["button_pressed"].set()
            if ticks >= (4 if scenario == "cancel_arming" else 108):
                raise KeyboardInterrupt

        scope.update({"__test_monotonic": monotonic, "__test_sleep": sleep})
        controlled = snippet.replace(
            "from time import monotonic, sleep",
            "monotonic = __test_monotonic\nsleep = __test_sleep",
        )
        if controlled == snippet:
            raise AssertionError("alarm test could not control the clock")
        output = StringIO()
        with redirect_stdout(output):
            exec(compile(controlled, "p7-code", "exec"), scope)
        transcript = output.getvalue()
        if scenario == "cancel_arming":
            assert "Arming in 5 seconds" in transcript
            assert "System DISARMED" in transcript
            assert "System ARMED" not in transcript
        else:
            assert "System ARMED" in transcript
            assert "ALARM TRIGGERED" in transcript
            assert "System DISARMED" in transcript
            assert scope["current_state"].name == "DISARMED"
        factory.close()


def load_snippets() -> list[tuple[str, str]]:
    if "--snippets-json" in sys.argv:
        path = Path(sys.argv[sys.argv.index("--snippets-json") + 1])
        payload = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(payload, dict):
            return list(payload.items())
        return [(entry["id"], entry["code"]) for entry in payload]

    source = CURRICULUM.read_text(encoding="utf-8")
    snippets = CODE_PAGE.findall(source)
    expected = re.findall(r"id: '(p\d+-code)'", source)
    if len(snippets) != len(expected) or len(snippets) != len(set(expected)):
        raise AssertionError("Could not extract every unique runnable lesson")
    return [(name, cooked_template(raw)) for name, raw in snippets]


def run_worker(name: str, snippet: str) -> None:
    """Run a bounded lesson using real gpiozero devices on mock pins."""
    from gpiozero import Device
    from gpiozero.pins.mock import MockFactory, MockPWMPin

    factory = MockFactory(pin_class=MockPWMPin)
    Device.pin_factory = factory
    clock = 0.0
    ticks = 0
    input_count = 0
    vibration_callback_calls = 0

    class FakeTime:
        def sleep(self, seconds: float) -> None:
            nonlocal clock, ticks, vibration_callback_calls
            clock += seconds
            ticks += 1
            if name == "p13-code" and ticks in (20, 25, 45):
                # After calibration: first event, bounce inside cooldown, then
                # a fresh event after cooldown. Exercise the registered callback.
                scope["vibration_sensor"].when_pressed()
                vibration_callback_calls += 1
            if name == "p10-code":
                # Start hot, hold inside hysteresis, then simulate CRC failure.
                reading = "aa bb cc : crc=00 YES\naa bb cc t=28000\n"
                if ticks >= 3:
                    reading = "aa bb cc : crc=00 NO\naa bb cc t=28000\n"
                (Path("28-mock") / "w1_slave").write_text(reading, encoding="ascii")
            limits = {"p1-code": 2, "p6-code": 2, "p9-code": 2,
                      "p10-code": 6, "p11-code": 44, "p12-code": 22,
                      "p13-code": 50}
            if ticks >= limits.get(name, 1000):
                raise KeyboardInterrupt

        def monotonic(self) -> float:
            return clock

        def time(self) -> float:
            return clock

    fake_time = FakeTime()

    def fake_input() -> str:
        nonlocal input_count
        input_count += 1
        if name == "p12-code":
            factory.pin(17).drive_low()  # Reed switch closed
        return ""

    def fake_pause() -> None:
        raise KeyboardInterrupt

    scope: dict[str, object] = {"__test_time": fake_time, "__test_pause": fake_pause,
                                "input": fake_input}
    controlled = snippet.replace("from time import monotonic, sleep",
                                  "monotonic = __test_time.monotonic\nsleep = __test_time.sleep")
    controlled = controlled.replace("from time import sleep", "sleep = __test_time.sleep")
    controlled = controlled.replace("import time", "time = __test_time")
    controlled = controlled.replace("from signal import pause", "pause = __test_pause")

    if name == "p6-code":
        board = types.ModuleType("board")
        board.SCL, board.SDA = object(), object()
        busio = types.ModuleType("busio")
        busio.I2C = lambda *_: object()
        adxl = types.ModuleType("adafruit_adxl34x")
        class FakeADXL345:
            def __init__(self, _bus):
                self.events = {"motion": False}
            def enable_motion_detection(self, *, threshold=18):
                assert threshold == 18
            @property
            def acceleration(self):
                return 0.0, 0.0, 9.81
        adxl.ADXL345 = FakeADXL345
        sys.modules.update({"board": board, "busio": busio, "adafruit_adxl34x": adxl})

    if name == "p13-code":
        smbus2 = types.ModuleType("smbus2")
        class FakeBus:
            def __init__(self, bus):
                assert bus == 1
            def write_byte_data(self, *_):
                pass
            def read_i2c_block_data(self, *_):
                return [0, 0, 0, 0, 0, 1]  # 1g on Z axis
        smbus2.SMBus = FakeBus
        sys.modules["smbus2"] = smbus2

    if name == "p10-code":
        sensor = Path("28-mock") / "w1_slave"
        sensor.parent.mkdir()
        sensor.write_text("aa bb cc : crc=00 YES\naa bb cc t=31000\n", encoding="ascii")
        controlled = controlled.replace("'/sys/bus/w1/devices/'", "'./'")

    if name == "p9-code":
        # Mock pins cannot synthesize HC-SR04 echo pulse timing; substitute
        # only the physical ranging result while keeping the real LED API.
        class FakeDistance:
            distance = 0.35  # metres; proves the script uses the property units
        scope["__test_distance"] = FakeDistance()
        controlled = controlled.replace(
            "DistanceSensor(echo=25, trigger=24, max_distance=3)", "__test_distance")

    if name in ("p11-code", "p12-code"):
        class FakeAnalog:
            def __init__(self):
                self.reads = 0
            @property
            def value(self):
                self.reads += 1
                if name == "p11-code":
                    return 0.8 if 21 <= self.reads <= 41 else 0.2
                return 0.5 if self.reads <= 20 else 0.8
            def close(self):
                pass
        scope["__test_analog"] = FakeAnalog()
        channel = 0 if name == "p11-code" else 1
        controlled = controlled.replace(f"MCP3008(channel={channel})", "__test_analog")

    output = StringIO()
    with redirect_stdout(output):
        try:
            exec(compile(controlled, name, "exec"), scope)
        except KeyboardInterrupt:
            # Some lessons run indefinitely by design; the bounded clock ends them.
            pass
    transcript = output.getvalue()
    assert transcript, f"{name} produced no output"
    if name == "p11-code":
        assert input_count == 3
        assert "SYSTEM ARMED" in transcript
        assert "BREACH!" in transcript
        assert "Beam restored" in transcript
    if name == "p9-code":
        assert "35.0 cm" in transcript, "DistanceSensor.distance must be interpreted as metres"
    if name == "p10-code":
        log = Path("guardian.log").read_text()
        assert "RELAY ON" in log
        assert "RELAY OFF — invalid temperature reading" in log
        assert "back to normal" not in transcript, "28C must retain the relay state"
        assert not scope["relay"].is_active
    if name == "p12-code":
        assert "Monitoring" in transcript
        assert "SENSOR MISMATCH" in transcript
        assert "State: MISMATCH" in transcript
        log = Path("deadbolt.log").read_text()
        assert "MISMATCH" in log and "TAMPER" not in log
    if name == "p13-code":
        assert vibration_callback_calls == 3
        assert transcript.count("VIBRATION DETECTED!") == 2, "Cooldown must suppress bounce and allow later events"
        assert Path("guardian.log").read_text().count("VIBRATION") == 2
    factory.close()


def main() -> int:
    snippets = load_snippets()
    if len(snippets) != 13 or len({name for name, _ in snippets}) != 13:
        print("Expected 13 unique full Python lessons", file=sys.stderr)
        return 1

    if "--worker" in sys.argv:
        name = sys.argv[sys.argv.index("--worker") + 1]
        run_worker(name, dict(snippets)[name])
        return 0

    errors = []
    for name, snippet in snippets:
        try:
            ast.parse(snippet, filename=name)
        except SyntaxError as error:
            errors.append(f"{name}: {error}")

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1

    if "--runtime" in sys.argv:
        check_alarm_runtime(dict(snippets)["p7-code"])
        print("Alarm transitions: arming cancellation and triggered disarm passed")
        with tempfile.TemporaryDirectory() as directory:
            for name, _ in snippets:
                command = [sys.executable, str(Path(__file__).resolve()), "--worker", name]
                if "--snippets-json" in sys.argv:
                    command += ["--snippets-json", sys.argv[sys.argv.index("--snippets-json") + 1]]
                result = subprocess.run(command, cwd=directory, capture_output=True, text=True, timeout=15)
                if result.returncode:
                    raise AssertionError(f"{name} runtime failed:\n{result.stdout}{result.stderr}")
                print(f"{name}: mock runtime passed")

    print(f"Parsed {len(snippets)} evaluated Python lessons: {', '.join(name for name, _ in snippets)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
