<div align="center">

# 🥒 picklePi

### A Gamified, Project-Based Electronics & Python Learning Platform for Raspberry Pi

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan.svg)](https://tailwindcss.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange.svg)](https://ai.google.dev)

**Learn electronics and Python programming through hands-on Raspberry Pi projects — one circuit at a time.**

[Getting Started](#-getting-started) •
[Features](#-features) •
[Curriculum](#-curriculum) •
[Project Structure](#-project-structure) •
[Tech Stack](#%EF%B8%8F-tech-stack) •
[Contributing](#-contributing)

</div>

---

## 📖 About

**picklePi** is a structured, gamified, project-based learning platform designed to teach electronics and Python programming using the Raspberry Pi. Learners progress from their first LED blink all the way to building a complete multi-module alarm system — across 7 carefully sequenced levels.

Every project on picklePi is more than just code. Each one is a full guided lesson:

- 📋 **Detailed hardware setup** — step-by-step wiring instructions with safety warnings
- 💻 **Complete, runnable Python code** — ready to copy and run on your Pi
- 📚 **Code walkthroughs** — every line explained in plain English
- 🔬 **Concept deep dives** — the physics, hardware, and software behind what you built
- 🧪 **Experiment challenges** — tweak, extend, and break things on purpose
- 🔧 **Troubleshooting guides** — common failures and how to fix them

Progress is tracked locally in your browser. Completing a project earns a badge and opens the next challenge.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎮 **Gamified Progress** | Earn unique badges as you complete each project |
| 📓 **Lab Notebook** | Structured reflection journal for every completed project |
| 📌 **GPIO Pinout Reference** | Interactive Raspberry Pi GPIO pin map built into the app |
| 📖 **Electronics Dictionary** | Searchable glossary of Python, Raspberry Pi, and Electronics terms |
| 🤖 **AI Integration** | Google Gemini AI support baked in for assisted learning |
| 📱 **Mobile Responsive** | Collapsible sidebar works on phones and tablets |
| 🔒 **Progress Persistence** | All progress saved to `localStorage` — survives page refreshes |
| 🎨 **Modern Dark UI** | Clean dark-themed interface with smooth animations via Motion |
| 📋 **One-Click Copy** | Copy any code example to clipboard instantly |
| 🔐 **Local HTTPS Dev** | Development server runs over HTTPS via `mkcert` |

---

## 🎓 Curriculum

picklePi ships with a 7-level curriculum that builds skills progressively. Each level introduces new hardware components and Python concepts that build on everything before it.

### Level Overview

| Level | Topic | Project | Skills | Badge |
|-------|-------|---------|--------|-------|
| **1** | Digital Output Basics | Hello, LED | `gpiozero LED`, `blink()`, `signal.pause()` | GPIO Initiate |
| **2** | Digital Input | Button Controls LED | `Button`, pull-up/down resistors, event-driven logic | Input Investigator |
| **3** | PWM & Analog Concepts | PWM Brightness | `PWMLED`, duty cycle, `pulse()`, for loops | PWM Tamer |
| **4** | Sensors & Reactive Systems | Buzzer Tones | `TonalBuzzer`, `Tone`, frequencies, musical notes | Signal Wrangler |
| **5** | Displays & User Feedback | Motion / Light Sensor | `MotionSensor`, callbacks, `when_motion` hooks, PIR warm-up | Sensor Specialist |
| **6** | Multi-Module Systems | LCD / OLED Output | I2C protocol, `RPLCD`, external libraries, string formatting | Display Master |
| **7** | Mini Capstone Projects | Multi-Module Alarm System | State machines, `SignalDevice`, system integration | Mini Systems Architect |

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
| LED + 220Ω–330Ω resistors | Levels 1, 2, 3 |
| Push button | Level 2 |
| Passive buzzer | Level 4 |
| PIR motion sensor | Level 5 |
| I2C LCD display (16×2) | Level 6 |
| All of the above | Level 7 (capstone) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [Git](https://git-scm.com/)
- A Raspberry Pi with Python 3 and `gpiozero` installed (for running the code examples)

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

3. **(Optional) Set up your Gemini API key**

   If you want to enable AI-assisted features, create a `.env` file in the project root:

   ```bash
   # .env
   GEMINI_API_KEY=your_api_key_here
   ```

   Get a free Gemini API key at [https://aistudio.google.com](https://aistudio.google.com). The app works fully without this key — AI features are simply inactive.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The server starts on `https://localhost:3000` (HTTPS is enabled automatically via `mkcert`). On first run, `mkcert` will generate a local certificate; your browser may ask you to trust it.

5. **Open in browser**

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
├── public/
│   └── images/                  # Static image assets
├── src/
│   ├── components/
│   │   ├── LandingView.tsx       # Home dashboard with "What's Next" cards
│   │   ├── Sidebar.tsx           # Navigation sidebar (desktop + mobile drawer)
│   │   ├── ProjectView.tsx       # Multi-page project content viewer
│   │   ├── ProgressTracker.tsx   # Badge gallery and completion statistics
│   │   ├── LabNotebookView.tsx   # Read-only list of lab notebook entries
│   │   ├── LabNotebookModal.tsx  # Structured form for recording a lab entry
│   │   ├── DictionaryView.tsx    # Searchable electronics/Python glossary
│   │   └── PinoutView.tsx        # Interactive Raspberry Pi GPIO pinout reference
│   ├── data/
│   │   ├── curriculum.ts         # All 7 projects: content, code, walkthroughs
│   │   └── dictionary.ts         # Glossary entries (Python, RPi, Electronics)
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

## 🛠️ Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| **React** | 19.0 | UI framework; hooks for all state management |
| **TypeScript** | 5.8 | Type safety across the entire codebase |
| **Vite** | 6.2 | Dev server, HMR, and production bundler |
| **Tailwind CSS** | 4.1 | Utility-first styling via `@tailwindcss/vite` plugin |
| **Motion** | 12.x | Declarative animations for UI transitions |
| **Lucide React** | 0.546 | Consistent SVG icon library |
| **Express** | 4.x | HTTP API server for backend persistence layer |
| **better-sqlite3** | 12.x | Embedded SQLite database driver |
| **dotenv** | 17.x | Environment variable loading for server config |
| **tsx** | 4.x | TypeScript execution for Node.js server scripts |
| **Google Gemini AI** | `@google/genai` | Optional AI assistance for learners |
| **mkcert** | via `vite-plugin-mkcert` | Auto-generates trusted local HTTPS certificates |
| **localStorage** | Browser native | Client-side progress persistence (current default) |

### Architecture Decisions

- **Client-first, backend-ready.** By default all state lives in the browser via `localStorage` — no server is required to run the app. A full relational database schema (`db-schema.txt`) and backend dependencies (`express`, `better-sqlite3`) are included for teams that want server-side user accounts and persistent progress.
- **Single-page application.** Navigation is tab-based state (`activeTab`) in `App.tsx` — no router library needed.
- **Static data.** The entire curriculum is defined as a typed TypeScript array in `src/data/curriculum.ts`, making it easy to read, edit, and extend.
- **Database schema.** `db-schema.txt` defines a normalized relational schema (PostgreSQL-compatible, adaptable to SQLite) covering users, project progress, badges, lab notebook entries, and the dictionary. It is designed to be a drop-in replacement for the `localStorage` data model.
- **Progressive level locking** is implemented but disabled by default (all levels unlocked). Re-enable it via the `isProjectLocked` function in `App.tsx`.

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

The **Dictionary** tab is a searchable glossary organized into three categories:

- **Python** — language concepts and gpiozero patterns
- **Raspberry Pi** — board-specific terms (BCM, GPIO, I2C, etc.)
- **Electronics** — hardware fundamentals (resistor, duty cycle, PIR, etc.)

### AI Integration

picklePi includes Google Gemini AI support via `@google/genai`. Provide a `GEMINI_API_KEY` in your `.env` to activate AI-assisted features. The key is injected at build time by Vite and never exposed in source control (`.env` is git-ignored).

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

---

## 🤝 Contributing

Contributions are welcome! These areas need the most help:

| Area | Examples |
|------|---------|
| 📝 **Project content** | Fully flesh out Levels 2–7 with complete page content |
| 🐛 **Bug fixes** | Open an issue or submit a PR |
| ✨ **New features** | Themes, export/import progress, accessibility improvements |
| 📖 **Documentation** | Improve this README, add inline comments |
| 🌐 **Translations** | Translate UI and curriculum content |

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide, including branching conventions, PR templates, and code style expectations.

---

## 🔒 Security

This project follows secure-by-default principles:

- All Python code examples include security hardening notes (using least-privilege GPIO, disabling unused interfaces, etc.)
- The `GEMINI_API_KEY` is never committed to source control — use `.env` locally
- No user data is sent to any server; all persistence is `localStorage`-only
- Dependencies are kept up to date

See [SECURITY_AUDIT.md](SECURITY_AUDIT.md) for a full audit of the codebase.

To report a security vulnerability, please open a GitHub issue marked `[SECURITY]`.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. You are free to use, modify, and distribute this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- The [Raspberry Pi Foundation](https://www.raspberrypi.org/) for making physical computing accessible to everyone
- The [gpiozero](https://gpiozero.readthedocs.io/) team for an outstanding Python GPIO library
- The open-source community behind React, Vite, TypeScript, and Tailwind CSS
- Google for the Gemini AI API
- All contributors who help make this project better

---

<div align="center">

**Made with 🥒 for makers, students, and curious minds everywhere**

[⬆ Back to Top](#-picklePi)

</div>
