# Adding New Content 📝

picklePi's curriculum and dictionary are completely driven by static TypeScript files. This makes it incredibly simple to add new content, fix typos, or modify existing lessons without touching a database.

## Adding a New Project

To add a new project, you'll need to modify the `curriculum` array in `src/data/curriculum.ts`.

1. Open `src/data/curriculum.ts`.
2. Append a new object conforming to the `Project` interface.
3. Ensure you provide all required sections (`overview`, `hardwareSetup`, `code`, `codeWalkthrough`, `conceptDeepDive`, `experimentMode`, `troubleshooting`).

### Example Project Stub:

```typescript
{
  id: 'p11-new-project',
  level: 11,
  levelName: 'Advanced Topics',
  title: 'My New Project',
  skillsLearned: ['New Skill 1', 'New Skill 2'],
  badgeEarned: 'Advanced Maker',
  content: {
    // ... populate the content pages following the structure of previous levels
  }
}
```

## Adding Dictionary Entries

The electronics and programming dictionary is located in `src/data/dictionary.ts`.

1. Open `src/data/dictionary.ts`.
2. Add a new object to the array with the following structure:

```typescript
{
  term: 'New Term',
  category: 'Electronics', // Must be 'Python', 'Raspberry Pi', or 'Electronics'
  definition: 'A clear, beginner-friendly explanation of the term.',
  example: 'An example of how it is used in code or hardware.'
}
```

*Note: The dictionary automatically sorts terms alphabetically on the frontend, so you can append your new term anywhere in the array!*