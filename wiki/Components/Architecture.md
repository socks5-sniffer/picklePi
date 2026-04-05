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