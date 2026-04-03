# CLAUDE.md

This repository is a distributable agent kit. The canonical content lives in `.agent/`.

## Source of Truth

- Agents: `.agent/agents/`
- Skills: `.agent/skills/`
- Workflows: `.agent/workflows/`
- Runtime rules: `.agent/rules/GEMINI.md`
- Inventory: `.agent/ARCHITECTURE.md`

## Instructions

1. Treat `.agent/` as authoritative.
2. If a task concerns an agent, read the matching file in `.agent/agents/`.
3. If a task concerns a skill, read the matching folder in `.agent/skills/`.
4. Keep adapter files like `AGENTS.md`, `GEMINI.md`, `.claude/commands/`, and `.cursor/rules/` aligned with `.agent/`.
5. Keep `README.md` accurate to the actual CLI behavior in `bin/cli.js`.
6. When changing packaging or install docs, verify with `npm pack --dry-run`.

## Recommended Workflow

- brainstorm before large changes
- write or refine a plan for multi-step work
- execute against the plan
- review before merge or handoff
- verify before claiming completion
