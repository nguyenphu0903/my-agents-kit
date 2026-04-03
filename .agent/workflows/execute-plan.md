---
description: Execute an existing implementation plan methodically with verification checkpoints.
---

# /execute-plan - Execute a Written Plan

$ARGUMENTS

---

## Purpose

Use an existing plan file as the source of truth for implementation.

---

## Behavior

When `/execute-plan` is triggered:

1. Load the target plan file
2. Apply the `executing-plans` skill
3. If work should be isolated, apply `using-git-worktrees`
4. Execute tasks in order with verification after each meaningful step
5. Before reporting success, apply `verification-before-completion`

---

## Expected Input

```text
/execute-plan docs/PLAN-auth-fix.md
/execute-plan docs/PLAN-saas-dashboard.md
```

---

## Expected Output

```markdown
## Execute Plan

- Plan loaded: `[path]`
- Current task: [task]
- Verification: [command/result]
- Status: [blocked/in-progress/completed]
```

---

## Rules

- Do not improvise away the plan without surfacing the reason
- Stop when a blocker invalidates the plan
- Do not claim completion without fresh verification evidence
