# GEMINI.md

This repository is a reusable agent kit. The authoritative project content lives in `.agent/`.

## Core Rules

1. Use `.agent/` as the source of truth.
2. Before changing specialist behavior, inspect the relevant file in `.agent/agents/`.
3. Before changing reusable guidance, inspect the relevant file in `.agent/skills/`.
4. Keep `README.md` and `.agent/ARCHITECTURE.md` aligned with the shipped inventory.
5. Keep adapter files for IDEs and runtimes thin; do not let them diverge from `.agent/`.

## Working Priorities

- packaging correctness
- agent and skill quality
- workflow clarity
- cross-runtime compatibility

## Important Files

- `.agent/rules/GEMINI.md`
- `.agent/ARCHITECTURE.md`
- `.agent/agents/`
- `.agent/skills/`
- `.agent/workflows/`
- `bin/cli.js`
- `package.json`

## Expected Behavior

- Use specialist guidance instead of generic answers when editing this repo.
- Prefer concise, maintainable updates over parallel systems.
- Verify package output with `npm pack --dry-run` when changing packaging or docs about installation.
