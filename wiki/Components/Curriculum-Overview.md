# Curriculum Overview 🎓

picklePi ships with a structured **13-level curriculum**. Each level introduces new hardware components and Python concepts, building seamlessly on everything taught before it. Think of it like a video game — Level 1 teaches you the controls, and by Level 13 you're building real physical security systems.

## 🎛️ Levels & Projects

| Level | Topic | Project | Skills | Badge |
|-------|-------|---------|--------|-------|
| **1** | Digital Output Basics | Hello, RGB LED | `gpiozero LED`, color mixing, `signal.pause()`, multiple GPIO control | GPIO Initiate |
| **2** | Digital Input | Button Controls LED | `Button`, pull-up/down resistors, event callbacks, source binding | Input Investigator |
| **3** | PWM & Analog Concepts | PWM Brightness | `PWMLED`, duty cycle, `pulse()`, background threads | PWM Tamer |
| **4** | Sensors & Reactive Systems | Buzzer Tones | `TonalBuzzer`, `Tone`, frequencies, musical notes | Signal Wrangler |
| **5** | Displays & User Feedback | Motion / Light Sensor | `MotionSensor`, `when_motion` callbacks, PIR warm-up | Sensor Specialist |
| **6** | Multi-Module Systems | Tilt & Shake Detector | I2C protocol, ADXL345 accelerometer, Adafruit CircuitPython, 3-axis data | Motion Intelligence |
| **7** | Mini Capstone | Multi-Module Alarm System | Enum state machines, `Threading.Event`, multi-component integration | Mini Systems Architect |
| **8** | Analog Input & ADC | Twist to Control | MCP3008 SPI ADC, `source`/`values` binding, voltage division, SPI protocol | Analog Alchemist |
| **9** | Distance Sensing | Sonar Proximity Alert | `DistanceSensor`, time-of-flight math, threshold logic, live terminal output | Sonar Scout |
| **10** | Full System Capstone | The Smart Guardian | DS18B20 1-Wire sensor, `OutputDevice` relay, filesystem reads, fail-safe design | Systems Architect |
| **11** | Optical Security | The Laser Tripwire | Laser emitter control, photoresistor analog reads, ambient light calibration, beam-break detection | Optical Guardian |
| **12** | Physical Security | The Magnetic Deadbolt | Hall Effect sensing, reed switch reads, pull-up/down resistors, sensor redundancy, tamper detection | Security Engineer |
| **13** | Vibration & Impact | The Silent Guardian | Spring vibration sensing, ADXL345 I2C, G-force vectors, impact detection, physical tamper monitoring | Inertial Defender |

## 📚 How Each Lesson Is Structured

Every project is split into **seven standard pages** to provide a consistent, thorough learning experience. You can navigate between them using the page tabs inside the app.

### 1. 📋 Project Overview
The "why" and "what" behind the build. Sets the scene, explains the real-world application, lists the core concepts covered, shows the difficulty rating, and gives an estimated build time.

### 2. 🔌 Hardware Setup
Step-by-step wiring instructions written in plain English. This section always includes:
- **Safety warnings** — critical notes about voltage limits, polarity, and interface requirements (e.g., "enable SPI before connecting the MCP3008").
- **Wiring steps** — numbered instructions describing exactly which wires go where.
- **Setup explanation** — the reasoning behind the circuit, so you understand what you built, not just how to copy it.

### 3. 💻 The Code
The complete, working, runnable Python script for the project. Use the **one-click copy** button to paste it straight into your Pi's terminal or editor. The code is formatted and ready to run with `python3`.

### 4. 📖 Code Walkthrough
A section-by-section explanation of every meaningful part of the script — written in plain English, not jargon. Perfect for understanding *why* the code works the way it does before you start changing it.

### 5. 🔬 Concept Deep Dive
Three lenses on what you just built:
- **Hardware** — the physical component and the electronics behind it (e.g., how a PIR sensor generates a 3.3V pulse, how a Hall Effect sensor works).
- **Software** — the Python patterns and gpiozero internals at play.
- **Connection** — how the hardware and software pieces talk to each other at the system level.

### 6. 🧪 Experiment Mode
Three guided challenges to modify and extend the project:
- **Tweak** — a small, safe change with a predictable outcome.
- **Logic** — a programming challenge that extends the project's behaviour.
- **Creative** — an open-ended build idea using the same components.

### 7. 🔧 Troubleshooting
A curated list of common problems and their solutions — specific to the components and code in that project. Covers wiring mistakes, software errors, library configuration issues, and hardware quirks.

## 🛒 Hardware You'll Need

| Component | Used In |
|-----------|---------|
| Raspberry Pi (any 40-pin GPIO model) | All levels |
| Breadboard + jumper wires | All levels |
| RGB LED + 220Ω–330Ω resistors | Levels 1, 2, 3 |
| Push button | Level 2 |
| Passive buzzer | Level 4 |
| PIR motion sensor | Level 5 |
| ADXL345 3-axis accelerometer (I2C) | Levels 6, 13 |
| All of the above | Level 7 (capstone) |
| MCP3008 SPI ADC + potentiometer | Levels 8, 11 |
| HC-SR04 ultrasonic distance sensor + voltage divider resistors | Level 9 |
| DS18B20 temperature sensor + relay module | Level 10 |
| Laser emitter module + LDR photoresistor module | Level 11 |
| Reed switch or Hall Effect sensor module | Level 12 |
| Spring vibration sensor | Level 13 |

> 💰 **Budget tip:** Most components are available in beginner electronics starter kits for under $20–$30. Search for "Raspberry Pi starter kit" or "Arduino components kit" on any major online retailer.

## 🔓 Level Locking

By default, all 13 levels are **unlocked** so learners can explore freely and skip around. Optional sequential level locking can be enabled by developers — see [Architecture & Tech Stack](Architecture) for details.