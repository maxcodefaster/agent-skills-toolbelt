# Notices

This repository contains portable copies of third-party skills. The individual
licenses travel with each skill. Reviewed upstream revisions and paths are in
`upstreams.json`. Harness-specific assumptions and explicit invocation gates are
adapted rather than blindly overwritten during updates.

## pstack

The following skills are adapted from
[`backnotprop/pstack`](https://github.com/backnotprop/pstack), itself a mirror
of the pstack package in `cursor/plugins`:

- `arena`
- `blast-radius`
- `bro`
- `show-me-your-work`
- `unslop`

```text
MIT License

Copyright (c) 2026 Lauren Tan
```

The original copyright notice and MIT permission and warranty terms are
reproduced in this repository's [LICENSE](LICENSE).

## Impeccable

`impeccable` is from [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable),
under Apache-2.0. Its complete license and upstream notices are in
[`skills/impeccable/LICENSE`](skills/impeccable/LICENSE) and
[`skills/impeccable/NOTICE.md`](skills/impeccable/NOTICE.md).
The setup command invokes the bundled launcher through `sh`, so it also works
when an HTTP catalog downloads supporting files without executable permissions.

## Matt Pocock's skills

The following skills are adapted from
[`mattpocock/skills`](https://github.com/mattpocock/skills):

- `diagnosing-bugs`
- `domain-modeling`
- `grill-with-docs`
- `grilling`
- `wizard`

```text
MIT License

Copyright (c) 2026 Matt Pocock
```

The original copyright notice and MIT permission and warranty terms are
reproduced in this repository's [LICENSE](LICENSE).
