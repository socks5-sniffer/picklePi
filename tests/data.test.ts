import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { curriculum } from '../src/data/curriculum';
import { dictionary } from '../src/data/dictionary';

test('backend snapshots contain the same lessons and definitions as the app', () => {
  for (const [name, content] of Object.entries({ curriculum, dictionary })) {
    assert.deepEqual(JSON.parse(readFileSync(new URL(`../data/${name}.json`, import.meta.url), 'utf8')), content,
      `Run npm run export:data after changing ${name}`);
  }
});
