---
description: Run an explicit review pass on recent changes or a target file/feature.
---

# /review - Review Changes

$ARGUMENTS

---

## Purpose

Trigger a focused review using the repo's review skills.

---

## Behavior

When `/review` is triggered:

1. Apply `requesting-code-review`
2. Use `code-review-checklist`
3. Focus on bugs, regressions, risks, and missing tests first
4. If review feedback already exists, apply `receiving-code-review`

---

## Examples

```text
/review src/auth/login.ts
/review recent checkout flow changes
/review before merge
```
