import { Project } from '../types';

export const curriculum: Project[] = [
  {
    id: 'p1-intro',
    level: 1,
    levelName: 'Digital Output Basics',
    title: 'Hello, LED',
    skillsLearned: ['gpiozero LED', 'blink() method', 'signal.pause()'],
    badgeEarned: 'GPIO Initiate',
    content: {
      overview: {
        description: 'We are building the "Hello World" of electronics: making an LED blink! This is your first step into controlling physical hardware with code.',
        concepts: ['Digital Output', 'gpiozero LED class', 'Background threads'],
        difficulty: 1,
        estimatedTime: '15 mins'
      },
      pages: [
        {
          id: 'p1-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'We are building the "Hello World" of electronics: making an LED blink! This is your first step into controlling physical hardware with code.',
              concepts: ['Digital Output', 'gpiozero LED class', 'Background threads'],
              difficulty: 1,
              estimatedTime: '15 mins'
            },
            hardwareSetup: {
              warnings: [],
              steps: [],
              explanation: ''
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p1-hardware',
          title: 'Hardware Setup',
          content: {
            overview: {
              description: '',
              concepts: [],
              difficulty: 1,
              estimatedTime: ''
            },
            hardwareSetup: {
              warnings: [
                'Always use a resistor (e.g., 220Ω or 330Ω) with an LED to prevent it from burning out.',
                'Default to 3.3V logic. Never connect an LED directly to 5V or 3.3V without a resistor.'
              ],
              steps: [
                'Connect a jumper wire from Raspberry Pi Physical Pin 6 (GND) to the blue negative (-) rail on your breadboard.',
                'Connect the shorter leg (cathode) of the LED to the same negative rail.',
                'Connect the longer leg (anode) of the LED to a row in the middle of the breadboard.',
                "Connect one end of a 220Ω resistor to the same row as the LED's long leg.",
                'Connect the other end of the resistor to a different row.',
                'Connect a jumper wire from Raspberry Pi Physical Pin 11 (GPIO 17) to the row with the other end of the resistor.'
              ],
              explanation: 'Electricity flows from the GPIO pin (when turned HIGH, providing 3.3V), through the resistor (which limits the current), through the LED (lighting it up), and back to the Ground (GND) pin, completing the circuit.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p1-code',
          title: 'The Code',
          content: {
            overview: {
              description: '',
              concepts: [],
              difficulty: 1,
              estimatedTime: ''
            },
            hardwareSetup: {
              warnings: [],
              steps: [],
              explanation: ''
            },
            code: `#!/usr/bin/env python3\n"""\nLevel 1: Hello, LED - Blink an LED using gpiozero\n\n🔒 SECURITY HARDENING:\n- Always use a 220Ω-330Ω current-limiting resistor with LEDs\n- Disable unused interfaces: sudo raspi-config -> Interface Options\n  (disable SPI, I2C, Serial if not needed to reduce attack surface)\n- Keep your Pi's OS updated: sudo apt update && sudo apt upgrade\n\n📚 EDUCATIONAL MOMENT:\ngpiozero uses "source/values" properties for declarative hardware control,\nmeaning you describe WHAT should happen, not HOW to do it step-by-step.\n"""\n\nfrom gpiozero import LED\nfrom signal import pause\n\n# ============================================\n# HARDWARE ABSTRACTION\n# gpiozero automatically handles pin setup!\n# ============================================\n\n# Create an LED object on GPIO 17 (BCM numbering by default)\nstatus_led = LED(17)\n\n# ============================================\n# HIGH-LEVEL LOGIC\n# The blink() method handles the timing loop internally\n# ============================================\n\nprint("🟢 LED blinking... Press Ctrl+C to exit.")\n\n# Blink the LED: 1 second on, 1 second off\n# No manual loops needed - gpiozero handles this in a background thread\nstatus_led.blink(on_time=1, off_time=1)\n\n# Keep the program running until interrupted\n# pause() is more efficient than while True: sleep()\ntry:\n    pause()\nexcept KeyboardInterrupt:\n    print("\n🔴 Exiting... LED turned off.")\n    status_led.off()\n\n# Note: gpiozero automatically cleans up GPIO pins on exit!`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p1-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: {
              description: '',
              concepts: [],
              difficulty: 1,
              estimatedTime: ''
            },
            hardwareSetup: {
              warnings: [],
              steps: [],
              explanation: ''
            },
            code: '',
            codeWalkthrough: [
              { section: 'Imports', explanation: '`from gpiozero import LED` gives us a high-level LED class. `from signal import pause` lets us wait efficiently without a busy loop.' },
              { section: 'Hardware Abstraction', explanation: '`LED(17)` creates an LED object on GPIO 17. gpiozero automatically handles `setmode`, `setup`, and uses BCM numbering by default.' },
              { section: 'The blink() Method', explanation: '`status_led.blink(on_time=1, off_time=1)` runs in a background thread. No `while True` loop needed!' },
              { section: 'pause()', explanation: '`pause()` keeps the script running without consuming CPU. It waits for a signal (like Ctrl+C) efficiently.' },
              { section: 'Automatic Cleanup', explanation: 'gpiozero automatically resets GPIO pins when your script exits. No manual `GPIO.cleanup()` required!' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p1-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: {
              description: '',
              concepts: [],
              difficulty: 1,
              estimatedTime: ''
            },
            hardwareSetup: {
              warnings: [],
              steps: [],
              explanation: ''
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: "The Raspberry Pi acts as a switchable power source. When a pin is HIGH, it pushes electrons out. The resistor acts like a narrow pipe, slowing down the electrons so they don't overwhelm and pop the LED.",
              software: 'The Python script is the brain. It sequentially executes commands, telling the "switch" (GPIO pin) when to open and close, with precise timing.',
              connection: 'Software commands translate into physical voltage changes. 1s and 0s in code become 3.3V and 0V in reality.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p1-experiment',
          title: 'Experiment Mode',
          content: {
            overview: {
              description: '',
              concepts: [],
              difficulty: 1,
              estimatedTime: ''
            },
            hardwareSetup: {
              warnings: [],
              steps: [],
              explanation: ''
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Change `on_time=1` to `on_time=0.1`. What happens to the blinking speed?',
              logic: 'Change the blink pattern to stay ON for 2 seconds but OFF for only 0.5 seconds.',
              creative: 'Can you make the LED blink a heartbeat pattern? Try `blink(on_time=0.1, off_time=0.1, n=2)` then `sleep(0.6)` in a loop!'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p1-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: {
              description: '',
              concepts: [],
              difficulty: 1,
              estimatedTime: ''
            },
            hardwareSetup: {
              warnings: [],
              steps: [],
              explanation: ''
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: "LED doesn't light up", solution: 'Check LED polarity. Long leg goes to resistor/GPIO, short leg to GND.' },
              { issue: 'Error: "No access to /dev/mem"', solution: 'You might need to run your script with `sudo python3 script.py` depending on your OS version.' },
              { issue: 'LED is very dim', solution: 'Check your resistor value. If you used a 10kΩ resistor instead of 220Ω, too little current is flowing.' }
            ]
          }
        }
      ],
      hardwareSetup: {
        warnings: [],
        steps: [],
        explanation: ''
      },
      code: '',
      codeWalkthrough: [],
      conceptDeepDive: { hardware: '', software: '', connection: '' },
      experimentMode: { tweak: '', logic: '', creative: '' },
      troubleshooting: []
    }
  },
  {
    id: 'p2',
    level: 2,
    levelName: 'Digital Input',
    title: 'Button controls LED',
    skillsLearned: ['Button class', 'Event callbacks', 'Source binding'],
    badgeEarned: 'Input Investigator',
    content: {
      overview: {
        description: 'We will use a push button to control our LED. This introduces digital inputs, letting our code react to the physical world.',
        concepts: ['Digital Input', 'Event-Driven Programming', 'Source Binding'],
        difficulty: 2,
        estimatedTime: '20 mins'
      },
      hardwareSetup: {
        warnings: [
          'Ensure you connect the button correctly to avoid shorting 3.3V directly to GND.',
          "We will use the Raspberry Pi's internal pull-down resistor, so no external resistor is needed for the button."
        ],
        steps: [
          'Keep the LED setup from Level 1 (LED on GPIO 17, with resistor to GND).',
          'Place a push button across the middle ravine of your breadboard.',
          'Connect one leg of the button to Raspberry Pi Physical Pin 1 (3.3V).',
          'Connect the diagonally opposite leg of the button to Raspberry Pi Physical Pin 15 (GPIO 22).'
        ],
        explanation: 'When the button is pressed, it bridges the gap, allowing 3.3V to flow into GPIO 22. The Pi reads this as a HIGH signal.'
      },
      code: `#!/usr/bin/env python3\n"""\nLevel 2: Button Controls LED - Event-driven input handling\n\n🔒 SECURITY HARDENING:\n- Use internal pull-down resistors (gpiozero default) to prevent floating inputs\n- Never connect button directly between 5V and GPIO (use 3.3V only!)\n- Disable SSH password auth if not needed: edit /etc/ssh/sshd_config\n\n📚 EDUCATIONAL MOMENT:\n"source" and "values" in gpiozero create a reactive data flow.\nled.source = button means \"the LED's state comes FROM the button's state\".\n"""\n\nfrom gpiozero import LED, Button\nfrom signal import pause\n\n# ============================================\n# HARDWARE ABSTRACTION\n# Button() automatically configures pull-down resistor\n# ============================================\n\nstatus_led = LED(17)\ncontrol_button = Button(22, pull_up=False)  # pull_up=False = pull-down resistor\n\n# ============================================\n# EVENT-DRIVEN LOGIC (No polling loops!)\n# ============================================\n\n# Method 1: Direct source binding (most elegant)\n# The LED's state is "sourced" directly from the button's state\nstatus_led.source = control_button\n\nprint("🔘 Press and hold the button to light the LED.")\nprint("   Press Ctrl+C to exit.")\n\n# Alternative Method 2: Event callbacks (commented out)\n# control_button.when_pressed = status_led.on\n# control_button.when_released = status_led.off\n\ntry:\n    pause()\nexcept KeyboardInterrupt:\n    print("\n👋 Exiting...")`,
      codeWalkthrough: [
        { section: 'Button Object', explanation: '`Button(22, pull_up=False)` creates a button on GPIO 22 with an internal pull-down resistor. gpiozero handles all the low-level setup.' },
        { section: 'Source Binding', explanation: '`led.source = button` creates a reactive link. The LED automatically mirrors the button state - no loop needed!' },
        { section: 'Event Callbacks', explanation: '`.when_pressed` and `.when_released` let you attach functions that run automatically when events occur. This is event-driven programming.' },
        { section: 'No CPU Waste', explanation: 'Unlike polling with `while True`, event-driven code only runs when something happens. The CPU stays idle otherwise.' }
      ],
      conceptDeepDive: {
        hardware: 'A push button is a momentary switch. It only completes the circuit while held down. The internal pull-down resistor acts like a weak spring, pulling the voltage to 0V when the button is released.',
        software: 'The code constantly polls (checks) the button pin. It uses conditional logic (if/else) to decide what to do with the LED based on that input.',
        connection: 'The physical press changes the voltage on the pin to 3.3V. The software reads this 3.3V as a logical `True` or `HIGH`, triggering the LED code.'
      },
      experimentMode: {
        tweak: 'Swap the source binding to invert the logic: `led.source_delay = 0; led.source = lambda: not button.value`',
        logic: 'Make the button act as a toggle using `.when_pressed` with a function that calls `led.toggle()`.',
        creative: 'Add a second LED and make the button alternate which LED is lit using `toggle()` on both.'
      },
      troubleshooting: [
        { issue: "LED is always on", solution: "You might have connected the button to 3.3V on both sides, or the pull-down resistor isn't configured in code." },
        { issue: 'Button does nothing', solution: 'Check that you are using the correct GPIO pin (22) and that the button legs are diagonally opposite.' }
      ]
    }
  },
  {
    id: 'p3',
    level: 3,
    levelName: 'PWM & Analog Concepts',
    title: 'PWM brightness',
    skillsLearned: ['PWMLED', 'pulse() & value', 'Background threads'],
    badgeEarned: 'PWM Tamer',
    content: {
      overview: {
        description: 'Instead of just ON and OFF, we will use Pulse Width Modulation (PWM) to fade an LED in and out, simulating an analog output.',
        concepts: ['PWM & Duty Cycle', 'PWMLED class', 'Value property (0.0-1.0)'],
        difficulty: 3,
        estimatedTime: '25 mins'
      },
      hardwareSetup: {
        warnings: [
          'No new hardware needed! We will use the exact same LED setup from Level 1.'
        ],
        steps: [
          'Ensure your LED is connected to GPIO 17 with a resistor, just like in Level 1.'
        ],
        explanation: 'We are changing how we control the pin in software. Instead of a steady 3.3V, we will turn the pin on and off very fast to simulate a lower voltage.'
      },
      code: `#!/usr/bin/env python3\n"""\nLevel 3: PWM Brightness - Smooth LED fading with PWMLED\n\n🔒 SECURITY HARDENING:\n- PWM frequency is software-controlled; use hardware PWM pins (GPIO 12, 13, 18, 19) for precision\n- Limit script permissions: chmod 700 script.py (owner only)\n- Consider running as non-root user with gpio group membership\n\n📚 EDUCATIONAL MOMENT:\nPWMLED.pulse() uses a background thread with sinusoidal easing,\ncreating smooth fades without blocking your main program.\n"""\n\nfrom gpiozero import PWMLED\nfrom signal import pause\n\n# ============================================\n# HARDWARE ABSTRACTION\n# PWMLED handles PWM setup automatically\n# ============================================\n\n# Create a PWM-capable LED (supports brightness 0.0 to 1.0)\nfading_led = PWMLED(17)\n\n# ============================================\n# HIGH-LEVEL LOGIC\n# pulse() handles the fade animation internally\n# ============================================\n\nprint("✨ LED pulsing smoothly... Press Ctrl+C to exit.")\n\n# Pulse the LED: fade in over 1 sec, fade out over 1 sec\n# This runs in a background thread - non-blocking!\nfading_led.pulse(fade_in_time=1, fade_out_time=1)\n\n# Alternative: Manual brightness control\n# fading_led.value = 0.5  # Set to 50% brightness\n# fading_led.value = 0    # Off\n# fading_led.value = 1    # Full brightness\n\ntry:\n    pause()\nexcept KeyboardInterrupt:\n    print("\n🌙 Fading out...")\n    fading_led.off()`,
      codeWalkthrough: [
        { section: 'PWMLED Class', explanation: '`PWMLED(17)` creates an LED with PWM capability. Unlike `LED`, it supports fractional brightness values from 0.0 to 1.0.' },
        { section: 'The pulse() Method', explanation: '`pulse()` creates a smooth breathing effect using sinusoidal easing. It runs in a background thread automatically.' },
        { section: 'Value Property', explanation: '`fading_led.value = 0.5` sets brightness to 50%. This is more intuitive than raw duty cycle percentages.' },
        { section: 'Background Threading', explanation: 'gpiozero runs animations in separate threads, so your main code can do other things while the LED pulses.' }
      ],
      conceptDeepDive: {
        hardware: 'Digital pins can only output 3.3V or 0V. They cannot output 1.5V. PWM tricks the LED (and our eyes) by pulsing the 3.3V so fast that it averages out to a lower brightness.',
        software: 'The PWM library handles the rapid switching in the background. We just tell it what percentage of the time it should be ON (the duty cycle).',
        connection: 'A 50% duty cycle means the pin is HIGH for half the time and LOW for half the time. The LED flickers so fast it just looks dimmer.'
      },
      experimentMode: {
        tweak: 'Change `fade_in_time=1` to `fade_in_time=3`. How does the animation feel?',
        logic: 'Instead of `pulse()`, use a loop with `fading_led.value = x/100` to manually control brightness.',
        creative: 'Combine with the button: `led.source = lambda: button.value * 0.5 + 0.5` to show half-brightness when released, full when pressed.'
      },
      troubleshooting: [
        { issue: 'LED flickers visibly', solution: 'Your PWM frequency is too low. Ensure it is set to at least 50Hz or 100Hz.' },
        { issue: 'Error: "A PWM object already exists"', solution: 'This happens if the script crashed previously without running `GPIO.cleanup()`. Just run the script again.' }
      ]
    }
  },
  {
    id: 'p4',
    level: 4,
    levelName: 'Sensors & Reactive Systems',
    title: 'Buzzer tones',
    skillsLearned: ['TonalBuzzer', 'Tone class', 'Musical notes'],
    badgeEarned: 'Signal Wrangler',
    content: {
      overview: {
        description: 'We will use a passive buzzer to generate different musical tones and sound effects using PWM frequencies.',
        concepts: ['TonalBuzzer', 'Musical Notes & Tone class', 'Lists & Loops'],
        difficulty: 3,
        estimatedTime: '20 mins'
      },
      hardwareSetup: {
        warnings: [
          'Make sure you are using a PASSIVE buzzer, not an active one. An active buzzer will just make a loud click or a single tone when given power.'
        ],
        steps: [
          'Connect the longer leg (positive) of the passive buzzer to Raspberry Pi Physical Pin 12 (GPIO 18).',
          'Connect the shorter leg (negative) of the buzzer to a Ground (GND) pin.'
        ],
        explanation: 'A passive buzzer contains a piezoelectric crystal. When voltage is applied, it flexes. By pulsing the voltage at specific frequencies, we make it vibrate and produce sound.'
      },
      code: `#!/usr/bin/env python3\n"""\nLevel 4: Buzzer Tones - Play melodies with TonalBuzzer\n\n🔒 SECURITY HARDENING:\n- Passive buzzers draw more current than an LED; consider a transistor driver for louder output\n- Use GPIO 18 (hardware PWM) for cleanest audio tones\n- Avoid running audio scripts at boot (noisy on startup = security giveaway)\n\n📚 EDUCATIONAL MOMENT:\nTonalBuzzer uses musical note names (like \"C4\", \"A4\") instead of raw frequencies,\nmaking code more readable and less error-prone.\n"""\n\nfrom gpiozero import TonalBuzzer\nfrom gpiozero.tones import Tone\nfrom time import sleep\n\n# ============================================\n# HARDWARE ABSTRACTION\n# TonalBuzzer handles PWM frequency calculation\n# ============================================\n\nmelody_buzzer = TonalBuzzer(18)\n\n# ============================================\n# HIGH-LEVEL LOGIC\n# Use musical note names instead of frequencies!\n# ============================================\n\n# Define a melody using note names (C4 = Middle C, A4 = 440Hz)\nmelody = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']\nnote_duration = 0.4\n\nprint("🎵 Playing C major scale...")\n\ntry:\n    for note in melody:\n        print(f"  ♪ {note}")\n        melody_buzzer.play(Tone(note))  # Play the note\n        sleep(note_duration)\n    \n    melody_buzzer.stop()\n    print("🎶 Scale complete!")\n    \n    # Bonus: Play a simple tune (Twinkle Twinkle)\n    sleep(1)\n    print("\n🌟 Bonus: Twinkle Twinkle...")\n    twinkle = ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4', None,\n               'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4']\n    \n    for note in twinkle:\n        if note:\n            melody_buzzer.play(Tone(note))\n        else:\n            melody_buzzer.stop()  # Rest\n        sleep(0.3)\n    \n    melody_buzzer.stop()\n    \nexcept KeyboardInterrupt:\n    melody_buzzer.stop()\n    print("\n🔇 Stopped.")`,
      codeWalkthrough: [
        { section: 'TonalBuzzer', explanation: '`TonalBuzzer(18)` creates a buzzer that accepts musical notes. GPIO 18 is a hardware PWM pin for cleaner tones.' },
        { section: 'Tone Objects', explanation: '`Tone("C4")` converts a note name to a frequency. C4 is Middle C (261Hz), A4 is concert pitch (440Hz).' },
        { section: 'play() and stop()', explanation: '`buzzer.play(tone)` starts a note, `buzzer.stop()` silences it. Use `None` in a melody list for rests.' },
        { section: 'Readable Code', explanation: 'Note names like "G4" are much easier to read and debug than magic numbers like "392".' }
      ],
      conceptDeepDive: {
        hardware: 'The piezoelectric buzzer translates electrical pulses into mechanical movement (sound waves). The faster the pulses, the higher the pitch.',
        software: 'We use the same PWM library as the LED, but we manipulate the `ChangeFrequency()` method instead of `ChangeDutyCycle()`.',
        connection: 'Code frequency directly maps to audio frequency. 261Hz in code creates a 261Hz sound wave in the air (Middle C).'
      },
      experimentMode: {
        tweak: 'Change `note_duration = 0.4` to `0.15` to play the scale faster.',
        logic: 'Create a siren effect: `for note in ["A4", "E4"] * 10: buzzer.play(Tone(note)); sleep(0.1)`',
        creative: 'Look up note names for "Mary Had a Little Lamb" and program the Pi to play it! (E4, D4, C4, D4, E4, E4, E4...)'
      },
      troubleshooting: [
        { issue: 'Buzzer only clicks or makes a harsh static noise', solution: 'You might have an Active buzzer instead of a Passive one. Active buzzers cannot play melodies.' },
        { issue: 'Sound is very quiet', solution: 'Ensure the duty cycle is set to 50. Also, some buzzers are naturally quiet unless driven by a transistor.' }
      ]
    }
  },
  {
    id: 'p5',
    level: 5,
    levelName: 'Displays & User Feedback',
    title: 'Motion or Light sensor',
    skillsLearned: ['MotionSensor', 'when_motion callback', 'Warm-up delay'],
    badgeEarned: 'Sensor Specialist',
    content: {
      overview: {
        description: 'We will use a PIR (Passive Infrared) motion sensor to detect movement and trigger an action. This introduces event-driven programming.',
        concepts: ['MotionSensor class', 'Event Callbacks', 'Asynchronous Code'],
        difficulty: 4,
        estimatedTime: '30 mins'
      },
      hardwareSetup: {
        warnings: [
          'PIR sensors require 5V to operate properly, but their output data pin is 3.3V safe. Connect VCC to 5V, but NEVER connect 5V directly to a GPIO pin.'
        ],
        steps: [
          'Connect the VCC pin of the PIR sensor to Raspberry Pi Physical Pin 2 (5V).',
          'Connect the GND pin of the PIR sensor to a Ground pin.',
          'Connect the OUT (or DATA) pin of the PIR sensor to Raspberry Pi Physical Pin 16 (GPIO 23).',
          'Keep your LED connected to GPIO 17 as an indicator.'
        ],
        explanation: 'The PIR sensor detects changes in infrared radiation (body heat). When a person moves, it sends a 3.3V HIGH signal on its OUT pin.'
      },
      code: `#!/usr/bin/env python3\n"""\nLevel 5: Motion Sensor - Event-driven PIR detection\n\n🔒 SECURITY HARDENING:\n- PIR sensors need 5V power but output 3.3V signals (safe for GPIO)\n- Add a 1-minute warm-up delay before arming sensor (reduces false triggers)\n- Consider rate-limiting callbacks to prevent log flooding attacks\n\n📚 EDUCATIONAL MOMENT:\nMotionSensor.when_motion and .when_no_motion are "event hooks\" -\nthey register callback functions that execute asynchronously when triggered.\n"""\n\nfrom gpiozero import MotionSensor, LED\nfrom signal import pause\nfrom time import sleep\n\n# ============================================\n# HARDWARE ABSTRACTION\n# MotionSensor wraps PIR sensor functionality\n# ============================================\n\npir_sensor = MotionSensor(23)  # PIR OUT pin on GPIO 23\nalert_led = LED(17)            # Indicator LED on GPIO 17\n\n# ============================================\n# EVENT-DRIVEN CALLBACKS\n# Functions that run automatically on motion events\n# ============================================\n\ndef on_motion_detected():\n    """Called when PIR detects movement."""\n    print("🚨 Motion Detected!")\n    alert_led.on()\n\ndef on_motion_ended():\n    """Called when PIR no longer detects movement."""\n    print("✅ All Clear.")\n    alert_led.off()\n\n# Register the event callbacks\npir_sensor.when_motion = on_motion_detected\npir_sensor.when_no_motion = on_motion_ended\n\n# ============================================\n# MAIN PROGRAM\n# ============================================\n\nprint("🔍 PIR Sensor Warming Up (10 seconds)...")\nsleep(10)  # PIR sensors need time to calibrate\nprint("✅ Sensor Ready! Waiting for motion...")\nprint("   Press Ctrl+C to exit.\n")\n\ntry:\n    pause()  # Wait efficiently for events\nexcept KeyboardInterrupt:\n    alert_led.off()\n    print("\n👋 Sensor deactivated.")`,
      codeWalkthrough: [
        { section: 'MotionSensor', explanation: '`MotionSensor(23)` creates a PIR sensor object. It handles all the edge detection and debouncing internally.' },
        { section: 'Event Hooks', explanation: '`.when_motion` and `.when_no_motion` are properties that accept callback functions. When motion state changes, your function runs automatically.' },
        { section: 'Warm-up Period', explanation: 'PIR sensors take 10-60 seconds to calibrate to ambient infrared levels. Always add a warm-up delay before trusting readings.' },
        { section: 'No Polling', explanation: 'Unlike `while True: check_sensor()`, events fire only when state changes. This uses zero CPU while waiting.' }
      ],
      conceptDeepDive: {
        hardware: 'The PIR sensor has its own internal logic chip. It does the hard work of analyzing infrared light. It just gives the Pi a simple "Yes" (3.3V) or "No" (0V).',
        software: 'Instead of constantly asking "Is there motion?" in a `while` loop (polling), we use Interrupts. The Pi sleeps until the sensor interrupts it.',
        connection: 'The hardware sensor acts as a trigger. The software registers a listener for that trigger, creating an efficient, responsive system.'
      },
      experimentMode: {
        tweak: 'Adjust the PIR potentiometers to change sensitivity. Use `.motion_detected` property to check current state.',
        logic: 'Add `when_no_motion` callback that prints "Clear" and turns off the LED after motion ends.',
        creative: 'Add the buzzer from Level 4 and make an intruder alarm: `buzzer.play(Tone("A5"))` when motion detected!'
      },
      troubleshooting: [
        { issue: 'Sensor triggers constantly with no movement', solution: 'The sensor might be too sensitive, or it needs a minute to "warm up" and calibrate to the room.' },
        { issue: 'Sensor never triggers', solution: 'Check the wiring. Ensure VCC is on 5V. Turn the sensitivity dial clockwise.' }
      ]
    }
  },
  {
    id: 'p6',
    level: 6,
    levelName: 'Multi-Module Systems',
    title: 'LCD or OLED output',
    skillsLearned: ['I2C/SPI', 'Libraries', 'String Formatting'],
    badgeEarned: 'Display Master',
    content: {
      overview: {
        description: 'We will connect an I2C LCD display to show text messages. This introduces complex modules that require external libraries and communication protocols.',
        concepts: ['I2C Protocol', 'External Libraries', 'String Formatting'],
        difficulty: 4,
        estimatedTime: '35 mins'
      },
      hardwareSetup: {
        warnings: [
          'You MUST enable I2C on your Raspberry Pi first using `sudo raspi-config`.',
          'Most 16x2 I2C LCDs require 5V power to run the backlight.'
        ],
        steps: [
          'Connect LCD GND to Raspberry Pi Ground.',
          'Connect LCD VCC to Raspberry Pi Physical Pin 4 (5V).',
          'Connect LCD SDA (Data) to Raspberry Pi Physical Pin 3 (GPIO 2 / SDA).',
          'Connect LCD SCL (Clock) to Raspberry Pi Physical Pin 5 (GPIO 3 / SCL).'
        ],
        explanation: "I2C uses just two wires (SDA and SCL) to send complex data. The Pi sends text characters as binary data over these wires to the LCD's backpack chip."
      },
      code: `# Note: This requires the RPLCD library. Install it via terminal: pip3 install RPLCD smbus2\n\nfrom RPLCD.i2c import CharLCD\nimport time\n\n# Initialize the LCD. Address is usually 0x27 or 0x3f.\nlcd = CharLCD(i2c_expander='PCF8574', address=0x27, port=1, cols=16, rows=2)\n\ntry:\n    lcd.clear()\n    lcd.write_string('Hello, Pi!')\n    \n    time.sleep(2)\n    \n    # Dynamic text\n    counter = 0\n    while True:\n        lcd.cursor_pos = (1, 0) # Move to second row, first column\n        lcd.write_string(f'Count: {counter}')\n        counter += 1\n        time.sleep(1)\n\nexcept KeyboardInterrupt:\n    pass\n\nfinally:\n    lcd.clear()\n    lcd.write_string('Goodbye!')\n    time.sleep(1)\n    lcd.clear()`,
      codeWalkthrough: [
        { section: 'Library Import', explanation: 'We import `CharLCD` from `RPLCD.i2c`. This library handles all the complex I2C binary translation for us.' },
        { section: 'Initialization', explanation: 'We tell the library what chip the LCD uses (`PCF8574`), its I2C address (`0x27`), and its size (16 columns, 2 rows).' },
        { section: 'Cursor Positioning', explanation: '`lcd.cursor_pos = (1, 0)` moves the invisible text cursor to row 1 (the bottom row, since it starts at 0) and column 0.' },
        { section: 'F-Strings', explanation: '`f"Count: {counter}"` is a Python f-string. It automatically inserts the value of the `counter` variable into the text.' }
      ],
      conceptDeepDive: {
        hardware: 'The I2C backpack on the LCD takes serial data from the Pi and converts it into parallel signals to drive the individual pixels of the screen.',
        software: 'Libraries abstract away complexity. Instead of writing hundreds of lines of binary timing code, we just call `lcd.write_string()`.',
        connection: 'The Pi acts as the I2C "Master", generating a clock signal on SCL and sending data on SDA. The LCD acts as a "Slave", listening for its address.'
      },
      experimentMode: {
        tweak: 'Change the starting cursor position to `(0, 5)` to center the text on the top row.',
        logic: 'Make a countdown timer instead of a count-up timer.',
        creative: 'Combine this with the button from Level 2. Make the LCD display how many times the button has been pressed.'
      },
      troubleshooting: [
        { issue: 'LCD lights up but shows no text', solution: 'Adjust the contrast potentiometer (the blue box with a screw) on the back of the LCD using a small screwdriver.' },
        { issue: 'Error: "[Errno 121] Remote I/O error"', solution: 'The Pi cannot find the LCD. Check your wiring, ensure I2C is enabled, and verify the address (try 0x3f instead of 0x27).' }
      ]
    }
  },
  {
    id: 'p7',
    level: 7,
    levelName: 'Mini Capstone Projects',
    title: 'Multi-module alarm system',
    skillsLearned: ['Enum state machines', 'Threading Event', 'Multi-component integration'],
    badgeEarned: 'Mini Systems Architect',
    content: {
      overview: {
        description: 'The Capstone! We will combine the PIR sensor, LED, Buzzer, and Button to create a complete, state-based security alarm system.',
        concepts: ['State Machines (Enum)', 'Threading & Events', 'System Integration'],
        difficulty: 5,
        estimatedTime: '45 mins'
      },
      hardwareSetup: {
        warnings: [
          'Double-check all wiring before powering on. You have many components connected now.'
        ],
        steps: [
          'LED on GPIO 17 (with resistor).',
          'Button on GPIO 22 (to 3.3V).',
          'Passive Buzzer on GPIO 18.',
          'PIR Sensor on GPIO 23 (VCC to 5V).'
        ],
        explanation: 'We are building a complete system. The PIR acts as the trigger, the LED and Buzzer act as the alarm outputs, and the Button acts as the disarm switch.'
      },
      code: `#!/usr/bin/env python3\n"""\nLevel 7: Multi-Module Alarm System - State machine with gpiozero\n\n🔒 SECURITY HARDENING:\n- Use a state machine pattern to prevent race conditions\n- Add entry delay to prevent triggering while disarming\n- Consider storing arm/disarm logs to a secure file\n- Run as a systemd service for auto-restart on failure\n\n📚 EDUCATIONAL MOMENT:\nThis uses a "state machine" pattern - the system's behavior depends on\nits current state (ARMED, ALARM, DISARMED), not just raw sensor input.\n"""\n\nfrom gpiozero import LED, Button, TonalBuzzer, MotionSensor\nfrom gpiozero.tones import Tone\nfrom enum import Enum\nfrom signal import pause\nfrom time import sleep\nfrom threading import Event\n\n# ============================================\n# STATE MACHINE DEFINITION\n# ============================================\n\nclass AlarmState(Enum):\n    DISARMED = "DISARMED"\n    ARMED = "ARMED"\n    TRIGGERED = "TRIGGERED"\n\n# ============================================\n# HARDWARE ABSTRACTION\n# ============================================\n\nalert_led = LED(17)\nalarm_buzzer = TonalBuzzer(18)\narm_button = Button(22, pull_up=False, bounce_time=0.1)\nmotion_sensor = MotionSensor(23)\n\n# ============================================\n# SYSTEM STATE\n# ============================================\n\ncurrent_state = AlarmState.DISARMED\nalarm_stop_event = Event()\n\n# ============================================\n# EVENT HANDLERS\n# ============================================\n\ndef trigger_alarm():\n    """Called when motion detected while armed."""\n    global current_state\n    if current_state == AlarmState.ARMED:\n        current_state = AlarmState.TRIGGERED\n        print("🚨 ALARM TRIGGERED!")\n        alarm_stop_event.clear()\n        \n        # Sound alarm pattern until stopped\n        while current_state == AlarmState.TRIGGERED:\n            alert_led.on()\n            alarm_buzzer.play(Tone("A5"))\n            sleep(0.15)\n            alert_led.off()\n            alarm_buzzer.play(Tone("E5"))\n            sleep(0.15)\n            \n            if alarm_stop_event.is_set():\n                break\n        \n        alarm_buzzer.stop()\n        alert_led.off()\n\ndef toggle_arm_state():\n    """Called when arm/disarm button is pressed."""\n    global current_state\n    \n    if current_state == AlarmState.TRIGGERED:\n        # Disarm the alarm\n        current_state = AlarmState.DISARMED\n        alarm_stop_event.set()\n        print("✅ Alarm DISARMED")\n        alert_led.blink(on_time=0.1, off_time=0.1, n=3)\n        sleep(2)  # Cooldown before re-arming\n        \n    elif current_state == AlarmState.DISARMED:\n        # Arm the system with countdown\n        print("🔒 Arming in 5 seconds...")\n        for i in range(5, 0, -1):\n            print(f"   {i}...")\n            alert_led.blink(on_time=0.1, off_time=0.4, n=1)\n            sleep(1)\n        current_state = AlarmState.ARMED\n        alert_led.on()\n        print("🛡️ System ARMED")\n        sleep(0.5)\n        alert_led.off()\n        \n    elif current_state == AlarmState.ARMED:\n        # Disarm without triggering\n        current_state = AlarmState.DISARMED\n        print("🔓 System DISARMED")\n        alert_led.blink(on_time=0.1, off_time=0.1, n=2)\n\n# ============================================\n# REGISTER EVENT CALLBACKS\n# ============================================\n\nmotion_sensor.when_motion = trigger_alarm\narm_button.when_pressed = toggle_arm_state\n\n# ============================================\n# MAIN PROGRAM\n# ============================================\n\nprint("🏠 Alarm System Initialized")\nprint("   Press button to ARM/DISARM")\nprint("   Press Ctrl+C to exit\n")\nprint(f"Status: {current_state.value}")\n\ntry:\n    pause()\nexcept KeyboardInterrupt:\n    alarm_buzzer.stop()\n    alert_led.off()\n    print("\n👋 System shutdown.")`,
      codeWalkthrough: [
        { section: 'Enum State Machine', explanation: '`AlarmState(Enum)` defines named states. Using Enums prevents typos like `"ARMD"` and makes code self-documenting.' },
        { section: 'Threading Event', explanation: '`Event()` from threading safely signals between the alarm loop and the disarm callback. This prevents race conditions.' },
        { section: 'State Transitions', explanation: 'The `toggle_arm_state()` function checks `current_state` before acting. The same button press does different things depending on state.' },
        { section: 'Arm Countdown', explanation: 'The 5-second countdown gives you time to leave the room. Real alarm systems work the same way!' }
      ],
      conceptDeepDive: {
        hardware: "Multiple components share the Pi's power and ground rails. The Pi coordinates them, acting as the central nervous system.",
        software: 'Managing complex systems requires tracking "State". Without the `alarm_active` variable, the alarm would only sound for the exact millisecond the PIR detected motion.',
        connection: 'This project bridges the gap between simple scripts and real-world products. A commercial home alarm works on these exact same principles.'
      },
      experimentMode: {
        tweak: 'Change the buzzer tones in `trigger_alarm()` to "C6" and "G5" for a different sound.',
        logic: 'Add an "entry delay" - when motion is detected, give 5 seconds to press disarm before the alarm sounds.',
        creative: 'Add an I2C LCD from Level 6 to display the current `AlarmState.value` in real-time!'
      },
      troubleshooting: [
        { issue: "Alarm won't turn off", solution: 'Ensure you are holding the button down during the 0.2 second window when the code checks it, or use an event detect for the button too.' },
        { issue: 'Code crashes with global variable error', solution: 'Ensure you declare `global alarm_active` inside the function before trying to change its value.' }
      ]
    }
  }
];
