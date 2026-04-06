# picklePi Combined Wiki Knowledge Base



---

## SOURCE: Components\Adding-New-Content.md

# Adding New Content 📝

picklePi's curriculum and dictionary are completely driven by static TypeScript files. This makes it incredibly simple to add new content, fix typos, or modify existing lessons without touching a database.

## Adding a New Project

To add a new project, you'll need to modify the `curriculum` array in `src/data/curriculum.ts`.

1. Open `src/data/curriculum.ts`.
2. Append a new object conforming to the `Project` interface.
3. Ensure you provide all required sections (`overview`, `hardwareSetup`, `code`, `codeWalkthrough`, `conceptDeepDive`, `experimentMode`, `troubleshooting`).

### Example Project Stub:

```typescript
{
  id: 'p11-new-project',
  level: 11,
  levelName: 'Advanced Topics',
  title: 'My New Project',
  skillsLearned: ['New Skill 1', 'New Skill 2'],
  badgeEarned: 'Advanced Maker',
  content: {
    // ... populate the content pages following the structure of previous levels
  }
}
```

## Adding Dictionary Entries

The electronics and programming dictionary is located in `src/data/dictionary.ts`.

1. Open `src/data/dictionary.ts`.
2. Add a new object to the array with the following structure:

```typescript
{
  term: 'New Term',
  category: 'Electronics', // Must be 'Python', 'Raspberry Pi', or 'Electronics'
  definition: 'A clear, beginner-friendly explanation of the term.',
  example: 'An example of how it is used in code or hardware.'
}
```

*Note: The dictionary automatically sorts terms alphabetically on the frontend, so you can append your new term anywhere in the array!*

---

## SOURCE: Components\Architecture.md

# Architecture & Tech Stack 🛠️

picklePi is built with modern web technologies, focusing on performance, type safety, and an excellent developer experience.

## ⚙️ Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| **React** | 19.0 | UI framework; hooks for all state management |
| **TypeScript** | 5.8 | Type safety across the entire codebase |
| **Vite** | 6.2 | Dev server, HMR, and production bundler |
| **Tailwind CSS** | 4.1 | Utility-first styling via `@tailwindcss/vite` plugin |
| **Motion** | 12.x | Declarative animations for UI transitions |
| **Lucide React** | 0.546 | Consistent SVG icon library |
| **Express** | 4.x | HTTP API server (optional backend persistence layer) |
| **better-sqlite3** | 12.x | Embedded SQLite database driver (optional) |
| **dotenv** | 17.x | Environment variable loading for server config |
| **mkcert** | via `vite-plugin-mkcert` | Auto-generates trusted local HTTPS certificates |
| **localStorage** | Browser native | Client-side progress persistence (current default) |

## 🏗️ Architecture Decisions

### 1. Client-first, Backend-ready
By default, all user state (progress, badges, lab notebook entries) lives in the browser via `localStorage`. This means no server is required to run or host the app — it deploys as a fully static site.

A full relational database schema (`db-schema.txt`) and backend dependencies (Express, better-sqlite3) are included for teams that want to migrate to server-side user accounts.

### 2. Single-Page Application (SPA)
Navigation is handled via tab-based state (`activeTab`) in `App.tsx`. There is no router library — this keeps the application lightweight, fast, and simple to understand for contributors.

### 3. Static Data Curriculum
The entire curriculum is defined as a statically typed TypeScript array in `src/data/curriculum.ts`. This makes it easy to read, edit, version-control, and extend without configuring a CMS or database connection.

### 4. Static Dictionary Data
The electronics and Python glossary lives in `src/data/dictionary.ts` as a typed TypeScript array. The `DictionaryView` component searches it in real-time via a filtered array. The `InteractiveText` component uses the same array to detect and highlight terms inside project content.

### 5. Progressive Level Locking
The application supports locking future levels until previous ones are completed. By default this feature is **disabled** — all levels are unlocked so learners can explore freely. Re-enable it by uncommenting the conditional logic inside the `isProjectLocked` function in `App.tsx`.

## 📁 Project Structure

