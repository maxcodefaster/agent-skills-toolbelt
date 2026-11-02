import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, symlinkSync, statSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { catalog } from '../scripts/catalog.mjs';
import { configure, source } from '../scripts/opencode-skills.mjs';

function fixture(t) {
  const home = mkdtempSync(join(tmpdir(), 'toolbelt-test-'));
  t.after(() => rmSync(home, { recursive: true, force: true }));
  const directory = join(home, '.config/opencode');
  mkdirSync(directory, { recursive: true });
  return { home, directory, path: join(directory, 'opencode.json') };
}

test('catalog contains all eleven licensed skills, supporting files and content versions', async () => {
  const { skills } = await catalog();
  assert.equal(skills.length, 11);
  for (const skill of skills) {
    assert.match(skill.version, /^[a-f0-9]{64}$/);
    assert.ok(skill.files.includes('LICENSE'));
    const text = readFileSync(new URL(`../skills/${skill.name}/SKILL.md`, import.meta.url), 'utf8');
    assert.match(text, new RegExp(`^---\\nname: ${skill.name}\\n`));
    assert.match(text, /\ndescription: .+/);
  }
  const ui = skills.find(s => s.name === 'impeccable');
  for (const path of ['reference/audit.md', 'reference/polish.md', 'scripts/impeccable', 'scripts/VERSION', 'scripts/engine-checksums.txt', 'NOTICE.md']) {
    assert.ok(ui.files.includes(path), path);
  }
  assert.deepEqual(await catalog(), { skills });
});

test('configuration preserves models, MCP, permissions, other skills and JSONC', t => {
  const f = fixture(t);
  const original = { model: 'test/model', mcp: { servers: { chrome: { type: 'local', command: ['chrome-devtools-mcp'] } } },
    permissions: [{ action: 'shell', resource: 'git push *', effect: 'ask' }], skills: ['./mine'] };
  writeFileSync(f.path, JSON.stringify(original));
  const jsonc = join(f.directory, 'opencode.jsonc');
  writeFileSync(jsonc, '// personal settings\n{"skills":["./jsonc-skills"],}\n');
  configure(f.home);
  assert.deepEqual(JSON.parse(readFileSync(f.path)), { ...original, skills: ['./mine', source] });
  assert.equal(readFileSync(jsonc, 'utf8'), '// personal settings\n{"skills":["./jsonc-skills"],}\n');
  assert.equal(statSync(f.path).mode & 0o777, 0o600);
  const before = readFileSync(f.path, 'utf8');
  configure(f.home);
  assert.equal(readFileSync(f.path, 'utf8'), before);
});

test('fresh home receives only the skill source', t => {
  const f = fixture(t);
  configure(f.home);
  assert.deepEqual(JSON.parse(readFileSync(f.path)), { skills: [source] });
});

test('malformed, unsupported and symlinked configuration is never replaced', t => {
  const f = fixture(t);
  for (const text of ['{broken', 'null', '[]', '{"skills":{}}', '{"skills":[42]}']) {
    writeFileSync(f.path, text);
    assert.throws(() => configure(f.home));
    assert.equal(readFileSync(f.path, 'utf8'), text);
  }
  rmSync(f.path);
  const target = join(f.home, 'target');
  writeFileSync(target, '{}');
  symlinkSync(target, f.path);
  assert.throws(() => configure(f.home));
  assert.equal(readFileSync(target, 'utf8'), '{}');
});

test('decision log helper keeps rows and neutralizes spreadsheet formulas', t => {
  const f = fixture(t);
  const file = join(f.home, 'decisions.tsv');
  const helper = new URL('../skills/show-me-your-work/scripts/log.sh', import.meta.url);
  for (const value of ['=1+1', '+payload', '-payload', '@payload']) {
    execFileSync('bash', [helper.pathname, file, 'check', value, 'why\nnext', 'evidence\tpath', 'passed']);
  }
  const lines = readFileSync(file, 'utf8').trim().split('\n');
  assert.equal(lines.length, 5);
  for (const row of lines.slice(1)) {
    assert.equal(row.split('\t').length, 6);
    assert.match(row.split('\t')[2], /^'[=+@-]/);
  }
});
