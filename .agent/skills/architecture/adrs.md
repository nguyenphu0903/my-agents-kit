# ADRs (Architecture Decision Records) - Short Guide

Purpose

- Capture why a decision was made, not just what was chosen.
- Prevent repeated debates and preserve context for future teams.

When to Write

- New architecture or platform choice (DB, queue, runtime, hosting).
- Significant trade-off or irreversible decision.
- Cross-team dependency or contract change.

When Not to Write

- Low-impact refactors or internal implementation details.
- Decisions that can be reversed within a sprint.

Lightweight ADR Template

- Title: Short, specific decision.
- Status: Proposed | Accepted | Rejected | Superseded.
- Context: Problem statement and constraints.
- Decision: What you chose.
- Alternatives: What you considered and why not.
- Consequences: Trade-offs, risks, and follow-ups.
- References: Links to docs, tickets, spikes.

Quality Checklist

- Problem is stated without solution bias.
- Alternatives are real options, not strawmen.
- Consequences include operational and cost impacts.
- Decision is consistent with constraints and team skills.

Lifecycle

- Proposed: Draft while evaluating options.
- Accepted: Decision is final and implemented.
- Superseded: Replaced by a newer ADR (link to it).

Common Anti-Patterns

- Writing after the implementation is done.
- Skipping alternatives and trade-offs.
- Using ADRs to document every minor change.

Example Titles

- "Adopt PostgreSQL for core transactional data"
- "Use gRPC for internal service-to-service APIs"
- "Move background jobs to managed queue"
