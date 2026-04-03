# CLAUDE.md

This repository is a distributable agent kit. The canonical content lives in `.my-agents-kit/`.

## Source of Truth

- Agents: `.my-agents-kit/agents/`
- Skills: `.my-agents-kit/skills/`
- Workflows: `.my-agents-kit/workflows/`
- Runtime rules: `.my-agents-kit/rules/GEMINI.md`
- Inventory: `.my-agents-kit/ARCHITECTURE.md`

## Instructions

1. Treat `.my-agents-kit/` as authoritative.
2. If a task concerns an agent, read the matching file in `.my-agents-kit/agents/`.
3. If a task concerns a skill, read the matching folder in `.my-agents-kit/skills/`.
4. Keep adapter files like `AGENTS.md`, `GEMINI.md`, `.claude/commands/`, `.cursor/rules/`, and `.windsurf/rules/` aligned with `.my-agents-kit/`.
5. Keep `README.md` accurate to the actual CLI behavior in `bin/cli.js`.
6. When changing packaging or install docs, verify with `npm pack --dry-run`.

## Recommended Workflow

- brainstorm before large changes
- write or refine a plan for multi-step work
- execute against the plan
- review before merge or handoff
- verify before claiming completion