```text
picklePi/
├── public/
│   └── images/                  # Static image assets
├── src/
│   ├── components/
│   │   ├── DefinitionModal.tsx   # Popup modal for dictionary term definitions
│   │   ├── DictionaryView.tsx    # Searchable electronics/Python glossary
│   │   ├── InteractiveText.tsx   # Highlights terms and shows definitions on click
│   │   ├── LabNotebookModal.tsx  # Structured form for recording a lab entry
│   │   ├── LabNotebookView.tsx   # Read-only list of lab notebook entries
│   │   ├── LandingView.tsx       # Home dashboard with "What's Next" cards
│   │   ├── PinoutView.tsx        # Interactive Raspberry Pi GPIO pinout reference
│   │   ├── ProgressTracker.tsx   # Badge gallery and completion statistics
│   │   ├── ProjectView.tsx       # Multi-page project content viewer
│   │   └── Sidebar.tsx           # Collapsible navigation sidebar (desktop + mobile)
│   ├── data/
│   │   ├── curriculum.ts         # All 13 projects: content, code, walkthroughs
│   │   └── dictionary.ts         # 100+ glossary entries (Python, RPi, Electronics)
│   ├── types.ts                  # Shared TypeScript interfaces
│   ├── App.tsx                   # Root component; routing, state, persistence
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles (Tailwind base + custom)
├── index.html                    # HTML shell with meta tags
├── metadata.json                 # App metadata (name, description, permissions)
├── package.json                  # Dependencies and npm scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite config (plugins, aliases, HTTPS, HMR)
├── db-schema.txt                 # Relational database schema for backend migration
├── CONTRIBUTING.md               # Contributor guide
├── SECURITY_AUDIT.md             # Security audit notes
└── LICENSE                       # MIT License
```

---

## SOURCE: Components\Curriculum-Overview.md

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

---

## SOURCE: Components\Features.md

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


---

## SOURCE: Components\Getting-Started.md

# Getting Started 🚀

This guide covers everything you need to run picklePi — whether you're a learner who just wants to explore the curriculum or a developer setting up a local environment.

---

## For Learners

### What You Need

