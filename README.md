<div align="center">

# 🥒 picklePi

### A Gamified Electronics & Python Learning Platform for Raspberry Pi

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan.svg)](https://tailwindcss.com)

**Learn electronics and Python programming through hands-on Raspberry Pi projects**

[Getting Started](#-getting-started) •
[Features](#-features) •
[Curriculum](#-curriculum) •
[Contributing](#-contributing)

</div>

---

## 📖 About

**picklePi** is a structured, project-based learning platform designed to teach electronics and Python programming using the Raspberry Pi. It takes learners from their first LED blink to building a complete multi-module alarm system through 7 progressive levels.

Each project includes:

- 📋 **Detailed hardware setup** with wiring instructions and safety warnings
- 💻 **Complete, tested Python code** ready to run on your Pi
- 📚 **Step-by-step code walkthroughs** explaining every concept
- 🔬 **Concept deep dives** bridging hardware and software knowledge
- 🧪 **Experiment challenges** to extend your learning
- 🔧 **Troubleshooting guides** for common issues

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎮 **Gamified Learning** | Earn badges as you complete projects and track your progress |
| 📓 **Lab Notebook** | Record observations, experiments, and learnings for each project |
| 📱 **Mobile Responsive** | Collapsible sidebar works seamlessly on phones and tablets |
| 🔒 **Progress Persistence** | Your progress saves locally and persists across sessions |
| 🎨 **Modern UI** | Clean, dark-themed interface with syntax-highlighted code blocks |
| 📋 **Copy Code** | One-click copy for all code examples |

---

## 🎓 Curriculum

picklePi features a 7-level curriculum that progressively builds your electronics and programming skills:

| Level | Project | Skills Learned | Badge Earned |
|-------|---------|----------------|--------------|
| **1** | Hello, LED | GPIO Basics, Digital Output, Basic Python | GPIO Initiate |
| **2** | Button Controls LED | Digital Input, Pull-up/down Resistors, Conditionals | Input Investigator |
| **3** | PWM Brightness | Pulse Width Modulation, Duty Cycle, For Loops | PWM Tamer |
| **4** | Buzzer Tones | Frequencies, Sound Waves, Active vs Passive Components | Signal Wrangler |
| **5** | Motion Sensor | Event Detection, Callbacks, PIR Sensors | Sensor Specialist |
| **6** | LCD Display | I2C Protocol, External Libraries, String Formatting | Display Master |
| **7** | Multi-Module Alarm System | State Machines, System Integration, Complex Logic | Mini Systems Architect |

### What You'll Need

**Hardware Requirements:**

- Raspberry Pi (any model with GPIO pins)
- Breadboard and jumper wires
- LEDs and resistors (220Ω or 330Ω)
- Push buttons
- Passive buzzer
- PIR motion sensor
- I2C LCD display (16x2)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [Git](https://git-scm.com/)

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

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 📁 Project Structure

```text
picklePi/
├── src/
│   ├── components/              # React UI components
│   │   ├── Sidebar.tsx          # Navigation & project list
│   │   ├── ProjectView.tsx      # Project content display
│   │   ├── ProgressTracker.tsx  # Badges & completion stats
│   │   ├── LabNotebookView.tsx  # Lab entries list
│   │   └── LabNotebookModal.tsx # Entry creation modal
│   ├── data/
│   │   └── curriculum.ts        # All project content & curriculum
│   ├── types.ts                 # TypeScript interfaces
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles & Tailwind
├── index.html                   # HTML template with SEO meta tags
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── tailwind.config.js           # Tailwind CSS configuration
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework with hooks-based state management |
| **TypeScript 5.8** | Type-safe JavaScript development |
| **Vite 6.2** | Fast build tool and dev server |
| **Tailwind CSS 4.1** | Utility-first styling |
| **Lucide React** | Beautiful, consistent icons |
| **localStorage** | Client-side progress persistence |

---

## 🎨 Customization

### Adding New Projects

Edit `src/data/curriculum.ts` to add new projects. Follow the existing structure:

```typescript
{
  id: 'p8',
  level: 8,
  levelName: 'Advanced Topic',
  title: 'Your Project Title',
  skillsLearned: ['Skill 1', 'Skill 2'],
  badgeEarned: 'Badge Name',
  content: {
    overview: { /* ... */ },
    hardwareSetup: { /* ... */ },
    code: `/* Your Python code */`,
    codeWalkthrough: [ /* ... */ ],
    conceptDeepDive: { /* ... */ },
    experimentMode: { /* ... */ },
    troubleshooting: [ /* ... */ ]
  }
}
```

### Enabling Level Locking

By default, all levels are unlocked for development. To enable progressive unlocking based on completion, modify the `isProjectLocked` function in `src/App.tsx`.

---

## 🤝 Contributing

Contributions are welcome! We especially need help with:

- 📝 **Content contributions** - Additional projects and tutorials
- 🐛 **Bug fixes** - Report issues or submit fixes
- ✨ **New features** - UI improvements, new components
- 📖 **Documentation** - Improve guides and explanations

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- The Raspberry Pi Foundation for creating an amazing platform for learning
- The open-source community for the incredible tools that make this possible
- All contributors who help improve this project

---

<div align="center">

**Made with 🥒 for makers, students, and curious minds everywhere**

[⬆ Back to Top](#-picklePi)

</div>
