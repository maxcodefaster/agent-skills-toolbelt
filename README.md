# Agent Skills Toolbelt

My opinionated daily-driver skills for software engineering with OpenCode,
Codex, Claude Code, and other agents that support the
[Agent Skills standard](https://agentskills.io).

This is the small set I want available for every project: clear communication,
better planning, root-cause debugging, parallel problem-solving, safer reviews,
and an audit trail when work runs unattended. I recommend using it as a strong
starting point, then adapting the skills to match how you build software.

## Skills

| Skill | Use it for |
| --- | --- |
| `unslop` | Remove generic AI phrasing and make writing direct and readable. |
| `bro` | Restate the previous response in plain human language. |
| `grill-with-docs` | Stress-test an idea while refining project terminology and decisions. |
| `arena` | Produce parallel solutions, judge them, and synthesize the strongest result. |
| `diagnosing-bugs` | Reproduce failures and find the root cause before applying a fix. |
| `wizard` | Generate a guided script for steps only a human can perform. |
| `blast-radius` | Find and verify what a local change could break elsewhere. |
| `show-me-your-work` | Keep a reviewable TSV decision trail for long-running work. |
| `impeccable` | Design and refine UI, review UX and accessibility, polish existing interfaces. |

`grill-with-docs` depends on `grilling` and `domain-modeling`. Installing the
whole toolbelt includes both. When selecting skills manually, select all three.

## Install

The [`skills`](https://github.com/vercel-labs/skills) CLI supports OpenCode,
Codex, Claude Code, Cursor, and many other agents.

Install the complete toolbelt. This is the recommended path and includes all
nine daily drivers plus the two dependencies required by `grill-with-docs`:

```bash
npx skills add maxcodefaster/agent-skills-toolbelt --skill '*'
```

Or clone it and install from the local checkout:

```bash
git clone https://github.com/maxcodefaster/agent-skills-toolbelt.git
cd agent-skills-toolbelt
npx skills add . --skill '*'
```

Install every skill globally for OpenCode:

```bash
npx skills add maxcodefaster/agent-skills-toolbelt \
  --global --agent opencode --skill '*' --yes
```

Install the complete toolbelt for several agents:

```bash
npx skills add maxcodefaster/agent-skills-toolbelt \
  --agent opencode --agent codex --agent claude-code \
  --skill '*'
```

The skills CLI chooses the supported skill directory for each selected agent.
Restart OpenCode after installation so a running session sees the new
definitions.

### Coder: one catalog for Astro and Luvia

OpenCode 2 can read this public repository as a native HTTP skill catalog.
Both Coder templates add this source to the global configuration, preserving
personal models, permissions, MCP servers and additional skill sources:

```json
{
  "skills": [
    "https://raw.githubusercontent.com/maxcodefaster/agent-skills-toolbelt/main/skills/"
  ]
}
```

No separate GitHub login, npm installer or copy in the application repo is
needed. OpenCode caches the skill files and loads their instructions on demand.
After a published update, run `opencode reload` in each existing workspace.
New workspaces already use the catalog.

For example: `Use @impeccable to critique the settings page` or
`Use @impeccable to polish this form without changing its behavior`.
Repository-specific rules, brand constraints and approval gates still apply.

Impeccable includes its references and launcher. The optional design engine is
downloaded on first use at its pinned version and verified against the bundled
checksums. Installing the skills does not enable design hooks, change model
accounts or modify project design documents.

## Maintaining upstream copies

`upstreams.json` records the reviewed source revisions and directories.
Compare upstream changes with these revisions, retain the portability changes
and explicit-only skill gates, and review any new dependencies before updating.
Do not blindly overwrite the collection from upstream.

After changing any skill or supporting file:

```bash
node scripts/catalog.mjs
npm test
```

The catalog's version is a digest of every file in the skill, so OpenCode
invalidates cached references and scripts as well as `SKILL.md`. Publish the
catalog together with the reviewed skills.

## Invoke

Agent Skills do not define one universal command syntax. Invoke the same skill
using the mechanism provided by your agent:

| Agent | Example |
| --- | --- |
| OpenCode | `Use the grill-with-docs skill for this plan.` |
| Codex | `$grill-with-docs` |
| Claude Code | `/grill-with-docs` |

OpenCode discovers the installed definitions and loads them through its native
`skill` tool. A slash command in OpenCode is a separate, OpenCode-specific
configuration feature, so this harness-agnostic repository does not create
slash-command wrappers.

> [!NOTE]
> OpenCode loads skills on demand. To apply `unslop` to every response, add
> `"~/.agents/skills/unslop/SKILL.md"` to the `instructions` array in
> `~/.config/opencode/opencode.json`, then restart OpenCode.

## Repository layout

Each directory under `skills/` is a standalone package:

```text
skills/
  diagnosing-bugs/
    SKILL.md
    scripts/
```

Supporting files use paths relative to their skill directory. The skill bodies
stay as close as possible to their upstream versions. Only Cursor-specific
paths, model names, transcript locations, and delegation syntax were replaced
with equivalent capabilities supplied by the current agent harness, including
simple sequential fallbacks when a host cannot delegate work.

## Sources

This collection carries selected skills from
[`backnotprop/pstack`](https://github.com/backnotprop/pstack) and
[`mattpocock/skills`](https://github.com/mattpocock/skills). Both sources are
MIT licensed. The only changes make harness-specific instructions portable.
Impeccable is Apache-2.0 licensed. See [NOTICE.md](NOTICE.md) for per-skill attribution.

Each skill carries its own `LICENSE` because installers copy skill directories
independently and do not include this repository's root files. This keeps the
required upstream MIT notice with every installed copy.

## License

The collection's own code is [MIT](LICENSE). Vendored skills retain their
individual MIT or Apache-2.0 licenses.
