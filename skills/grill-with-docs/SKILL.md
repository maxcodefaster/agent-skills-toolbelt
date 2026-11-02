---
name: grill-with-docs
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go. Use only when the user explicitly invokes grill-with-docs.
disable-model-invocation: true
license: MIT, see LICENSE
metadata:
  source: mattpocock/skills
---

Requires the `grilling` and `domain-modeling` skills. Load both using the host's skill mechanism, then follow both workflows. If either skill is unavailable, stop and tell the user to install it rather than silently running an incomplete workflow.
