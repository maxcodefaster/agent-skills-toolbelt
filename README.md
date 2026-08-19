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

`grill-with-docs` depends on `grilling` and `domain-modeling`. Installing the
whole toolbelt includes both. When selecting skills manually, select all three.

## Install

The [`skills`](https://github.com/vercel-labs/skills) CLI supports OpenCode,
Codex, Claude Code, Cursor, and many other agents.

Install the complete toolbelt. This is the recommended path and includes all
eight daily drivers plus the two dependencies required by `grill-with-docs`:

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

### Always-on unslop in OpenCode

Agent Skills are loaded on demand. The phrase `Must always apply` in a skill's
description cannot force OpenCode to load it on every turn. To make `unslop`
part of every OpenCode session, add its installed file to the global
`instructions` array in `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["~/.agents/skills/unslop/SKILL.md"]
}
```

Merge this field into any existing config rather than replacing other settings.
Restart OpenCode after changing the config. The regular skill remains available
for explicit rewriting requests; the instruction entry applies its writing
rules to every response.

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
See [NOTICE.md](NOTICE.md) for per-skill attribution.

Each skill carries its own `LICENSE` because installers copy skill directories
independently and do not include this repository's root files. This keeps the
required upstream MIT notice with every installed copy.

## License

[MIT](LICENSE)
