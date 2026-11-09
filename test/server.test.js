import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdtemp, mkdir, copyFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';

const root = fileURLToPath(new URL('../', import.meta.url));

async function unusedPort() {
  const socket = createServer();
  await new Promise((resolve, reject) => {
    socket.once('error', reject);
    socket.listen(0, '127.0.0.1', resolve);
  });
  const { port } = socket.address();
  await new Promise((resolve) => socket.close(resolve));
  return port;
}

test('fresh checkout starts without secrets and serves read-only API and UI', { timeout: 15000 }, async (t) => {
  const work = await mkdtemp(path.join(tmpdir(), 'devswarm-test-'));
  t.after(() => rm(work, { recursive: true, force: true }));
  await mkdir(path.join(work, 'ui'));
  for (const file of ['index.html', 'app.html']) {
    await copyFile(path.join(root, 'ui', file), path.join(work, 'ui', file));
  }
  const port = await unusedPort();
  // A clean allowlist prevents a developer's real tokens and telemetry endpoints
  // from entering a test process. The temp cwd cannot load their .env either.
  const child = spawn(process.execPath, [path.join(root, 'src/server.js')], {
    cwd: work,
    env: { PATH: process.env.PATH, PORT: String(port), NODE_ENV: 'test' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let logs = '';
  child.stdout.on('data', (data) => { logs += data; });
  child.stderr.on('data', (data) => { logs += data; });
  child.on('error', (err) => { logs += err.message; });
  t.after(async () => {
    if (child.exitCode === null && child.signalCode === null) {
      const exited = once(child, 'exit');
      child.kill('SIGKILL');
      await exited;
    }
  });
  const base = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      const res = await fetch(`${base}/api/models`, { signal: AbortSignal.timeout(200) });
      if (res.ok) { ready = true; break; }
    } catch { /* wait for startup */ }
    if (child.exitCode !== null) break;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  assert.ok(ready, `Server did not start: ${logs}`);
  assert.match(logs, new RegExp(`DevSwarm on http://127\\.0\\.0\\.1:${port}`));

  const models = await (await fetch(`${base}/api/models`)).json();
  assert.deepEqual(Object.keys(models.roles).sort(), ['backend', 'critic', 'doctor', 'frontend', 'planner']);
  assert.deepEqual(models.promoted, {});
  assert.equal((await (await fetch(`${base}/api/config`)).json()).exporting, false);
  assert.deepEqual(await (await fetch(`${base}/api/generations`)).json(), { apps: [] });
  assert.deepEqual(await (await fetch(`${base}/api/apps`)).json(), { running: [] });

  for (const route of ['/', '/app']) {
    const res = await fetch(`${base}${route}`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /text\/html/);
    assert.match(await res.text(), /DevSwarm/i);
  }
  const invalid = await fetch(`${base}/api/generate`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}'
  });
  assert.equal(invalid.status, 400);
  assert.match((await invalid.json()).error, /prompt/);
  assert.equal((await fetch(`${base}/api/unknown`)).status, 404);
});
