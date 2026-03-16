import { Project } from '../types';

export const curriculum: Project[] = [
  {
    id: 'p1-intro',
    level: 1,
    levelName: 'Digital Output Basics',
    title: 'Hello, Double Color LED',
    skillsLearned: ['gpiozero LED', 'blink() method', 'signal.pause()', 'Multiple GPIO control'],
    badgeEarned: 'GPIO Initiate',
    content: {
      overview: {
        description: 'We are building the "Hello World" of electronics using a Double Color LED (Red/Green) from your Inland kit! This LED has two colors in one package - perfect for status indicators.',
        concepts: ['Digital Output', 'gpiozero LED class', 'Background threads', 'Common Cathode LEDs'],
        difficulty: 1,
        estimatedTime: '15 mins'
      },
      pages: [
        {
          id: 'p1-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'We are building the "Hello World" of electronics using a Double Color LED (Red/Green) from your Inland kit! This LED has two colors in one package - perfect for status indicators.',
              concepts: ['Digital Output', 'gpiozero LED class', 'Background threads', 'Common Cathode LEDs'],
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
                'The Double Color LED module has built-in resistors - no external resistors needed!',
                'The Double Color LED has 3 pins: Red, Ground (center, longest), and Green.',
                'Default to 3.3V logic. Never connect the module directly to 5V.'
              ],
              steps: [
                'Identify the 3 pins on your Double Color LED module: the center longest pin is Ground (GND).',
                'Place the Double Color LED module in your breadboard.',
                'Connect the center pin (GND/cathode) to the blue negative (-) rail on your breadboard.',
                'Connect a jumper wire from Raspberry Pi Physical Pin 6 (GND) to the blue negative rail.',
                'Connect the RED pin of the LED module directly to Physical Pin 11 (GPIO 17).',
                'Connect the GREEN pin of the LED module directly to Physical Pin 13 (GPIO 27).'
              ],
              explanation: 'The Double Color LED contains two LEDs (red and green) sharing a common ground. By controlling GPIO 17 and GPIO 27 independently, you can show red, green, or both (which makes yellow/orange)!'
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
            code: `#!/usr/bin/env python3
"""
Level 1: Hello, Double Color LED - Blink Red/Green using gpiozero

🔒 SECURITY HARDENING:
- The Double Color LED module has built-in resistors (no external resistor needed)
- Disable unused interfaces: sudo raspi-config -> Interface Options
- Keep your Pi's OS updated: sudo apt update && sudo apt upgrade

📚 EDUCATIONAL MOMENT:
The Double Color LED from your Inland 37-in-1 kit has TWO LEDs inside!
Red and Green share a common cathode (ground). Light both = yellow/orange!
"""

from gpiozero import LED
from signal import pause
from time import sleep

# ============================================
# HARDWARE ABSTRACTION
# Two separate LED objects for red and green
# ============================================

red_led = LED(17)    # Red pin on GPIO 17
green_led = LED(27)  # Green pin on GPIO 27

# ============================================
# HIGH-LEVEL LOGIC
# Cycle through colors: Red -> Green -> Yellow -> Off
# ============================================

print("🚦 Double Color LED Demo - Press Ctrl+C to exit.")

try:
    while True:
        # Red only
        print("🔴 Red")
        red_led.on()
        green_led.off()
        sleep(1)
        
        # Green only
        print("🟢 Green")
        red_led.off()
        green_led.on()
        sleep(1)
        
        # Both on = Yellow/Orange!
        print("🟡 Yellow (Red + Green)")
        red_led.on()
        green_led.on()
        sleep(1)
        
        # Both off
        print("⚫ Off")
        red_led.off()
        green_led.off()
        sleep(1)

except KeyboardInterrupt:
    print("\\n👋 Exiting... LEDs turned off.")
    red_led.off()
    green_led.off()

# Note: gpiozero automatically cleans up GPIO pins on exit!`,
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
              { section: 'Imports', explanation: '`from gpiozero import LED` gives us the LED class. We also import `sleep` from time for delays between colors.' },
              { section: 'Two LED Objects', explanation: '`LED(17)` and `LED(27)` create separate control for each color. The Double Color LED is really two LEDs in one package!' },
              { section: 'Color Mixing', explanation: 'Red ON + Green ON = Yellow/Orange! This is additive color mixing. Try different brightness levels (PWM) for more colors.' },
              { section: 'The Loop', explanation: 'A simple `while True` loop cycles through all color combinations. Each color displays for 1 second.' },
              { section: 'Cleanup', explanation: 'The `except KeyboardInterrupt` catches Ctrl+C and turns off both LEDs before exiting cleanly.' }
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
              hardware: "The Double Color LED contains two separate LED dies (red and green) in one package, sharing a common cathode (ground). Each color has its own anode that you control independently.",
              software: 'Two separate LED objects let us control each color. By turning them on/off in combinations, we create different visual states - perfect for status indicators!',
              connection: 'Each GPIO pin controls one color. HIGH (3.3V) = color on, LOW (0V) = color off. Both HIGH = both colors mix to create yellow/orange.'
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
              tweak: 'Change `sleep(1)` to `sleep(0.2)` for a faster light show. Try different timing for each color!',
              logic: 'Make a traffic light sequence: Green (3s) -> Yellow (1s) -> Red (3s) -> repeat',
              creative: 'Create an SOS pattern in red: 3 short blinks, 3 long blinks, 3 short blinks!'
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
              { issue: "Only one color works", solution: 'Check that both color pins are connected to the correct GPIO pins (GPIO 17 for Red, GPIO 27 for Green).' },
              { issue: "LED doesn't light up at all", solution: 'The center pin (longest) must go to GND. Double-check polarity and GPIO connections.' },
              { issue: 'Colors are very dim', solution: 'Ensure you are using 3.3V GPIO pins. The module has built-in resistors sized for 3.3V operation.' },
              { issue: 'Yellow looks more orange', solution: 'This is normal! Red and green LEDs have different brightness levels. In Level 3, we will use PWM to balance them.' }
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
      pages: [
        {
          id: 'p2-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'We will use a push button to control our LED. This introduces digital inputs, letting our code react to the physical world.',
              concepts: ['Digital Input', 'Event-Driven Programming', 'Source Binding'],
              difficulty: 2,
              estimatedTime: '20 mins'
            },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p2-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 2, estimatedTime: '' },
            hardwareSetup: {
              warnings: [
                'The button module has 3 pins: GND, VCC, and S (Signal).',
                'The module has a built-in pull-up resistor - when pressed, signal goes LOW.'
              ],
              steps: [
                'Keep the LED setup from Level 1 (Double Color LED with GND to ground rail, Red to GPIO 17).',
                'Connect the button module GND pin to the ground rail (same as LED ground).',
                'Connect the button module VCC pin to Raspberry Pi Physical Pin 1 (3.3V).',
                'Connect the button module S (Signal) pin to Raspberry Pi Physical Pin 15 (GPIO 22).'
              ],
              explanation: 'The button module has a built-in pull-up resistor. When NOT pressed, Signal is HIGH (3.3V). When pressed, Signal goes LOW (0V) because it connects to GND internally.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p2-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 2, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 2: Button Controls LED - Event-driven input handling

🔒 SECURITY HARDENING:
- The button module has a built-in pull-up resistor
- Never connect button directly between 5V and GPIO (use 3.3V only!)
- Disable SSH password auth if not needed: edit /etc/ssh/sshd_config

📚 EDUCATIONAL MOMENT:
The Inland kit button module pulls the signal LOW when pressed.
We use pull_up=True and invert the logic so pressed = LED on.
"""

from gpiozero import LED, Button
from signal import pause

# ============================================
# HARDWARE ABSTRACTION
# Button module has built-in pull-up resistor
# ============================================

status_led = LED(17)
# pull_up=True because module has built-in pull-up
# Button reads LOW (False) when pressed, HIGH (True) when released
control_button = Button(22, pull_up=True)

# ============================================
# EVENT-DRIVEN LOGIC (No polling loops!)
# ============================================

# Use event callbacks - LED on when pressed, off when released
control_button.when_pressed = status_led.on
control_button.when_released = status_led.off

print("🔘 Press and hold the button to light the LED.")
print("   Press Ctrl+C to exit.")

try:
    pause()
except KeyboardInterrupt:
    print("\\n👋 Exiting...")
    status_led.off()`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p2-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 2, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'Button Object', explanation: '`Button(22, pull_up=True)` matches the module built-in pull-up resistor. The signal is HIGH when released, LOW when pressed.' },
              { section: 'Event Callbacks', explanation: '`.when_pressed` and `.when_released` trigger functions automatically. No polling loop needed!' },
              { section: 'Inverted Logic', explanation: 'The module pulls LOW when pressed. gpiozero Button class handles this - "pressed" means the button was activated regardless of voltage.' },
              { section: 'No CPU Waste', explanation: 'Unlike polling with `while True`, event-driven code only runs when something happens. The CPU stays idle otherwise.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p2-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 2, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The 3-pin button module has a built-in pull-up resistor on the PCB. This keeps the signal HIGH (3.3V) until pressed, then it goes LOW (0V).',
              software: 'gpiozero Button class detects transitions. With pull_up=True, pressing the button (LOW signal) is detected as a "press" event.',
              connection: 'Physical press pulls Signal to GND (LOW). Software detects this transition and fires the when_pressed callback.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p2-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 2, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Change when_pressed to toggle the LED instead: `control_button.when_pressed = status_led.toggle`',
              logic: 'Make the button act as a toggle - press once to turn on, press again to turn off.',
              creative: 'Add both LED colors and make the button switch between red and green!'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p2-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 2, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: "LED is always on or always off", solution: "Make sure the button module GND is connected to the Pi's ground rail. All grounds must be connected!" },
              { issue: 'Button does nothing', solution: 'Check: S pin to GPIO 22, VCC to 3.3V, GND to ground rail. Ensure pull_up=True in code.' },
              { issue: 'LED turns OFF when pressed (inverted)', solution: 'This is expected behavior for source binding. Use when_pressed/when_released callbacks instead.' }
            ]
          }
        }
      ],
      hardwareSetup: { warnings: [], steps: [], explanation: '' },
      code: '',
      codeWalkthrough: [],
      conceptDeepDive: { hardware: '', software: '', connection: '' },
      experimentMode: { tweak: '', logic: '', creative: '' },
      troubleshooting: []
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
      pages: [
        {
          id: 'p3-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'Instead of just ON and OFF, we will use Pulse Width Modulation (PWM) to fade an LED in and out, simulating an analog output.',
              concepts: ['PWM & Duty Cycle', 'PWMLED class', 'Value property (0.0-1.0)'],
              difficulty: 3,
              estimatedTime: '25 mins'
            },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p3-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: {
              warnings: [
                'No new hardware needed! We will use the exact same LED setup from Level 1.'
              ],
              steps: [
                'Ensure your Double Color LED module is connected just like in Level 1 (Red pin to GPIO 17, center to GND).'
              ],
              explanation: 'We are changing how we control the pin in software. Instead of a steady 3.3V, we will turn the pin on and off very fast to simulate a lower voltage.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p3-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 3: PWM Brightness - Smooth LED fading with PWMLED

🔒 SECURITY HARDENING:
- PWM frequency is software-controlled; use hardware PWM pins (GPIO 12, 13, 18, 19) for precision
- Limit script permissions: chmod 700 script.py (owner only)
- Consider running as non-root user with gpio group membership

📚 EDUCATIONAL MOMENT:
PWMLED.pulse() uses a background thread with sinusoidal easing,
creating smooth fades without blocking your main program.
"""

from gpiozero import PWMLED
from signal import pause

# ============================================
# HARDWARE ABSTRACTION
# PWMLED handles PWM setup automatically
# ============================================

# Create a PWM-capable LED (supports brightness 0.0 to 1.0)
fading_led = PWMLED(17)

# ============================================
# HIGH-LEVEL LOGIC
# pulse() handles the fade animation internally
# ============================================

print("✨ LED pulsing smoothly... Press Ctrl+C to exit.")

# Pulse the LED: fade in over 1 sec, fade out over 1 sec
# This runs in a background thread - non-blocking!
fading_led.pulse(fade_in_time=1, fade_out_time=1)

# Alternative: Manual brightness control
# fading_led.value = 0.5  # Set to 50% brightness
# fading_led.value = 0    # Off
# fading_led.value = 1    # Full brightness

try:
    pause()
except KeyboardInterrupt:
    print("\\n🌙 Fading out...")
    fading_led.off()`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p3-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'PWMLED Class', explanation: '`PWMLED(17)` creates an LED with PWM capability. Unlike `LED`, it supports fractional brightness values from 0.0 to 1.0.' },
              { section: 'The pulse() Method', explanation: '`pulse()` creates a smooth breathing effect using sinusoidal easing. It runs in a background thread automatically.' },
              { section: 'Value Property', explanation: '`fading_led.value = 0.5` sets brightness to 50%. This is more intuitive than raw duty cycle percentages.' },
              { section: 'Background Threading', explanation: 'gpiozero runs animations in separate threads, so your main code can do other things while the LED pulses.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p3-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'Digital pins can only output 3.3V or 0V. They cannot output 1.5V. PWM tricks the LED (and our eyes) by pulsing the 3.3V so fast that it averages out to a lower brightness.',
              software: 'The PWM library handles the rapid switching in the background. We just tell it what percentage of the time it should be ON (the duty cycle).',
              connection: 'A 50% duty cycle means the pin is HIGH for half the time and LOW for half the time. The LED flickers so fast it just looks dimmer.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p3-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Change `fade_in_time=1` to `fade_in_time=3`. How does the animation feel?',
              logic: 'Instead of `pulse()`, use a loop with `fading_led.value = x/100` to manually control brightness.',
              creative: 'Combine with the button: `led.source = lambda: button.value * 0.5 + 0.5` to show half-brightness when released, full when pressed.'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p3-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'LED flickers visibly', solution: 'Your PWM frequency is too low. Ensure it is set to at least 50Hz or 100Hz.' },
              { issue: 'Error: "A PWM object already exists"', solution: 'This happens if the script crashed previously without running `GPIO.cleanup()`. Just run the script again.' }
            ]
          }
        }
      ],
      hardwareSetup: { warnings: [], steps: [], explanation: '' },
      code: '',
      codeWalkthrough: [],
      conceptDeepDive: { hardware: '', software: '', connection: '' },
      experimentMode: { tweak: '', logic: '', creative: '' },
      troubleshooting: []
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
      pages: [
        {
          id: 'p4-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'We will use a passive buzzer to generate different musical tones and sound effects using PWM frequencies.',
              concepts: ['TonalBuzzer', 'Musical Notes & Tone class', 'Lists & Loops'],
              difficulty: 3,
              estimatedTime: '20 mins'
            },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p4-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
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
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p4-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 4: Buzzer Tones - Play melodies with TonalBuzzer

🔒 SECURITY HARDENING:
- Passive buzzers draw more current than an LED; consider a transistor driver for louder output
- Use GPIO 18 (hardware PWM) for cleanest audio tones
- Avoid running audio scripts at boot (noisy on startup = security giveaway)

📚 EDUCATIONAL MOMENT:
TonalBuzzer uses musical note names (like "C4", "A4") instead of raw frequencies,
making code more readable and less error-prone.
"""

from gpiozero import TonalBuzzer
from gpiozero.tones import Tone
from time import sleep

# ============================================
# HARDWARE ABSTRACTION
# TonalBuzzer handles PWM frequency calculation
# ============================================

melody_buzzer = TonalBuzzer(18)

# ============================================
# HIGH-LEVEL LOGIC
# Use musical note names instead of frequencies!
# ============================================

# Define a melody using note names (C4 = Middle C, A4 = 440Hz)
melody = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
note_duration = 0.4

print("🎵 Playing C major scale...")

try:
    for note in melody:
        print(f"  ♪ {note}")
        melody_buzzer.play(Tone(note))  # Play the note
        sleep(note_duration)
    
    melody_buzzer.stop()
    print("🎶 Scale complete!")
    
    # Bonus: Play a simple tune (Twinkle Twinkle)
    sleep(1)
    print("\\n🌟 Bonus: Twinkle Twinkle...")
    twinkle = ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4', None,
               'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4']
    
    for note in twinkle:
        if note:
            melody_buzzer.play(Tone(note))
        else:
            melody_buzzer.stop()  # Rest
        sleep(0.3)
    
    melody_buzzer.stop()
    
except KeyboardInterrupt:
    melody_buzzer.stop()
    print("\\n🔇 Stopped.")`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p4-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'TonalBuzzer', explanation: '`TonalBuzzer(18)` creates a buzzer that accepts musical notes. GPIO 18 is a hardware PWM pin for cleaner tones.' },
              { section: 'Tone Objects', explanation: '`Tone("C4")` converts a note name to a frequency. C4 is Middle C (261Hz), A4 is concert pitch (440Hz).' },
              { section: 'play() and stop()', explanation: '`buzzer.play(tone)` starts a note, `buzzer.stop()` silences it. Use `None` in a melody list for rests.' },
              { section: 'Readable Code', explanation: 'Note names like "G4" are much easier to read and debug than magic numbers like "392".' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p4-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The piezoelectric buzzer translates electrical pulses into mechanical movement (sound waves). The faster the pulses, the higher the pitch.',
              software: 'We use the same PWM library as the LED, but we manipulate the `ChangeFrequency()` method instead of `ChangeDutyCycle()`.',
              connection: 'Code frequency directly maps to audio frequency. 261Hz in code creates a 261Hz sound wave in the air (Middle C).'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p4-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Change `note_duration = 0.4` to `0.15` to play the scale faster.',
              logic: 'Create a siren effect: `for note in ["A4", "E4"] * 10: buzzer.play(Tone(note)); sleep(0.1)`',
              creative: 'Look up note names for "Mary Had a Little Lamb" and program the Pi to play it! (E4, D4, C4, D4, E4, E4, E4...)'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p4-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 3, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'Buzzer only clicks or makes a harsh static noise', solution: 'You might have an Active buzzer instead of a Passive one. Active buzzers cannot play melodies.' },
              { issue: 'Sound is very quiet', solution: 'Ensure the duty cycle is set to 50. Also, some buzzers are naturally quiet unless driven by a transistor.' }
            ]
          }
        }
      ],
      hardwareSetup: { warnings: [], steps: [], explanation: '' },
      code: '',
      codeWalkthrough: [],
      conceptDeepDive: { hardware: '', software: '', connection: '' },
      experimentMode: { tweak: '', logic: '', creative: '' },
      troubleshooting: []
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
      pages: [
        {
          id: 'p5-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'We will use a PIR (Passive Infrared) motion sensor to detect movement and trigger an action. This introduces event-driven programming.',
              concepts: ['MotionSensor class', 'Event Callbacks', 'Asynchronous Code'],
              difficulty: 4,
              estimatedTime: '30 mins'
            },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p5-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
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
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p5-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 5: Motion Sensor - Event-driven PIR detection

🔒 SECURITY HARDENING:
- PIR sensors need 5V power but output 3.3V signals (safe for GPIO)
- Add a 1-minute warm-up delay before arming sensor (reduces false triggers)
- Consider rate-limiting callbacks to prevent log flooding attacks

📚 EDUCATIONAL MOMENT:
MotionSensor.when_motion and .when_no_motion are "event hooks" -
they register callback functions that execute asynchronously when triggered.
"""

from gpiozero import MotionSensor, LED
from signal import pause
from time import sleep

# ============================================
# HARDWARE ABSTRACTION
# MotionSensor wraps PIR sensor functionality
# ============================================

pir_sensor = MotionSensor(23)  # PIR OUT pin on GPIO 23
alert_led = LED(17)            # Indicator LED on GPIO 17

# ============================================
# EVENT-DRIVEN CALLBACKS
# Functions that run automatically on motion events
# ============================================

def on_motion_detected():
    """Called when PIR detects movement."""
    print("🚨 Motion Detected!")
    alert_led.on()

def on_motion_ended():
    """Called when PIR no longer detects movement."""
    print("✅ All Clear.")
    alert_led.off()

# Register the event callbacks
pir_sensor.when_motion = on_motion_detected
pir_sensor.when_no_motion = on_motion_ended

# ============================================
# MAIN PROGRAM
# ============================================

print("🔍 PIR Sensor Warming Up (10 seconds)...")
sleep(10)  # PIR sensors need time to calibrate
print("✅ Sensor Ready! Waiting for motion...")
print("   Press Ctrl+C to exit.\\n")

try:
    pause()  # Wait efficiently for events
except KeyboardInterrupt:
    alert_led.off()
    print("\\n👋 Sensor deactivated.")`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p5-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'MotionSensor', explanation: '`MotionSensor(23)` creates a PIR sensor object. It handles all the edge detection and debouncing internally.' },
              { section: 'Event Hooks', explanation: '`.when_motion` and `.when_no_motion` are properties that accept callback functions. When motion state changes, your function runs automatically.' },
              { section: 'Warm-up Period', explanation: 'PIR sensors take 10-60 seconds to calibrate to ambient infrared levels. Always add a warm-up delay before trusting readings.' },
              { section: 'No Polling', explanation: 'Unlike `while True: check_sensor()`, events fire only when state changes. This uses zero CPU while waiting.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p5-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The PIR sensor has its own internal logic chip. It does the hard work of analyzing infrared light. It just gives the Pi a simple "Yes" (3.3V) or "No" (0V).',
              software: 'Instead of constantly asking "Is there motion?" in a `while` loop (polling), we use Interrupts. The Pi sleeps until the sensor interrupts it.',
              connection: 'The hardware sensor acts as a trigger. The software registers a listener for that trigger, creating an efficient, responsive system.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p5-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Adjust the PIR potentiometers to change sensitivity. Use `.motion_detected` property to check current state.',
              logic: 'Add `when_no_motion` callback that prints "Clear" and turns off the LED after motion ends.',
              creative: 'Add the buzzer from Level 4 and make an intruder alarm: `buzzer.play(Tone("A5"))` when motion detected!'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p5-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'Sensor triggers constantly with no movement', solution: 'The sensor might be too sensitive, or it needs a minute to "warm up" and calibrate to the room.' },
              { issue: 'Sensor never triggers', solution: 'Check the wiring. Ensure VCC is on 5V. Turn the sensitivity dial clockwise.' }
            ]
          }
        }
      ],
      hardwareSetup: { warnings: [], steps: [], explanation: '' },
      code: '',
      codeWalkthrough: [],
      conceptDeepDive: { hardware: '', software: '', connection: '' },
      experimentMode: { tweak: '', logic: '', creative: '' },
      troubleshooting: []
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
      pages: [
        {
          id: 'p6-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'We will connect an I2C LCD display to show text messages. This introduces complex modules that require external libraries and communication protocols.',
              concepts: ['I2C Protocol', 'External Libraries', 'String Formatting'],
              difficulty: 4,
              estimatedTime: '35 mins'
            },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p6-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
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
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p6-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `# Note: This requires the RPLCD library. Install it via terminal: pip3 install RPLCD smbus2

from RPLCD.i2c import CharLCD
import time

# Initialize the LCD. Address is usually 0x27 or 0x3f.
lcd = CharLCD(i2c_expander='PCF8574', address=0x27, port=1, cols=16, rows=2)

try:
    lcd.clear()
    lcd.write_string('Hello, Pi!')
    
    time.sleep(2)
    
    # Dynamic text
    counter = 0
    while True:
        lcd.cursor_pos = (1, 0) # Move to second row, first column
        lcd.write_string(f'Count: {counter}')
        counter += 1
        time.sleep(1)

except KeyboardInterrupt:
    pass

finally:
    lcd.clear()
    lcd.write_string('Goodbye!')
    time.sleep(1)
    lcd.clear()`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p6-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'Library Import', explanation: 'We import `CharLCD` from `RPLCD.i2c`. This library handles all the complex I2C binary translation for us.' },
              { section: 'Initialization', explanation: 'We tell the library what chip the LCD uses (`PCF8574`), its I2C address (`0x27`), and its size (16 columns, 2 rows).' },
              { section: 'Cursor Positioning', explanation: '`lcd.cursor_pos = (1, 0)` moves the invisible text cursor to row 1 (the bottom row, since it starts at 0) and column 0.' },
              { section: 'F-Strings', explanation: '`f"Count: {counter}"` is a Python f-string. It automatically inserts the value of the `counter` variable into the text.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p6-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The I2C backpack on the LCD takes serial data from the Pi and converts it into parallel signals to drive the individual pixels of the screen.',
              software: 'Libraries abstract away complexity. Instead of writing hundreds of lines of binary timing code, we just call `lcd.write_string()`.',
              connection: 'The Pi acts as the I2C "Master", generating a clock signal on SCL and sending data on SDA. The LCD acts as a "Slave", listening for its address.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p6-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Change the starting cursor position to `(0, 5)` to center the text on the top row.',
              logic: 'Make a countdown timer instead of a count-up timer.',
              creative: 'Combine this with the button from Level 2. Make the LCD display how many times the button has been pressed.'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p6-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'LCD lights up but shows no text', solution: 'Adjust the contrast potentiometer (the blue box with a screw) on the back of the LCD using a small screwdriver.' },
              { issue: 'Error: "[Errno 121] Remote I/O error"', solution: 'The Pi cannot find the LCD. Check your wiring, ensure I2C is enabled, and verify the address (try 0x3f instead of 0x27).' }
            ]
          }
        }
      ],
      hardwareSetup: { warnings: [], steps: [], explanation: '' },
      code: '',
      codeWalkthrough: [],
      conceptDeepDive: { hardware: '', software: '', connection: '' },
      experimentMode: { tweak: '', logic: '', creative: '' },
      troubleshooting: []
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
      pages: [
        {
          id: 'p7-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'The Capstone! We will combine the PIR sensor, LED, Buzzer, and Button to create a complete, state-based security alarm system.',
              concepts: ['State Machines (Enum)', 'Threading & Events', 'System Integration'],
              difficulty: 5,
              estimatedTime: '45 mins'
            },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p7-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: {
              warnings: [
                'Double-check all wiring before powering on. You have many components connected now.'
              ],
              steps: [
                'Double Color LED module: Red pin to GPIO 17, center pin to GND.',
                'Button on GPIO 22 (to 3.3V).',
                'Passive Buzzer on GPIO 18.',
                'PIR Sensor on GPIO 23 (VCC to 5V).'
              ],
              explanation: 'We are building a complete system. The PIR acts as the trigger, the LED and Buzzer act as the alarm outputs, and the Button acts as the disarm switch.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p7-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 7: Multi-Module Alarm System - State machine with gpiozero

🔒 SECURITY HARDENING:
- Use a state machine pattern to prevent race conditions
- Add entry delay to prevent triggering while disarming
- Consider storing arm/disarm logs to a secure file
- Run as a systemd service for auto-restart on failure

📚 EDUCATIONAL MOMENT:
This uses a "state machine" pattern - the system's behavior depends on
its current state (ARMED, ALARM, DISARMED), not just raw sensor input.
"""

from gpiozero import LED, Button, TonalBuzzer, MotionSensor
from gpiozero.tones import Tone
from enum import Enum
from signal import pause
from time import sleep
from threading import Event

# ============================================
# STATE MACHINE DEFINITION
# ============================================

class AlarmState(Enum):
    DISARMED = "DISARMED"
    ARMED = "ARMED"
    TRIGGERED = "TRIGGERED"

# ============================================
# HARDWARE ABSTRACTION
# ============================================

alert_led = LED(17)
alarm_buzzer = TonalBuzzer(18)
arm_button = Button(22, pull_up=True, bounce_time=0.1)
motion_sensor = MotionSensor(23)

# ============================================
# SYSTEM STATE
# ============================================

current_state = AlarmState.DISARMED
alarm_stop_event = Event()

# ============================================
# EVENT HANDLERS
# ============================================

def trigger_alarm():
    """Called when motion detected while armed."""
    global current_state
    if current_state == AlarmState.ARMED:
        current_state = AlarmState.TRIGGERED
        print("🚨 ALARM TRIGGERED!")
        alarm_stop_event.clear()
        
        # Sound alarm pattern until stopped
        while current_state == AlarmState.TRIGGERED:
            alert_led.on()
            alarm_buzzer.play(Tone("A5"))
            sleep(0.15)
            alert_led.off()
            alarm_buzzer.play(Tone("E5"))
            sleep(0.15)
            
            if alarm_stop_event.is_set():
                break
        
        alarm_buzzer.stop()
        alert_led.off()

def toggle_arm_state():
    """Called when arm/disarm button is pressed."""
    global current_state
    
    if current_state == AlarmState.TRIGGERED:
        # Disarm the alarm
        current_state = AlarmState.DISARMED
        alarm_stop_event.set()
        print("✅ Alarm DISARMED")
        alert_led.blink(on_time=0.1, off_time=0.1, n=3)
        sleep(2)  # Cooldown before re-arming
        
    elif current_state == AlarmState.DISARMED:
        # Arm the system with countdown
        print("🔒 Arming in 5 seconds...")
        for i in range(5, 0, -1):
            print(f"   {i}...")
            alert_led.blink(on_time=0.1, off_time=0.4, n=1)
            sleep(1)
        current_state = AlarmState.ARMED
        alert_led.on()
        print("🛡️ System ARMED")
        sleep(0.5)
        alert_led.off()
        
    elif current_state == AlarmState.ARMED:
        # Disarm without triggering
        current_state = AlarmState.DISARMED
        print("🔓 System DISARMED")
        alert_led.blink(on_time=0.1, off_time=0.1, n=2)

# ============================================
# REGISTER EVENT CALLBACKS
# ============================================

motion_sensor.when_motion = trigger_alarm
arm_button.when_pressed = toggle_arm_state

# ============================================
# MAIN PROGRAM
# ============================================

print("🏠 Alarm System Initialized")
print("   Press button to ARM/DISARM")
print("   Press Ctrl+C to exit\\n")
print(f"Status: {current_state.value}")

try:
    pause()
except KeyboardInterrupt:
    alarm_buzzer.stop()
    alert_led.off()
    print("\\n👋 System shutdown.")`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p7-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'Enum State Machine', explanation: '`AlarmState(Enum)` defines named states. Using Enums prevents typos like `"ARMD"` and makes code self-documenting.' },
              { section: 'Threading Event', explanation: '`Event()` from threading safely signals between the alarm loop and the disarm callback. This prevents race conditions.' },
              { section: 'State Transitions', explanation: 'The `toggle_arm_state()` function checks `current_state` before acting. The same button press does different things depending on state.' },
              { section: 'Arm Countdown', explanation: 'The 5-second countdown gives you time to leave the room. Real alarm systems work the same way!' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p7-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: "Multiple components share the Pi's power and ground rails. The Pi coordinates them, acting as the central nervous system.",
              software: 'Managing complex systems requires tracking "State". Without the `alarm_active` variable, the alarm would only sound for the exact millisecond the PIR detected motion.',
              connection: 'This project bridges the gap between simple scripts and real-world products. A commercial home alarm works on these exact same principles.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p7-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Change the buzzer tones in `trigger_alarm()` to "C6" and "G5" for a different sound.',
              logic: 'Add an "entry delay" - when motion is detected, give 5 seconds to press disarm before the alarm sounds.',
              creative: 'Add an I2C LCD from Level 6 to display the current `AlarmState.value` in real-time!'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p7-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: "Alarm won't turn off", solution: 'Ensure you are holding the button down during the 0.2 second window when the code checks it, or use an event detect for the button too.' },
              { issue: 'Code crashes with global variable error', solution: 'Ensure you declare `global alarm_active` inside the function before trying to change its value.' }
            ]
          }
        }
      ],
      hardwareSetup: { warnings: [], steps: [], explanation: '' },
      code: '',
      codeWalkthrough: [],
      conceptDeepDive: { hardware: '', software: '', connection: '' },
      experimentMode: { tweak: '', logic: '', creative: '' },
      troubleshooting: []
    }
  }
];
