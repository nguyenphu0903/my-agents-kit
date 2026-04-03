# my-agents-kit Workspace Guide

This repository is a distributable agent kit. The main source of truth is the `.my-agents-kit/` directory.

## Source of Truth

- Agents: `.my-agents-kit/agents/`
- Skills: `.my-agents-kit/skills/`
- Workflows: `.my-agents-kit/workflows/`
- Runtime rules: `.my-agents-kit/rules/GEMINI.md`
- Inventory and structure: `.my-agents-kit/ARCHITECTURE.md`

When working in this repository:

1. Treat `.my-agents-kit/` as canonical.
2. Keep `README.md` and `.my-agents-kit/ARCHITECTURE.md` aligned with shipped contents.
3. Prefer updating existing agents, skills, and workflows over creating parallel copies.
4. When adding new adapters for IDEs or runtimes, keep them thin and point back to `.my-agents-kit/`.

## Working Model

This repo is not an app runtime. Most tasks fall into one of these categories:

- maintain or improve specialist agents
- maintain or improve reusable skills
- maintain workflows and runtime guidance
- keep packaging and install behavior correct
- keep cross-IDE adapter files aligned with `.my-agents-kit/`

## Packaging Rules

- The package publishes `.my-agents-kit`, `bin`, `README.md`, and `LICENSE`.
- If packaging changes, verify with `npm pack --dry-run`.
- The CLI behavior documented in `README.md` must match `bin/cli.js`.

## Editing Conventions

- Prefer Markdown-first documentation.
- Preserve frontmatter shape in `.md` customization files.
- Keep descriptions keyword-rich and specific so agents can discover the right files.
- Prefer ASCII unless a file already uses non-ASCII content.

## Agent Routing Guidance

Use the most relevant specialist guidance from `.my-agents-kit/agents/` and load only the skills needed for the current task.

High-value specialists include:

- `golang-specialist`
- `backend-specialist`
- `frontend-specialist`
- `security-auditor`
- `project-planner`
- `orchestrator`

## Common Workflows

If the runtime supports slash-style commands or prompt files, mirror these workflows:

- `/brainstorm`
- `/plan`
- `/execute-plan`
- `/review`
- `/debug`

## Cross-IDE Policy

This repository may contain adapter files for multiple tools, including:

- `.github/copilot-instructions.md`
- `AGENTS.md`
- `GEMINI.md`
- `CLAUDE.md`
- `.claude/commands/`
- `.cursor/rules/`
- `.windsurf/rules/`

Those adapters should stay concise and should not drift away from `.my-agents-kit/`.
