import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidProgress } from '../src/lib/progress';
import { fetchProgress, saveProgress, createLabEntry } from '../src/lib/api';

const empty = { projectStatuses: {}, badges: [], labNotebook: [] };
test('accepts saved progress and rejects shapes that crash rendering', () => {
  assert.equal(isValidProgress(empty), true);
  for (const value of [null, [], {...empty, badges: null}, {...empty, badges: [1]},
    {...empty, projectStatuses: null}, {...empty, projectStatuses: {p1: 'invalid'}},
    {...empty, labNotebook: [null]}, {...empty, labNotebook: [{}]}]) {
    assert.equal(isValidProgress(value), false);
  }
});
test('standalone browsing and saving never contact an unconfigured backend', async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('No backend'); };
  try {
    assert.equal(await fetchProgress(), null);
    await saveProgress(empty);
    assert.equal(await createLabEntry({ projectId: 'p1', whatWorked: 'LED', whatDidnt: '', whatChanged: '', oneThingLearned: 'GPIO' }), null);
    assert.equal(calls, 0);
  } finally { globalThis.fetch = original; }
});
