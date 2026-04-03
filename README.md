# AI Agent Kit

> Golang-focused AI Agent Kit for Backend Development

Specialized agents and skills for **Go**, **Kafka**, **NATS**, **Redis**, and distributed systems. Full-stack support for Node.js, Python, Next.js, React, Kubernetes, and more.

## Quick Install

Install directly from this GitHub repo:

```bash
npm install -g github:nguyenphu0903/my-agents-kit
dev-ag-kit init
```

Or run without global install:

```bash
npx github:nguyenphu0903/my-agents-kit init
```

For local development in this repo:

```bash
npm link
dev-ag-kit init
```

If your `npx` or `npm` commands fail with permission errors on `~/.npm`, fix ownership first:

```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
```

If you are still using the published npm package, this also works:

```bash
npx @duyphu/dev-ag-kit init
```

This installs the `.agent` folder containing all templates into your project.

## What's Included

| Component     | Count | Description                                                                |
| ------------- | ----- | -------------------------------------------------------------------------- |
| **Agents**    | 15+   | Specialist AI personas (Golang, backend, frontend, security, etc.)         |
| **Skills**    | 52    | Domain and workflow skills (Golang, Kafka, NATS, Redis, review, execution) |
| **Workflows** | 13    | Slash command procedures                                                   |

## Structure

```text
.agent/
├── agents/          # Specialist Agents (golang-specialist, backend-specialist, etc.)
├── skills/          # Skills (golang-patterns, message-broker-patterns, etc.)
├── workflows/       # Slash Commands
├── rules/           # Workspace Rules
└── ARCHITECTURE.md  # Full documentation
```

## Usage

### Using Agents

Mention an agent by name to invoke specialized expertise:

```text
Use the golang-specialist to review this Go code
Use the backend-specialist to design this API
Use the security-auditor to review authentication
```

Or rely on automatic routing (Upstream Feature):

> "Fix the dark mode button" -> 🤖 Using @frontend-specialist...

### Using Workflows

Invoke workflows with slash commands:

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `/brainstorm`    | Explore options before implementation |
| `/create`        | Create new feature or app             |
| `/debug`         | Systematic debugging                  |
| `/deploy`        | Deploy application                    |
| `/enhance`       | Improve existing code                 |
| `/execute-plan`  | Execute a written implementation plan |
| `/orchestrate`   | Multi-agent coordination              |
| `/plan`          | Create task breakdown                 |
| `/preview`       | Preview changes locally               |
| `/review`        | Review changes before merge           |
| `/status`        | Check project status                  |
| `/test`          | Generate and run tests                |
| `/ui-ux-pro-max` | Design with 50 styles                 |

Example:

```text
/brainstorm authentication system
/create landing page with hero section
/debug why login fails
```

### Using Rules

Rules in `.agent/rules/` are automatically applied. The main configuration file is `GEMINI.md`.

## CLI Tool

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `dev-ag-kit init`   | Install `.agent` folder into your project |
| `dev-ag-kit update` | Update to the latest version              |
| `dev-ag-kit status` | Check installation status                 |

### Update

If `dev-ag-kit` is already installed globally:

```bash
dev-ag-kit update
```

If you installed from GitHub and want the latest CLI version too:

```bash
npm install -g github:nguyenphu0903/my-agents-kit
```

If you installed from npm:

```bash
npm install -g @duyphu/dev-ag-kit
```

### Notes

- `dev-ag-kit` only works directly after global install or `npm link`
- `init`, `update`, and `status` currently run in the current working directory
- The README previously listed extra CLI flags; those are not implemented and were removed from the docs

## Key Features

### 🎯 Golang Specialist (Exclusive)

- **Senior Mastery**: Architecture, API Design, Error Handling
- **Performance**: Profiling, Go 1.26 GC/runtime tuning, Memory Management
- **Deployment**: Distroless, Non-root security
- **Ecosystem**: Kafka, NATS, Redis, NoSQL

### 🤖 MCP 2026 Support (Exclusive)

- **Advanced Patterns**: Bidirectional streaming, Stateful sessions
- **Agentic**: Agent-to-Agent architecture

### 🚀 Full-Stack Support

- Backend: Node.js, Python, API design
- Frontend: React, Next.js, Vue
- DevOps: Kubernetes, Docker, CI/CD
- Mobile: React Native, Flutter

## License

MIT © duyphu
