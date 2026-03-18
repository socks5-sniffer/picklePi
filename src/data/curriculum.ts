import { Project } from '../types';

export const curriculum: Project[] = [
  {
    id: 'p1-intro',
    level: 1,
    levelName: 'Digital Output Basics',
    title: 'Hello, RGB LED',
    skillsLearned: ['gpiozero LED', 'Color mixing', 'signal.pause()', 'Multiple GPIO control'],
    badgeEarned: 'GPIO Initiate',
    content: {
      overview: {
        description: 'We are building the "Hello World" of electronics using an RGB LED from your Inland kit! This LED has three colors in one package - Red, Green, and Blue - which can be mixed to create any color.',
        concepts: ['Digital Output', 'gpiozero LED class', 'Additive Color Mixing', 'Common Cathode LEDs'],
        difficulty: 1,
        estimatedTime: '15 mins'
      },
      pages: [
        {
          id: 'p1-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'We are building the "Hello World" of electronics using an RGB LED from your Inland kit! This LED has three colors in one package - Red, Green, and Blue - which can be mixed to create any color.',
              concepts: ['Digital Output', 'gpiozero LED class', 'Additive Color Mixing', 'Common Cathode LEDs'],
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
                'The RGB LED module has built-in resistors - no external resistors needed!',
                'The RGB LED has 4 pins: Red, Ground (-, longest leg), Green, and Blue.',
                'Default to 3.3V logic. Never connect the module directly to 5V.'
              ],
              steps: [
                'Identify the 4 pins on your RGB LED module: the longest pin is Ground (GND/cathode, marked with -).',
                'Place the RGB LED module in your breadboard.',
                'Connect the GND pin (longest leg, marked -) to the blue negative (-) rail on your breadboard.',
                'Connect a jumper wire from Raspberry Pi Physical Pin 6 (GND) to the blue negative rail.',
                'Connect the R (Red) pin of the LED module to Physical Pin 11 (GPIO 17).',
                'Connect the G (Green) pin of the LED module to Physical Pin 13 (GPIO 27).',
                'Connect the B (Blue) pin of the LED module to Physical Pin 29 (GPIO 5).'
              ],
              explanation: 'The RGB LED contains three LEDs (red, green, and blue) sharing a common ground (cathode). By controlling GPIO 17, 27, and 5 independently, you can mix colors - Red + Green = Yellow, Red + Blue = Magenta, Green + Blue = Cyan, All three = White!'
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
Level 1: Hello, RGB LED - Color mixing with gpiozero

🔒 SECURITY HARDENING:
- The RGB LED module has built-in resistors (no external resistor needed)
- Disable unused interfaces: sudo raspi-config -> Interface Options
- Keep your Pi's OS updated: sudo apt update && sudo apt upgrade

📚 EDUCATIONAL MOMENT:
The RGB LED from your Inland 37-in-1 kit has THREE LEDs inside!
Red, Green, and Blue share a common cathode (ground).
Mix them to create any color: R+G=Yellow, R+B=Magenta, G+B=Cyan, R+G+B=White!
"""

from gpiozero import LED
from signal import pause
from time import sleep

# ============================================
# HARDWARE ABSTRACTION
# Three separate LED objects for R, G, B
# ============================================

red_led = LED(17)    # Red pin on GPIO 17
green_led = LED(27)  # Green pin on GPIO 27
blue_led = LED(5)    # Blue pin on GPIO 5

# Helper function to set all colors at once
def set_color(r, g, b):
    red_led.value = r
    green_led.value = g
    blue_led.value = b

# ============================================
# HIGH-LEVEL LOGIC
# Cycle through primary and secondary colors
# ============================================

print("🌈 RGB LED Color Demo - Press Ctrl+C to exit.")

try:
    while True:
        # Primary colors
        print("🔴 Red")
        set_color(1, 0, 0)
        sleep(1)
        
        print("🟢 Green")
        set_color(0, 1, 0)
        sleep(1)
        
        print("🔵 Blue")
        set_color(0, 0, 1)
        sleep(1)
        
        # Secondary colors (mixing two)
        print("🟡 Yellow (Red + Green)")
        set_color(1, 1, 0)
        sleep(1)
        
        print("🟣 Magenta (Red + Blue)")
        set_color(1, 0, 1)
        sleep(1)
        
        print("🩵 Cyan (Green + Blue)")
        set_color(0, 1, 1)
        sleep(1)
        
        # All three = White!
        print("⚪ White (Red + Green + Blue)")
        set_color(1, 1, 1)
        sleep(1)
        
        # Off
        print("⚫ Off")
        set_color(0, 0, 0)
        sleep(1)

except KeyboardInterrupt:
    print("\\n👋 Exiting... LEDs turned off.")
    set_color(0, 0, 0)

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
              { section: 'Three LED Objects', explanation: '`LED(17)`, `LED(27)`, and `LED(18)` create separate control for each color. The RGB LED is really three LEDs in one package!' },
              { section: 'set_color() Helper', explanation: 'This function makes it easy to set all three colors at once. Pass 1 for on, 0 for off for each color channel.' },
              { section: 'Additive Color Mixing', explanation: 'Unlike paint, light colors ADD together. Red + Green = Yellow, Red + Blue = Magenta, Green + Blue = Cyan, All three = White!' },
              { section: 'The Loop', explanation: 'A `while True` loop cycles through all 7 color combinations plus off. Each color displays for 1 second.' },
              { section: 'Cleanup', explanation: 'The `except KeyboardInterrupt` catches Ctrl+C and turns off all LEDs before exiting cleanly.' }
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
              hardware: "The RGB LED contains three separate LED dies (red, green, and blue) in one package, sharing a common cathode (ground). Each color has its own anode that you control independently via GPIO pins.",
              software: 'Three separate LED objects let us control each color. By turning them on/off in combinations, we can create 7 different colors plus off - the building blocks for any color with PWM!',
              connection: 'Each GPIO pin controls one color. HIGH (3.3V) = color on, LOW (0V) = color off. Combinations create secondary colors through additive mixing.'
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
              tweak: 'Change `sleep(1)` to `sleep(0.3)` for a faster color cycle. Try different timing for each color!',
              logic: 'Make a police light pattern: alternate between red and blue every 0.2 seconds!',
              creative: 'Create a rainbow sequence that smoothly transitions through all colors. Hint: you will need PWM from Level 3!'
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
              { issue: "Only one or two colors work", solution: 'Check that all three color pins are connected to the correct GPIO pins (R=GPIO 17, G=GPIO 27, B=GPIO 5).' },
              { issue: "LED doesn't light up at all", solution: 'The longest pin (marked -) must go to GND. Double-check polarity and GPIO connections.' },
              { issue: 'Colors are very dim', solution: 'Ensure you are using 3.3V GPIO pins. The module has built-in resistors sized for 3.3V operation.' },
              { issue: 'White looks pinkish or off-color', solution: 'This is normal! The three LEDs have different brightness levels. In Level 3, we will use PWM to balance them.' },
              { issue: 'Blue seems much brighter', solution: 'Blue LEDs are often brighter than red/green. PWM in Level 3 will let you adjust individual brightness.' }
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
                'Keep the LED setup from Level 1 (RGB LED with GND to ground rail, Red to GPIO 17).',
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
                'Ensure your RGB LED module is connected just like in Level 1 (Red pin to GPIO 17, longest pin to GND).'
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
                'RGB LED module: Red pin to GPIO 17, longest pin (-) to GND.',
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
  },
  {
    id: 'p8',
    level: 8,
    levelName: 'Analog Input & ADC',
    title: 'Twist to Control',
    skillsLearned: ['MCP3008 SPI ADC', 'source/values binding', 'Voltage division', 'SPI Protocol'],
    badgeEarned: 'Analog Alchemist',
    content: {
      overview: {
        description: 'The Raspberry Pi has NO built-in analog inputs. We will use an MCP3008 ADC chip over SPI to read a rotation sensor (potentiometer) and use it to control LED brightness — bridging the analog and digital worlds.',
        concepts: ['Analog-to-Digital Conversion', 'SPI Protocol', 'MCP3008 class', 'source/values pipeline'],
        difficulty: 4,
        estimatedTime: '30 mins'
      },
      pages: [
        {
          id: 'p8-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'The Raspberry Pi has NO built-in analog inputs. We will use an MCP3008 ADC chip over SPI to read a rotation sensor (potentiometer) and use it to control LED brightness — bridging the analog and digital worlds.',
              concepts: ['Analog-to-Digital Conversion', 'SPI Protocol', 'MCP3008 class', 'source/values pipeline'],
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
          id: 'p8-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: {
              warnings: [
                'You MUST enable SPI on your Raspberry Pi first: sudo raspi-config → Interface Options → SPI.',
                'Keep all MCP3008 signals at 3.3V. Do not feed 5V into any MCP3008 pin.'
              ],
              steps: [
                'Place the MCP3008 chip in the center of your breadboard straddling the gap.',
                'MCP3008 VDD (pin 16) → 3.3V rail. MCP3008 AGND (pin 14) and DGND (pin 9) → GND rail.',
                'MCP3008 VREF (pin 15) → 3.3V rail (same as VDD).',
                'MCP3008 CLK (pin 13) → Raspberry Pi Physical Pin 23 (GPIO 11 / SCLK).',
                'MCP3008 DOUT/MISO (pin 12) → Raspberry Pi Physical Pin 21 (GPIO 9 / MISO).',
                'MCP3008 DIN/MOSI (pin 11) → Raspberry Pi Physical Pin 19 (GPIO 10 / MOSI).',
                'MCP3008 CS/SHDN (pin 10) → Raspberry Pi Physical Pin 24 (GPIO 8 / CE0).',
                'Rotation sensor: connect one outer leg to GND, the other outer leg to 3.3V, and the middle wiper pin to MCP3008 CH0 (pin 1).',
                'Keep your RGB LED connected exactly as in Level 1 (Red to GPIO 17, GND to ground rail).'
              ],
              explanation: 'The rotation sensor is a potentiometer — a variable voltage divider. Turning the knob sweeps the wiper between 0V and 3.3V. The MCP3008 reads this voltage over SPI and sends a digital number (0.0–1.0) to the Pi, which we pipe directly into the PWMLED brightness.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p8-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 8: Twist to Control - Rotation sensor → LED brightness via MCP3008 ADC

🔒 SECURITY HARDENING:
- Enable SPI only when needed: sudo raspi-config -> Interface Options -> SPI
- The MCP3008 operates at 3.3V max; never exceed VDD on any input channel
- Input values from an ADC are untrusted hardware data - always clamp before use

📚 EDUCATIONAL MOMENT:
The Raspberry Pi has NO analog input pins!
The MCP3008 is an 8-channel ADC that converts voltages (0V-3.3V) into
digital numbers and sends them to the Pi over SPI.
gpiozero normalises the result to 0.0-1.0 for you automatically.
"""

from gpiozero import MCP3008, PWMLED
from signal import pause

# ============================================
# HARDWARE ABSTRACTION
# MCP3008 reads the rotation sensor voltage (0V-3.3V)
# and converts it to a float (0.0-1.0) over SPI
# ============================================

knob = MCP3008(channel=0)      # Rotation sensor wiper on CH0 (MCP3008 pin 1)
brightness_led = PWMLED(17)    # PWM red LED from Level 3

# ============================================
# HIGH-LEVEL LOGIC
# source/values pipeline: no loop, no polling!
# ============================================

print("🎛️  Turn the knob to control LED brightness!")
print("   Full left  = OFF   (0.0V → 0.0)")
print("   Full right = FULL  (3.3V → 1.0)")
print("   Press Ctrl+C to exit.\\n")

# ONE LINE of gpiozero magic:
# knob.values is a generator streaming 0.0-1.0 readings
# brightness_led.source consumes them in a background thread
brightness_led.source = knob.values

try:
    pause()
except KeyboardInterrupt:
    brightness_led.off()
    print("\\n👋 Exiting...")`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p8-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'Why We Need an ADC', explanation: 'GPIO pins can only read digital HIGH (3.3V) or LOW (0V). The MCP3008 samples an analog voltage and returns a precise number from 0.0 to 1.0 — this is Analog-to-Digital Conversion.' },
              { section: 'MCP3008(channel=0)', explanation: 'Creates a reader on CH0 of the chip. The MCP3008 has 8 channels (CH0–CH7), so you could read up to 8 different sensors simultaneously.' },
              { section: 'source/values Pipeline', explanation: '`brightness_led.source = knob.values` wires the two devices together in one line. gpiozero reads the knob in a background thread and instantly applies each value to the LED brightness.' },
              { section: 'No Loop Required', explanation: 'Unlike a `while True` polling loop, the source/values pipeline is non-blocking and CPU-efficient. The main thread just calls `pause()` and waits.' },
              { section: 'SPI Under the Hood', explanation: 'Every time gpiozero samples `knob.values`, it sends a command over SPI (4 wires: MOSI, MISO, SCLK, CS) and receives back a 10-bit number (0–1023) that gets normalised to 0.0–1.0.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p8-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The potentiometer is a voltage divider. Its three legs form a resistive track (outer two) with a sliding wiper (middle). Turning the knob moves the wiper, outputting a proportional voltage between 0V and 3.3V. The MCP3008 samples this with a 10-bit resolution (1024 steps).',
              software: 'gpiozero\'s source/values API creates a reactive data pipeline. `knob.values` is a Python generator that yields an endless stream of readings. `brightness_led.source` consumes that stream in a background daemon thread, updating PWM duty cycle on every sample.',
              connection: 'SPI is synchronous master/slave communication. The Pi (master) toggles the SCLK clock line. On each tick, one bit travels from Pi→MCP3008 on MOSI (the command) and one bit returns on MISO (the result). After 24 clock ticks, the full 10-bit conversion is complete.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p8-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Replace `brightness_led.source = knob.values` with a `while True` loop that prints `print(f"Raw knob: {knob.value:.4f}")` to watch the live ADC values stream past.',
              logic: 'Read a second potentiometer on CH1 and use it to control a different LED color. Use `MCP3008(channel=1)` for the second channel.',
              creative: 'Map the knob position to a color hue by driving all three RGB LED channels: full left = pure red, center = pure green, full right = pure blue!'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p8-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'ImportError: No module named spidev', solution: 'Run `pip3 install spidev` in the terminal. gpiozero\'s MCP3008 class requires the spidev backend.' },
              { issue: 'knob.value is always 0.0 or 1.0, never in between', solution: 'The potentiometer outer pins may be swapped. Try reversing which outer leg connects to 3.3V and which to GND.' },
              { issue: 'LED never changes brightness', solution: 'First verify SPI is enabled in raspi-config. Then double-check all four SPI wires: MOSI→GPIO10, MISO→GPIO9, SCLK→GPIO11, CS→GPIO8.' },
              { issue: 'Values are noisy or jumping', solution: 'Add a small 100nF capacitor between the MCP3008 VREF pin and GND to filter power supply noise. Make sure all GND connections share a common rail.' }
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
    id: 'p9',
    level: 9,
    levelName: 'Distance Sensing',
    title: 'Sonar Proximity Alert',
    skillsLearned: ['DistanceSensor class', 'Time-of-flight math', 'Threshold logic', 'Live terminal output'],
    badgeEarned: 'Sonar Scout',
    content: {
      overview: {
        description: 'We will use an HC-SR04 ultrasonic sensor to measure distance, then combine it with the RGB LED from Level 1 to create a color-coded proximity alert — green for safe, yellow for close, red for danger.',
        concepts: ['DistanceSensor class', 'Time-of-flight', 'Voltage dividers (5V→3.3V)', 'Threshold-based logic'],
        difficulty: 4,
        estimatedTime: '35 mins'
      },
      pages: [
        {
          id: 'p9-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'We will use an HC-SR04 ultrasonic sensor to measure distance, then combine it with the RGB LED from Level 1 to create a color-coded proximity alert — green for safe, yellow for close, red for danger.',
              concepts: ['DistanceSensor class', 'Time-of-flight', 'Voltage dividers (5V→3.3V)', 'Threshold-based logic'],
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
          id: 'p9-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: {
              warnings: [
                'CRITICAL: The HC-SR04 ECHO pin outputs 5V, but Raspberry Pi GPIO pins only tolerate 3.3V. You MUST use a voltage divider on the ECHO wire or you risk permanently damaging your Pi.',
                'The TRIG pin is safe to connect directly — it only receives a 3.3V input signal from the Pi.',
                'VCC on the HC-SR04 requires 5V power to operate correctly.'
              ],
              steps: [
                'Connect HC-SR04 VCC to Raspberry Pi Physical Pin 2 (5V).',
                'Connect HC-SR04 GND to the ground rail on the breadboard.',
                'Connect HC-SR04 TRIG directly to Raspberry Pi Physical Pin 18 (GPIO 24).',
                'Build the ECHO voltage divider: HC-SR04 ECHO → 1kΩ resistor → junction node → 2kΩ resistor → GND rail.',
                'Connect the junction node (between the two resistors) to Raspberry Pi Physical Pin 22 (GPIO 25).',
                'Keep the RGB LED module connected as in Level 1: Red pin → GPIO 17, Green → GPIO 27, Blue → GPIO 5, GND → ground rail.'
              ],
              explanation: 'The voltage divider reduces the 5V ECHO signal to a safe 3.3V before it reaches the Pi. Using Ohm\'s law: 5V × (2kΩ ÷ (1kΩ + 2kΩ)) = 3.33V — just safe enough. The sensor fires a 40kHz ultrasonic burst from TRIG and measures how long ECHO stays HIGH to calculate distance.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p9-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 9: Sonar Proximity Alert - HC-SR04 distance sensing with RGB feedback

🔒 SECURITY HARDENING:
- ECHO outputs 5V — ALWAYS use a voltage divider (1kΩ + 2kΩ) on the ECHO wire!
- Validate readings: HC-SR04 range is 2cm–400cm; reject values outside this window
- Cap polling rate to ~10Hz; faster polling can cause sonar interference

📚 EDUCATIONAL MOMENT:
The HC-SR04 fires an ultrasonic burst (40,000Hz — above human hearing range)
and measures the time until the echo returns.
Distance = (Speed of Sound × Echo Time) ÷ 2
gpiozero's DistanceSensor calculates all of this for you internally!
"""

from gpiozero import DistanceSensor, LED
from time import sleep

# ============================================
# HARDWARE ABSTRACTION
# DistanceSensor handles the TRIG pulse and ECHO timing
# ============================================

sonar = DistanceSensor(echo=25, trigger=24, max_distance=3)

# Reuse the RGB LED from Level 1
red_led   = LED(17)
green_led = LED(27)
blue_led  = LED(5)

# ============================================
# HELPER: Set RGB color
# ============================================

def set_color(r, g, b):
    red_led.value   = r
    green_led.value = g
    blue_led.value  = b

# ============================================
# HIGH-LEVEL LOGIC
# Threshold-based color coding
# ============================================

print("📡 Sonar Proximity Alert — Move your hand towards the sensor!")
print("   🟢 Far     (> 50 cm)")
print("   🟡 Close   (20 cm – 50 cm)")
print("   🔴 Danger  (< 20 cm)")
print("   Press Ctrl+C to exit.\\n")

try:
    while True:
        distance_m  = sonar.distance          # Returns metres (0.0 = 0cm, 1.0 = max_distance)
        distance_cm = distance_m * 100        # Convert to centimetres

        # Overwrite the same terminal line for a live readout
        print(f"  Distance: {distance_cm:6.1f} cm", end="\\r")

        # Colour decisions based on proximity thresholds
        if distance_cm > 50:
            set_color(0, 1, 0)    # 🟢 Green — safe
        elif distance_cm > 20:
            set_color(1, 1, 0)    # 🟡 Yellow — getting close
        else:
            set_color(1, 0, 0)    # 🔴 Red — very close!

        sleep(0.1)                # 10 readings per second (safe polling rate)

except KeyboardInterrupt:
    set_color(0, 0, 0)
    print("\\n\\n👋 Sonar offline.")`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p9-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'DistanceSensor(echo, trigger)', explanation: '`DistanceSensor(echo=25, trigger=24)` tells gpiozero which GPIO pins control the sensor. gpiozero automatically fires the 10µs TRIG pulse and times the ECHO response — no manual timing code needed.' },
              { section: 'max_distance=3', explanation: 'This sets the scale for `.distance`. With `max_distance=3`, a reading of 1.0 = 3 metres. We multiply by 100 to get centimetres for human-readable output.' },
              { section: 'The Physics', explanation: 'Sound travels at ~343 m/s. If the echo returns after 5.8ms, the sound covered 2 metres total (out and back), so the object is 1 metre away. DistanceSensor does this calculation automatically.' },
              { section: 'Threshold Logic', explanation: 'Three `if/elif/else` blocks decide the LED color based on distance. This is the simplest form of a rule-based system — the same pattern used in industrial proximity switches.' },
              { section: 'end="\\r" Trick', explanation: '`print(..., end="\\r")` moves the cursor back to the start of the line without printing a new one. This creates a live, updating readout without scrolling the terminal.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p9-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The HC-SR04 contains a 40kHz ultrasonic transmitter, a receiver, and a timing chip. The TRIG pulse starts a burst of 8 ultrasonic pulses. The ECHO pin goes HIGH immediately and stays HIGH until a reflection is received. The Pi measures this HIGH duration to calculate distance. Soft surfaces (cushions, fabric) absorb sound and give shorter or no readings.',
              software: 'gpiozero uses hardware GPIO interrupts — not polling — to time the ECHO pulse. This gives microsecond accuracy without wasting CPU time. The `.distance` property runs the full calculation (echo_time × 343/2) every time it is accessed.',
              connection: 'Voltage dividers are critical protection. Ohm\'s law: V_out = V_in × R2/(R1+R2). With R1=1kΩ and R2=2kΩ: V_out = 5V × 2/(1+2) = 3.33V. This is just inside the safe 3.3V GPIO threshold. Skipping this divider can permanently damage your Pi!'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p9-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Adjust the 50cm and 20cm thresholds to match your project space. Try placing the sensor in a doorway and changing the thresholds based on typical hallway widths.',
              logic: 'Add a buzzer (from Level 4) that beeps faster the closer an object gets — like a car parking sensor! Use `sleep(distance_cm / 500)` as the delay between beeps.',
              creative: 'Combine with the LCD from Level 6 to show the numerical distance on the screen while the LED displays the color zone. A real-life "digital ruler"!'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p9-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'distance always reads 0 or max_distance', solution: 'Check that TRIG is on GPIO 24 and ECHO is on GPIO 25. Verify the voltage divider is wired correctly — measure the junction with a multimeter (should read ~2.5–3.3V when ECHO fires).' },
              { issue: 'Readings are very erratic or jump wildly', solution: 'Mount the sensor securely — even slight wobble causes noise. Avoid pointing it at angled or soft surfaces. Add `max_distance=3` to discard out-of-range noise.' },
              { issue: 'RuntimeError about GPIO already in use', solution: 'A previous script did not clean up. Run `sudo killall python3` and try again, or reboot the Pi. gpiozero cleans up automatically on normal exit.' },
              { issue: 'Pi reboots or freezes when sensor is connected', solution: 'You almost certainly connected ECHO directly to GPIO without the voltage divider. This forces 5V into the 3.3V GPIO. Disconnect power, build the voltage divider, then reconnect.' }
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
    id: 'p10',
    level: 10,
    levelName: 'Full System Capstone',
    title: 'The Smart Guardian',
    skillsLearned: ['DS18B20 1-Wire sensor', 'OutputDevice for relay', '1-Wire filesystem reads', 'Fail-safe design', 'System orchestration'],
    badgeEarned: 'Systems Architect',
    content: {
      overview: {
        description: 'The ultimate capstone! We will wire a DS18B20 digital thermometer and a relay module, then combine them with the LCD, LED, and buzzer from previous levels to build a Smart Guardian — a temperature monitor that activates a real relay-controlled device when things get too hot.',
        concepts: ['DS18B20 1-Wire protocol', 'Relay as OutputDevice', 'Filesystem-based sensor reads', 'Hysteresis & fail-safe design', 'Full system integration'],
        difficulty: 5,
        estimatedTime: '50 mins'
      },
      pages: [
        {
          id: 'p10-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'The ultimate capstone! We will wire a DS18B20 digital thermometer and a relay module, then combine them with the LCD, LED, and buzzer from previous levels to build a Smart Guardian — a temperature monitor that activates a real relay-controlled device when things get too hot.',
              concepts: ['DS18B20 1-Wire protocol', 'Relay as OutputDevice', 'Filesystem-based sensor reads', 'Hysteresis & fail-safe design', 'Full system integration'],
              difficulty: 5,
              estimatedTime: '50 mins'
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
          id: 'p10-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: {
              warnings: [
                'RELAY SAFETY: The relay switches MAINS VOLTAGE (120V/240V AC). NEVER touch the relay screw terminals while anything is plugged into the controlled outlet. When in doubt, only connect low-voltage DC loads (5V fans, LED strips) during testing.',
                'You MUST enable 1-Wire on your Pi before the DS18B20 will be detected: sudo raspi-config → Interface Options → 1-Wire.',
                'The DS18B20 REQUIRES a 4.7kΩ pull-up resistor between its DATA pin and 3.3V. Without it, readings will fail or return garbage.'
              ],
              steps: [
                'DS18B20 sensor: flat face forward — left leg is GND, middle leg is DATA, right leg is VCC.',
                'Connect DS18B20 VCC (right leg) → 3.3V rail.',
                'Connect DS18B20 GND (left leg) → GND rail.',
                'Connect DS18B20 DATA (middle leg) → Raspberry Pi Physical Pin 7 (GPIO 4).',
                'Connect a 4.7kΩ resistor between the DS18B20 DATA wire and the 3.3V rail (this is the required 1-Wire pull-up).',
                'Relay module: Connect VCC → Raspberry Pi Physical Pin 4 (5V), GND → GND rail, IN → Raspberry Pi Physical Pin 37 (GPIO 26).',
                'Retain the LCD connection from Level 6: SDA → Physical Pin 3, SCL → Physical Pin 5, VCC → 5V, GND → GND.',
                'Retain the RGB LED from Level 1: Red → GPIO 17, Green → GPIO 27, Blue → GPIO 5, GND → GND.',
                'Retain the passive buzzer from Level 4: positive leg → GPIO 18, negative → GND.'
              ],
              explanation: 'The DS18B20 uses the 1-Wire protocol — a single data line carries both power signaling and data. Linux automatically detects it and creates a virtual text file you read like any other file. The relay coil is energized by GPIO 26 (5V logic from the module) and mechanically snaps a heavy-duty contact closed, switching whatever load you connect to the NO (Normally Open) screw terminal.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p10-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 10: The Smart Guardian — Temperature monitor with relay control

🔒 SECURITY HARDENING:
- Relay controls MAINS VOLTAGE. Use Normally-Open (NO) contacts for fail-safe operation.
  If the Pi loses power, the relay opens and the load turns OFF automatically.
- Validate ALL temperature reads: DS18B20 range is -55°C to +125°C. Reject anything outside.
- The CRC check in the sensor file (the 'YES' line) MUST pass before trusting any reading.
- Log all relay state changes with timestamps for traceability.

📚 EDUCATIONAL MOMENT:
The DS18B20 stores temperature as a 16-bit integer in its internal ROM.
Linux's 1-Wire driver (w1_therm) reads it and writes the result to a
virtual text file in /sys/bus/w1/devices/ — we just open and read it!
This is hardware abstraction at the operating-system level.
"""

import glob
import time
from datetime import datetime
from gpiozero import LED, TonalBuzzer, OutputDevice
from gpiozero.tones import Tone
from RPLCD.i2c import CharLCD

# ============================================
# HARDWARE ABSTRACTION
# ============================================

# Relay uses OutputDevice (not LED — semantically correct)
# active_high=True: GPIO HIGH turns relay ON
# initial_value=False: relay starts OFF (fail-safe)
relay = OutputDevice(26, active_high=True, initial_value=False)

red_led      = LED(17)
green_led    = LED(27)
alarm_buzzer = TonalBuzzer(18)
lcd          = CharLCD(i2c_expander='PCF8574', address=0x27, port=1, cols=16, rows=2)

# ============================================
# CONFIGURATION
# ============================================

TEMP_ON_THRESHOLD_C  = 30.0   # °C — relay activates ABOVE this
TEMP_OFF_THRESHOLD_C = 27.0   # °C — relay deactivates BELOW this (hysteresis gap)
W1_DEVICES_PATH      = '/sys/bus/w1/devices/'

# ============================================
# 1-WIRE SENSOR FUNCTIONS
# ============================================

def find_sensor():
    """Locate the DS18B20 device file created by the Linux 1-Wire driver."""
    devices = glob.glob(W1_DEVICES_PATH + '28-*/w1_slave')
    if not devices:
        raise RuntimeError(
            "DS18B20 not found! Check:\\n"
            "  1. Enable 1-Wire: sudo raspi-config -> Interface Options -> 1-Wire\\n"
            "  2. Confirm 4.7kΩ pull-up resistor between DATA and 3.3V\\n"
            "  3. Confirm DATA pin is on GPIO 4 (Physical Pin 7)"
        )
    return devices[0]

def read_temperature(device_file):
    """
    Read and validate temperature from the sensor file.
    Returns float (°C) or None if the reading is invalid.
    """
    try:
        with open(device_file, 'r') as f:
            lines = f.readlines()

        # Line 1 must end with 'YES' — this is the CRC validity check
        if not lines[0].strip().endswith('YES'):
            return None  # Corrupt read — discard

        # Parse temperature from 't=XXXXX' in line 2
        raw_temp_str = lines[1].split('t=')[1].strip()
        temp_c = int(raw_temp_str) / 1000.0

        # Validate physical range of DS18B20 (-55°C to +125°C)
        if -55.0 <= temp_c <= 125.0:
            return temp_c

    except (IOError, IndexError, ValueError):
        pass

    return None  # Catch-all for any file/parse errors

# ============================================
# HELPERS
# ============================================

def set_color(r, g, b):
    red_led.value   = r
    green_led.value = g

def log_event(message):
    """Append a timestamped log entry to guardian.log."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open('guardian.log', 'a') as f:
        f.write(f"[{timestamp}] {message}\\n")

def update_lcd(line1, line2):
    lcd.clear()
    lcd.write_string(line1[:16])
    lcd.cursor_pos = (1, 0)
    lcd.write_string(line2[:16])

# ============================================
# MAIN GUARDIAN LOOP
# ============================================

print("🌡️  Smart Guardian Starting...")
device = find_sensor()
print(f"   Sensor found: {device}")
print(f"   Relay ON  above: {TEMP_ON_THRESHOLD_C}°C")
print(f"   Relay OFF below: {TEMP_OFF_THRESHOLD_C}°C")
print(f"   Press Ctrl+C to exit.\\n")

relay_active = False  # Track relay state for hysteresis logic

try:
    while True:
        temp_c = read_temperature(device)

        if temp_c is None:
            print("⚠️  Invalid reading — retrying...", end="\\r")
            time.sleep(1)
            continue

        temp_f = (temp_c * 9 / 5) + 32  # Fahrenheit for display
        print(f"  🌡️  {temp_c:.1f}°C / {temp_f:.1f}°F  Relay: {'ON ' if relay_active else 'OFF'}", end="\\r")

        # --- HYSTERESIS LOGIC ---
        # Turn ON only above the high threshold
        if not relay_active and temp_c > TEMP_ON_THRESHOLD_C:
            relay.on()
            relay_active = True
            green_led.off()
            red_led.on()
            alarm_buzzer.play(Tone("A5"))
            time.sleep(0.3)
            alarm_buzzer.stop()
            update_lcd(f"TEMP: {temp_c:.1f}C", "! RELAY ON  !")
            log_event(f"RELAY ON  — temp={temp_c:.2f}C")
            print(f"\\n🔴 RELAY ON  — {temp_c:.1f}°C exceeds threshold!")

        # Turn OFF only below the low threshold (prevents rapid cycling)
        elif relay_active and temp_c < TEMP_OFF_THRESHOLD_C:
            relay.off()
            relay_active = False
            red_led.off()
            green_led.on()
            update_lcd(f"TEMP: {temp_c:.1f}C", f"OK  <{TEMP_ON_THRESHOLD_C:.0f}C")
            log_event(f"RELAY OFF — temp={temp_c:.2f}C")
            print(f"\\n🟢 RELAY OFF — {temp_c:.1f}°C back to normal.")

        else:
            # Steady state — refresh display without relay change
            status = "HOT! ON " if relay_active else f"OK <{TEMP_ON_THRESHOLD_C:.0f}C"
            update_lcd(f"TEMP: {temp_c:.1f}C", status)

        time.sleep(1)   # DS18B20 needs ~750ms per conversion

except KeyboardInterrupt:
    relay.off()        # ALWAYS turn relay off on exit
    red_led.off()
    green_led.off()
    alarm_buzzer.stop()
    update_lcd("Guardian", "Offline")
    time.sleep(1)
    lcd.clear()
    print("\\n\\n👋 Guardian shut down safely. Relay is OFF.")`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p10-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'OutputDevice for the Relay', explanation: '`OutputDevice(26, active_high=True, initial_value=False)` is the right class for a relay — it is an output device but semantically not an LED. `initial_value=False` ensures the relay starts OFF even before the code runs any logic.' },
              { section: 'find_sensor() — 1-Wire Discovery', explanation: 'Linux\'s 1-Wire driver automatically creates a file like `/sys/bus/w1/devices/28-xxxx/w1_slave` when it detects a DS18B20. We use `glob.glob()` with the `28-*` wildcard to find it — no hardcoded device IDs needed.' },
              { section: 'CRC Validity Check', explanation: 'Each DS18B20 reading includes a CRC (error check). Linux\'s driver writes "YES" on the first line if it passed, "NO" if not. We ALWAYS check for "YES" before trusting the temperature data.' },
              { section: 'Hysteresis Logic', explanation: 'Without hysteresis, a relay near the threshold would switch on and off dozens of times per minute, wearing out the contacts. Our two-threshold design (ON at 30°C, OFF at 27°C) creates a 3°C "dead zone" that prevents rapid cycling — the same technique used in real thermostats.' },
              { section: 'log_event() — Audit Trail', explanation: 'Every relay state change is logged to `guardian.log` with a timestamp. This is a minimal but real security practice: if something went wrong at 3am, you can check what the temperature was.' },
              { section: 'Fail-Safe Shutdown', explanation: 'The `except KeyboardInterrupt` block calls `relay.off()` unconditionally. Leaving a relay ON after code exits is a fire hazard. Always shut hardware down explicitly.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p10-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The DS18B20 stores temperature as a 16-bit two\'s complement integer inside its scratchpad memory. Each bit represents 1/16 of a degree Celsius. An internal ADC converts the thermistor reading, then the 1-Wire bus clock shifts the bits out one at a time on a single wire. The 4.7kΩ pull-up resistor provides the resting voltage that powers the bus. The relay is an electromechanical amplifier: a small 5V coil current (GPIO-safe) creates a magnetic field that flips a mechanical lever, connecting or disconnecting mains-voltage terminals that can handle 10A+.',
              software: 'The Linux `w1_therm` kernel module handles all 1-Wire timing (microsecond-precision reset pulses, presence pulses, and bit reads) entirely in the kernel. Python just opens a text file. This is the power of OS-level hardware abstraction — complex hardware protocols become trivial file reads. The hysteresis pattern (`relay_active` boolean + two thresholds) is a classic control systems technique found in industrial PLCs and consumer thermostats.',
              connection: 'Hardware connects to OS: the 1-Wire kernel driver creates `/sys/bus/w1/`. OS connects to Python: we `open()` a file. Python connects to hardware: `relay.on()` sets GPIO 26 HIGH, energizing the relay coil. The relay connects to load: NO contacts close, completing the external circuit. This is a full stack from sensor physics to physical switching — every layer is visible in this project.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p10-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Set `TEMP_ON_THRESHOLD_C` to your current room temperature plus 2°C. Then gently pinch the DS18B20 sensor between your fingers to warm it up and trigger the relay!',
              logic: 'Increase the hysteresis gap from 3°C to 5°C (e.g., ON at 32°C, OFF at 27°C) and observe how it affects relay cycling frequency. Smaller gaps = more switching = more wear.',
              creative: 'Add the button from Level 2 as a manual override: press it to force the relay ON or OFF regardless of temperature. Log "MANUAL OVERRIDE" events separately in the log file.'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p10-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'RuntimeError: DS18B20 not found', solution: 'Enable 1-Wire via `sudo raspi-config` → Interface Options → 1-Wire, then reboot. Confirm the 4.7kΩ pull-up resistor is between DS18B20 DATA and 3.3V, and DATA is on GPIO 4 (Physical Pin 7).' },
              { issue: 'Temperature always reads exactly 85.0°C', solution: '85°C is the DS18B20\'s power-on default value. It means the sensor is electrically detected but the conversion is failing. Check the pull-up resistor and try a lower resistance (4.7kΩ is standard, but 3.3kΩ can help on noisy breadboards).' },
              { issue: 'Relay clicking rapidly (chattering)', solution: 'Your two thresholds are too close together or equal. Ensure TEMP_OFF_THRESHOLD_C is at least 2–3°C lower than TEMP_ON_THRESHOLD_C to create a proper hysteresis gap.' },
              { issue: 'Relay clicks but connected device does nothing', solution: 'Confirm you are using the NO (Normally Open) screw terminal, not NC. With the relay coil unenergized, NO is open (off). Also check your load device and cable are fully connected.' },
              { issue: 'LCD shows garbled text after relay activates', solution: 'The relay coil switching can cause voltage spikes on the 5V rail. Add a 100µF capacitor between the relay VCC and GND pins to filter the spike, and ensure all grounds share a solid common connection.' }
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
