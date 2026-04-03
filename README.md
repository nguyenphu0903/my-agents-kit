# my-agents-kit

Golang-focused agent kit for backend-heavy projects, packaged as a reusable `.my-agents-kit` workspace that stays contained in one hidden folder.

It combines specialist agents, reusable skills, and slash-style workflows for Go, distributed systems, APIs, infrastructure, security, frontend work, and review-driven delivery.

## What This Repo Contains

- `21` specialist agents in `.my-agents-kit/agents`
- `52` skills in `.my-agents-kit/skills`
- `13` workflows in `.my-agents-kit/workflows`
- adapter templates in `.my-agents-kit/adapters`
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
my-agents-kit init
my-agents-kit init --copilot
```

### Option 2: Local development in this repo

```bash
npm link
my-agents-kit init
my-agents-kit init --copilot
```

### If npm or npx fails with permissions

```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
```

## CLI Behavior

The CLI currently supports:

- `my-agents-kit init`
- `my-agents-kit init --copilot`
- `my-agents-kit update`
- `my-agents-kit update --copilot`
- `my-agents-kit status`

Current behavior is intentionally simple:

- commands run against the current working directory
- `init` copies the local kit files when running from a linked/dev install
- otherwise it clones the GitHub repo and installs the kit into the current project
- `init` and `update` only manage `.my-agents-kit/`, so the repo root stays clean by default
- `init --copilot` and `update --copilot` auto-generate GitHub Copilot custom agent files in `.github/agents/*.agent.md` from `.my-agents-kit/agents/*.md`
- plain `init` and `update` do not touch `.github/agents`
- `update --copilot` regenerates only the kit-generated Copilot agents and does not wipe unrelated custom agents

The README only documents behavior that is actually implemented in `bin/cli.js`.

## Quick Start

After installation in a target project, the kit adds a `.my-agents-kit` directory with:

```text
.my-agents-kit/
├── adapters/
├── agents/
├── skills/
├── workflows/
├── rules/
├── scripts/
└── ARCHITECTURE.md
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

The full inventory lives in `.my-agents-kit/ARCHITECTURE.md`.

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

This kit keeps cross-IDE adapter templates inside `.my-agents-kit/adapters`, but does not write them into the repo root by default.

- GitHub Copilot: `init --copilot` and `update --copilot` generate `.github/agents/*.agent.md` from `.my-agents-kit/agents/*.md`, so Copilot-compatible custom agents are created inside the target repo only when requested.
- Gemini, Claude, Cursor, and Windsurf: templates live under `.my-agents-kit/adapters/` so the kit stays self-contained and does not spill hidden config folders into the project root.

If GitHub Copilot does not show the custom agent, check these first:

- the client version actually supports custom agents
- the repository contains `.github/agents/*.agent.md`
- `my-agents-kit init --copilot` or `my-agents-kit update --copilot` has already been run in that repo
- the workspace has been reloaded after installing or updating the kit

## Go-Specific Strength

The strongest part of this kit is the Go stack:

- `.my-agents-kit/agents/golang-specialist.md`
- `.my-agents-kit/skills/golang-patterns`
- `.my-agents-kit/skills/message-broker-patterns`
- `.my-agents-kit/skills/caching-patterns`

Recent updates include Go 1.26 guidance for:

- Green Tea GC as default
- `go fix` modernizers
- safer reverse proxy migration guidance
- runtime and deployment updates
- TLS and test-artifact recommendations

## Compatibility Notes

This repo is primarily a content kit built around a `.my-agents-kit` folder.

That means:

- it works well as a shared source of truth for your own agent setup
- the repo keeps IDE adapter templates inside `.my-agents-kit/adapters/`
- `.my-agents-kit/` remains the canonical source of truth

## Repo Notes

- GitHub repo: [nguyenphu0903/my-agents-kit](https://github.com/nguyenphu0903/my-agents-kit)
- package name: `my-agents-kit`
- CLI binary name: `my-agents-kit`
- legacy alias kept for compatibility: `dev-ag-kit`

## Development

Useful local commands:

```bash
npm link
npm pack --dry-run
node bin/cli.js status
```

If you change `.my-agents-kit`, re-run `npm pack --dry-run` before publishing so the packaged contents match expectations.

## License

MIT. See `LICENSE`.
