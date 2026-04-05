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