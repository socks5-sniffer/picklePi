# Contributing to picklePi

First off, thank you for considering contributing to picklePi! It's people like you that make this learning platform better for everyone.

## 🎯 Ways to Contribute

### 📝 Content Contributions (Most Needed!)
- **Complete or expand curriculum projects** — The curriculum has 13 projects across multiple levels. New projects, additional pages within existing projects, and corrections to existing content are all welcome.
- **Add dictionary terms** — The interactive dictionary currently has 258 terms across Python, Raspberry Pi, Electronics, Beginner, and Security categories. New terms that appear in curriculum content are especially valuable.
- **Write Tutorials** — Help explain complex concepts
- **Improve Existing Content** — Fix errors, clarify instructions, add examples

### 🐛 Bug Reports
Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS, Node version)

### 🔒 Security Vulnerabilities
**Do not open a public issue for security vulnerabilities.** Please follow the responsible disclosure process in [`SECURITY.md`](./SECURITY.md). A private channel is available for sensitive reports.

### ✨ Feature Requests
Have an idea? Open an issue with:
- Clear description of the feature
- Why it would be useful
- How it might work

### 🎨 Design Improvements
- UI/UX enhancements
- Accessibility improvements (aria labels, keyboard navigation, focus management)
- Responsive design fixes
- Icon or illustration additions

### 📖 Documentation
- Fix typos or unclear instructions
- Add examples or screenshots
- Improve code comments
- Update the wiki pages in `wiki/Components/`

---

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/picklePi.git
   cd picklePi
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start the dev server**:
   ```bash
   npm run dev
   ```
   > **Note:** The dev server defaults to `--host=0.0.0.0` (all interfaces). If you don't need LAN access, you can run `npx vite --port=3000` instead to bind to localhost only.

---

## 📋 Development Guidelines

### Code Style
- Use **TypeScript** for all new code
- Follow the existing component structure
- Use **functional components** with hooks
- Keep components **small and focused**
- Add **JSDoc comments** for complex functions
- Do not use `dangerouslySetInnerHTML` without sanitization — React's JSX auto-escaping is the preferred approach

### Writing Project Content

When adding new project content to `src/data/curriculum.ts`:

1. **Follow the existing structure** (see Level 1 "Hello, LED" as the reference template)
2. **Include all sections**:
   - `overview` — description, concepts, difficulty (1–5), estimatedTime
   - `hardwareSetup` — warnings, steps (rendered as interactive accordion), explanation
   - `code` — complete, working, tested Python code
   - `codeWalkthrough` — section-by-section explanation (rendered as collapsible items)
   - `conceptDeepDive` — hardware, software, and connection explanations
   - `experimentMode` — tweak, logic, and creative challenges
   - `troubleshooting` — common issues and solutions (rendered as collapsible items)

3. **Multi-page projects** — If a project is complex enough to warrant multiple pages, use the `pages` array. Each page has its own `id`, `title`, and `content` object following the same structure above.

4. **Test your code** on actual Raspberry Pi hardware before submitting
5. **Use clear, beginner-friendly language** — the primary audience is students new to electronics and Python
6. **Add safety warnings** in `hardwareSetup.warnings` where appropriate (electrical hazards, polarity, mains voltage, etc.)

### Adding Dictionary Terms

The dictionary in `src/data/dictionary.ts` powers the `InteractiveText` component — clickable highlighted terms throughout all project content. When you introduce a new concept in curriculum content, check whether it needs a dictionary entry.

**Available categories:** `'Python'` | `'Raspberry Pi'` | `'Electronics'` | `'Beginner'` | `'Security'`

Each entry must include:
```typescript
{
  term: 'Your Term',           // exact text that will be highlighted in content
  category: 'Electronics',
  definition: 'Clear, beginner-friendly definition.',
  example: 'A concrete example showing the term in context'
}
```

**Guidelines:**
- Use the `'Beginner'` category for foundational concepts (binary, analog, digital, etc.) aimed at first-time learners
- Use the `'Security'` category for security-relevant concepts (least privilege, fail-safe, etc.)
- Keep definitions concise but complete — they appear in a modal popup
- The `example` field should ideally relate to Raspberry Pi or the project kit hardware

> **Note:** After updating `dictionary.ts`, you can regenerate the companion JSON files for cloud use by running:
> `npx tsx _export.ts` (or the equivalent export script if one is added to `package.json`)

### Commit Messages

Write clear, descriptive commit messages following the convention used in this repo:

```bash
# Good
git commit -m "feat: add Level 8 RGB LED mixer project with multi-page layout"
git commit -m "fix: correct LED polarity wording in Level 1 hardware setup"
git commit -m "docs: add dictionary entries for PWM and duty cycle"
git commit -m "a11y: add aria-labels to sidebar navigation buttons"

# Not so good
git commit -m "updates"
git commit -m "fix"
git commit -m "changes"
```

Conventional commit prefixes: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `a11y`, `perf`

### Before Submitting

- [ ] Code compiles without TypeScript errors (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Test your changes in the browser at multiple viewport sizes
- [ ] For curriculum content: tested on actual Raspberry Pi hardware
- [ ] For dictionary additions: verify the term is highlighted correctly in the relevant project pages
- [ ] No hardcoded secrets, API keys, or credentials
- [ ] No `eval()`, `Function()`, or `dangerouslySetInnerHTML` without documented justification
- [ ] Update relevant documentation or wiki pages if needed

---

## 🔄 Pull Request Process

This project includes a [pull request template](./.github/PULL_REQUEST_TEMPLATE.md) that will be pre-filled when you open a PR. Please complete all sections.

1. **Update your fork** with the latest main branch:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```
3. **Open a Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what you changed and why
   - Screenshots or screen recordings for UI changes
   - Reference any related issues (`Fixes #123`)

4. **Automated checks** — the following CI checks run on every PR and must pass:
   - **Build** — `npm run build` must succeed
   - **Lint** — ESLint (including security plugin) must pass
   - **CodeQL** — semantic code analysis for security issues
   - **OWASP Dependency Check** — known CVE scan across all dependencies
   - **Gitleaks** — secret scanning across the commit history

5. **Respond to feedback** — reviewers may request changes; please address them promptly

---

## 🗂️ Project Structure (Quick Reference)

```
picklePi/
├── src/
│   ├── components/         # React components
│   │   ├── ProjectView.tsx       # Main project renderer (hardware steps, walkthrough, troubleshooting)
│   │   ├── InteractiveText.tsx   # Highlights and links dictionary terms in content
│   │   ├── DefinitionModal.tsx   # Modal popup for dictionary term definitions
│   │   └── Sidebar.tsx           # Navigation sidebar
│   ├── data/
│   │   ├── curriculum.ts   # All project content (source of truth)
│   │   └── dictionary.ts   # All 258+ dictionary term definitions
│   └── types.ts            # TypeScript type definitions
├── wiki/Components/        # Wiki documentation pages
├── curriculum.json         # Auto-generated JSON export of curriculum.ts
├── dictionary.json         # Auto-generated JSON export of dictionary.ts
├── SECURITY_AUDIT.md       # Ongoing security audit log
├── SECURITY.md             # Vulnerability disclosure policy
└── CONTRIBUTING.md         # This file
```

---

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behaviour as described in [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

---

## 🙏 Thank You!

Your contributions, no matter how small, make a huge difference. Every bug fix, content addition, and documentation improvement helps create a better learning experience for students and makers around the world.

Happy coding! 🥒⚡
