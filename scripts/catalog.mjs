import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../skills/', import.meta.url));

async function filesIn(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const name = prefix + entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Catalog must not contain symlinks: ${name}`);
    if (entry.isDirectory()) files.push(...await filesIn(join(directory, entry.name), `${name}/`));
    else if (entry.isFile()) files.push(name);
  }
  return files.sort();
}

export async function catalog(directory = root) {
  const skills = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(entry.name)) throw new Error('Invalid skill ID');
    const files = await filesIn(join(directory, entry.name));
    if (!files.includes('SKILL.md') || !files.includes('LICENSE')) throw new Error(`Incomplete skill: ${entry.name}`);
    const hash = createHash('sha256');
    for (const name of files) {
      const bytes = await readFile(join(directory, entry.name, name));
      hash.update(`${name}\0${bytes.length}\0`);
      hash.update(bytes);
    }
    skills.push({ name: entry.name, version: hash.digest('hex'), files });
  }
  return { skills };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const text = JSON.stringify(await catalog(), null, 2) + '\n';
  const target = join(root, 'index.json');
  if (process.argv.includes('--check')) {
    if (await readFile(target, 'utf8') !== text) throw new Error('Run node scripts/catalog.mjs after changing skills.');
    console.log('Skill catalog is current.');
  } else {
    await writeFile(target, text);
    console.log('Skill catalog updated.');
  }
}
