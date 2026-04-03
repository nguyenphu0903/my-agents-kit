---
name: message-broker-patterns
description: Message broker patterns and decision-making. Kafka vs NATS vs RabbitMQ selection, producer/consumer patterns, event-driven architecture, and distributed messaging.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Message Broker Patterns

> **Learn to THINK about messaging, not copy Kafka examples.**

## 🎯 Selective Reading Rule

**Read ONLY files relevant to the request!** Check the content map, find what you need.

| File | Description | When to Read |
|------|-------------|--------------|
| `broker-selection.md` | Kafka vs NATS vs RabbitMQ | Choosing message broker |
| `kafka-patterns.md` | Producers, consumers, partitioning | Working with Kafka |
| `nats-patterns.md` | Pub/sub, JetStream, KV store | Working with NATS |
| `event-driven.md` | Event sourcing, CQRS, Saga | Event-driven architecture |
| `golang-integration.md` | Go libraries and patterns | Implementing in Go |

---

## ⚠️ Core Principles

- **Choose based on use case**: Kafka for throughput, NATS for latency
- **At-least-once is default**: Design for idempotency
- **Partitioning matters**: Understand ordering guarantees
- **Monitor lag**: Consumer lag is critical metric
- **Handle failures**: Dead letter queues, retries

---

## Decision Framework

### When to use which broker?

| Scenario | Recommendation | Why |
|----------|---------------|-----|
| **High throughput** | Kafka | Persistent log, horizontal scaling |
| **Low latency** | NATS | In-memory, lightweight |
| **Event sourcing** | Kafka | Immutable event log |
| **Microservices** | NATS | Simple pub/sub, request/reply |
| **Complex routing** | RabbitMQ | Flexible exchange types |
| **Stream processing** | Kafka | Built-in stream processing |

---

## Anti-Patterns

❌ Using Kafka for request/reply (use NATS or gRPC)
❌ Not handling duplicate messages
❌ Ignoring consumer lag
❌ Creating too many partitions
❌ Not using consumer groups
❌ Blocking message processing
