# Contributing to picklePi

First off, thank you for considering contributing to picklePi! It's people like you that make this learning platform better for everyone.

## 🎯 Ways to Contribute

### 📝 Content Contributions (Most Needed!)
- **Complete Level 2-7 Projects** - We need detailed project content following the Level 1 template
- **Write Tutorials** - Help explain complex concepts
- **Improve Existing Content** - Fix errors, clarify instructions, add examples

### 🐛 Bug Reports
Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS, Node version)

### ✨ Feature Requests
Have an idea? Open an issue with:
- Clear description of the feature
- Why it would be useful
- How it might work

### 🎨 Design Improvements
- UI/UX enhancements
- Accessibility improvements
- Responsive design fixes
- Icon or illustration additions

### 📖 Documentation
- Fix typos or unclear instructions
- Add examples or screenshots
- Improve code comments
- Translate documentation

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

## 📋 Development Guidelines

### Code Style
- Use **TypeScript** for all new code
- Follow the existing component structure
- Use **functional components** with hooks
- Keep components **small and focused**
- Add **JSDoc comments** for complex functions

### Writing Project Content

When adding new project content to `src/data/curriculum.ts`:

1. **Follow the existing structure** (see Level 1 "Hello, LED" as template)
2. **Include all sections**:
   - Overview (description, concepts, difficulty, time)
   - Hardware Setup (warnings, steps, explanation)
   - Complete Code (working, tested code)
   - Code Walkthrough (section-by-section explanation)
   - Concept Deep Dive (hardware, software, connection)
   - Experiment Mode (tweak, logic, creative challenges)
   - Troubleshooting (common issues and solutions)

3. **Test your code** on actual Raspberry Pi hardware
4. **Use clear, beginner-friendly language**
5. **Add safety warnings** where appropriate

### Example Project Structure

```typescript
{
  id: 'p2',
  level: 2,
  levelName: 'Digital Input',
  title: 'Button controls LED',
  skillsLearned: ['Digital In', 'Pull-up/down resistors', 'Conditionals'],
  badgeEarned: 'Input Investigator',
  content: {
    overview: {
      description: 'Your clear, engaging description here...',
      concepts: ['Concept 1', 'Concept 2', 'Concept 3'],
      difficulty: 2,
      estimatedTime: '20 mins'
    },
    // ... rest of the structure
  }
}
```

### Commit Messages

Write clear, descriptive commit messages:

```bash
# Good
git commit -m "Add Level 2 Button Controls LED project content"
git commit -m "Fix LED polarity diagram in Level 1"
git commit -m "Improve Lab Notebook modal UX"

# Not so good
git commit -m "updates"
git commit -m "fix"
git commit -m "changes"
```

### Before Submitting

- [ ] Code compiles without errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Test your changes in the browser
- [ ] Update documentation if needed
- [ ] Add yourself to CONTRIBUTORS.md (if it exists)

## 🔄 Pull Request Process

1. **Update your fork** with the latest main branch:
   ```bash
   git remote add upstream https://github.com/socks5-sniffer/picklePi.git
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
   - Screenshots for UI changes
   - Reference any related issues (`Fixes #123`)

4. **Respond to feedback** - Reviewers may request changes

5. **Celebrate!** 🎉 Your contribution helps learners worldwide!

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Raspberry Pi GPIO Documentation](https://www.raspberrypi.org/documentation/usage/gpio/)

## 🤔 Questions?

Not sure about something? Feel free to:
- Open an issue with your question
- Start a discussion on GitHub Discussions
- Ask in your pull request

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and considerate in your interactions.

### Expected Behavior

- Be kind and courteous
- Respect differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## 🙏 Thank You!

Your contributions, no matter how small, make a huge difference. Every bug fix, content addition, and documentation improvement helps create a better learning experience for students and makers around the world.

Happy coding! 🚀
