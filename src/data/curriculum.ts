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
    title: 'Tilt & Shake Detector',
    skillsLearned: ['I2C protocol', 'ADXL345 accelerometer', 'Adafruit CircuitPython library', '3-axis data interpretation'],
    badgeEarned: 'Motion Intelligence',
    content: {
      overview: {
        description: 'We will wire an ADXL345 3-axis accelerometer over I2C and read live tilt and shake data. This introduces complex modules that require external libraries and a communication protocol — the same skills used in real robotics and IoT projects.',
        concepts: ['I2C Protocol', 'External Libraries (Adafruit)', 'Accelerometer Axes', 'Shake Detection'],
        difficulty: 4,
        estimatedTime: '35 mins'
      },
      pages: [
        {
          id: 'p6-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'We will wire an ADXL345 3-axis accelerometer over I2C and read live tilt and shake data. This introduces complex modules that require external libraries and a communication protocol — the same skills used in real robotics and IoT projects.',
              concepts: ['I2C Protocol', 'External Libraries (Adafruit)', 'Accelerometer Axes', 'Shake Detection'],
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
                'You MUST enable I2C on your Raspberry Pi first: `sudo raspi-config` → Interface Options → I2C → Enable.',
                'The ADXL345 runs on 3.3V — do NOT connect VCC to 5V or you will damage the chip.',
                'Install the Adafruit library before running the code: `pip3 install adafruit-circuitpython-adxl34x`'
              ],
              steps: [
                'Connect ADXL345 GND → Raspberry Pi GND rail.',
                'Connect ADXL345 VCC → Raspberry Pi Physical Pin 1 (3.3V) — NOT 5V!',
                'Connect ADXL345 SDA → Raspberry Pi Physical Pin 3 (GPIO 2 / SDA1).',
                'Connect ADXL345 SCL → Raspberry Pi Physical Pin 5 (GPIO 3 / SCL1).',
                'Leave the ADXL345 CS pin unconnected (or tie HIGH to 3.3V) — this selects I2C mode.',
                'Optionally connect the LED from Level 1: long leg (anode) → GPIO 17 through a 330Ω resistor → GND.'
              ],
              explanation: "I2C uses just two wires (SDA for data and SCL for clock) to talk to many different sensors. The Pi is the I2C \"Master\" — it drives the clock and addresses each device by a unique 7-bit number. The ADXL345's default I2C address is 0x53. Inside the chip, a tiny suspended mass shifts position under acceleration; bridge circuits measure that shift and produce a voltage that the chip's internal ADC converts to a digital reading."
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
            code: `#!/usr/bin/env python3
"""
Level 6: Tilt & Shake Detector using the ADXL345 accelerometer over I2C.

Setup:
  pip3 install adafruit-circuitpython-adxl34x
  sudo raspi-config -> Interface Options -> I2C -> Enable

Wiring (3.3V only!):
  VCC -> Physical Pin 1 (3.3V)
  GND -> GND
  SDA -> Physical Pin 3 (GPIO 2)
  SCL -> Physical Pin 5 (GPIO 3)
"""

import time
import board
import busio
import adafruit_adxl34x
from gpiozero import LED

# ── I2C bus and sensor initialisation ────────────────────────────────────────
i2c  = busio.I2C(board.SCL, board.SDA)
accel = adafruit_adxl34x.ADXL345(i2c)           # default address 0x53

# Enable the built-in tap/double-tap and freefall detection engines
accel.enable_motion_detection(threshold=18)      # shake sensitivity (1–255)

# Optional status LED wired to GPIO 17
status_led = LED(17)

# ── Tilt interpretation ───────────────────────────────────────────────────────
def describe_tilt(x, y, z):
    """Return a human-readable tilt direction from raw g-force values."""
    if z > 0.8:
        return "Flat (face up)"
    if z < -0.8:
        return "Upside down"
    if x > 0.5:
        return "Tilted RIGHT"
    if x < -0.5:
        return "Tilted LEFT"
    if y > 0.5:
        return "Tilted FORWARD"
    if y < -0.5:
        return "Tilted BACKWARD"
    return "Edge / diagonal"

print("ADXL345 Tilt & Shake Detector — press Ctrl+C to stop")
print(f"{'X':>8}  {'Y':>8}  {'Z':>8}  {'Tilt'}")
print("-" * 48)

try:
    while True:
        x, y, z = accel.acceleration          # returns (x, y, z) in m/s²
        # Convert from m/s² to g  (1 g ≈ 9.81 m/s²)
        gx, gy, gz = x / 9.81, y / 9.81, z / 9.81

        tilt = describe_tilt(gx, gy, gz)

        # Flash the LED when motion / shake is detected
        if accel.events["motion"]:
            status_led.blink(on_time=0.05, off_time=0.05, n=3, background=True)
            tilt = "*** SHAKE! ***"

        print(f"{gx:>+8.3f}  {gy:>+8.3f}  {gz:>+8.3f}  {tilt}", end="\\r")
        time.sleep(0.1)

except KeyboardInterrupt:
    status_led.off()
    print("\\n\\nSensor stopped.")`,
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
              { section: 'busio.I2C — Hardware Abstraction', explanation: '`busio.I2C(board.SCL, board.SDA)` opens the I2C bus using the board\'s named pins. The `board` module maps friendly names like `board.SDA` to the correct GPIO numbers, so the same code works on any Adafruit-supported board.' },
              { section: 'adafruit_adxl34x.ADXL345(i2c)', explanation: 'Passing the `i2c` bus object to the class constructor tells the library where to send its I2C read/write commands. The library handles the low-level register addressing; we just call `.acceleration`.' },
              { section: 'accel.acceleration — the data tuple', explanation: '`accel.acceleration` returns a 3-tuple `(x, y, z)` in metres per second squared (m/s²). We divide by 9.81 to convert to g-force. When the board is flat, z ≈ 1 g (Earth\'s gravity pulling straight down).' },
              { section: 'Motion detection events', explanation: '`accel.enable_motion_detection(threshold=18)` activates the ADXL345\'s internal interrupt engine. Reading `accel.events["motion"]` checks whether the chip flagged a sudden acceleration since the last read — no polling maths needed.' },
              { section: 'describe_tilt() — axis logic', explanation: 'Each axis reads the component of gravity along that direction. When tilted right, gravity pulls along the X axis, so x approaches ±1 g depending on direction. Checking thresholds on each axis lets us classify the dominant tilt.' }
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
              hardware: 'Inside the ADXL345 is a MEMS (Micro-Electro-Mechanical System) structure — a tiny silicon cantilever beam with a proof mass on the end. When the chip accelerates, the proof mass deflects, changing the capacitance between comb-like fingers etched into the silicon. An internal bridge circuit converts that capacitance change into a voltage, and a 13-bit ADC quantises it. All of this happens in a chip smaller than a fingernail.',
              software: 'The Adafruit CircuitPython library uses the standard Linux I2C kernel interface (`/dev/i2c-1`). Each call to `.acceleration` sends an I2C START condition, addresses the chip at 0x53, requests 6 bytes from register 0x32 (DATAX0 through DATAZ1), and reads them back — all hidden behind one Python property.',
              connection: 'I2C is a multi-master, multi-slave bus. The Pi generates clock pulses on SCL; on each rising edge, the ADXL345 samples SDA. Addresses are 7 bits, so up to 128 devices can share the same two wires. This is why I2C is used throughout Level 10 as well — it is the lingua franca of sensor modules.'
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
              tweak: 'Change `threshold=18` to `threshold=5` to make the shake detector hair-trigger, or `threshold=60` to require a really hard knock.',
              logic: 'Add a shake counter: increment a variable each time `accel.events["motion"]` is True and print the total shake count alongside the tilt reading.',
              creative: 'Combine with the button from Level 2: holding the button "arms" a tamper detector — if a shake is detected while armed, turn on the LED and print an alert. Press again to disarm.'
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
              { issue: 'ValueError: No I2C device at address 0x53', solution: 'Check that I2C is enabled (`sudo raspi-config` → Interface Options → I2C). Verify SDA is on Physical Pin 3 and SCL on Physical Pin 5. Run `sudo i2cdetect -y 1` — you should see 0x53 in the grid.' },
              { issue: 'ModuleNotFoundError: No module named adafruit_adxl34x', solution: 'Install the library: `pip3 install adafruit-circuitpython-adxl34x`. If you get a permissions error, add `--user` to the command.' },
              { issue: 'All readings are exactly 0.0, 0.0, 0.0', solution: 'The sensor likely needs the CS pin tied HIGH to select I2C mode. Connect CS to the 3.3V pin. Also confirm VCC is on the 3.3V rail — connecting to 5V can damage or lock up the chip.' },
              { issue: 'Motion detection never triggers', solution: 'Increase sensitivity by lowering the threshold: `accel.enable_motion_detection(threshold=8)`. The chip must see an acceleration change above the threshold within a short time window.' }
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
              creative: 'Wire the Double Color LED to GPIO 16 (Red) and GPIO 20 (Green). Light Red while the alarm is sounding and Green while the system is armed and idle — instant visual state feedback!'
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
              creative: 'Print the live distance value to the terminal with a simple ASCII bar chart: `print("[" + "#" * int(distance_cm / 5) + "]" + f" {distance_cm:.0f} cm")` — a real-time distance ruler in your console!'
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
        description: 'The ultimate capstone! We will wire a DS18B20 digital thermometer and a relay module, then combine them with the Double Color LED, RGB LED, and buzzer from previous levels to build a Smart Guardian — a temperature monitor that activates a real relay-controlled device when things get too hot.',
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
              description: 'The ultimate capstone! We will wire a DS18B20 digital thermometer and a relay module, then combine them with the Double Color LED, RGB LED, and buzzer from previous levels to build a Smart Guardian — a temperature monitor that activates a real relay-controlled device when things get too hot.',
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
                'Double Color LED status indicator: Red pin → GPIO 16 through a 330Ω resistor → GND; Green pin → GPIO 20 through a 330Ω resistor → GND. This gives a live red/green signal: Red = relay ON (hot!), Green = relay OFF (normal).',
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

# ============================================
# HARDWARE ABSTRACTION
# ============================================

# Relay uses OutputDevice (not LED — semantically correct)
# active_high=True: GPIO HIGH turns relay ON
# initial_value=False: relay starts OFF (fail-safe)
relay = OutputDevice(26, active_high=True, initial_value=False)

red_led      = LED(17)       # RGB LED red channel (Level 1)
green_led    = LED(27)       # RGB LED green channel (Level 1)
alarm_buzzer = TonalBuzzer(18)

# Double Color LED: Red = relay ON (hot!), Green = relay OFF (normal)
status_red   = LED(16)
status_green = LED(20)

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

def set_status(relay_on):
    """Drive the Double Color LED: Red when relay is ON, Green when OFF."""
    if relay_on:
        status_red.on()
        status_green.off()
    else:
        status_red.off()
        status_green.on()

def log_event(message):
    """Append a timestamped log entry to guardian.log."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open('guardian.log', 'a') as f:
        f.write(f"[{timestamp}] {message}\\n")

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
            set_status(True)
            alarm_buzzer.play(Tone("A5"))
            time.sleep(0.3)
            alarm_buzzer.stop()
            log_event(f"RELAY ON  — temp={temp_c:.2f}C")
            print(f"\\n🔴 RELAY ON  — {temp_c:.1f}°C exceeds threshold!")

        # Turn OFF only below the low threshold (prevents rapid cycling)
        elif relay_active and temp_c < TEMP_OFF_THRESHOLD_C:
            relay.off()
            relay_active = False
            red_led.off()
            green_led.on()
            set_status(False)
            log_event(f"RELAY OFF — temp={temp_c:.2f}C")
            print(f"\\n🟢 RELAY OFF — {temp_c:.1f}°C back to normal.")

        else:
            # Steady state — no relay change needed
            pass

        time.sleep(1)   # DS18B20 needs ~750ms per conversion

except KeyboardInterrupt:
    relay.off()        # ALWAYS turn relay off on exit
    red_led.off()
    green_led.off()
    status_red.off()
    status_green.off()
    alarm_buzzer.stop()
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
              { issue: 'Relay clicks but connected device does nothing', solution: 'Confirm you are using the NO (Normally Open) screw terminal, not NC. With the relay coil unenergized, NO is open (off). Also check your load device and cable are fully connected.' }
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
    id: 'p11',
    level: 11,
    levelName: 'Optical Security',
    title: 'The Laser Tripwire',
    skillsLearned: ['Laser emitter control', 'Photoresistor analog reads', 'Ambient light calibration', 'Beam-break detection', 'Alarm triggering'],
    badgeEarned: 'Optical Guardian',
    content: {
      overview: {
        description: 'Build a laser tripwire security system! The laser beam shines across a doorway onto a photoresistor. When someone breaks the beam, the light level drops and the alarm triggers. We will also learn ambient light calibration to prevent false alarms from clouds or flickering lights.',
        concepts: ['Beam-Break Logic', 'Light-Dependent Resistors', 'Ambient Calibration', 'Security Bypass Attacks'],
        difficulty: 4,
        estimatedTime: '40 mins'
      },
      pages: [
        {
          id: 'p11-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'Build a laser tripwire security system! The laser beam shines across a doorway onto a photoresistor. When someone breaks the beam, the light level drops and the alarm triggers. We will also learn ambient light calibration to prevent false alarms from clouds or flickering lights.',
              concepts: ['Beam-Break Logic', 'Light-Dependent Resistors', 'Ambient Calibration', 'Security Bypass Attacks'],
              difficulty: 4,
              estimatedTime: '40 mins'
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
          id: 'p11-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: {
              warnings: [
                'LASER SAFETY: Never point the laser at eyes — even brief exposure can cause permanent retinal damage.',
                'The photoresistor module from your kit has a built-in comparator with a digital output (DO) and an analog output (AO). We will use the analog output.',
                'Position the laser and photoresistor on opposite sides of a doorway or box opening for a proper "tripwire" effect.'
              ],
              steps: [
                'Laser Sensor Module: Connect VCC → 5V rail, GND → GND rail, S (signal) → GPIO 23.',
                'Photoresistor Module: Connect VCC → 3.3V rail, GND → GND rail, AO (analog out) → MCP3008 CH0 (we need ADC for analog reads).',
                'MCP3008 ADC: Wire as in previous ADC projects — VDD & VREF → 3.3V, AGND & DGND → GND, CLK → GPIO 11 (SCLK), DOUT → GPIO 9 (MISO), DIN → GPIO 10 (MOSI), CS → GPIO 8 (CE0).',
                'Active Buzzer Module: Connect VCC → 5V rail, GND → GND rail, I/O → GPIO 18.',
                'Position the laser so its beam lands directly on the photoresistor\'s sensor window.',
                'Secure both modules so the beam alignment stays consistent.'
              ],
              explanation: 'The laser emits a focused beam of coherent light. The photoresistor\'s resistance drops dramatically when bright light hits it. By reading the analog voltage through the MCP3008 ADC, we can detect the exact light level. When the beam is blocked, the resistance rises and our reading changes — triggering the alarm.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p11-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 11: The Laser Tripwire — Optical beam-break security

🔒 SECURITY HARDENING:
- Calibrate ambient light BEFORE arming to reduce false positives.
- Use hysteresis (two thresholds) to prevent rapid alarm toggling.
- Log all breach events with timestamps for review.

📚 EDUCATIONAL MOMENT:
A photoresistor (LDR) changes resistance based on light intensity.
Bright light = low resistance = higher voltage reading.
Blocked beam = high resistance = lower voltage reading.
We use the MCP3008 ADC to read this analog voltage as a 10-bit value (0-1023).
"""

import time
from datetime import datetime
from gpiozero import LED, OutputDevice, MCP3008

# ============================================
# HARDWARE ABSTRACTION
# ============================================

laser = OutputDevice(23)         # Laser module — treat as simple on/off output
light_sensor = MCP3008(channel=0)  # Photoresistor via ADC channel 0
buzzer = OutputDevice(18, active_high=True)  # Active buzzer

# ============================================
# CONFIGURATION
# ============================================

CALIBRATION_SAMPLES = 20       # Number of samples to average during calibration
CALIBRATION_DELAY = 0.1        # Delay between calibration samples (seconds)
BEAM_BREAK_THRESHOLD = 0.30    # If reading drops below 30% of calibrated value, beam is broken
HYSTERESIS_MARGIN = 0.10       # 10% margin before resetting alarm

# ============================================
# CALIBRATION
# ============================================

def calibrate_ambient_light():
    """
    Learn the 'normal' light level with the laser beam hitting the sensor.
    Returns the average reading as a baseline.
    """
    print("🔦 Calibrating ambient light level...")
    print("   Ensure the laser beam is hitting the photoresistor.")
    
    laser.on()
    time.sleep(0.5)  # Let laser stabilize
    
    total = 0
    for i in range(CALIBRATION_SAMPLES):
        reading = light_sensor.value  # 0.0 to 1.0
        total += reading
        print(f"   Sample {i+1}/{CALIBRATION_SAMPLES}: {reading:.3f}", end="\\r")
        time.sleep(CALIBRATION_DELAY)
    
    baseline = total / CALIBRATION_SAMPLES
    print(f"\\n✅ Calibration complete. Baseline: {baseline:.3f}")
    return baseline

# ============================================
# ALARM FUNCTIONS
# ============================================

def trigger_alarm():
    """Sound the alarm buzzer."""
    buzzer.on()

def silence_alarm():
    """Turn off the alarm buzzer."""
    buzzer.off()

def log_breach(light_level, baseline):
    """Log a breach event with timestamp."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open('tripwire.log', 'a') as f:
        f.write(f"[{timestamp}] BREACH DETECTED — Light: {light_level:.3f}, Baseline: {baseline:.3f}\\n")

# ============================================
# MAIN TRIPWIRE LOOP
# ============================================

print("🔴 Laser Tripwire Security System")
print("=" * 40)

baseline = calibrate_ambient_light()
breach_threshold = baseline * BEAM_BREAK_THRESHOLD
reset_threshold = baseline * (BEAM_BREAK_THRESHOLD + HYSTERESIS_MARGIN)

print(f"   Breach triggers below: {breach_threshold:.3f}")
print(f"   Alarm resets above:    {reset_threshold:.3f}")
print("\\n🛡️  SYSTEM ARMED — Press Ctrl+C to disarm.\\n")

alarm_active = False

try:
    while True:
        light_level = light_sensor.value
        
        if not alarm_active and light_level < breach_threshold:
            # BEAM BROKEN!
            alarm_active = True
            trigger_alarm()
            log_breach(light_level, baseline)
            print(f"🚨 BREACH! Light dropped to {light_level:.3f} — ALARM ACTIVE")
        
        elif alarm_active and light_level > reset_threshold:
            # Beam restored
            alarm_active = False
            silence_alarm()
            print(f"✅ Beam restored ({light_level:.3f}) — Alarm reset")
        
        else:
            status = "🔴 ALARM" if alarm_active else "🟢 Armed"
            print(f"   {status} | Light: {light_level:.3f}", end="\\r")
        
        time.sleep(0.05)  # 50ms polling = responsive detection

except KeyboardInterrupt:
    laser.off()
    silence_alarm()
    print("\\n\\n🔓 System disarmed. Laser off.")`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p11-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'calibrate_ambient_light()', explanation: 'Before arming, we take multiple readings with the laser on and average them. This "learns" what normal looks like — bright laser hitting the sensor. If the room gets darker (cloud passes by), the baseline would be different. Calibrating on startup prevents false alarms.' },
              { section: 'MCP3008 for Analog Reads', explanation: 'The Raspberry Pi has no built-in ADC. The MCP3008 chip converts the photoresistor\'s analog voltage to a digital value (0-1023, normalized to 0.0-1.0 by gpiozero). Without this, we could only detect "dark" vs "bright" — not the subtle changes that distinguish a blocked beam from a shadow.' },
              { section: 'BEAM_BREAK_THRESHOLD', explanation: 'If the light level drops below 30% of the calibrated baseline, we consider the beam broken. This percentage accounts for the dramatic difference between "laser hitting sensor" and "laser blocked by a person\'s body."' },
              { section: 'Hysteresis (HYSTERESIS_MARGIN)', explanation: 'The alarm triggers at 30% but doesn\'t reset until 40%. This 10% gap prevents the alarm from rapidly toggling on/off if someone\'s arm is partially in the beam or the light is flickering at the boundary.' },
              { section: '50ms Polling Loop', explanation: 'A person walking through a doorway crosses the beam in about 100-300ms. Polling every 50ms ensures we never miss a breach — we\'ll catch at least 2-6 samples of the broken beam.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p11-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The laser module emits coherent monochromatic light at 650nm (red). Unlike an LED that spreads light in a cone, a laser produces a tight parallel beam that stays focused over distance. The photoresistor (LDR) is made of cadmium sulfide — photons hitting the material knock electrons loose, reducing resistance. More light = more free electrons = lower resistance. Combined with a fixed resistor in a voltage divider, this creates a variable voltage that the ADC can read.',
              software: 'Calibration is a form of machine learning at its simplest: the system "learns" what normal looks like before making decisions. The threshold-based detection is a binary classifier — readings below threshold = "intruder," above = "normal." Hysteresis is a common pattern in control systems to prevent oscillation at decision boundaries.',
              connection: 'Physical security meets software logic: the laser creates a physical "fence" of light, the photoresistor detects its presence, the ADC digitizes the analog signal, Python runs the classification logic, and the buzzer creates an audible alert. Each layer transforms the signal — photons → resistance → voltage → digital value → boolean decision → sound waves.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p11-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Adjust BEAM_BREAK_THRESHOLD from 0.30 to 0.50 and see how it affects sensitivity. A higher threshold triggers on smaller light changes (more sensitive but more false alarms).',
              logic: 'Add a "grace period" — if the beam is broken for less than 100ms, ignore it (might be a bug flying through). Only trigger alarm if the beam stays broken for 3+ consecutive readings.',
              creative: 'Discuss bypass attacks with your child: what if a thief brought their own laser and pointed it at the sensor while walking through? How could you detect this? (Hint: pulse your laser on/off in a secret pattern and only accept readings that match the pattern.)'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p11-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'Light sensor always reads 0.0 or 1.0', solution: 'Check MCP3008 wiring — especially VREF (must be 3.3V), CLK, DOUT, DIN, and CS pins. Ensure the photoresistor module AO pin is connected to CH0.' },
              { issue: 'Alarm triggers immediately after calibration', solution: 'The laser may have moved or the beam isn\'t hitting the sensor dead-center. Re-align and recalibrate. Also check that the threshold isn\'t set too high.' },
              { issue: 'Alarm doesn\'t trigger when beam is clearly blocked', solution: 'Lower BEAM_BREAK_THRESHOLD (e.g., 0.20 instead of 0.30). Print the live readings to see what values you\'re actually getting when blocked vs unblocked.' },
              { issue: 'Laser module doesn\'t light up', solution: 'The laser module needs 5V power on VCC, not 3.3V. Also verify the signal pin (GPIO 23) is set to HIGH by checking laser.on() is called.' }
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
    id: 'p12',
    level: 12,
    levelName: 'Physical Security',
    title: 'The Magnetic Deadbolt',
    skillsLearned: ['Hall Effect sensing', 'Reed switch binary reads', 'Pull-up vs Pull-down resistors', 'Sensor redundancy', 'Tamper detection'],
    badgeEarned: 'Security Engineer',
    content: {
      overview: {
        description: 'Build a redundant door monitoring system using two different magnetic sensors — a digital reed switch and an analog Hall Effect sensor. Learn how combining sensors creates tamper-resistant security and how attackers might try to spoof magnetic sensors.',
        concepts: ['Magnetic Field Detection', 'Sensor Redundancy', 'Pull-up vs Pull-down Resistors', 'Tamper Detection', 'Magnet Spoofing'],
        difficulty: 4,
        estimatedTime: '35 mins'
      },
      pages: [
        {
          id: 'p12-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'Build a redundant door monitoring system using two different magnetic sensors — a digital reed switch and an analog Hall Effect sensor. Learn how combining sensors creates tamper-resistant security and how attackers might try to spoof magnetic sensors.',
              concepts: ['Magnetic Field Detection', 'Sensor Redundancy', 'Pull-up vs Pull-down Resistors', 'Tamper Detection', 'Magnet Spoofing'],
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
          id: 'p12-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: {
              warnings: [
                'Keep strong magnets away from electronics and credit cards.',
                'The reed switch is a glass tube — handle gently to avoid cracking.',
                'Mount both sensors close together (within 1-2cm) so they detect the same magnet.'
              ],
              steps: [
                'Reed Switch Module: Connect VCC → 3.3V, GND → GND, DO (digital out) → GPIO 17. The module has a built-in pull-up resistor.',
                'Hall Effect Sensor Module: Connect VCC → 3.3V, GND → GND, AO (analog out) → MCP3008 CH1 (for analog reads), DO (digital out) → GPIO 27 (for binary threshold).',
                'Double Color LED: Red → GPIO 16 through 330Ω → GND, Green → GPIO 20 through 330Ω → GND. Green = door closed (secure), Red = door open or tamper detected.',
                'MCP3008 ADC: Same wiring as Level 11 — CLK → GPIO 11, DOUT → GPIO 9, DIN → GPIO 10, CS → GPIO 8.',
                'Mount the sensors on a door frame. Attach a small magnet to the door so it aligns with both sensors when the door is closed.',
                'Test alignment: when the magnet is near, the reed switch should close and the Hall sensor should register a strong field.'
              ],
              explanation: 'The reed switch contains two metal reeds in a glass tube — a nearby magnetic field pulls them together, closing the circuit. The Hall Effect sensor detects magnetic field strength as an analog voltage proportional to the field intensity. Using BOTH sensors lets us detect tampering: if someone holds a magnet near the reed switch to fool it, the Hall sensor will see an abnormally STRONG field — stronger than the door\'s actual magnet.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p12-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 12: The Magnetic Deadbolt — Redundant door security

🔒 SECURITY HARDENING:
- Using TWO sensor types defeats simple magnet spoofing attacks.
- If the Hall sensor sees a field STRONGER than expected, someone may be
  holding a powerful magnet to trick the reed switch while opening the door.
- Log all state changes with timestamps.

📚 EDUCATIONAL MOMENT:
The reed switch is BINARY — closed or open, 1 or 0.
The Hall Effect sensor is ANALOG — it measures field STRENGTH.
A real door magnet produces a known field strength at a known distance.
An attacker's spoofing magnet would likely be much stronger (easier to hold
from a distance) — and the Hall sensor will detect this anomaly!
"""

import time
from datetime import datetime
from gpiozero import LED, Button, MCP3008

# ============================================
# HARDWARE ABSTRACTION
# ============================================

reed_switch = Button(17, pull_up=True)   # Reed switch — closed when magnet is near
hall_digital = Button(27, pull_up=True)  # Hall sensor digital output
hall_analog = MCP3008(channel=1)         # Hall sensor analog output

status_green = LED(20)  # Green = secure
status_red = LED(16)    # Red = open or tamper

# ============================================
# CONFIGURATION
# ============================================

# Calibrated values — adjust after running calibration
HALL_CLOSED_MIN = 0.40   # Minimum Hall reading when door is legitimately closed
HALL_CLOSED_MAX = 0.70   # Maximum Hall reading when door is legitimately closed
HALL_TAMPER_THRESHOLD = 0.85  # If Hall reads ABOVE this, suspect a strong spoofing magnet

# ============================================
# CALIBRATION
# ============================================

def calibrate_door():
    """Measure the Hall sensor reading with the door properly closed."""
    print("🔧 Calibration Mode")
    print("   Close the door completely and press Enter...")
    input()
    
    samples = []
    for i in range(20):
        samples.append(hall_analog.value)
        time.sleep(0.05)
    
    avg = sum(samples) / len(samples)
    min_val = min(samples)
    max_val = max(samples)
    
    print(f"\\n📊 Door Closed Readings:")
    print(f"   Average: {avg:.3f}")
    print(f"   Range:   {min_val:.3f} - {max_val:.3f}")
    print(f"\\n   Use these to set HALL_CLOSED_MIN and HALL_CLOSED_MAX in the code.")
    return avg

# ============================================
# STATE DETECTION
# ============================================

def get_door_state():
    """
    Returns: 'secure', 'open', or 'tamper'
    """
    reed_closed = reed_switch.is_pressed  # True when magnet closes the switch
    hall_value = hall_analog.value
    
    # TAMPER CHECK: Hall reading abnormally high = strong external magnet
    if hall_value > HALL_TAMPER_THRESHOLD:
        return 'tamper', hall_value, reed_closed
    
    # SECURE: Reed says closed AND Hall is in expected range
    if reed_closed and HALL_CLOSED_MIN <= hall_value <= HALL_CLOSED_MAX:
        return 'secure', hall_value, reed_closed
    
    # OPEN: Reed says open OR Hall is outside range
    return 'open', hall_value, reed_closed

def set_status(state):
    """Update the status LED based on door state."""
    if state == 'secure':
        status_green.on()
        status_red.off()
    else:
        status_green.off()
        status_red.on()

def log_event(state, hall_value, reed_closed):
    """Log state changes."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open('deadbolt.log', 'a') as f:
        f.write(f"[{timestamp}] {state.upper()} — Hall: {hall_value:.3f}, Reed: {'closed' if reed_closed else 'open'}\\n")

# ============================================
# MAIN MONITOR LOOP
# ============================================

print("🚪 Magnetic Deadbolt Security System")
print("=" * 40)
print(f"   Hall expected range: {HALL_CLOSED_MIN:.2f} - {HALL_CLOSED_MAX:.2f}")
print(f"   Tamper threshold:    > {HALL_TAMPER_THRESHOLD:.2f}")
print("\\n🛡️  Monitoring... Press Ctrl+C to exit.\\n")

last_state = None

try:
    while True:
        state, hall_value, reed_closed = get_door_state()
        
        if state != last_state:
            set_status(state)
            log_event(state, hall_value, reed_closed)
            
            if state == 'secure':
                print(f"🟢 SECURE — Door closed (Hall: {hall_value:.3f})")
            elif state == 'tamper':
                print(f"🔴 TAMPER DETECTED! Abnormally strong magnetic field: {hall_value:.3f}")
                print(f"   Someone may be spoofing the sensor with an external magnet!")
            else:
                print(f"🟡 OPEN — Door opened (Hall: {hall_value:.3f}, Reed: {'closed' if reed_closed else 'open'})")
            
            last_state = state
        
        # Live status display
        reed_str = "CLOSED" if reed_closed else "OPEN"
        print(f"   Reed: {reed_str} | Hall: {hall_value:.3f} | State: {state.upper()}", end="\\r")
        
        time.sleep(0.1)

except KeyboardInterrupt:
    status_green.off()
    status_red.off()
    print("\\n\\n🔓 Monitoring stopped.")`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p12-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'Reed Switch as Button', explanation: 'We use gpiozero\'s Button class with `pull_up=True`. When the magnet is near, the reed switch closes, pulling the GPIO pin LOW — which Button interprets as "pressed." This is the same logic as a physical button!' },
              { section: 'Hall Analog + Hall Digital', explanation: 'The Hall sensor module provides BOTH outputs. The digital output (DO) gives a binary yes/no based on an onboard potentiometer threshold. The analog output (AO) gives us the raw field strength — much more useful for detecting spoofing.' },
              { section: 'HALL_CLOSED_MIN/MAX Range', explanation: 'When the door is legitimately closed, the magnet is at a fixed distance and produces a consistent Hall reading. We calibrate this range. If the reading is outside this range while the reed switch says "closed," something is wrong.' },
              { section: 'TAMPER_THRESHOLD', explanation: 'A strong neodymium magnet held closer than the door magnet would produce a STRONGER field. If the Hall reading exceeds our tamper threshold, we know someone is trying to fool the system.' },
              { section: 'Three-State Logic', explanation: 'Instead of binary "open/closed," we have three states: SECURE (both sensors agree), OPEN (door is open), TAMPER (sensors disagree or readings are anomalous). This defense-in-depth approach catches attacks that would fool a single sensor.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p12-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The reed switch uses ferromagnetic reeds (iron-nickel alloy) sealed in a glass tube. A magnetic field aligns their magnetic domains, causing attraction. The Hall Effect sensor uses a semiconductor — when current flows through it and a magnetic field is perpendicular, electrons are deflected to one side (Lorentz force), creating a measurable voltage difference. This voltage is directly proportional to field strength.',
              software: 'Pull-up resistors keep the GPIO pin at a known HIGH state when the switch is open. When the reed switch closes, it connects the pin to ground (LOW). "Pull-up" means the default is HIGH; "pull-down" means the default is LOW. Most security switches use pull-up logic so a cut wire (open circuit) reads as "alarm" rather than "secure."',
              connection: 'This project demonstrates defense-in-depth: layered security where compromising one sensor isn\'t enough to bypass the system. Real-world alarm systems use this principle — multiple sensor types, encrypted communication, tamper switches on the sensor housings, and supervision circuits that detect cut wires.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p12-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Adjust the potentiometer on the Hall sensor module — it controls the digital output threshold. Watch how it changes when DO triggers compared to your analog readings.',
              logic: 'Add a "sensor mismatch" check: if the reed switch says closed but the Hall analog is near zero (no magnetic field at all), the wire to the reed switch may have been bypassed with a jumper!',
              creative: 'Act out an attack scenario with your child: they try to open the "door" while holding a magnet near the sensors. Can they find a magnet strong enough to fool the reed switch but weak enough to not trigger the tamper threshold? (Spoiler: it\'s very hard!)'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p12-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 4, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'Reed switch always reads as open', solution: 'The magnet may not be close enough or strong enough. Reed switches typically need the magnet within 10-15mm. Also check that pull_up=True is set.' },
              { issue: 'Hall sensor analog always reads ~0.5', solution: 'With no magnetic field, the Hall sensor outputs roughly VCC/2 (center of its range). This is normal! The reading should shift up or down when a magnet is near.' },
              { issue: 'Tamper triggers with the door actually closed', solution: 'Your door magnet may be stronger than expected. Recalibrate and increase HALL_TAMPER_THRESHOLD, or use a weaker magnet on the door.' },
              { issue: 'State flickers between secure and open', solution: 'Add hysteresis or a debounce timer. Require 3+ consecutive readings in a new state before changing — this filters out noise and vibration.' }
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
    id: 'p13',
    level: 13,
    levelName: 'Vibration & Impact',
    title: 'The Silent Guardian',
    skillsLearned: ['Spring vibration sensing', 'ADXL345 accelerometer I2C', 'G-force vectors', 'Impact detection', 'Physical tamper monitoring'],
    badgeEarned: 'Inertial Defender',
    content: {
      overview: {
        description: 'Protect a safe, server, or treasure box from being moved or tampered with! We combine a simple spring vibration sensor for immediate shock detection with an ADXL345 3-axis accelerometer for precise movement tracking. Learn about G-force, vector math, and physical security hardening.',
        concepts: ['Inertial Measurement', 'Spring Vibration Sensors', 'I2C Accelerometers', 'G-Force & Vectors', 'Physical Hardening'],
        difficulty: 5,
        estimatedTime: '45 mins'
      },
      pages: [
        {
          id: 'p13-overview',
          title: 'Project Overview',
          content: {
            overview: {
              description: 'Protect a safe, server, or treasure box from being moved or tampered with! We combine a simple spring vibration sensor for immediate shock detection with an ADXL345 3-axis accelerometer for precise movement tracking. Learn about G-force, vector math, and physical security hardening.',
              concepts: ['Inertial Measurement', 'Spring Vibration Sensors', 'I2C Accelerometers', 'G-Force & Vectors', 'Physical Hardening'],
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
          id: 'p13-hardware',
          title: 'Hardware Setup',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: {
              warnings: [
                'Enable I2C on your Pi before using the ADXL345: sudo raspi-config → Interface Options → I2C.',
                'The ADXL345 is a 3.3V device. Never connect VCC to 5V!',
                'Mount both sensors firmly on the object you\'re protecting — loose mounting creates false positives.'
              ],
              steps: [
                'Spring Vibration Sensor Module: Connect VCC → 3.3V, GND → GND, DO (digital out) → GPIO 24. The spring detects physical shock.',
                'ADXL345 Accelerometer Module: Connect VCC → 3.3V, GND → GND, SDA → GPIO 2 (Physical Pin 3), SCL → GPIO 3 (Physical Pin 5).',
                'Run `sudo i2cdetect -y 1` — you should see address 0x53 (default ADXL345 address).',
                'RGB LED (from Level 1): Red → GPIO 17, Green → GPIO 27, Blue → GPIO 5, GND → GND. We\'ll use this for status.',
                'Active Buzzer: VCC → 5V, GND → GND, I/O → GPIO 18.',
                'Mount the vibration sensor and accelerometer on a small box or book — this is your "protected asset."'
              ],
              explanation: 'The spring vibration sensor is a simple switch with a metal spring inside. Any shock or vibration causes the spring to touch the case, briefly closing the circuit. The ADXL345 uses MEMS (Micro-Electro-Mechanical Systems) — a tiny silicon mass suspended by springs. When the chip accelerates, the mass moves and changes capacitance, which is measured and converted to a digital G-force reading on each axis.'
            },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p13-code',
          title: 'The Code',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: `#!/usr/bin/env python3
"""
Level 13: The Silent Guardian — Vibration & Impact monitoring

🔒 SECURITY HARDENING:
- Dual sensors: vibration switch for instant shock detection, accelerometer for slow tilts.
- Log ALL events with G-force vectors for forensic analysis.
- A stationary object should read ~1G on the Z-axis (gravity) and ~0G on X/Y.

📚 EDUCATIONAL MOMENT:
The accelerometer doesn't just detect movement — it ALWAYS sees gravity!
At rest, the Z-axis reads ~1G (pointing down). If you tilt the box,
gravity's vector shifts to X and Y axes. We can detect even slow,
sneaky tilting that wouldn't register as "vibration."
"""

import time
import math
from datetime import datetime
from gpiozero import LED, Button, OutputDevice

# For ADXL345 I2C communication
import smbus2

# ============================================
# HARDWARE ABSTRACTION
# ============================================

vibration_sensor = Button(24, pull_up=True, bounce_time=0.1)  # Spring vibration sensor
buzzer = OutputDevice(18)

# RGB LED for status
red_led = LED(17)
green_led = LED(27)
blue_led = LED(5)

# ADXL345 I2C Setup
ADXL345_ADDR = 0x53
bus = smbus2.SMBus(1)

# ADXL345 Registers
REG_POWER_CTL = 0x2D
REG_DATA_FORMAT = 0x31
REG_DATAX0 = 0x32

# ============================================
# ADXL345 FUNCTIONS
# ============================================

def init_adxl345():
    """Initialize the ADXL345 accelerometer."""
    # Set data format: full resolution, +/-2g range
    bus.write_byte_data(ADXL345_ADDR, REG_DATA_FORMAT, 0x08)
    # Enable measurement mode
    bus.write_byte_data(ADXL345_ADDR, REG_POWER_CTL, 0x08)
    time.sleep(0.1)
    print("✅ ADXL345 initialized")

def read_accel():
    """
    Read X, Y, Z acceleration values.
    Returns tuple of (x, y, z) in G units.
    """
    # Read 6 bytes starting from DATAX0
    data = bus.read_i2c_block_data(ADXL345_ADDR, REG_DATAX0, 6)
    
    # Convert to signed 16-bit values (little-endian)
    x = (data[1] << 8) | data[0]
    y = (data[3] << 8) | data[2]
    z = (data[5] << 8) | data[4]
    
    # Convert to signed
    if x > 32767: x -= 65536
    if y > 32767: y -= 65536
    if z > 32767: z -= 65536
    
    # Convert to G (scale factor for +/-2g range)
    scale = 0.004  # 4mg per LSB
    return (x * scale, y * scale, z * scale)

def magnitude(x, y, z):
    """Calculate the magnitude of the acceleration vector."""
    return math.sqrt(x*x + y*y + z*z)

# ============================================
# CONFIGURATION
# ============================================

# Baseline calibration (will be set during startup)
baseline_x = 0.0
baseline_y = 0.0
baseline_z = 1.0  # At rest, Z should be ~1G (gravity)

TILT_THRESHOLD = 0.15       # G deviation on any axis = tilt detected
IMPACT_THRESHOLD = 1.5      # Total magnitude > 1.5G = impact detected
VIBRATION_COOLDOWN = 2.0    # Seconds to wait after vibration before re-alerting

# ============================================
# STATUS & LOGGING
# ============================================

def set_status(state):
    """Set RGB LED based on state: green=secure, yellow=alert, red=alarm"""
    if state == 'secure':
        green_led.on(); red_led.off(); blue_led.off()
    elif state == 'alert':
        green_led.on(); red_led.on(); blue_led.off()  # Yellow
    elif state == 'alarm':
        green_led.off(); red_led.on(); blue_led.off()

def sound_alarm(pulses=3):
    """Sound the buzzer in short pulses."""
    for _ in range(pulses):
        buzzer.on()
        time.sleep(0.1)
        buzzer.off()
        time.sleep(0.1)

def log_event(event_type, x, y, z, mag):
    """Log tampering events with full vector data."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open('guardian.log', 'a') as f:
        f.write(f"[{timestamp}] {event_type} — X:{x:.3f}G Y:{y:.3f}G Z:{z:.3f}G Mag:{mag:.3f}G\\n")

# ============================================
# VIBRATION CALLBACK
# ============================================

last_vibration_time = 0

def on_vibration():
    """Called when the spring vibration sensor triggers."""
    global last_vibration_time
    now = time.time()
    
    if now - last_vibration_time < VIBRATION_COOLDOWN:
        return  # Still in cooldown
    
    last_vibration_time = now
    x, y, z = read_accel()
    mag = magnitude(x, y, z)
    
    print(f"\\n⚡ VIBRATION DETECTED! (Mag: {mag:.2f}G)")
    log_event("VIBRATION", x, y, z, mag)
    set_status('alarm')
    sound_alarm(2)
    time.sleep(1)
    set_status('secure')

vibration_sensor.when_pressed = on_vibration

# ============================================
# CALIBRATION
# ============================================

def calibrate():
    """Calibrate the baseline orientation."""
    global baseline_x, baseline_y, baseline_z
    
    print("📐 Calibrating orientation...")
    print("   Keep the protected object completely still...")
    
    samples_x, samples_y, samples_z = [], [], []
    for i in range(20):
        x, y, z = read_accel()
        samples_x.append(x)
        samples_y.append(y)
        samples_z.append(z)
        time.sleep(0.05)
    
    baseline_x = sum(samples_x) / len(samples_x)
    baseline_y = sum(samples_y) / len(samples_y)
    baseline_z = sum(samples_z) / len(samples_z)
    
    print(f"   Baseline: X={baseline_x:.3f}G Y={baseline_y:.3f}G Z={baseline_z:.3f}G")
    return True

# ============================================
# MAIN MONITOR LOOP
# ============================================

print("🔐 Silent Guardian — Vibration & Impact Monitor")
print("=" * 50)

init_adxl345()
calibrate()

print(f"\\n   Tilt threshold:   ±{TILT_THRESHOLD}G deviation")
print(f"   Impact threshold: {IMPACT_THRESHOLD}G total")
print("\\n🛡️  ARMED — Press Ctrl+C to disarm.\\n")

set_status('secure')

try:
    while True:
        x, y, z = read_accel()
        mag = magnitude(x, y, z)
        
        # Check for tilt (slow movement)
        dx = abs(x - baseline_x)
        dy = abs(y - baseline_y)
        dz = abs(z - baseline_z)
        
        if dx > TILT_THRESHOLD or dy > TILT_THRESHOLD or dz > TILT_THRESHOLD:
            print(f"\\n📐 TILT DETECTED! ΔX:{dx:.2f} ΔY:{dy:.2f} ΔZ:{dz:.2f}")
            log_event("TILT", x, y, z, mag)
            set_status('alert')
            sound_alarm(1)
        
        # Check for impact (sudden acceleration)
        elif mag > IMPACT_THRESHOLD:
            print(f"\\n💥 IMPACT DETECTED! Magnitude: {mag:.2f}G")
            log_event("IMPACT", x, y, z, mag)
            set_status('alarm')
            sound_alarm(3)
        
        else:
            set_status('secure')
        
        # Live display
        print(f"   X:{x:+.2f}G Y:{y:+.2f}G Z:{z:+.2f}G | Mag:{mag:.2f}G", end="\\r")
        
        time.sleep(0.1)

except KeyboardInterrupt:
    buzzer.off()
    red_led.off()
    green_led.off()
    blue_led.off()
    print("\\n\\n🔓 Guardian disarmed.")`,
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p13-walkthrough',
          title: 'Code Walkthrough',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [
              { section: 'smbus2 for I2C', explanation: 'The ADXL345 communicates via I2C — a two-wire protocol (SDA for data, SCL for clock). We use the smbus2 library to read registers from the accelerometer. Each axis has two bytes of data (16-bit signed integer) that we combine and convert to G-force.' },
              { section: 'read_accel() — Little-Endian Conversion', explanation: 'The ADXL345 stores data in little-endian format (low byte first). We read 6 bytes, combine each pair into a 16-bit value, convert to signed, and scale to G units. At +/-2G range, each LSB represents 4 milliG.' },
              { section: 'magnitude() — Vector Math', explanation: 'The total acceleration is the square root of X² + Y² + Z². At rest, this should be ~1G (just gravity). During an impact, it spikes well above 1G. This catches jolts in ANY direction, not just up/down.' },
              { section: 'Tilt vs Impact Detection', explanation: 'TILT checks if any single axis has deviated from baseline (slow, sneaky movement). IMPACT checks if total magnitude exceeds threshold (sudden shock). These catch different attack types — a thief slowly tilting a safe vs smashing it.' },
              { section: 'Vibration Callback with Cooldown', explanation: 'The spring sensor triggers on any bump. Without cooldown, a single impact could trigger dozens of callbacks as the spring bounces. We ignore repeat triggers within 2 seconds.' }
            ],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p13-deepdive',
          title: 'Concept Deep Dive',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: {
              hardware: 'The ADXL345 is a MEMS (Micro-Electro-Mechanical System) accelerometer. Inside the chip, a tiny proof mass is suspended by silicon springs. When the chip accelerates, the mass\'s inertia causes it to lag behind, changing the capacitance between fixed and moving plates. This capacitance change is measured and converted to a digital reading. The spring vibration sensor is far simpler — a coiled metal spring inside a metal tube. Any vibration causes the spring to touch the tube wall, completing a circuit.',
              software: 'G-force is acceleration relative to freefall. 1G is Earth\'s gravity (9.8 m/s²). At rest, the accelerometer reads 1G pointing toward Earth\'s center. If you flip it upside down, Z becomes -1G. This is how phones know which way is "up" for screen rotation. Vector math (magnitude calculation) lets us measure total motion regardless of direction.',
              connection: 'This is physical security at its core: the first line of defense isn\'t a password — it\'s bolting the server to the floor. If an attacker can physically carry away your hardware, no amount of encryption matters. Industrial servers use rack mounting, cable locks, and tamper-evident seals. Our accelerometer-based alarm is the same principle: detect unauthorized physical access before data theft begins.'
            },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: []
          }
        },
        {
          id: 'p13-experiment',
          title: 'Experiment Mode',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: {
              tweak: 'Lower TILT_THRESHOLD to 0.08 and see how sensitive the system becomes. Can you move the box at ALL without triggering? Try moving it VERY slowly over 30 seconds.',
              logic: 'Add a "sustained tilt" check: only alarm if tilt is detected for 3+ consecutive readings. This filters out brief vibrations that momentarily shift the readings.',
              creative: 'Discuss physical hardening with your child: what if you bolted this sensor to a concrete floor? What if you hid the wires inside a metal conduit? What if the buzzer was replaced by a silent SMS alert? Map out a "defense in depth" strategy for protecting a fictional bank vault.'
            },
            troubleshooting: []
          }
        },
        {
          id: 'p13-troubleshooting',
          title: 'Troubleshooting',
          content: {
            overview: { description: '', concepts: [], difficulty: 5, estimatedTime: '' },
            hardwareSetup: { warnings: [], steps: [], explanation: '' },
            code: '',
            codeWalkthrough: [],
            conceptDeepDive: { hardware: '', software: '', connection: '' },
            experimentMode: { tweak: '', logic: '', creative: '' },
            troubleshooting: [
              { issue: 'i2cdetect shows no device at 0x53', solution: 'Enable I2C via raspi-config and reboot. Check SDA→GPIO2, SCL→GPIO3 wiring. Ensure VCC is 3.3V, not 5V. Some modules have an address jumper — check if it\'s set to alternate address 0x1D.' },
              { issue: 'Readings are always 0,0,0', solution: 'The ADXL345 may not be in measurement mode. Verify init_adxl345() is called before any reads. Check that REG_POWER_CTL is set to 0x08.' },
              { issue: 'Z-axis doesn\'t read ~1G at rest', solution: 'The sensor may not be level, or the scale factor is wrong. At +/-2G range, scale should be 0.004 (4mg/LSB). If using +/-4G range, scale is 0.008.' },
              { issue: 'Vibration sensor triggers constantly', solution: 'The spring is too sensitive for your surface. Add foam padding under the sensor, or increase bounce_time to 0.2 or higher. Ensure the module is firmly mounted — loose wires cause false triggers.' }
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
