# Adding New Content 📝

picklePi's curriculum and dictionary are completely driven by static TypeScript files. This makes it incredibly simple to add new content, fix typos, or modify existing lessons without touching a database.

## Adding a New Project

To add a new project, you'll need to modify the `curriculum` array in `src/data/curriculum.ts`.

1. Open `src/data/curriculum.ts`.
2. Create an object conforming to the `Project` interface and add it to the `curriculum` array.
3. Ensure you provide all required sections (`overview`, `hardwareSetup`, `code`, `codeWalkthrough`, `conceptDeepDive`, `experimentMode`, `troubleshooting`).

### Example Project Shape

`ProjectContent` requires the overview, hardware, code, walkthrough, deep dive, experiment, and troubleshooting fields even when you also add optional pages. Each page's `content` must provide the same fields as `PageContent`.

```typescript
const newProject: Project = {
  id: 'p14-new-project',
  level: 14,
  levelName: 'Advanced Topics',
  title: 'My New Project',
  skillsLearned: ['New Skill 1'],
  badgeEarned: 'Advanced Maker',
  content: {
    overview: { description: 'Project summary.', concepts: ['GPIO'], difficulty: 1, estimatedTime: '20 mins' },
    hardwareSetup: { warnings: [], steps: ['Connect the component.'], explanation: 'Explain the circuit.' },
    code: 'from gpiozero import LED; led = LED(17); led.on()',
    codeWalkthrough: [{ section: 'LED setup', explanation: 'Create and blink the LED.' }],
    conceptDeepDive: { hardware: 'Hardware notes.', software: 'Software notes.', connection: 'How they work together.' },
    experimentMode: { tweak: 'Change the blink rate.', logic: 'Add a button.', creative: 'Build a signal pattern.' },
    troubleshooting: [{ issue: 'LED stays off.', solution: 'Check the wiring and GPIO number.' }]
  }
};
```

Import `Project` from `src/types.ts`. For a multi-page project, add a `pages` array and give every page a complete `PageContent` object; use an existing project as the page template.

## Adding Dictionary Entries

The electronics and programming dictionary is located in `src/data/dictionary.ts`.

1. Open `src/data/dictionary.ts`.
2. Add a new object to the array with the following structure:

```typescript
{
  term: 'New Term',
  category: 'Electronics', // 'Python' | 'Raspberry Pi' | 'Electronics' | 'Beginner' | 'Security'
  definition: 'A clear, beginner-friendly explanation of the term.',
  example: 'An example of how it is used in code or hardware.'
}
```

*Note: The dictionary view sorts terms alphabetically, so you can append your new term anywhere in the source array.*
