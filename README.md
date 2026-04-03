# AI Agent Kit

Golang-focused agent kit for backend-heavy projects, packaged as a reusable `.agent` workspace plus lightweight IDE adapter files that can be installed into other repositories.

It combines specialist agents, reusable skills, and slash-style workflows for Go, distributed systems, APIs, infrastructure, security, frontend work, and review-driven delivery.

## What This Repo Contains

- `21` specialist agents in `.agent/agents`
- `52` skills in `.agent/skills`
- `13` workflows in `.agent/workflows`
- root adapter files for `AGENTS.md`, `GEMINI.md`, and `CLAUDE.md`
- runtime adapters in `.claude/` and `.cursor/`
- a small CLI in `bin/cli.js` for `init`, `update`, and `status`

## Focus Areas

- Go backend engineering
- Kafka, NATS, Redis, caching, and distributed systems
- API design and backend architecture
- Testing, debugging, and verification workflows
- Deployment, Docker, and production hardening
- Frontend, mobile, and UI review support when a project needs full-stack coverage

## Install

### Option 1: Install from this GitHub repo

```bash
npm install -g github:nguyenphu0903/my-agents-kit
dev-ag-kit init
dev-ag-kit init --copilot
```

### Option 2: Local development in this repo

```bash
npm link
dev-ag-kit init
dev-ag-kit init --copilot
```

### Option 3: Existing published npm package

The package name is still:

```bash
npm install -g @duyphu/dev-ag-kit
dev-ag-kit init
dev-ag-kit init --copilot
```

### If npm or npx fails with permissions

```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
```

## CLI Behavior

The CLI currently supports:

- `dev-ag-kit init`
- `dev-ag-kit init --copilot`
- `dev-ag-kit update`
- `dev-ag-kit update --copilot`
- `dev-ag-kit status`

Current behavior is intentionally simple:

- commands run against the current working directory
- `init` copies the local kit files when running from a linked/dev install
- otherwise it clones the GitHub repo and installs the kit into the current project
- `init --copilot` and `update --copilot` auto-generate GitHub Copilot custom agent files in `.github/agents/*.agent.md` from `.agent/agents/*.md`
- plain `init` and `update` do not touch `.github/agents`
- `update --copilot` regenerates only the kit-generated Copilot agents and does not wipe unrelated custom agents

The README only documents behavior that is actually implemented in `bin/cli.js`.

## Quick Start

After installation in a target project, the kit adds a `.agent` directory with:

```text
.agent/
├── agents/
├── skills/
├── workflows/
├── rules/
├── scripts/
└── ARCHITECTURE.md
```

It also installs lightweight compatibility files:

```text
AGENTS.md
GEMINI.md
CLAUDE.md
.claude/
.cursor/
```

If you pass `--copilot`, it also generates:

```text
.github/agents/
├── backend-specialist.agent.md
├── golang-specialist.agent.md
├── security-auditor.agent.md
└── ...
```

Typical usage examples:

```text
Use the golang-specialist to review this Go service
Use the backend-specialist to design this API
Use the security-auditor to review authentication
/brainstorm event-driven architecture for payments
/plan add audit logging
/execute-plan docs/PLAN-audit-logging.md
/review before merge
```

## Included Agents

The kit includes agents for:

- Go and distributed systems
- backend/API work
- frontend/UI work
- database design
- DevOps and deployment
- testing and QA
- security review and penetration testing
- performance optimization
- documentation
- planning and orchestration

The full inventory lives in `.agent/ARCHITECTURE.md`.

## Included Workflows

Available workflows:

- `/brainstorm`
- `/create`
- `/debug`
- `/deploy`
- `/enhance`
- `/execute-plan`
- `/orchestrate`
- `/plan`
- `/preview`
- `/review`
- `/status`
- `/test`
- `/ui-ux-pro-max`

## IDE Compatibility

This kit ships cross-IDE adapter files, but each tool has its own discovery rules and feature gates.

- GitHub Copilot: `init --copilot` and `update --copilot` generate `.github/agents/*.agent.md` from `.agent/agents/*.md`, so Copilot-compatible custom agents are created inside the target repo only when requested.
- Gemini: uses root `GEMINI.md`.
- Claude-compatible tools: use root `CLAUDE.md` plus the shipped `.claude/commands`.
- Cursor: uses the shipped `.cursor/rules`.

If GitHub Copilot does not show the custom agent, check these first:

- the client version actually supports custom agents
- the repository contains `.github/agents/*.agent.md`
- `dev-ag-kit init --copilot` or `dev-ag-kit update --copilot` has already been run in that repo
- the workspace has been reloaded after installing or updating the kit

## Go-Specific Strength

The strongest part of this kit is the Go stack:

- `.agent/agents/golang-specialist.md`
- `.agent/skills/golang-patterns`
- `.agent/skills/message-broker-patterns`
- `.agent/skills/caching-patterns`

Recent updates include Go 1.26 guidance for:

- Green Tea GC as default
- `go fix` modernizers
- safer reverse proxy migration guidance
- runtime and deployment updates
- TLS and test-artifact recommendations

## Compatibility Notes

This repo is primarily a content kit built around a `.agent` folder.

That means:

- it works well as a shared source of truth for your own agent setup
- the repo now ships thin adapters for common runtimes through `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `.claude/`, and `.cursor/`
- `.agent/` remains the canonical source of truth behind those adapters

## Repo Notes

- GitHub repo: [nguyenphu0903/my-agents-kit](https://github.com/nguyenphu0903/my-agents-kit)
- current package name: `@duyphu/dev-ag-kit`
- CLI binary name: `dev-ag-kit`

The naming is functional today, but repo name and package name are not fully aligned yet.

## Development

Useful local commands:

```bash
npm link
npm pack --dry-run
node bin/cli.js status
```

If you change `.agent`, re-run `npm pack --dry-run` before publishing so the packaged contents match expectations.

## License

MIT. See `LICENSE`.
