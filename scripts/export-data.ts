import { writeFileSync } from 'node:fs';
import { curriculum } from '../src/data/curriculum';
import { dictionary } from '../src/data/dictionary';

for (const [name, content] of Object.entries({ curriculum, dictionary })) {
  writeFileSync(new URL(`../data/${name}.json`, import.meta.url), JSON.stringify(content, null, 2) + '\n');
}
console.log('Updated backend curriculum and dictionary snapshots.');
