---
description: Execute an existing plan using the repo's execute-plan workflow
argument-hint: [plan path]
---

Use the repository's execute-plan workflow for this task.

Context:
- Workflow: `.my-agents-kit/workflows/execute-plan.md`
- Skills: `.my-agents-kit/skills/executing-plans/`, `.my-agents-kit/skills/verification-before-completion/`

Task:
- execute `$ARGUMENTS`
- verify before each completion claim
- stop and surface blockers instead of guessing
