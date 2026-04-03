---
name: database-design
description: Database design principles, distributed systems patterns, and decision-making frameworks. CAP theorem, Sharding, Schema Design, and Optimization.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Database Design & Architecture

> Principled decision making for data systems, from schema design to distributed architecture.

## Content Map

| Category | File | Description |
|---|---|---|
| **Architecture** | [distributed-patterns.md](distributed-patterns.md) | **[NEW]** CAP/PACELC, Sharding, Replication |
| **Optimization** | [advanced-optimization.md](advanced-optimization.md) | **[NEW]** Internals (MVCC/WAL), Advanced Indexing |
| **Optimization** | [optimization.md](optimization.md) | Basic query optimization & EXPLAIN |
| **Scale** | [scalability-checklist.md](scalability-checklist.md) | **[NEW]** HA/DR, Caching, Load Testing |
| **Selection** | [database-selection.md](database-selection.md) | Choosing the right DB (SQL vs NoSQL vs NewSQL) |
| **Schema** | [schema-design.md](schema-design.md) | Normalization, Constraints, Types |
| **Operations** | [migrations.md](migrations.md) | 5-phase migration safety |
| **Indexing** | [indexing.md](indexing.md) | B-Tree coverage, Index types |

## Core Principles

1.  **Integrity First**: Constraints are the final line of defense.
2.  **Schema follows Access**: Don't design in a vacuum; design for queries.
3.  **Consistency is a Choice**: Understand the trade-offs (CAP).
4.  **Measure then Optimize**: Never optimize without `EXPLAIN ANALYZE`.
5.  **Data Gravity**: Moving code to data (Stored Procs/aggregates) vs Data to code.

## Decision Flow

1.  **Analyze**: Volume, Velocity, Variety (3 Vs).
2.  **Select**: SQL, NoSQL, or NewSQL?
3.  **Design**: Entities & Relationships.
4.  **Distribute**: Sharding & Replication strategy.
5.  **Optimize**: Indexes & Materialized Views.
