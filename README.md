<div align="center">

# 🥒 picklePi

### A Gamified, Project-Based Electronics & Python Learning Platform for Raspberry Pi

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan.svg)](https://tailwindcss.com)
[![OWASP Security Scan](https://img.shields.io/badge/OWASP-Security%20Scan-orange.svg)](.github/workflows/owasp-security-scan.yml)

**Learn electronics and Python programming through hands-on Raspberry Pi projects — one circuit at a time.**

*Because the best way to learn how computers work is to make something blink, buzz, and occasionally catch you sneaking into the kitchen at midnight.*

[Getting Started](#-getting-started) •
[Features](#-features) •
[Curriculum](#-curriculum) •
[Project Structure](#-project-structure) •
[Tech Stack](#%EF%B8%8F-tech-stack) •
[Contributing](#-contributing)

</div>

---

## 📖 About

**picklePi** is a structured, gamified, project-based learning platform designed to teach electronics and Python programming using the Raspberry Pi. Learners progress from their very first LED blink all the way to building a complete physical tamper-monitoring security system — across 13 carefully sequenced levels.

No prior experience needed. If you can plug in a USB cable and type on a keyboard, you're already qualified. 🎉

Every project on picklePi is more than just code. Each one is a full guided lesson:

- 📋 **Detailed hardware setup** — step-by-step wiring instructions with safety warnings
- 💻 **Complete, runnable Python code** — ready to copy and run on your Pi
- 📚 **Code walkthroughs** — every line explained in plain English
- 🔬 **Concept deep dives** — the physics, hardware, and software behind what you built
- 🧪 **Experiment challenges** — tweak, extend, and break things on purpose
- 🔧 **Troubleshooting guides** — common failures and how to fix them

Progress is tracked locally in your browser. Completing a project earns a badge and unlocks the next challenge.

---

## 🎯 Who Is This For?

picklePi is designed for **kids, teens, and curious people of all ages** who want to learn how electronics and programming work together — using real hardware they can hold in their hands.

| If you are… | picklePi can help you… |
|-------------|------------------------|
| 🧒 A beginner (age 10+) with no coding experience | Start from zero and build real things that blink and beep |
| 🎓 A student looking for a STEM project | Work through a full curriculum at your own pace |
| 👩‍🏫 A teacher or parent | Use it as a structured, self-guided learning companion |
| 🧑‍💻 A tinkerer who learns by doing | Skip ahead and dive into the projects that interest you |

> **Note for younger learners:** Some steps involve small electronic components and wires. It's always a good idea to have a grown-up nearby, especially when you're getting started. A few basics to keep in mind: handle components by their edges (not the metal pins), keep electronics away from water, don't force connections, and never connect components to power without double-checking your wiring first. Safety first — then blink the LED! 💡

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎮 **Gamified Progress** | Earn unique badges as you complete each project — collect them all! |
| 🏅 **Badge Detail Modal** | Click any badge in the Progress Tracker to see its full description and unlock requirements |
| 📓 **Lab Notebook** | Structured reflection journal for every completed project |
| 📌 **GPIO Pinout Reference** | Interactive Raspberry Pi GPIO pin map built into the app — no more googling! |
| 📖 **Electronics Dictionary** | Searchable glossary of 100+ Python, Raspberry Pi, Electronics, Beginner, and Security terms |
| 💡 **Interactive Term Highlighting** | Technical terms in project content are highlighted — click to see instant definitions |
| 📱 **Mobile Responsive** | Collapsible sidebar with toggle controls works on phones and tablets |
| 🔒 **Progress Persistence** | All progress saved to `localStorage` — survives page refreshes and accidental tab closes |
| 🌓 **Light/Dark Theme** | Toggle between dark and light mode — preference saved to `localStorage` |
| 🎨 **Modern UI** | Clean interface (dark by default) with smooth animations via Motion |
| 📋 **One-Click Copy** | Copy any code example to clipboard instantly |
| 🔐 **Local HTTPS Dev** | Development server runs over HTTPS via `mkcert` |

---

## 🎓 Curriculum

picklePi ships with a 13-level curriculum that builds skills progressively. Each level introduces new hardware components and Python concepts that build on everything before it. Think of it like a video game — Level 1 teaches you the controls, and by Level 13 you're building real physical security systems.

### Level Overview

| Level | Topic | Project | Skills | Badge |
|-------|-------|---------|--------|-------|
| **1** | Digital Output Basics | Hello, RGB LED | `gpiozero LED`, color mixing, `signal.pause()`, multiple GPIO control | GPIO Initiate |
| **2** | Digital Input | Button Controls LED | `Button`, pull-up/down resistors, event callbacks, source binding | Input Investigator |
| **3** | PWM & Analog Concepts | PWM Brightness | `PWMLED`, duty cycle, `pulse()`, background threads | PWM Tamer |
| **4** | Sensors & Reactive Systems | Buzzer Tones | `TonalBuzzer`, `Tone`, frequencies, musical notes | Signal Wrangler |
| **5** | Displays & User Feedback | Motion / Light Sensor | `MotionSensor`, `when_motion` callbacks, PIR warm-up | Sensor Specialist |
| **6** | Multi-Module Systems | Tilt & Shake Detector | I2C protocol, ADXL345 accelerometer, Adafruit CircuitPython library, 3-axis data | Motion Intelligence |
| **7** | Mini Capstone Projects | Multi-Module Alarm System | Enum state machines, `Threading.Event`, multi-component integration | Mini Systems Architect |
| **8** | Analog Input & ADC | Twist to Control | MCP3008 SPI ADC, `source`/`values` binding, voltage division, SPI protocol | Analog Alchemist |
| **9** | Distance Sensing | Sonar Proximity Alert | `DistanceSensor`, time-of-flight math, threshold logic, live terminal output | Sonar Scout |
| **10** | Full System Capstone | The Smart Guardian | DS18B20 1-Wire sensor, `OutputDevice` relay, filesystem reads, fail-safe design | Systems Architect |
| **11** | Optical Security | The Laser Tripwire | Laser emitter control, photoresistor analog reads, ambient light calibration, beam-break detection | Optical Guardian |
| **12** | Physical Security | The Magnetic Deadbolt | Hall Effect sensing, reed switch reads, pull-up/down resistors, sensor redundancy, tamper detection | Security Engineer |
| **13** | Vibration & Impact | The Silent Guardian | Spring vibration sensing, ADXL345 I2C, G-force vectors, impact detection, physical tamper monitoring | Inertial Defender |

### What Each Project Teaches

Each project is split into structured **pages** within the app:

1. **Project Overview** — what you're building and why
2. **Hardware Setup** — wiring diagram in plain English, with safety warnings
3. **The Code** — the complete Python script
4. **Code Walkthrough** — section-by-section explanation
5. **Concept Deep Dive** — hardware physics, software patterns, and how they connect
6. **Experiment Mode** — guided challenges to modify and extend the project
7. **Troubleshooting** — common issues and their fixes

### Hardware You'll Need

| Component | Used In |
|-----------|---------|
| Raspberry Pi (any GPIO model) | All levels |
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
| Laser emitter module + photoresistor (LDR) module | Level 11 |
| Reed switch or Hall Effect sensor module | Level 12 |
| Spring vibration sensor | Level 13 |

> 💰 **Budget tip:** Most of these components are available in beginner electronics starter kits for under $20–$30. Look for "Raspberry Pi starter kit" or "Arduino components kit" on any major online retailer.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer (v22 recommended — used by CI)
- [Git](https://git-scm.com/)
- A Raspberry Pi with Python 3 and `gpiozero` installed (for running the code examples)

> 🖥️ **Just want to explore the app?** You only need Node.js and Git — no Raspberry Pi required to browse projects, read the curriculum, or check out the GPIO pinout reference. You just won't be able to run the Python code until you have a Pi handy.

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

   The server starts on `https://localhost:3000` (HTTPS is enabled automatically via `mkcert`). On first run, `mkcert` will generate a local certificate; your browser may ask you to trust it.

4. **Open in browser**

   Navigate to `https://localhost:3000`

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start HTTPS dev server on port 3000 (accessible on your local network) |
| `npm run build` | Compile TypeScript and create an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Delete the `dist/` build output directory |

### Building for Production

```bash
npm run build
npm run preview
```

The production build is output to the `dist/` directory. It is a fully static site that can be served by any static file host (Netlify, GitHub Pages, Vercel, etc.).

---

## 📁 Project Structure

```text
picklePi/
├── backend/
│   ├── README.md                # Backend setup and API reference
│   ├── requirements.txt         # Python package dependencies (Flask backend)
│   └── .env.example             # Backend environment variable template
├── public/
│   └── images/                  # Static image assets
├── src/
│   ├── components/
│   │   ├── BadgeIcon.tsx         # SVG hexagon badge renderer with per-level colour themes
│   │   ├── BadgeModal.tsx        # Detail popup for badges (earned / locked state)
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
│   │   └── dictionary.ts         # 100+ glossary entries (Python, RPi, Electronics, Security)
│   ├── lib/
│   │   └── api.ts                # Fetch wrapper for all backend API endpoints
│   ├── types.ts                  # Shared TypeScript interfaces
│   ├── App.tsx                   # Root component; routing, state, theme, persistence
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles (Tailwind base + custom)
├── wiki/
│   └── Components/               # GitHub Wiki source files (markdown)
├── generate-level.ts             # CLI tool: AI-generates a new curriculum level via Gemini 2.5 Pro
├── export-wiki.ts                # CLI tool: combines wiki/ markdown files into wiki_knowledge_base.md
├── wiki_knowledge_base.md        # Combined wiki output (generated by export-wiki.ts)
├── curriculum.json               # Exported curriculum data (JSON)
├── dictionary.json               # Exported dictionary data (JSON)
├── gemini.md                     # Gemini secure coding guidelines for AI-assisted development
├── index.html                    # HTML shell with meta tags
├── metadata.json                 # App metadata (name, description, permissions)
├── package.json                  # Dependencies and npm scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite config (plugins, aliases, HTTPS, HMR, CSP headers)
├── db-schema.txt                 # Relational database schema for backend migration
├── CONTRIBUTING.md               # Contributor guide
├── OWASP_IMPLEMENTATION.md       # OWASP Top 10 implementation notes
├── SECURITY_AUDIT.md             # Security audit notes
└── LICENSE                       # MIT License
```

---

## 🐍 Backend

The backend is a **Flask (Python)** application that provides a secure REST API for token verification and persistent data storage. It lives in [`backend/`](backend/) and is documented in [`backend/README.md`](backend/README.md).

> **The backend is optional for local development.** The frontend runs fully standalone using `localStorage` for progress persistence. The API server is only required if you want server-side user accounts or persistent cross-device progress.

### Backend Documentation

See [`backend/README.md`](backend/README.md) for the full architecture description covering authentication, input sanitisation, security headers, secure error logging, and API endpoints. The `db-schema.txt` in the repository root defines the full relational schema used by the backend.

### API Endpoints

Sign-in happens client-side via the Firebase Auth SDK; the API verifies the resulting ID token on every authenticated (🔒) request and rejects any request whose `:userId` does not match the token's `uid`.

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET` | `/api/status` | — | Health check — returns `{"status": "online", "secure": true}` |
| `POST` | `/api/verify-token` | 🔒 | Validates a Firebase ID token and returns user identity |
| `GET` | `/api/progress/:userId` | 🔒 | Fetches the caller's full progress object |
| `PUT` | `/api/progress/:userId` | 🔒 | Persists the caller's progress object |
| `POST` | `/api/progress/:userId/notebook` | 🔒 | Creates a new lab notebook entry |
| `DELETE` | `/api/progress/:userId/notebook/:entryId` | 🔒 | Deletes a lab notebook entry |
| `GET` | `/api/curriculum` | — | Serves the full curriculum JSON |
| `GET` | `/api/dictionary` | — | Serves the full dictionary JSON |

### Frontend API Client

`src/lib/api.ts` provides typed wrappers around every endpoint. All calls fail silently — if the backend is unavailable, `localStorage` continues to handle persistence automatically.

---

## 🛠️ Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| **React** | 19.2 | UI framework; hooks for all state management |
| **TypeScript** | 6.0 | Type safety across the entire codebase |
| **Vite** | 8.0 | Dev server, HMR, and production bundler |
| **Tailwind CSS** | 4.1 | Utility-first styling via `@tailwindcss/vite` plugin |
| **Motion** | 12.x | Declarative animations for UI transitions |
| **Lucide React** | 1.14 | Consistent SVG icon library |
| **Express** | 5.2 | HTTP API server for backend persistence layer |
| **better-sqlite3** | 12.x | Embedded SQLite database driver |
| **@google/genai** | 2.x | Gemini AI SDK — powers the `generate-level.ts` curriculum generator |
| **dotenv** | 17.x | Environment variable loading for server config |
| **tsx** | 4.x | TypeScript execution for Node.js server scripts |
| **mkcert** | via `vite-plugin-mkcert` | Auto-generates trusted local HTTPS certificates |
| **localStorage** | Browser native | Client-side progress persistence (current default) |

### Architecture Decisions

- **Client-first, backend-ready.** By default all state lives in the browser via `localStorage` — no server is required to run the app. A full relational database schema (`db-schema.txt`) and backend dependencies (`express`, `better-sqlite3`) are included for teams that want server-side user accounts and persistent progress.
- **Single-page application.** Navigation is tab-based state (`activeTab`) in `App.tsx` — no router library needed.
- **Static data.** The entire curriculum is defined as a typed TypeScript array in `src/data/curriculum.ts`, making it easy to read, edit, and extend.
- **Database schema.** `db-schema.txt` defines a normalized relational schema (PostgreSQL-compatible, adaptable to SQLite) covering users, project progress, badges, lab notebook entries, and the dictionary. It is designed to be a drop-in replacement for the `localStorage` data model.
- **Progressive level locking** is implemented but disabled by default (all levels unlocked). Re-enable it via the `isProjectLocked` function in `App.tsx`.
- **Theme persistence.** The light/dark theme preference is stored in `localStorage` under `picklePi-theme` and applied via a `data-theme` attribute on the `<html>` element. Transitions are animated to avoid flashing.
- **AI-assisted content generation.** `generate-level.ts` uses the Gemini 2.5 Pro model via `@google/genai` to scaffold new curriculum levels on demand. Output is written to `src/data/generated-level-<N>.json` and requires a `GEMINI_API_KEY` in `.env`.

---

## 🔍 Feature Deep Dives

### Progress & Badge System

Progress is stored in a `UserProgress` object persisted to `localStorage` under the key `rpi-lab-progress`:

```typescript
interface UserProgress {
  projectStatuses: Record<string, 'Not Started' | 'In Progress' | 'Completed'>;
  badges: string[];
  labNotebook: LabEntry[];
}
```

- A project moves to **In Progress** the moment you click into it.
- A project moves to **Completed** only after you submit a Lab Notebook entry.
- Each completed project awards the `badgeEarned` string defined in `curriculum.ts`.

### Lab Notebook

When you complete a project, a modal prompts you to fill in a structured reflection:

| Field | Prompt |
|-------|--------|
| `whatWorked` | What worked as expected? |
| `whatDidnt` | What didn't work or surprised you? |
| `whatChanged` | What did you change from the original instructions? |
| `oneThingLearned` | The single most important thing you learned |

All entries are saved to `progress.labNotebook` and viewable in the **Lab Notebook** tab.

### GPIO Pinout Reference

The **Pinout** tab provides an interactive reference for all Raspberry Pi GPIO pins — physical pin numbers, BCM numbers, and function labels — without needing to leave the app or search the web.

### Electronics Dictionary

The **Dictionary** tab is a searchable glossary of 100+ terms organized into five categories:

- **Python** — language concepts and gpiozero patterns
- **Raspberry Pi** — board-specific terms (BCM, GPIO, I2C, etc.)
- **Electronics** — hardware fundamentals (resistor, duty cycle, PIR, etc.)
- **Beginner** — introductory concepts for learners new to electronics or programming
- **Security** — security concepts relevant to the projects and Python code

**Interactive Term Highlighting:** Throughout project content, technical terms from the dictionary are automatically highlighted. Click any highlighted term to see its definition in a popup — no need to leave the page or open a new tab.

---

## 🎨 Customization

### Adding a New Project

Add an entry to the `curriculum` array in `src/data/curriculum.ts`:

```typescript
{
  id: 'p8-servo',
  level: 8,
  levelName: 'Servo & Motor Control',
  title: 'Servo Motor',
  skillsLearned: ['AngularServo', 'PWM', 'Mechanical output'],
  badgeEarned: 'Motor Maven',
  content: {
    overview: {
      description: 'Control a servo motor with precise angle positioning.',
      concepts: ['AngularServo', 'PWM', 'Signal timing'],
      difficulty: 3,
      estimatedTime: '30 mins'
    },
    hardwareSetup: {
      warnings: ['Do not stall the servo against a hard stop — it will overheat.'],
      steps: ['Connect servo signal wire to GPIO 17', '...'],
      explanation: '...'
    },
    code: `from gpiozero import AngularServo\n...`,
    codeWalkthrough: [
      { section: 'AngularServo', explanation: '...' }
    ],
    conceptDeepDive: {
      hardware: '...',
      software: '...',
      connection: '...'
    },
    experimentMode: {
      tweak: 'Change the min_angle and max_angle values.',
      logic: 'Write a loop that sweeps the servo back and forth.',
      creative: 'Build a simple robotic arm or door latch.'
    },
    troubleshooting: [
      { issue: 'Servo jitters', solution: 'Use hardware PWM pin (GPIO 12 or 18).' }
    ]
  }
}
```

### Adding Dictionary Entries

Add entries to the array in `src/data/dictionary.ts`:

```typescript
{
  term: 'AngularServo',
  category: 'Raspberry Pi',
  definition: 'A gpiozero class for controlling servo motors by angle.',
  example: 'servo = AngularServo(17, min_angle=-90, max_angle=90)'
}
```

### Enabling Level Locking

By default `isProjectLocked()` in `App.tsx` always returns `false` (all levels unlocked). To require completing all projects in a level before unlocking the next, uncomment the logic block in that function:

```typescript
const isProjectLocked = (projectId: string) => {
  const project = curriculum.find(p => p.id === projectId);
  if (!project || project.level === 1) return false;
  const previousLevelProjects = curriculum.filter(p => p.level === project.level - 1);
  return !previousLevelProjects.every(p => progress.projectStatuses[p.id] === 'Completed');
};
```

### Disabling HTTPS in Development

If you prefer HTTP in development, remove the `mkcert()` plugin from `vite.config.ts`:

```typescript
// plugins: [react(), tailwindcss(), mkcert()],  // with HTTPS
plugins: [react(), tailwindcss()],               // without HTTPS
```

### AI-Assisted Level Generation

`generate-level.ts` uses the **Gemini 2.5 Pro** model to scaffold a complete new curriculum level from a topic and level number. It requires a `GEMINI_API_KEY` in your `.env` file (see `.env.example`).

```bash
# Generate a new level (e.g., Level 14 — RFID Reader with SPI)
npx tsx generate-level.ts
```

The generated JSON is saved to `src/data/generated-level-<N>.json`. Review it, merge it into `src/data/curriculum.ts`, and add the corresponding entry to the curriculum table above.

### Wiki Export

`export-wiki.ts` concatenates all Markdown files in the `wiki/` directory into a single `wiki_knowledge_base.md` file — useful as a knowledge-base snapshot for AI tooling or offline reference.

```bash
npx tsx export-wiki.ts
```

---

## 🤝 Contributing

Contributions are welcome — from anyone! You don't need to be an expert. Some of the most valuable contributions are fixing a typo, adding a clearer explanation, or writing a new project from your own experience.

These areas need the most help:

| Area | Examples |
|------|---------|
| 📝 **Project content** | Flesh out or improve content across any of the 13 levels |
| 🐛 **Bug fixes** | Open an issue or submit a PR |
| ✨ **New features** | Themes, export/import progress, accessibility improvements |
| 📖 **Documentation** | Improve this README, add inline comments |
| 🌐 **Translations** | Translate UI and curriculum content |

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide, including branching conventions, PR templates, and code style expectations.

---

## 🔒 Security

This project follows secure-by-default principles and implements comprehensive OWASP Top 10 security scanning:

### Security Features
- ✅ **Automated Security Scans**: Weekly OWASP Top 10 vulnerability scanning
- ✅ **Dependency Monitoring**: npm audit + OWASP Dependency-Check + Dependabot
- ✅ **Code Analysis**: CodeQL semantic analysis + ESLint security plugin
- ✅ **Secret Detection**: Gitleaks scanning for exposed credentials
- ✅ **Security Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- ✅ **Type Safety**: TypeScript strict mode for enhanced security
- ✅ **Privacy-First**: No user data sent to servers; localStorage-only persistence
- ✅ **Secure Code Examples**: All Python code includes security hardening notes

### Documentation
- 📋 [SECURITY.md](SECURITY.md) - Security policy and vulnerability reporting
- 📋 [SECURITY_AUDIT.md](SECURITY_AUDIT.md) - Comprehensive OWASP Top 10 audit report
- 📋 [OWASP_IMPLEMENTATION.md](OWASP_IMPLEMENTATION.md) - OWASP Top 10 implementation notes

### Reporting Vulnerabilities
To report a security vulnerability, please open a GitHub issue tagged `[SECURITY]`. See [SECURITY.md](SECURITY.md) for details.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. You are free to use, modify, and distribute this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- The [Raspberry Pi Foundation](https://www.raspberrypi.org/) for making physical computing accessible to everyone
- The [gpiozero](https://gpiozero.readthedocs.io/) team for an outstanding Python GPIO library that makes hardware fun
- The open-source community behind React, Vite, TypeScript, and Tailwind CSS
- All contributors who help make this project better
- AI coding assistants for helping bring this project to life
- Every kid who ever asked "but *why* does it blink?" — this one's for you 🥒⚡

---

<div align="center">

**Made with 🥒 for makers, students, and curious minds everywhere**

*Built with AI assistance — Go build something awesome. Seriously, what are you still reading for?*

[⬆ Back to Top](#-picklePi)

</div>
