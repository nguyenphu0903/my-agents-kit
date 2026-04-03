# Clean Architecture - Short Guide

Goal

- Separate business rules from frameworks, UI, and infrastructure.
- Keep the core stable while edges change.

Core Ideas

- Dependencies point inward toward the domain.
- Business rules do not depend on frameworks.
- IO happens at the edges; core is pure and testable.

Layers (Typical)

1. Entities - enterprise business rules and invariants.
2. Use Cases - application-specific workflows.
3. Interface Adapters - controllers, presenters, gateways.
4. Frameworks and Drivers - web, DB, messaging, UI.

Dependency Rule

- Source code dependencies only go inward.
- Outer layers may depend on inner layers, not the reverse.

Boundaries and Data Flow

- Use DTOs at boundaries to avoid leaking frameworks inward.
- Convert at the edge; keep domain types inside.

When It Fits

- Complex business rules and long-lived systems.
- Multiple delivery channels (API, CLI, batch).

When It Is Overkill

- Simple CRUD apps with short lifespan.
- Teams that cannot afford boundary discipline.

Common Pitfalls

- Anemic domain with all logic in services.
- Leaking ORM models into use cases.
- Circular dependencies via shared utilities.

Practical Checklist

- Domain has no imports from web, DB, or frameworks.
- Use cases are testable with fakes.
- Adapters are thin and replaceable.
- Infrastructure can be swapped without touching domain.

Minimal Folder Sketch

- /domain
- /usecase
- /adapter
- /infra
