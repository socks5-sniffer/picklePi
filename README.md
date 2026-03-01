# 🥒 picklePi

<div align="center">

**A gamified, project-based learning platform for mastering electronics and Python with the Raspberry Pi**

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

[Features](#-features) • [Getting Started](#-getting-started) • [Curriculum](#-curriculum) • [Screenshots](#-screenshots) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**picklePi** is an interactive web application designed to teach electronics fundamentals through hands-on projects. Whether you're a beginner exploring GPIO pins for the first time or an intermediate maker building multi-module systems, this platform provides structured, step-by-step guidance with a gamified learning experience.

### 🎯 Perfect For

- **Students** learning electronics and embedded systems
- **Educators** teaching Raspberry Pi and Python programming
- **Makers** wanting structured project progression
- **Hobbyists** building their electronics skills systematically

> *"Pickle your way through electronics, one byte at a time!"* 🥒⚡

---

## ✨ Features

### 🎮 Gamified Learning Experience
- **7 Progressive Levels** - From basic LED control to complex multi-module systems
- **Badge System** - Earn badges as you complete projects
- **Progress Tracking** - Visual dashboard showing your learning journey
- **Level Unlocking** - Master fundamentals before advancing (optional)

### 📚 Comprehensive Project Guides
Each project includes:
- **Hardware Setup** with safety warnings and step-by-step wiring instructions
- **Complete Code** with syntax highlighting and copy-to-clipboard functionality
- **Code Walkthrough** breaking down each section
- **Concept Deep Dive** explaining hardware, software, and their connection
- **Experiment Mode** with challenges to extend your learning
- **Troubleshooting Guide** for common issues

### 📓 Lab Notebook
- Document your experiments and findings
- Record what worked, what didn't, and what you learned
- Build a personal portfolio of completed projects

### 🎨 Modern, Responsive UI
- Clean, professional design built with Tailwind CSS
- **Fully responsive** - works perfectly on desktop, tablet, and mobile
- **Collapsible mobile menu** with hamburger navigation
- Dark-themed sidebar with intuitive navigation
- Smooth animations and transitions

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite 6.2
- **Styling:** Tailwind CSS 4.1
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect)
- **Data Persistence:** localStorage
- **Type Safety:** Full TypeScript coverage

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor ([VS Code](https://code.visualstudio.com/) recommended)
- A Raspberry Pi (for running the actual projects)

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

3. **Set up environment variables** (optional)

   ```bash
   cp .env.example .env
   ```

   *Note: The Gemini API key is optional and only needed if you plan to add AI features.*

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to <http://localhost:3000> (or the port shown in your terminal)

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📚 Curriculum

The learning path is organized into 7 progressive levels:

| Level | Focus Area | Project | Skills Learned | Badge Earned |
|-------|-----------|---------|----------------|--------------|
| **1** | Digital Output Basics | Hello, LED | GPIO Basics, Digital Out, Python | GPIO Initiate |
| **2** | Digital Input | Button Controls LED | Digital Input, Pull-up/down resistors, Conditionals | Input Investigator |
| **3** | PWM & Analog | PWM Brightness Control | PWM, Duty Cycle, Fading | PWM Tamer |
| **4** | Sensors & Reactive Systems | Buzzer Tones | Frequencies, Active/Passive Buzzers | Signal Wrangler |
| **5** | Displays & User Feedback | Motion or Light Sensor | Analog/Digital Sensors, Event Detection | Sensor Specialist |
| **6** | Multi-Module Systems | LCD/OLED Output | I2C/SPI, Libraries, String Formatting | Display Master |
| **7** | Mini Capstone | Multi-Module Alarm System | State Machines, Integration, System Design | Mini Systems Architect |

### Current Status

✅ **Level 1** - Fully implemented with complete content  
🚧 **Levels 2-7** - Structure in place, content in development

---

## 🖼️ Screenshots

### Progress Tracker Dashboard
Track your journey through all 7 levels with a comprehensive view of completed projects, earned badges, and skills learned.

![Progress Tracker](docs/screenshots/progress-tracker.png)

### Interactive Code View
Each project includes complete, tested code with syntax highlighting and one-click copy functionality.

![Code View](docs/screenshots/code-view.png)

### Hardware Setup Guide
Step-by-step wiring instructions with safety warnings to ensure you build circuits correctly and safely.

![Hardware Setup](docs/screenshots/hardware-setup.png)

> 💡 **Note:** Add your screenshots to `docs/screenshots/` folder before publishing to GitHub.

---

## 📁 Project Structure

```
picklePi/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx              # Navigation and level selection
│   │   ├── ProjectView.tsx          # Main project content display
│   │   ├── ProgressTracker.tsx      # Progress dashboard
│   │   ├── LabNotebookModal.tsx     # Lab entry form
│   │   └── LabNotebookView.tsx      # Lab notebook viewer
│   ├── data/
│   │   └── curriculum.ts            # All project content and structure
│   ├── types.ts                     # TypeScript interfaces
│   ├── App.tsx                      # Main application logic
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Key Files

- **`src/data/curriculum.ts`** - Contains all project data. Edit this to add or modify projects.
- **`src/types.ts`** - TypeScript interfaces defining the data structure.
- **`src/App.tsx`** - Main state management and routing logic.

---

## 🎓 How to Use

### For Learners

1. **Start at Level 1** - Begin with "Hello, LED" to learn the basics
2. **Follow the Project Guide** - Each project has detailed instructions
3. **Build the Circuit** - Use your Raspberry Pi and components
4. **Run the Code** - Copy the code and test it on your Pi
5. **Complete the Lab Notebook** - Document your learnings
6. **Earn Your Badge** - Unlock the next level!

### For Educators

1. **Fork this repository** for your class
2. **Customize the curriculum** in `src/data/curriculum.ts`
3. **Add or modify projects** to match your lesson plans
4. **Enable/disable level locking** in `src/App.tsx`
5. **Students can track progress** individually in their browsers

---

## 🔧 Configuration

### Level Locking

By default, level locking is **disabled** for testing. To enable it:

1. Open `src/App.tsx`
2. Find the `isProjectLocked` function
3. Uncomment the logic that checks previous level completion
4. Students will now need to complete each level before advancing

### Adding New Projects

To add a new project:

1. Open `src/data/curriculum.ts`
2. Add a new `Project` object following the existing structure
3. Fill in all required fields (or set `content: null` for placeholder)
4. The app will automatically render your new project!

---

## 🤝 Contributing

Contributions are welcome! Whether it's:

- 🐛 Bug fixes
- 📝 Content for Levels 2-7
- ✨ New features
- 📖 Documentation improvements
- 🎨 UI/UX enhancements

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Write clean, documented TypeScript code
- Follow the existing component structure
- Test your changes thoroughly
- Update documentation as needed

---

## 🗺️ Roadmap

- [ ] Complete content for Levels 2-7
- [ ] Add video tutorials for each project
- [ ] Create circuit diagrams/illustrations
- [ ] Add search functionality
- [ ] Implement export/import of lab notebook
- [ ] Add dark/light theme toggle
- [ ] Create mobile app version
- [ ] Add multiplayer/classroom features
- [ ] Integration with online code simulators
- [ ] Community project showcase

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Vite will automatically try another port
# Or specify a different port:
npm run dev -- --port 3001
```

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Run type checking
npm run lint
```

For more help, please [open an issue](https://github.com/socks5-sniffer/picklePi/issues).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Raspberry Pi Foundation** - For creating an amazing learning platform
- **React Team** - For the excellent framework
- **Vite Team** - For the blazing-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide Icons** - For the beautiful icon set

---

## 📞 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/socks5-sniffer/picklePi/issues)
- **Discussions:** [GitHub Discussions](https://github.com/socks5-sniffer/picklePi/discussions)

---

<div align="center">

**Built with ❤️ for makers, learners, and educators**

⭐ **Star this repo** if you find it helpful! ⭐

</div>
