# my-agents-kit Workspace Guide

This repository is a distributable agent kit. The main source of truth is the `.agent/` directory.

## Source of Truth

- Agents: `.agent/agents/`
- Skills: `.agent/skills/`
- Workflows: `.agent/workflows/`
- Runtime rules: `.agent/rules/GEMINI.md`
- Inventory and structure: `.agent/ARCHITECTURE.md`

When working in this repository:

1. Treat `.agent/` as canonical.
2. Keep `README.md` and `.agent/ARCHITECTURE.md` aligned with shipped contents.
3. Prefer updating existing agents, skills, and workflows over creating parallel copies.
4. When adding new adapters for IDEs or runtimes, keep them thin and point back to `.agent/`.

## Working Model

This repo is not an app runtime. Most tasks fall into one of these categories:

- maintain or improve specialist agents
- maintain or improve reusable skills
- maintain workflows and runtime guidance
- keep packaging and install behavior correct
- keep cross-IDE adapter files aligned with `.agent/`

## Packaging Rules

- The package publishes `.agent`, `bin`, `README.md`, and `LICENSE`.
- If packaging changes, verify with `npm pack --dry-run`.
- The CLI behavior documented in `README.md` must match `bin/cli.js`.

## Editing Conventions

- Prefer Markdown-first documentation.
- Preserve frontmatter shape in `.md` customization files.
- Keep descriptions keyword-rich and specific so agents can discover the right files.
- Prefer ASCII unless a file already uses non-ASCII content.

## Agent Routing Guidance

Use the most relevant specialist guidance from `.agent/agents/` and load only the skills needed for the current task.

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

Those adapters should stay concise and should not drift away from `.agent/`.
