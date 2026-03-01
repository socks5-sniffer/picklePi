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
    content: {
      overview: {
        description: 'We will use a push button to control our LED. This introduces digital inputs, letting our code react to the physical world.',
        concepts: ['Digital Input', 'Pull-up/Pull-down Resistors', 'If/Else Conditionals'],
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
      code: `import RPi.GPIO as GPIO\nimport time\n\nLED_PIN = 17\nBUTTON_PIN = 22\n\nGPIO.setmode(GPIO.BCM)\nGPIO.setwarnings(False)\n\n# Setup LED as output\nGPIO.setup(LED_PIN, GPIO.OUT)\n\n# Setup Button as input with an internal pull-down resistor\nGPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)\n\ntry:\n    print("Press the button to turn on the LED.")\n    while True:\n        # Read the state of the button\n        button_state = GPIO.input(BUTTON_PIN)\n        \n        if button_state == GPIO.HIGH:\n            GPIO.output(LED_PIN, GPIO.HIGH)\n        else:\n            GPIO.output(LED_PIN, GPIO.LOW)\n            \n        time.sleep(0.1) # Small delay to prevent CPU hogging\n\nexcept KeyboardInterrupt:\n    print("Exiting...")\n\nfinally:\n    GPIO.cleanup()`,
      codeWalkthrough: [
        { section: 'Pin Setup', explanation: '`pull_up_down=GPIO.PUD_DOWN` activates an internal resistor that connects the pin to Ground by default. This prevents the pin from "floating" and reading random noise when the button is not pressed.' },
        { section: 'Conditionals', explanation: '`if button_state == GPIO.HIGH:` checks if the button is pressed (receiving 3.3V). If true, it turns the LED on. `else:` turns it off.' },
        { section: 'time.sleep(0.1)', explanation: "Without this, the `while True` loop would run millions of times a second, maxing out the Raspberry Pi's CPU." }
      ],
      conceptDeepDive: {
        hardware: 'A push button is a momentary switch. It only completes the circuit while held down. The internal pull-down resistor acts like a weak spring, pulling the voltage to 0V when the button is released.',
        software: 'The code constantly polls (checks) the button pin. It uses conditional logic (if/else) to decide what to do with the LED based on that input.',
        connection: 'The physical press changes the voltage on the pin to 3.3V. The software reads this 3.3V as a logical `True` or `HIGH`, triggering the LED code.'
      },
      experimentMode: {
        tweak: 'Can you reverse the logic so the LED is ON by default, and turns OFF when you press the button?',
        logic: 'Make the button act as a toggle switch (press once to turn on, press again to turn off). Hint: You will need a variable to store the LED state.',
        creative: 'Add a second LED and make the button switch which LED is currently lit.'
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
    skillsLearned: ['PWM', 'Duty Cycle', 'Fading'],
    badgeEarned: 'PWM Tamer',
    content: {
      overview: {
        description: 'Instead of just ON and OFF, we will use Pulse Width Modulation (PWM) to fade an LED in and out, simulating an analog output.',
        concepts: ['Pulse Width Modulation (PWM)', 'Duty Cycle', 'Frequency', 'For Loops'],
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
      code: `import RPi.GPIO as GPIO\nimport time\n\nLED_PIN = 17\n\nGPIO.setmode(GPIO.BCM)\nGPIO.setup(LED_PIN, GPIO.OUT)\n\n# Initialize PWM on LED_PIN at 100Hz frequency\npwm_led = GPIO.PWM(LED_PIN, 100)\n\n# Start PWM with 0% duty cycle (Off)\npwm_led.start(0)\n\ntry:\n    while True:\n        # Fade In\n        for duty_cycle in range(0, 101, 5):\n            pwm_led.ChangeDutyCycle(duty_cycle)\n            time.sleep(0.05)\n            \n        # Fade Out\n        for duty_cycle in range(100, -1, -5):\n            pwm_led.ChangeDutyCycle(duty_cycle)\n            time.sleep(0.05)\n\nexcept KeyboardInterrupt:\n    pass\n\nfinally:\n    pwm_led.stop() # Stop the PWM\n    GPIO.cleanup()`,
      codeWalkthrough: [
        { section: 'PWM Initialization', explanation: '`GPIO.PWM(LED_PIN, 100)` sets up PWM on the pin at 100 Hertz (it will turn on and off 100 times per second).' },
        { section: 'Duty Cycle', explanation: '`pwm_led.start(0)` starts the PWM. Duty cycle is the percentage of time the pin is ON. 0% is off, 100% is fully on, 50% is half brightness.' },
        { section: 'For Loops', explanation: '`range(0, 101, 5)` generates numbers from 0 to 100, stepping by 5. We use this to gradually increase, then decrease, the duty cycle.' }
      ],
      conceptDeepDive: {
        hardware: 'Digital pins can only output 3.3V or 0V. They cannot output 1.5V. PWM tricks the LED (and our eyes) by pulsing the 3.3V so fast that it averages out to a lower brightness.',
        software: 'The PWM library handles the rapid switching in the background. We just tell it what percentage of the time it should be ON (the duty cycle).',
        connection: 'A 50% duty cycle means the pin is HIGH for half the time and LOW for half the time. The LED flickers so fast it just looks dimmer.'
      },
      experimentMode: {
        tweak: 'Change the frequency from 100 to 5. What happens to the LED? Can you see it flickering now?',
        logic: 'Change the step in the `range()` function from 5 to 1. How does this affect the fading animation?',
        creative: 'Combine this with the button from Level 2: Make the LED get brighter only while you hold the button down.'
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
    skillsLearned: ['Frequencies', 'Active vs Passive Buzzer'],
    badgeEarned: 'Signal Wrangler',
    content: {
      overview: {
        description: 'We will use a passive buzzer to generate different musical tones and sound effects using PWM frequencies.',
        concepts: ['Frequencies', 'Sound Waves', 'Active vs Passive Components'],
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
      code: `import RPi.GPIO as GPIO\nimport time\n\nBUZZER_PIN = 18\n\nGPIO.setmode(GPIO.BCM)\nGPIO.setup(BUZZER_PIN, GPIO.OUT)\n\n# Start PWM at 440Hz (Middle A note) with 50% duty cycle\nbuzzer = GPIO.PWM(BUZZER_PIN, 440)\n\ntry:\n    # Play a sequence of notes\n    notes = [261, 293, 329, 349, 392, 440, 493, 523] # C4 to C5\n    \n    buzzer.start(50) # 50% duty cycle is best for volume\n    \n    for note in notes:\n        buzzer.ChangeFrequency(note)\n        time.sleep(0.5)\n        \n    buzzer.stop()\n\nexcept KeyboardInterrupt:\n    pass\n\nfinally:\n    GPIO.cleanup()`,
      codeWalkthrough: [
        { section: 'PWM Frequency', explanation: 'Unlike the LED where we changed the Duty Cycle (brightness), here we change the Frequency (pitch). 440Hz means 440 vibrations per second.' },
        { section: 'Lists and Loops', explanation: '`notes = [...]` is a list of frequencies corresponding to musical notes. The `for` loop iterates through them one by one.' },
        { section: 'Duty Cycle for Sound', explanation: 'We keep the duty cycle at 50% because that gives the crystal equal time to flex and relax, producing the loudest and clearest tone.' }
      ],
      conceptDeepDive: {
        hardware: 'The piezoelectric buzzer translates electrical pulses into mechanical movement (sound waves). The faster the pulses, the higher the pitch.',
        software: 'We use the same PWM library as the LED, but we manipulate the `ChangeFrequency()` method instead of `ChangeDutyCycle()`.',
        connection: 'Code frequency directly maps to audio frequency. 261Hz in code creates a 261Hz sound wave in the air (Middle C).'
      },
      experimentMode: {
        tweak: 'Change the `time.sleep(0.5)` to `0.1` to make the notes play faster.',
        logic: 'Create a siren effect by rapidly alternating between two frequencies (e.g., 400Hz and 600Hz) inside a `while True` loop.',
        creative: 'Look up the frequencies for your favorite simple song (like "Mary Had a Little Lamb") and program the Pi to play it!'
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
    skillsLearned: ['Analog/Digital Sensors', 'Event Detection'],
    badgeEarned: 'Sensor Specialist',
    content: {
      overview: {
        description: 'We will use a PIR (Passive Infrared) motion sensor to detect movement and trigger an action. This introduces event-driven programming.',
        concepts: ['Digital Sensors', 'Event Detection', 'Callbacks'],
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
      code: `import RPi.GPIO as GPIO\nimport time\n\nPIR_PIN = 23\nLED_PIN = 17\n\nGPIO.setmode(GPIO.BCM)\nGPIO.setup(PIR_PIN, GPIO.IN)\nGPIO.setup(LED_PIN, GPIO.OUT)\n\n# This function will run whenever motion is detected\ndef motion_detected(channel):\n    print("Motion Detected!")\n    GPIO.output(LED_PIN, GPIO.HIGH)\n    time.sleep(2)\n    GPIO.output(LED_PIN, GPIO.LOW)\n\n# Add an event detect listener\nGPIO.add_event_detect(PIR_PIN, GPIO.RISING, callback=motion_detected)\n\ntry:\n    print("Waiting for motion...")\n    while True:\n        # The main loop does nothing! The callback handles the work.\n        time.sleep(1)\n\nexcept KeyboardInterrupt:\n    print("Exiting...")\n\nfinally:\n    GPIO.cleanup()`,
      codeWalkthrough: [
        { section: 'Functions', explanation: '`def motion_detected(channel):` defines a reusable block of code. It will only execute when called.' },
        { section: 'Event Detection', explanation: '`GPIO.add_event_detect(...)` tells the Pi to monitor the PIR pin in the background. `GPIO.RISING` means it looks for the voltage going from LOW to HIGH.' },
        { section: 'Callbacks', explanation: '`callback=motion_detected` tells the event detector: "When you see the voltage rise, run this specific function immediately."' }
      ],
      conceptDeepDive: {
        hardware: 'The PIR sensor has its own internal logic chip. It does the hard work of analyzing infrared light. It just gives the Pi a simple "Yes" (3.3V) or "No" (0V).',
        software: 'Instead of constantly asking "Is there motion?" in a `while` loop (polling), we use Interrupts. The Pi sleeps until the sensor interrupts it.',
        connection: 'The hardware sensor acts as a trigger. The software registers a listener for that trigger, creating an efficient, responsive system.'
      },
      experimentMode: {
        tweak: 'Adjust the orange potentiometers (dials) on the PIR sensor to change its sensitivity and delay time.',
        logic: 'Make the code print "Motion Ended" when the sensor goes back to LOW (Hint: look up `GPIO.FALLING` or `GPIO.BOTH`).',
        creative: 'Add the buzzer from Level 4. Make an intruder alarm that flashes the LED and sounds the buzzer when motion is detected.'
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
    skillsLearned: ['State Machines', 'Integration', 'System Design'],
    badgeEarned: 'Mini Systems Architect',
    content: {
      overview: {
        description: 'The Capstone! We will combine the PIR sensor, LED, Buzzer, and Button to create a complete, state-based security alarm system.',
        concepts: ['State Machines', 'System Integration', 'Complex Logic'],
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
      code: `import RPi.GPIO as GPIO\nimport time\n\n# Pins\nLED_PIN = 17\nBUZZER_PIN = 18\nBUTTON_PIN = 22\nPIR_PIN = 23\n\n# Setup\nGPIO.setmode(GPIO.BCM)\nGPIO.setwarnings(False)\nGPIO.setup(LED_PIN, GPIO.OUT)\nGPIO.setup(BUZZER_PIN, GPIO.OUT)\nGPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)\nGPIO.setup(PIR_PIN, GPIO.IN)\n\nbuzzer = GPIO.PWM(BUZZER_PIN, 880)\n\n# System State\nalarm_active = False\n\ndef trigger_alarm(channel):\n    global alarm_active\n    if not alarm_active:\n        print("ALARM TRIGGERED!")\n        alarm_active = True\n\nGPIO.add_event_detect(PIR_PIN, GPIO.RISING, callback=trigger_alarm)\n\ntry:\n    print("System Armed. Waiting for motion...")\n    while True:\n        if alarm_active:\n            # Sound alarm and flash LED\n            GPIO.output(LED_PIN, GPIO.HIGH)\n            buzzer.start(50)\n            time.sleep(0.2)\n            \n            GPIO.output(LED_PIN, GPIO.LOW)\n            buzzer.stop()\n            time.sleep(0.2)\n            \n            # Check for disarm button\n            if GPIO.input(BUTTON_PIN) == GPIO.HIGH:\n                print("System Disarmed!")\n                alarm_active = False\n                time.sleep(2) # Prevent immediate re-trigger\n                print("System Re-armed.")\n        else:\n            time.sleep(0.1)\n\nexcept KeyboardInterrupt:\n    pass\n\nfinally:\n    buzzer.stop()\n    GPIO.cleanup()`,
      codeWalkthrough: [
        { section: 'Global Variables', explanation: '`global alarm_active` allows the callback function to modify the `alarm_active` variable that lives outside the function.' },
        { section: 'State Machine', explanation: 'The `alarm_active` boolean acts as a "state". The main loop behaves completely differently depending on whether this state is True or False.' },
        { section: 'Integration', explanation: 'We combine event detection (PIR) with polling (checking the Button inside the alarm loop) to create a responsive system.' }
      ],
      conceptDeepDive: {
        hardware: "Multiple components share the Pi's power and ground rails. The Pi coordinates them, acting as the central nervous system.",
        software: 'Managing complex systems requires tracking "State". Without the `alarm_active` variable, the alarm would only sound for the exact millisecond the PIR detected motion.',
        connection: 'This project bridges the gap between simple scripts and real-world products. A commercial home alarm works on these exact same principles.'
      },
      experimentMode: {
        tweak: 'Change the buzzer frequency and sleep timings to make the alarm sound more urgent.',
        logic: 'Add a 5-second delay between when motion is detected and when the alarm actually sounds, giving the user time to press the disarm button.',
        creative: 'Add the LCD from Level 6. Make it display "SYSTEM ARMED", "ALARM!", and "DISARMED" based on the current state.'
      },
      troubleshooting: [
        { issue: "Alarm won't turn off", solution: 'Ensure you are holding the button down during the 0.2 second window when the code checks it, or use an event detect for the button too.' },
        { issue: 'Code crashes with global variable error', solution: 'Ensure you declare `global alarm_active` inside the function before trying to change its value.' }
      ]
    }
  }
];
