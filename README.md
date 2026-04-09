# my-agents-kit

Golang-focused agent kit for backend-heavy projects, packaged as a reusable `.agent` workspace that stays compatible with existing agent runtimes.

It combines specialist agents, reusable skills, and slash-style workflows for Go, distributed systems, APIs, infrastructure, security, frontend work, and review-driven delivery.

## Overview

`my-agents-kit` is a content-first agent kit.

- The runtime source of truth is `.agent/`
- The package and CLI name are `my-agents-kit`
- GitHub Copilot support is generated automatically during install and update
- Existing runtimes that already expect `.agent/` can keep working without renaming project folders

## What This Repo Contains

- `21` specialist agents in `.agent/agents`
- `53` skills in `.agent/skills`
- `13` workflows in `.agent/workflows`
- adapter templates in `.agent/adapters`
- a small CLI in `bin/cli.js` for `init`, `update`, and `status`

## Focus Areas

- Go backend engineering
- Kafka, NATS, Redis, caching, and distributed systems
- API design and backend architecture
- Testing, debugging, and verification workflows
- Deployment, Docker, and production hardening
- Frontend, mobile, and UI review support when a project needs full-stack coverage

## Agent Routing

The most important routing distinction in this kit is:

- `backend-specialist`: general backend work across Go, Node.js, and Python
- `golang-specialist`: deep Go-specific work such as concurrency, profiling, brokers, memory, and distributed systems

Use `backend-specialist` for API and service work in general. Use `golang-specialist` when the work is specifically about Go internals, performance, or distributed backend design.

## Install

### Option 1: Install from this GitHub repo

```bash
npm install -g github:nguyenphu0903/my-agents-kit
my-agents-kit init
```

### Option 2: Local development in this repo

```bash
npm link
my-agents-kit init
```

### Global install for the current machine

```bash
my-agents-kit init --global
```

This writes only the provider that is detected on the machine, unless you override it with `--all` or `--provider=`.

### Upgrade from the old `dev-ag-kit` binary

If your machine still has the older global binary, remove it first:

```bash
npm uninstall -g @duyphu/dev-ag-kit
npm install -g github:nguyenphu0903/my-agents-kit
```

If npm reports `EEXIST` for `/opt/homebrew/bin/dev-ag-kit`, remove that stale binary and reinstall:

```bash
rm /opt/homebrew/bin/dev-ag-kit
npm install -g github:nguyenphu0903/my-agents-kit
```

### If npm or npx fails with permissions

```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
```

## CLI Behavior

The CLI currently supports:

- `my-agents-kit init`
- `my-agents-kit update`
- `my-agents-kit status`
- add `--global` to initialize or update machine-wide Copilot/OpenCode customizations
- add `--provider=copilot|opencode|claude|gemini` to force a provider
- add `--all` to publish every supported provider

Current behavior is intentionally simple:

- commands run against the current working directory
- `init` copies the local kit files when running from a linked/dev install
- otherwise it clones the GitHub repo and installs the kit into the current project
- `init` and `update` auto-detect the active provider and publish only that provider by default
- `--provider=` and `--all` override the auto-detect behavior
- `--global` publishes machine-wide assets for the detected provider
- `copilot` publishes `.github/copilot-instructions.md` and `.github/agents/*.agent.md`
- `opencode` publishes `AGENTS.md`, `.opencode/agents/*.md`, and `.opencode/skills/*/SKILL.md`
- `claude` publishes `CLAUDE.md` and `.claude/commands/*.md`
- `gemini` publishes `GEMINI.md`
- when running inside a git repo, the CLI also adds only the generated paths for the selected provider to `.git/info/exclude`

The README only documents behavior that is actually implemented in `bin/cli.js`.

## Quick Start

After installation in a target project, the kit adds a `.agent` directory with:

```text
.agent/
├── adapters/
├── agents/
├── skills/
├── workflows/
├── rules/
├── scripts/
└── ARCHITECTURE.md
```

The `adapters/` folder stores thin runtime templates for:

- Gemini
- Claude-style command files
- Cursor rules
- Windsurf rules

The install also generates:

```text
.github/agents/
├── backend-specialist.agent.md
├── golang-specialist.agent.md
├── security-auditor.agent.md
└── ...

.opencode/agents/
├── backend-specialist.md
├── golang-specialist.md
└── ...

.opencode/skills/
├── golang-patterns/SKILL.md
├── message-broker-patterns/SKILL.md
└── ...

AGENTS.md
CLAUDE.md
GEMINI.md
.github/copilot-instructions.md
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
- backend/API work across Go, Node.js, and Python
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

This kit keeps cross-IDE adapter templates inside `.agent/adapters` as canonical templates, and publishes only the detected provider’s files during install/update unless you override it.

- GitHub Copilot: `init` and `update` generate `.github/agents/*.agent.md` and `.github/copilot-instructions.md`.
- Generated Copilot agent files are excluded locally through `.git/info/exclude`, so they do not get picked up by git status unless you explicitly override that behavior.
- OpenCode: `init` and `update` publish `AGENTS.md`, `.opencode/agents/*.md`, and `.opencode/skills/*/SKILL.md`.
- Claude: `init` and `update` publish `CLAUDE.md` and `.claude/commands/*.md`.
- Gemini: `init` and `update` publish `GEMINI.md`.
- Add `--all` if you want to publish every supported provider at once.

If GitHub Copilot does not show the custom agent, check these first:

- the client version actually supports custom agents
- the repository contains `.github/agents/*.agent.md`
- `my-agents-kit init` or `my-agents-kit update` has already been run in that repo
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
- the repo keeps IDE adapter templates inside `.agent/adapters/`
- `.agent/` remains the canonical source of truth

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

If you change `.agent`, re-run `npm pack --dry-run` before publishing so the packaged contents match expectations.

## License

MIT. See `LICENSE`.
