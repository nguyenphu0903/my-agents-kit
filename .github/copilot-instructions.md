# Project Guidelines

## Code Style

- Keep files concise and focused on their single responsibility.
- Follow the existing Markdown-first convention for docs, prompts, skills, and agents.
- Use clear, keyword-rich descriptions in customization frontmatter so Copilot can discover the right asset.
- Preserve the existing YAML frontmatter shape in `.md` customization files; do not add fields unless the target file type requires them.
- Prefer ASCII unless a file already uses non-ASCII content.

## Architecture

- This repository is a distributable AI agent kit, not an application runtime.
- The main source of truth is the `.agent/` directory, which contains agents, skills, workflows, and rules.
- Treat `.agent/rules/GEMINI.md` as the authoritative runtime protocol for agent behavior in this repo.
- Keep the documentation in `README.md` and `.agent/ARCHITECTURE.md` aligned with any changes to shipped agents, skills, or workflows.
- When adding or updating customization assets, preserve the existing directory organization and naming conventions.

## Build and Test

- There is no dedicated build or test suite in this repository.
- Use the CLI for smoke checks when needed: `node bin/cli.js`, `dev-ag-kit init --dry-run`, `dev-ag-kit status`.
- If you change packaging or distribution behavior, verify the published file set matches `package.json` `files`.

## Conventions

- Use `.github/copilot-instructions.md` for workspace-wide guidance; do not add a parallel `AGENTS.md` in this repo.
- Keep workspace guidance minimal and relevant to all tasks.
- Add narrower `.instructions.md` files only when a rule applies to a specific folder or file pattern.
- When introducing a new agent, skill, or workflow, update the relevant docs and keep frontmatter names aligned with filenames.
- Avoid duplicating README content in instructions; link to the canonical doc instead.
