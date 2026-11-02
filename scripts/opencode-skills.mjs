// Shared by the Astro and Luvia Coder bootstraps. Downloads no executable code.
import { mkdirSync, readFileSync, writeFileSync, renameSync, lstatSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const source = 'https://raw.githubusercontent.com/maxcodefaster/agent-skills-toolbelt/main/skills/';

export function configure(home = homedir()) {
  const directory = join(home, '.config/opencode');
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  if (lstatSync(directory).isSymbolicLink()) throw new Error('OpenCode configuration directory is a symlink.');
  const path = join(directory, 'opencode.json');
  let config = {};
  try {
    if (!lstatSync(path).isFile()) throw new Error('OpenCode configuration is not a regular file.');
    config = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (!config || Array.isArray(config) || typeof config !== 'object'
    || (config.skills !== undefined && (!Array.isArray(config.skills) || config.skills.some(s => typeof s !== 'string')))) {
    throw new Error('Unexpected OpenCode configuration; existing settings were not changed.');
  }
  if (config.skills?.includes(source)) return;
  const temporary = join(directory, `.toolbelt-${process.pid}.json`);
  writeFileSync(temporary, JSON.stringify({ ...config, skills: [...(config.skills ?? []), source] }, null, 2) + '\n',
    { mode: 0o600, flag: 'wx' });
  renameSync(temporary, path);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) configure();
