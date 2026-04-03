---
name: golang-patterns
description: Golang patterns and best practices. Go idioms, concurrency patterns, error handling, testing strategies, performance optimization, and common frameworks.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Golang Patterns

> **Learn to THINK in Go, not copy Java/Python patterns.**

## 🎯 Selective Reading Rule

**Read ONLY files relevant to the request!** Check the content map, find what you need.

| File                      | Description                                           | When to Read                |
| ------------------------- | ----------------------------------------------------- | --------------------------- |
| `go-idioms.md`            | Error handling, interfaces, composition               | Writing idiomatic Go        |
| `concurrency-patterns.md` | Goroutines, channels, worker pools                    | Concurrent programming      |
| `project-structure.md`    | Standard Go layout, package organization              | Starting new project        |
| `testing-patterns.md`     | Table-driven tests, mocking, benchmarks               | Writing tests               |
| `performance.md`          | Profiling, Compiler opts, CPU mechanics               | Deep optimization/Profiling |
| `memory-management.md`    | GC tuning, alignment, sync.Pool                       | Memor/GC issues             |
| `concurrency-perf.md`     | False sharing, atomic patterns, scheduler             | Parallelism bottlenecks     |
| `go-1.25.md`              | Green Tea GC, JSON v2, Synctest                       | Upgrading to Go 1.25        |
| `go-1.26.md`              | Language refinements, GC default, tooling, TLS/runtime | Upgrading to Go 1.26        |
| `senior-coding.md`        | Functional Options, Clean Arch, Interfaces            | Code Review/Refactoring     |
| `production-deploy.md`    | Distroless, Dockerfile, Observability                 | Deploying to Prod           |
| `frameworks.md`           | Gin, Echo, GORM, gRPC, Kafka, Redis                   | Choosing frameworks         |

---

## ⚠️ Core Principles

- **Simplicity over cleverness**: Clear code beats smart code
- **Errors are values**: Handle explicitly, never ignore
- **Accept interfaces, return structs**: Design for flexibility
- **Composition over inheritance**: Embed, don't extend
- **Concurrency is built-in**: Use goroutines and channels
- **Profile before optimizing**: Measure, don't guess

---

## Decision Checklist

Before writing Go code:

- [ ] Using idiomatic error handling?
- [ ] Interfaces small and focused?
- [ ] Concurrency needed? (goroutines/channels)
- [ ] Following standard project layout?
- [ ] Tests written (table-driven)?
- [ ] Checked for race conditions?

---

## Anti-Patterns

❌ Ignoring errors (`_ = err`)
❌ Using panic for control flow
❌ Creating unbounded goroutines
❌ Not closing resources (defer)
❌ Premature optimization
❌ Over-engineering simple problems
❌ Copying Java/Python patterns to Go
