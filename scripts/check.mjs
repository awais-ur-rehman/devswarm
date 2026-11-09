import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const ignored = new Set(['.git', 'node_modules', 'generated', 'vendor', 'coverage', 'playwright-report', 'test-results']);
let checked = 0;
let failed = false;

async function check(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignored.has(entry.name)) await check(file);
    } else if (entry.isFile() && /\.(?:js|mjs)$/.test(file)) {
      const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
      checked++;
      if (result.error || result.status !== 0) {
        failed = true;
        console.error(`${file}: ${result.error?.message || result.stderr}`);
      }
    } else if (entry.isFile() && file.endsWith('.json')) {
      checked++;
      try { JSON.parse(await readFile(file, 'utf8')); }
      catch (err) { failed = true; console.error(`${file}: ${err.message}`); }
    }
  }
}

await check('.');
console.log(`Checked ${checked} JavaScript and JSON files.`);
if (failed) process.exitCode = 1;
