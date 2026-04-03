# AI Agent Kit Architecture

> **@duyphu/dev-ag-kit v2.0** - Golang-focused AI Agent Kit for Backend Development

---

## 📋 Overview

AI Agent Kit is a modular system consisting of:

- **21 Specialist Agents** - Role-based AI personas (Golang, backend, frontend, security, etc.)
- **52 Skills** - Domain and workflow knowledge modules (including Go, Kafka, NATS, Redis, review, execution, MCP)
- **13 Workflows** - Slash command procedures

---

## 🏗️ Directory Structure

```
.agent/
├── ARCHITECTURE.md          # This file
├── agents/                  # Specialist Agents
├── skills/                  # Skills
├── workflows/               # Slash Commands
├── rules/                   # Global Rules
└── scripts/                 # Master Validation Scripts
```

---

## 🤖 Agents (21)

Specialist AI personas for different domains.

| Agent                    | Focus                               | Skills Used                                                                     |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------- |
| `orchestrator`           | Multi-agent coordination            | parallel-agents, behavioral-modes                                               |
| `project-planner`        | Discovery, task planning            | brainstorming, plan-writing, architecture                                       |
| `golang-specialist`      | **Go backend, distributed systems** | **golang-patterns, message-broker-patterns, caching-patterns, database-design** |
| `frontend-specialist`    | Web UI/UX                           | frontend-design, nextjs-react-expert, tailwind-patterns                         |
| `backend-specialist`     | API, business logic                 | api-patterns, nodejs-best-practices, database-design                            |
| `database-architect`     | Schema, SQL                         | database-design, prisma-expert                                                  |
| `mobile-developer`       | iOS, Android, RN                    | mobile-design                                                                   |
| `game-developer`         | Game systems and gameplay loops     | clean-code                                                                      |
| `devops-engineer`        | CI/CD, Docker                       | deployment-procedures, docker-expert                                            |
| `security-auditor`       | Security compliance                 | vulnerability-scanner, red-team-tactics                                         |
| `penetration-tester`     | Offensive security                  | red-team-tactics                                                                |
| `test-engineer`          | Testing strategies                  | testing-patterns, tdd-workflow, webapp-testing                                  |
| `debugger`               | Root cause analysis                 | systematic-debugging                                                            |
| `performance-optimizer`  | Speed, Web Vitals                   | performance-profiling                                                           |
| `seo-specialist`         | Ranking, visibility                 | seo-fundamentals, geo-fundamentals                                              |
| `documentation-writer`   | Manuals, docs                       | documentation-templates                                                         |
| `product-manager`        | Requirements, user stories          | plan-writing, brainstorming                                                     |
| `product-owner`          | Strategy, backlog, MVP              | plan-writing, brainstorming                                                     |
| `qa-automation-engineer` | E2E testing, CI pipelines           | webapp-testing, testing-patterns                                                |
| `code-archaeologist`     | Legacy code, refactoring            | clean-code, code-review-checklist                                               |
| `explorer-agent`         | Codebase analysis                   | -                                                                               |

---

## 🧩 Skills (52)

Modular knowledge domains that agents can load on-demand.

### Golang (Exclusive)

| Skill                         | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| **`golang-patterns`**         | **Go idioms, concurrency, testing, performance** |
| **`message-broker-patterns`** | **Kafka, NATS, event-driven architecture**       |
| **`caching-patterns`**        | **Redis, distributed caching, in-memory**        |

### Frontend & UI

| Skill                   | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `nextjs-react-expert`   | React & Next.js performance optimization (Vercel) |
| `web-design-guidelines` | Web UI audit rules                                |
| `tailwind-patterns`     | Tailwind CSS v4 utilities                         |
| `frontend-design`       | UI/UX patterns, design systems                    |
| `ui-ux-pro-max`         | 50 styles, 21 palettes, 50 fonts                  |

### Backend & API

| Skill                   | Description                    |
| ----------------------- | ------------------------------ |
| `api-patterns`          | REST, GraphQL, tRPC            |
| `nestjs-expert`         | NestJS modules, DI, decorators |
| `nodejs-best-practices` | Node.js async, modules         |
| `python-patterns`       | Python standards, FastAPI      |

### Database

