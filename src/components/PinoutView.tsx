import React, { useId, useState } from "react";
import { Cpu, Zap, Info, Radio, ChevronDown, ChevronUp } from "lucide-react";

interface PinType {
  label: string;
  color: string;
  dot: string;
  description: string;
}

const PIN_TYPES: PinType[] = [
  {
    label: "3.3V Power",
    color: "bg-amber-400/20 text-amber-300 border-amber-500/40",
    dot: "bg-amber-400",
    description:
      "Provides 3.3 volts from the Pi. The current available depends on the Pi model, power supply, and other loads. Check your model documentation and the component requirements; start with low-current components.",
  },
  {
    label: "5V Power",
    color: "bg-red-400/20 text-red-300 border-red-500/40",
    dot: "bg-red-400",
    description:
      "Provides 5 volts from the Pi power supply. The current available depends on the Pi model, power supply, and other loads. Check your model documentation and the component requirements before connecting anything.",
  },
  {
    label: "Ground (GND)",
    color: "bg-slate-500/20 text-slate-400 border-slate-500/40",
    dot: "bg-slate-400",
    description:
      "The reference point for all voltages (0V). Every circuit needs a ground connection to complete the loop.",
  },
  {
    label: "GPIO (General Purpose)",
    color: "bg-emerald-400/20 text-emerald-300 border-emerald-500/40",
    dot: "bg-emerald-400",
    description:
      "Programmable pins you control in your Python code. They use 3.3V logic and can be set as INPUT (read a button) or OUTPUT (control a low-current device). Never connect a 5V signal directly; use a suitable interface for higher-voltage or higher-current devices.",
  },
  {
    label: "PWM (Pulse Width Modulation)",
    color: "bg-violet-400/20 text-violet-300 border-violet-500/40",
    dot: "bg-violet-400",
    description:
      "GPIO pins that also support hardware PWM. PWM rapidly switches a pin on/off to simulate analog output — perfect for dimming LEDs or controlling servo motors.",
  },
  {
    label: "I²C",
    color: "bg-cyan-400/20 text-cyan-300 border-cyan-500/40",
    dot: "bg-cyan-400",
    description:
      "Two-wire communication bus (SDA = data, SCL = clock). Lets you chain many sensors and displays together using just two wires. Used by OLED screens, IMUs, and temperature sensors.",
  },
  {
    label: "SPI",
    color: "bg-orange-400/20 text-orange-300 border-orange-500/40",
    dot: "bg-orange-400",
    description:
      "Four-wire high-speed protocol (MOSI, MISO, SCLK, CE). Faster than I²C, but uses more wires. Common with SD cards, LCD screens, and ADC chips.",
  },
  {
    label: "UART (TX / RX)",
    color: "bg-pink-400/20 text-pink-300 border-pink-500/40",
    dot: "bg-pink-400",
    description:
      "Serial communication for sending and receiving text/data. TX (transmit) and RX (receive) — always cross-connect TX→RX. Used for GPS modules, Arduino communication, and debug consoles.",
  },
  {
    label: "ID EEPROM (I²C)",
    color: "bg-slate-600/20 text-slate-400 border-slate-600/40",
    dot: "bg-slate-500",
    description:
      "Reserved for HAT identification. Used by add-on boards (HATs) to identify themselves to the Pi automatically. You generally won't use these in your projects.",
  },
];

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionSection({
  title,
  icon,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-700/30 transition-colors"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="flex items-center gap-3 font-semibold text-slate-200">
          {icon}
          {title}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-slate-500" />
        ) : (
          <ChevronDown size={16} className="text-slate-500" />
        )}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="px-5 pb-5 pt-1 border-t border-slate-700/40"
      >
        {children}
      </div>
    </div>
  );
}

