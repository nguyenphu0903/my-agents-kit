# GEMINI.md

This repository is a reusable agent kit. The authoritative project content lives in `.my-agents-kit/`.

## Core Rules

1. Use `.my-agents-kit/` as the source of truth.
2. Before changing specialist behavior, inspect the relevant file in `.my-agents-kit/agents/`.
3. Before changing reusable guidance, inspect the relevant file in `.my-agents-kit/skills/`.
4. Keep `README.md` and `.my-agents-kit/ARCHITECTURE.md` aligned with the shipped inventory.
5. Keep adapter files for IDEs and runtimes thin; do not let them diverge from `.my-agents-kit/`.

## Working Priorities

- packaging correctness
- agent and skill quality
- workflow clarity
- cross-runtime compatibility

## Important Files

- `.my-agents-kit/rules/GEMINI.md`
- `.my-agents-kit/ARCHITECTURE.md`
- `.my-agents-kit/agents/`
- `.my-agents-kit/skills/`
- `.my-agents-kit/workflows/`
- `bin/cli.js`
- `package.json`

## Expected Behavior

- Use specialist guidance instead of generic answers when editing this repo.
- Prefer concise, maintainable updates over parallel systems.
- Verify package output with `npm pack --dry-run` when changing packaging or docs about installation.