| Skill             | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `database-design` | Schema design, SQL, **NoSQL (MongoDB, DynamoDB, Cassandra)** |
| `prisma-expert`   | Prisma ORM, migrations                                       |

### TypeScript/JavaScript

| Skill               | Description                         |
| ------------------- | ----------------------------------- |
| `typescript-expert` | Type-level programming, performance |

### Cloud & Infrastructure

| Skill                   | Description               |
| ----------------------- | ------------------------- |
| `docker-expert`         | Containerization, Compose |
| `deployment-procedures` | CI/CD, deploy workflows   |
| `server-management`     | Infrastructure management |

### Testing & Quality

| Skill                   | Description              |
| ----------------------- | ------------------------ |
| `testing-patterns`      | Jest, Vitest, strategies |
| `webapp-testing`        | E2E, Playwright          |
| `tdd-workflow`          | Test-driven development  |
| `code-review-checklist` | Code review standards    |
| `lint-and-validate`     | Linting, validation      |
| `verification-before-completion` | Evidence-based completion checks |
| `requesting-code-review` | Review request workflow |
| `receiving-code-review` | Review response workflow |

### Security

| Skill                   | Description              |
| ----------------------- | ------------------------ |
| `vulnerability-scanner` | Security auditing, OWASP |
| `red-team-tactics`      | Offensive security       |

### Architecture & Planning

| Skill           | Description                                      |
| --------------- | ------------------------------------------------ |
| `app-builder`   | Full-stack app scaffolding                       |
| `architecture`  | System design patterns, Clean Architecture, ADRs |
| `plan-writing`  | Task planning, breakdown                         |
| `brainstorming` | Socratic questioning                             |
| `executing-plans` | Methodical implementation from a written plan  |
| `using-git-worktrees` | Isolated workspace setup for feature work |
| `writing-skills` | Authoring and refining reusable skills         |

### Mobile

| Skill           | Description           |
| --------------- | --------------------- |
| `mobile-design` | Mobile UI/UX patterns |

### SEO & Growth

| Skill              | Description                   |
| ------------------ | ----------------------------- |
| `seo-fundamentals` | SEO, E-E-A-T, Core Web Vitals |
| `geo-fundamentals` | GenAI optimization            |

### Shell/CLI

| Skill        | Description               |
| ------------ | ------------------------- |
| `bash-linux` | Linux commands, scripting |

### Other

| Skill                     | Description                               |
| ------------------------- | ----------------------------------------- |
| `clean-code`              | Coding standards (Global)                 |
| `behavioral-modes`        | Agent personas                            |
| `parallel-agents`         | Multi-agent patterns                      |
| `mcp-builder`             | Model Context Protocol (**2026 Support**) |
| `documentation-templates` | Doc formats                               |
| `i18n-localization`       | Internationalization                      |
| `performance-profiling`   | Web Vitals, optimization                  |
| `systematic-debugging`    | Troubleshooting                           |
| `finishing-a-development-branch` | Branch completion workflow         |

---

## 🔄 Workflows (13)

Slash command procedures. Invoke with `/command`.

| Command          | Description              |
| ---------------- | ------------------------ |
| `/brainstorm`    | Socratic discovery       |
| `/create`        | Create new features      |
| `/debug`         | Debug issues             |
| `/deploy`        | Deploy application       |
| `/enhance`       | Improve existing code    |
| `/execute-plan`  | Execute a written plan   |
| `/orchestrate`   | Multi-agent coordination |
| `/plan`          | Task breakdown           |
| `/preview`       | Preview changes          |
| `/review`        | Review changes           |
| `/status`        | Check project status     |
| `/test`          | Run tests                |
| `/ui-ux-pro-max` | Design with 50 styles    |

---

## 📜 Scripts

Master validation scripts that orchestrate skill-level scripts.

### Master Scripts

| Script          | Purpose                                 | When to Use              |
| --------------- | --------------------------------------- | ------------------------ |
| `checklist.py`  | Priority-based validation (Core checks) | Development, pre-commit  |
| `verify_all.py` | Comprehensive verification (All checks) | Pre-deployment, releases |

### Usage

```bash
# Quick validation during development
python .agent/scripts/checklist.py .

# Full verification before deployment
python .agent/scripts/verify_all.py . --url http://localhost:3000
```