export default function PinoutView() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Cpu className="text-emerald-400" size={28} />
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Pi GPIO Pinout
          </h1>
        </div>
        <p className="text-slate-400 max-w-2xl">
          Many Raspberry Pi models have a 40-pin header along the board edge.
          This pinout is for models with the pictured header; most of these pins
          can be used as programmable GPIO to connect code with hardware.
        </p>
      </div>

      {/* Diagram */}
      <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-700/40 flex items-center gap-2 text-sm text-slate-400">
          <Info size={14} />
          <span>
            40-pin GPIO header pinout for Raspberry Pi models with this header —
            click to open full size
          </span>
        </div>
        <div className="p-4 flex justify-center">
          <a href="/pi-pinout.webp" target="_blank" rel="noopener noreferrer">
            <img
              src="/pi-pinout.webp"
              width={1472}
              height={2816}
              alt="40-pin Raspberry Pi GPIO header diagram showing pin functions and labels for models with this header"
              className="max-w-full h-auto rounded-lg border border-slate-700/40 hover:border-emerald-500/50 transition-colors shadow-lg"
            />
          </a>
        </div>
      </div>

      {/* Pin type legend */}
      <AccordionSection
        title="Pin Type Legend"
        icon={<Radio size={18} className="text-emerald-400" />}
        defaultOpen
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {PIN_TYPES.map((pt) => (
            <div
              key={pt.label}
              className={`rounded-lg border px-4 py-3 ${pt.color}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${pt.dot}`}
                />
                <span className="font-semibold text-sm">{pt.label}</span>
              </div>
              <p className="text-xs leading-relaxed opacity-80">
                {pt.description}
              </p>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* How GPIO works */}
      <AccordionSection
        title="How GPIO Works"
        icon={<Zap size={18} className="text-amber-400" />}
        defaultOpen
      >
        <div className="space-y-4 mt-3 text-sm text-slate-300 leading-relaxed">
          <p>
            GPIO stands for{" "}
            <strong className="text-white">General Purpose Input/Output</strong>
            . Unlike the power and ground pins, GPIO pins have no pre-defined
            job — you decide in code whether they're inputs or outputs.
          </p>

          <div className="rounded-lg bg-slate-900/60 border border-slate-700/40 p-4 space-y-3">
            <h3 className="font-semibold text-white text-sm">OUTPUT mode</h3>
            <p>
              You drive the pin HIGH (3.3V) or LOW (0V) from your code. This
              lets you turn things on and off — LEDs, buzzers, relays.
            </p>
            <pre className="text-xs bg-slate-950/60 rounded-md p-3 text-emerald-300 overflow-x-auto">
              {`from gpiozero import LED
led = LED(17)   # BCM pin 17
led.on()        # pin goes HIGH → 3.3V
led.off()       # pin goes LOW  → 0V`}
            </pre>
          </div>

          <div className="rounded-lg bg-slate-900/60 border border-slate-700/40 p-4 space-y-3">
            <h3 className="font-semibold text-white text-sm">INPUT mode</h3>
            <p>
              You read from the pin to detect external signals — button presses,
              sensor outputs, etc. The Pi reads whether the pin is HIGH or LOW.
            </p>
            <pre className="text-xs bg-slate-950/60 rounded-md p-3 text-emerald-300 overflow-x-auto">
              {`from gpiozero import Button
btn = Button(18)  # BCM pin 18
btn.wait_for_press()
print("Button pressed!")`}
            </pre>
          </div>
        </div>
      </AccordionSection>

      {/* Pin numbering */}
      <AccordionSection
        title="BCM vs BOARD Numbering"
        icon={<Info size={18} className="text-cyan-400" />}
      >
        <div className="space-y-4 mt-3 text-sm text-slate-300 leading-relaxed">
          <p>
            There are two ways to refer to a GPIO pin, and mixing them up is a
            very common beginner mistake:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4">
              <h3 className="font-semibold text-emerald-300 mb-1">
                BCM (Broadcom) ✓{" "}
                <span className="text-xs font-normal opacity-70">
                  — what we use
                </span>
              </h3>
              <p className="text-xs leading-relaxed">
                Refers to the chip's internal GPIO number — e.g.,{" "}
                <code className="bg-slate-900/60 px-1 rounded">GPIO17</code>.
                This is what{" "}
                <code className="bg-slate-900/60 px-1 rounded">gpiozero</code>{" "}
                uses by default and what the pinout diagram labels show.
              </p>
            </div>
            <div className="rounded-lg bg-slate-700/30 border border-slate-600/40 p-4">
              <h3 className="font-semibold text-slate-300 mb-1">
                BOARD (Physical)
              </h3>
              <p className="text-xs leading-relaxed">
                Refers to the physical pin position on the header — e.g., pin{" "}
                <code className="bg-slate-900/60 px-1 rounded">11</code> (which
                happens to be GPIO17). Used in older code with RPi.GPIO.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            Tip: Always check the pinout diagram before wiring. Using the wrong
            pin number is one of the most common bugs in GPIO projects.
          </p>
        </div>
      </AccordionSection>

      {/* Safety rules */}
      <AccordionSection
        title="Golden Safety Rules"
        icon={<span className="text-base">⚠️</span>}
      >
        <ul className="mt-3 space-y-2 text-sm">
          {[
            {
              rule: "Never exceed 3.3V on a GPIO input pin.",
              detail:
                "GPIO pins run at 3.3V logic. Applying 5V directly will damage the pin permanently.",
            },
            {
              rule: "Keep GPIO loads low-current.",
              detail:
                "Current limits vary by Pi model and apply across the board as well as to individual pins. Use a suitable resistor for LEDs and a driver for higher-current devices; check your model documentation.",
            },
            {
              rule: "Check the available power before adding loads.",
              detail:
                "The 3.3V and 5V rail capacity depends on the Pi model, power supply, and other connected devices. Check the model documentation and component requirements; use an appropriate external supply when needed.",
            },
            {
              rule: "Power off the Pi before changing wiring.",
              detail:
                "Hot-plugging components can create short circuits that damage the GPIO controller.",
            },
            {
              rule: "Double-check your wiring before powering on.",
              detail:
                "A single wrong wire can damage the Pi or your components irreversibly.",
            },
          ].map(({ rule, detail }) => (
            <li
              key={rule}
              className="flex gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
            >
              <span className="text-amber-400 font-bold text-base leading-none shrink-0 mt-0.5">
                !
              </span>
              <div>
                <p className="text-amber-200 font-semibold">{rule}</p>
                <p className="text-slate-400 text-xs mt-0.5">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </AccordionSection>
    </div>
  );
}
