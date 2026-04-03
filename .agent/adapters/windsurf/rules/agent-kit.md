---
trigger: always_on
---

# AI Agent Kit Rule

This repository is a distributable agent kit, not an application runtime.

- Treat `.agent/` as the canonical source of truth.
- Keep `README.md` and `.agent/ARCHITECTURE.md` aligned with shipped contents.
- Prefer updating existing agents, skills, and workflows over creating duplicates.
- Keep adapter files for Copilot, Claude, Cursor, Gemini, and Windsurf thin and aligned with `.agent/`.
- If packaging or installation behavior changes, verify the package output with `npm pack --dry-run`.
