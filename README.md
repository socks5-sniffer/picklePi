# Raspberry Pi Electronics Lab

A structured, gamified, project-based learning system for electronics and Python, built with React, Tailwind CSS, and Vite.

## Local Development Setup (VS Code)

To run this project locally in VS Code, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Visual Studio Code](https://code.visualstudio.com/)

### Installation

1. **Clone or Download the Repository**
   Open the project folder in VS Code.

2. **Install Dependencies**
   Open the integrated terminal in VS Code (\`Ctrl + \`\`) and run:
   ```bash
   npm install
   ```

3. **Environment Variables**
   Copy the \`.env.example\` file to a new file named \`.env\`:
   ```bash
   cp .env.example .env
   ```
   *(Note: For this specific frontend-only app, the Gemini API key is not strictly required unless you add AI features later, but it's good practice to set it up).*

4. **Start the Development Server**
   Run the following command to start the Vite dev server:
   ```bash
   npm run dev
   ```
   
5. **View the App**
   Open your browser and navigate to the URL provided in the terminal (usually \`http://localhost:3000\` or \`http://localhost:5173\`).

### Building for Production

To create a production build, run:
```bash
npm run build
```
The compiled assets will be in the \`dist\` directory. You can preview the production build locally using:
```bash
npm run preview
```

## Project Structure

- \`src/components/\`: React components (Sidebar, ProjectView, ProgressTracker, etc.)
- \`src/data/curriculum.ts\`: The core curriculum data, including project steps, code, and explanations.
- \`src/types.ts\`: TypeScript interfaces for the application state and data models.
- \`src/App.tsx\`: Main application component handling state and routing between tabs.

## Customization

To add more projects or fill out the content for Levels 2-7, edit the \`src/data/curriculum.ts\` file. The app is designed to automatically render the content based on this data structure.

Currently, the level locking mechanism is temporarily disabled for testing. To re-enable it, uncomment the logic in \`isProjectLocked\` inside \`src/App.tsx\`.
