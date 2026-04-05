# Features 🌟

picklePi is more than a collection of code snippets. This page describes every built-in feature in detail.

---

## 📖 Electronics Dictionary

The **Dictionary** tab is a searchable glossary of **100+ terms** organized into three categories:

| Category | Contents |
|----------|----------|
| **Python** | Language fundamentals, gpiozero classes, and programming patterns used in the curriculum. |
| **Raspberry Pi** | Board-specific concepts — GPIO, BCM numbering, I2C, SPI, UART, SSH, raspi-config, and more. |
| **Electronics** | Hardware fundamentals — voltage, current, resistance, duty cycle, PIR, PWM, resistor types, and more. |

### How to use it
1. Click the **Dictionary** tab in the sidebar.
2. Use the search box to filter terms by keyword — results update in real-time.
3. Click a category button to filter by Python, Raspberry Pi, or Electronics only.

### Interactive Term Highlighting
Throughout every project page, technical terms that exist in the dictionary are **automatically highlighted** in the content. Click any highlighted term to see its definition in a pop-up modal — without leaving the page or opening a new tab.

---

## 📌 GPIO Pinout Reference

The **Pinout** tab provides an interactive reference for all **40 Raspberry Pi GPIO pins** — physical pin numbers, BCM numbers, power pins, ground pins, and special-function pins (I2C, SPI, UART, hardware PWM).

The layout matches the actual Raspberry Pi 3B+ (and all other 40-pin Pi models) so you can use it as a live companion while you wire up your breadboard. Key safety rules are displayed alongside the diagram:

- GPIO pins run at **3.3V logic** — never connect a 5V signal directly.
- Each GPIO pin can safely source/sink up to **16 mA**.
- Total current from all 3.3V pins combined: **~50 mA max**.
- Always power off the Pi before changing wiring.

---

## 🎮 Progress & Badge System

As you work through the curriculum, picklePi tracks your progress automatically.

| Status | When it's set |
|--------|---------------|
| **Not Started** | Default state for every project. |
| **In Progress** | Set the moment you open a project. |
| **Completed** | Set only after you submit a Lab Notebook entry for that project. |

Every completed project awards the badge defined for that level (e.g., *GPIO Initiate*, *PWM Tamer*, *Systems Architect*). Badges are displayed in the **Progress** tab as a visual collection.

All progress is stored in your browser's `localStorage` under the key `rpi-lab-progress` — no account or internet connection required.

---

## 📓 Lab Notebook

When you mark a project as complete, a structured reflection modal appears. It prompts you to fill in four fields:

| Field | Prompt |
|-------|--------|
| `What worked` | What worked as expected? |
| `What didn't` | What didn't work or surprised you? |
| `What changed` | What did you change from the original instructions? |
| `One thing learned` | The single most important thing you learned. |

Completed entries are saved to your progress and viewable in the **Lab Notebook** tab at any time. This turns the app into a personal engineering journal — a record of everything you built and learned.

---

## 📱 Mobile Responsive Layout

The sidebar is fully collapsible on both desktop and mobile. On narrow screens, a hamburger-style toggle appears so you can navigate between tabs without losing screen space on the project content.

---

## 📋 One-Click Code Copy

Every code block in the app has a **Copy** button. Clicking it copies the entire Python script to your clipboard so you can paste it straight into your Pi's terminal, Thonny editor, or any text editor — no manual selection needed.

---

## 🔐 Local HTTPS Development Server

The development server runs over **HTTPS** by default via `mkcert`. This enables full browser security features during development (e.g., `navigator.clipboard` for the copy button) and mirrors the security posture of a production deployment.

---

## 🍓 Raspberry Pi 3B+ Pilot

picklePi was developed and piloted on the **Raspberry Pi 3B+**. All 13 projects have been validated against the 3B+'s 40-pin GPIO header, power envelope, and supported communication interfaces (I2C on GPIO 2/3, SPI on GPIO 10/11, hardware PWM on GPIO 12/13/18/19, 1-Wire on GPIO 4).

The app itself can be run directly on the Pi 3B+ as a local web server (see [Getting Started](Getting-Started) for setup instructions), making it a fully self-contained learning environment — the learner builds circuits on the Pi while the curriculum runs on the same device.
