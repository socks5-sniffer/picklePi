import { Project } from '../types';

export const curriculum: Project[] = [
  {
    id: 'p1',
    level: 1,
    levelName: 'Digital Output Basics',
    title: 'Hello, LED',
    skillsLearned: ['GPIO Basics', 'Digital Out', 'Basic Python'],
    badgeEarned: 'GPIO Initiate',
    content: {
      overview: {
        description: 'We are building the "Hello World" of electronics: making an LED blink! This is your first step into controlling physical hardware with code.',
        concepts: ['Digital Output (High/Low)', 'Circuits', 'Python loops'],
        difficulty: 1,
        estimatedTime: '15 mins'
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
      code: `import RPi.GPIO as GPIO\nimport time\n\n# Pin Setup\nLED_PIN = 17 # Using BCM GPIO 17 (Physical Pin 11)\n\n# Configure the GPIO library\nGPIO.setmode(GPIO.BCM) # Use BCM numbering\nGPIO.setwarnings(False) # Disable warnings\nGPIO.setup(LED_PIN, GPIO.OUT) # Set pin as output\n\ntry:\n    # Main loop\n    while True:\n        print("LED ON")\n        GPIO.output(LED_PIN, GPIO.HIGH) # Turn LED on (3.3V)\n        time.sleep(1)                   # Wait 1 second\n        \n        print("LED OFF")\n        GPIO.output(LED_PIN, GPIO.LOW)  # Turn LED off (0V)\n        time.sleep(1)                   # Wait 1 second\n\nexcept KeyboardInterrupt:\n    # Handle Ctrl+C gracefully\n    print("Exiting program")\n\nfinally:\n    # Cleanup process\n    GPIO.cleanup() # Reset GPIO pins to safe state`,
      codeWalkthrough: [
        { section: 'Imports', explanation: '`RPi.GPIO` lets us control the pins. `time` lets us add delays (sleep).' },
        { section: 'Pin Setup', explanation: 'We define `LED_PIN = 17` so we can easily change it later if needed. `GPIO.setmode(GPIO.BCM)` tells the Pi we are using the Broadcom (BCM) GPIO numbers, not the physical pin numbers.' },
        { section: 'Loops', explanation: '`while True:` creates an infinite loop. Everything indented under it runs forever until we stop it.' },
        { section: 'Conditionals / Logic', explanation: '`GPIO.output(..., GPIO.HIGH)` sends 3.3V to turn it on. `GPIO.LOW` sends 0V to turn it off.' },
        { section: 'Cleanup process', explanation: "The `try...except...finally` block ensures that even if we stop the program (Ctrl+C), `GPIO.cleanup()` runs. This is crucial for safety, resetting pins so they don't accidentally stay powered." }
      ],
      conceptDeepDive: {
        hardware: "The Raspberry Pi acts as a switchable power source. When a pin is HIGH, it pushes electrons out. The resistor acts like a narrow pipe, slowing down the electrons so they don't overwhelm and pop the LED.",
        software: 'The Python script is the brain. It sequentially executes commands, telling the "switch" (GPIO pin) when to open and close, with precise timing.',
        connection: 'Software commands translate into physical voltage changes. 1s and 0s in code become 3.3V and 0V in reality.'
      },
      experimentMode: {
        tweak: 'Change `time.sleep(1)` to `time.sleep(0.1)`. What happens to the blinking?',
        logic: 'Make the LED stay ON for 2 seconds, but OFF for only 0.5 seconds.',
        creative: 'Can you make the LED blink a heartbeat pattern? (Ba-bum... Ba-bum...)'
      },
      troubleshooting: [
        { issue: "LED doesn't light up", solution: 'Check LED polarity. Long leg goes to resistor/GPIO, short leg to GND.' },
        { issue: 'Error: "No access to /dev/mem"', solution: 'You might need to run your script with `sudo python3 script.py` depending on your OS version.' },
        { issue: 'LED is very dim', solution: 'Check your resistor value. If you used a 10kΩ resistor instead of 220Ω, too little current is flowing.' }
      ]
    }
  },
  {
    id: 'p2',
    level: 2,
    levelName: 'Digital Input',
    title: 'Button controls LED',
    skillsLearned: ['Digital In', 'Pull-up/down resistors', 'Conditionals'],
    badgeEarned: 'Input Investigator',
    content: null
  },
  {
    id: 'p3',
    level: 3,
    levelName: 'PWM & Analog Concepts',
    title: 'PWM brightness',
    skillsLearned: ['PWM', 'Duty Cycle', 'Fading'],
    badgeEarned: 'PWM Tamer',
    content: null
  },
  {
    id: 'p4',
    level: 4,
    levelName: 'Sensors & Reactive Systems',
    title: 'Buzzer tones',
    skillsLearned: ['Frequencies', 'Active vs Passive Buzzer'],
    badgeEarned: 'Signal Wrangler',
    content: null
  },
  {
    id: 'p5',
    level: 5,
    levelName: 'Displays & User Feedback',
    title: 'Motion or Light sensor',
    skillsLearned: ['Analog/Digital Sensors', 'Event Detection'],
    badgeEarned: 'Sensor Specialist',
    content: null
  },
  {
    id: 'p6',
    level: 6,
    levelName: 'Multi-Module Systems',
    title: 'LCD or OLED output',
    skillsLearned: ['I2C/SPI', 'Libraries', 'String Formatting'],
    badgeEarned: 'Display Master',
    content: null
  },
  {
    id: 'p7',
    level: 7,
    levelName: 'Mini Capstone Projects',
    title: 'Multi-module alarm system',
    skillsLearned: ['State Machines', 'Integration', 'System Design'],
    badgeEarned: 'Mini Systems Architect',
    content: null
  }
];
