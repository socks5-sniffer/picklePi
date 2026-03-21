# Architecture & Tech Stack 🛠️

picklePi is built with modern web technologies, focusing on performance, type safety, and an excellent developer experience.

## ⚙️ Tech Stack

* **Frontend Framework**: React 19.0
* **Language**: TypeScript 5.8
* **Build Tool**: Vite 6.2
* **Styling**: Tailwind CSS 4.1
* **Animations**: Motion 12.x
* **Icons**: Lucide React
* **Persistence**: `localStorage` (default, client-side)
* **Local Dev**: HTTPS via `mkcert`

## 🏗️ Architecture Decisions

### 1. Client-first, Backend-ready
By default, all user state (progress, badges, lab notebook entries) lives in the browser via `localStorage`. This means no server is required to run or host the app (it can be deployed entirely as a static site).
However, a full relational database schema (`db-schema.txt`) and backend dependencies (Express, better-sqlite3) are included for teams that want to migrate to server-side user accounts.

### 2. Single-Page Application (SPA)
Navigation is handled via tab-based state (`activeTab`) in `App.tsx`. We deliberately avoided adding a heavy routing library to keep the application lightweight, fast, and simple to understand for contributors.

### 3. Static Data Curriculum
The entire curriculum is defined as a statically typed TypeScript array in `src/data/curriculum.ts`. This makes it incredibly easy to read, edit, version-control, and extend without needing to configure a CMS or a database connection.

### 4. Progressive Level Locking
The application supports locking future levels until previous ones are completed. By default, this feature is disabled so learners can explore freely and skip around. It can be easily re-enabled by uncommenting the conditional logic inside the `isProjectLocked` function in `App.tsx`.