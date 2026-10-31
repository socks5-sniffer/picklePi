<div align="center">

# 🥒 picklePi

### A friendly workshop for learning Python and electronics, one project at a time

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Read a lesson in your browser. Build it with a Raspberry Pi when you’re ready.**

[Start here](#getting-started) · [Explore the projects](#the-projects) · [Contribute](#contributing)

</div>

---

## Welcome to the workshop

picklePi is a self-paced collection of guided projects for learning Python and electronics. Start with a simple LED, then follow your curiosity toward buttons, sensors, displays, and larger builds. Younger learners can work with a parent, teacher, or another grown-up; adults can jump in wherever they like.

The web app and the physical projects are separate parts of the experience:

- **The web app** runs in a browser. You can read lessons, explore the dictionary and GPIO reference, and track your progress without owning a Raspberry Pi.
- **The hardware projects** use a Raspberry Pi and electronic components. You’ll need the listed parts and a Pi to connect circuits and run the lesson’s Python code. The app itself does not run that code for you.

A project can guide you through what you’re building, how to wire it, a Python example, explanations, experiments, and troubleshooting. Lessons are designed to move from simple ideas toward more involved systems. Read, try a step, make a change, and see what happens. There’s no need to rush.

For younger makers, ask a grown-up to help check the wiring before connecting power. Keep electronics dry, handle components gently, and follow the safety notes in each lesson.

## What you can explore

- **Guided projects:** 13 projects with hardware instructions, code, explanations, and activities.
- **Progress and badges:** Mark projects as you work through them. All projects are currently available to browse; badges are recorded when you complete a project reflection.
- **Lab notebook:** Record what worked, what surprised you, and what you learned.
- **Dictionary:** Look up Python, Raspberry Pi, electronics, beginner, and security terms. Highlighted terms in lessons open their definitions.
- **GPIO reference:** Explore Raspberry Pi pin names and functions.
- **Light and dark themes:** Choose a comfortable reading view; the preference is saved in your browser.

Progress and theme preferences are stored in browser `localStorage`. There is no sign-in in the default app, and local progress is tied to that browser.

## The projects

The curriculum has 13 projects, ordered from introductory circuits to more involved combinations of sensors and components. You can browse any project; levels are not currently locked.

| Level | Project | A few things you’ll explore |
|---:|---|---|
| 1 | Hello, RGB LED | GPIO output, colors, and controlling several pins |
| 2 | Button Controls LED | Digital input, buttons, and event callbacks |
| 3 | PWM Brightness | Brightness and pulse-width modulation |
| 4 | Buzzer Tones | Frequencies and musical notes |
| 5 | Motion / Light Sensor | Sensor input and reacting to motion |
| 6 | Tilt & Shake Detector | I2C and accelerometer readings |
| 7 | Multi-Module Alarm System | Combining components and organizing program state |
| 8 | Twist to Control | Analog readings, SPI, and a potentiometer |
| 9 | Sonar Proximity Alert | Distance readings and threshold logic |
| 10 | The Smart Guardian | Temperature sensing and fail-safe design |
| 11 | The Laser Tripwire | Light sensing and beam-break detection |
| 12 | The Magnetic Deadbolt | Magnetic sensors and tamper detection |
| 13 | The Silent Guardian | Vibration sensing and impact detection |

Each lesson includes an overview, hardware setup, code, a code walkthrough, concept explanations, experiments, and troubleshooting. Some projects may be more involved than others; check each lesson’s parts and safety notes before you begin. The parts list varies by project, so check the lesson before buying components.

## Getting started

### To read and explore

You need a computer with a modern browser. No Raspberry Pi or electronics kit is needed to browse the app.

### To run this project locally

You’ll need [Node.js 22.19 or newer](https://nodejs.org/) and [Git](https://git-scm.com/). In a terminal:

```bash
git clone https://github.com/socks5-sniffer/picklePi.git
cd picklePi
npm install
npm run dev
```

Open `https://localhost:3000`. The development server uses a local HTTPS certificate through `vite-plugin-mkcert`; follow its prompts if it needs to set up or trust that certificate. The configured development server listens on all network interfaces, but accessing it from another device is not supported by the local certificate and HMR policy.

### To build with the hardware

You’ll also need a Raspberry Pi with GPIO pins and the components listed in each lesson. The hardware examples use Python and libraries such as `gpiozero`; install the libraries specified by the lesson on the Pi. The web app can run on a separate computer while you work with the Pi. Check your wiring carefully before connecting power.

### Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the local HTTPS development server on port 3000 |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build over HTTP on port 4173 |
| `npm run lint` | Run TypeScript checking (`tsc --noEmit`) |
| `npm test` | Run TypeScript unit tests |
| `npm run test:e2e` | Run Playwright browser tests (install Chromium with `npx playwright install chromium`) |
| `npm run test:curriculum` | Check lesson Python snippets against simulated hardware; needs Python 3 and `gpiozero==2.0.1` |
| `npm run export:data` | Refresh exported curriculum and dictionary JSON files |

## How the app is put together

The frontend is a React and TypeScript single-page app built with Vite. Curriculum and dictionary content live in `src/data/`; the app stores progress and theme settings in browser `localStorage`. The production frontend is a static site and can be served by a static host.

This repository also contains an optional Flask API and Firebase integration scaffold in [`backend/`](backend/), plus a database schema in [`data/db-schema.txt`](data/db-schema.txt). These pieces are not configured as a ready-to-use account or cross-device sync feature. The default app works without the backend; see [`backend/README.md`](backend/README.md) for backend setup, architecture, security, and API details.

### Project structure

```text
src/
├── components/       # App views and reusable interface components
├── data/
│   ├── curriculum.ts # Lesson content and Python examples
│   └── dictionary.ts # Glossary entries
├── hooks/            # Progress and theme state hooks
├── lib/              # API, navigation, and progress helpers
├── App.tsx           # App composition and view selection
└── types.ts          # Shared TypeScript types
backend/              # Optional Flask API and Firebase integration scaffold
wiki/Components/      # Component documentation
CONTRIBUTING.md       # Contributor guide
SECURITY.md           # Security policy and vulnerability reporting
```

## Contributing

Contributions are welcome, including clearer explanations, lesson corrections, accessibility improvements, bug fixes, and new project content. You don’t need to be an electronics expert to help improve a typo or make an explanation easier to follow.

Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, content guidelines, checks, and the pull request process. Please use the private reporting instructions in [SECURITY.md](SECURITY.md) for security vulnerabilities rather than posting sensitive details publicly.

## Security and project notes

The repository includes security headers and automated checks; see [`SECURITY.md`](SECURITY.md), [`SECURITY_AUDIT.md`](SECURITY_AUDIT.md), and [`OWASP_IMPLEMENTATION.md`](OWASP_IMPLEMENTATION.md) for the project’s policies and implementation notes. The default frontend stores progress in the browser. The optional backend requires configuration before it can provide server-backed features.

## License

picklePi is available under the [MIT License](LICENSE).

---

<div align="center">

**A small project can teach a big idea. Happy making! 🥒**

[Back to top](#-picklepi)

</div>