| Item | Required? | Notes |
|------|-----------|-------|
| A modern web browser | ✅ Yes | Chrome, Firefox, Edge, or Safari |
| Node.js v18+ | ✅ Yes | [Download from nodejs.org](https://nodejs.org/) |
| Git | ✅ Yes | [Download from git-scm.com](https://git-scm.com/) |
| Raspberry Pi (any 40-pin model) | For running code | Not needed just to browse content |
| Python 3 + gpiozero on your Pi | For running code | Pre-installed on Raspberry Pi OS |

> 🖥️ **Just exploring?** You only need Node.js and Git — no Raspberry Pi required to read the curriculum, browse the dictionary, or check the GPIO pinout reference. You'll just need a Pi handy when you're ready to run the Python code.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/socks5-sniffer/picklePi.git
   cd picklePi
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The server starts on `https://localhost:3000`. HTTPS is enabled automatically via `mkcert`. On first run, your browser may ask you to trust the locally generated certificate — click **Accept** or **Trust**.

4. **Open in your browser**

   Navigate to `https://localhost:3000`.

---

## Running picklePi on Your Raspberry Pi 3B+

picklePi was piloted on the Raspberry Pi 3B+. You can run the full app directly on your Pi so the curriculum is right in front of you while you build circuits on the same device.

### Requirements on the Pi

- **Raspberry Pi OS** (Bookworm or Bullseye recommended)
- **Node.js v18+** — install via [NodeSource](https://github.com/nodesource/distributions):
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **Git**: `sudo apt install git`
- **Python 3 + gpiozero**: pre-installed on Raspberry Pi OS

### Setup on the Pi

Run the same steps as the standard installation above. After `npm run dev`, open the browser on your Pi and go to `https://localhost:3000`.

> 💡 **Tip:** You can also access the app from another device on the same network. The dev server binds to `0.0.0.0`, so navigate to `https://<your-pi-ip>:3000` from your laptop or phone.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start HTTPS dev server on port 3000 |
| `npm run build` | Compile TypeScript and create an optimised production build in `dist/` |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Delete the `dist/` build output directory |

---

## Deploying to Production

The production build is a fully static site — no server needed after build.

```bash
npm run build
```

The output in `dist/` can be deployed to any static host:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- Any web server that can serve static files (Nginx, Apache, Caddy)

---

## Troubleshooting Setup

| Problem | Solution |
|---------|----------|
| Browser says "Your connection is not private" | The local HTTPS certificate from `mkcert` is not yet trusted. Click **Advanced → Proceed** or import the `mkcert` root CA. |
| `npm run dev` fails with certificate error | Run `npx mkcert -install` once to install the local CA. |
| Port 3000 already in use | Change the port in `vite.config.ts` (`server.port`). |
| Node.js version too old | Run `node -v` to check. Upgrade to v18+ from [nodejs.org](https://nodejs.org/). |


---

## SOURCE: Components\Home.md

# Welcome to the picklePi Wiki! 🥒⚡

**picklePi** is a structured, gamified, project-based learning platform designed to teach electronics and Python programming using the Raspberry Pi.

This wiki is your central hub for understanding the app's curriculum, features, architecture, and how to get the most out of picklePi.

## 📖 What is picklePi?

picklePi guides learners from their very first LED blink all the way to building a complete physical tamper-monitoring security system — across **13 carefully sequenced levels**. No prior experience is needed: if you can plug in a USB cable and type on a keyboard, you are already qualified.

Every project is more than just code. Each one is a full guided lesson with seven structured sections (see [Curriculum Overview](Curriculum-Overview) for the full breakdown). Progress and badges are saved locally in your browser, so you can pick up exactly where you left off.

## 🚀 Quick Links

* [Curriculum Overview](Curriculum-Overview) — Explore all 13 levels, what each project teaches, and how every lesson is structured.
* [Features](Features) — The dictionary, GPIO pinout, lab notebook, badge system, and more.
* [Getting Started](Getting-Started) — Installation and setup for both learners and developers.
* [Architecture & Tech Stack](Architecture) — Deep dive into how picklePi is built.
* [Adding New Content](Adding-New-Content) — Learn how to add new projects and dictionary terms.

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎮 **Gamified Progress** | Earn unique badges as you complete each project — collect them all! |
| 📓 **Lab Notebook** | Structured reflection journal saved for every completed project. |
| 📌 **GPIO Pinout Reference** | Interactive Raspberry Pi 40-pin GPIO map — no more googling! |
| 📖 **Electronics Dictionary** | Searchable glossary of 100+ Python, Raspberry Pi, and Electronics terms. |
| 💡 **Interactive Term Highlighting** | Technical terms in project content are highlighted — click to see instant definitions. |
| 📱 **Mobile Responsive** | Collapsible sidebar works on phones and tablets. |
| 🔒 **Progress Persistence** | All progress saved to `localStorage` — survives page refreshes. |
| 🎨 **Modern Dark UI** | Clean dark-themed interface with smooth animations. |
| 📋 **One-Click Copy** | Copy any code example to clipboard instantly. |

## 🍓 Raspberry Pi 3B+ Pilot

picklePi was developed and piloted on the **Raspberry Pi 3B+**, making it an ideal companion for that board. All 13 projects have been validated against the 3B+'s 40-pin GPIO header, power limits, and supported communication interfaces (I2C, SPI, 1-Wire, UART). The built-in GPIO pinout reference reflects the exact pin layout of the 3B+ (and is compatible with all 40-pin Pi models including the Pi 4 and Pi 5).

> If you're using a different Pi model, every project still works — just verify that your board supports the interface required (e.g., SPI for Level 8, I2C for Level 6).

---

## SOURCE: Components\_Sidebar.md

### 🥒 picklePi Wiki
- [Home](Home)
- [Getting Started](Getting-Started)
- [Curriculum Overview](Curriculum-Overview)
- [Features](Features)
- [Architecture & Tech Stack](Architecture)
- [Adding New Content](Adding-New-Content)