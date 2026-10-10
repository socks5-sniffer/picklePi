import { spawnSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { curriculum } from '../src/data/curriculum';

const snippets = curriculum.flatMap(project => {
  const content = project.content;
  if (!content) return [];
  const pages = content.pages?.length ? content.pages : [{ id: project.id, content }];
  return pages.filter(page => page.content.code.trim()).map(page => ({ id: page.id, code: page.content.code }));
});
if (snippets.length !== curriculum.length) throw new Error('Expected one complete script per lesson');
const filename = join(tmpdir(), `picklepi-lessons-${randomUUID()}.json`);
try {
  writeFileSync(filename, JSON.stringify(snippets));
  const result = spawnSync(process.env.PYTHON ?? 'python', [
    fileURLToPath(new URL('./check_curriculum_snippets.py', import.meta.url)),
    '--runtime', '--snippets-json', filename,
  ], { stdio: 'inherit' });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  unlinkSync(filename);
}
