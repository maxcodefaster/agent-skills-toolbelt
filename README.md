# Agent Skills Toolbelt

My opinionated daily-driver skills for software engineering with OpenCode,
Codex, Claude Code, and other agents that support the
[Agent Skills standard](https://agentskills.io).

This is the small set I want available for every project: clear communication,
better planning, root-cause debugging, parallel problem-solving, safer reviews,
and an audit trail when work runs unattended. I recommend using it as a strong
starting point, then adapting the skills to match how you build software.

[![Agent Skills](https://skills.sh/b/maxcodefaster/agent-skills-toolbelt)](https://skills.sh/maxcodefaster/agent-skills-toolbelt)

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

## License

[MIT](LICENSE)
