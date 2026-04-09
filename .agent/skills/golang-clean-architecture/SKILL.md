---
name: golang-clean-architecture
description: Audit Go services for Clean Architecture compliance in Delivery (gRPC/HTTP) -> Usecase -> Repository -> Domain. Enforces inward dependencies, thin handlers, dependency injection, and testable boundaries.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Golang Clean Architecture

> Single-file skill for auditing and implementing Clean Architecture in Go services.

## When to apply

Use this skill when:

- Auditing service architecture
- Reviewing new features for layer violations
- Refactoring toward Clean Architecture
- Reviewing dependency rules in code review
- Planning Go service structure
- Migrating from fat handlers/services
- Improving testability via dependency injection

---

## Architecture Layers

```text
┌─────────────────────────────────────┐
│  Delivery (gRPC/HTTP/GraphQL/Kafka) │ ← Thin adapters, no business logic
├─────────────────────────────────────┤
│  Usecase (Business Logic)           │ ← Orchestration
├─────────────────────────────────────┤
│  Repository (Data Access Adapter)   │ ← Data source abstraction
├─────────────────────────────────────┤
│  Domain (Entities/Interfaces)       │ ← Pure business logic
└─────────────────────────────────────┘
```

**Dependency Rule**: dependencies point inward only (toward Domain/Usecase abstractions).

---

## Layer Contracts

### Delivery (gRPC/HTTP/Kafka/Jobs)

Delivery means any inbound adapter: HTTP handlers, gRPC servers, Kafka/NATS consumers, cron/scheduler jobs, webhook receivers.

Must:
1. Decode inbound payload and perform boundary validation
2. Map transport/event DTO -> usecase input
3. Call usecase
4. Map output/error -> protocol-specific response/ack behavior

Must not:
- Calculate pricing/discount/policy transitions
- Access repository/DB directly
- Pass transport framework types into usecase contracts

### Usecase

Must:
1. Define transport-agnostic input/output
2. Orchestrate business workflow
3. Depend on interfaces/ports, not concrete adapters
4. Coordinate transaction boundaries when needed

Must not:
- Import HTTP/gRPC framework packages for core logic
- Build SQL / ORM logic directly
- Return transport DTOs

### Repository

Repository here means **data access abstraction**, not only database.
Possible sources: SQL/NoSQL DB, external API, cache (Redis), file/object storage, message system, or in-memory source.

Must:
1. Execute data read/write operations for the selected source
2. Map source models <-> domain/usecase models
3. Convert infra errors to typed errors

Must not:
- Contain business policy decisions
- Perform business state transitions
- Accept transport DTOs directly

### Domain

Must:
1. Encapsulate invariants and domain behavior
2. Stay framework-agnostic

Must not:
- Import repository/transport/framework packages
- Depend on DB drivers/ORM/web libs

---

## Canonical Inbound Flow

1. Inbound message reaches delivery adapter (HTTP/gRPC/event consumer/job)
2. Delivery validates and maps input -> usecase command/query
3. Usecase executes orchestration
4. Usecase calls repository port(s)
5. Repository adapter accesses DB/external source
6. Repository maps data back to domain/usecase models
7. Usecase returns output or typed error
8. Delivery maps output/error -> protocol-specific response/ack/retry handling

### Transaction placement

Preferred:
- Usecase defines transaction scope
- Repository participates via explicit tx/unit-of-work

Avoid:
- Transactions in delivery layer
- Hidden transaction ownership inside repository

---

## Rules Covered (9)

### High-Impact Patterns (4)

1. `high-business-logic-handler`
   - Delivery must stay thin; no business calculations/policies.

2. `high-business-logic-repository`
   - Repository must not host business validation/rules.

3. `high-constructor-creates-deps`
   - Inject dependencies; do not instantiate concrete deps in usecase/handler.

4. `high-transaction-in-repository`
   - Transaction orchestration belongs in usecase boundary.

### Architecture Rules (5)

5. `arch-domain-import-infra`
   - Domain must not import infra/framework packages.

6. `arch-concrete-dependency`
   - Usecase depends on interfaces, not concrete repos/clients.

7. `arch-repository-business-logic`
   - Repository performs data access/mapping only.

8. `arch-usecase-orchestration`
   - Usecase orchestrates; entities enforce invariants.

9. `arch-interface-segregation`
   - Keep interfaces small, consumer-defined.

---

## Common Violations

### ❌ Business logic in handler
```go
func (h *Handler) CreateOrder(ctx context.Context, req *pb.Request) (*pb.Response, error) {
    total := req.Price * req.Quantity // BAD
    discount := total / 10            // BAD
    order, err := h.repo.Save(ctx, domain.Order{Total: total - discount})
    if err != nil { return nil, err }
    return &pb.Response{OrderId: order.ID}, nil
}
```

### ✅ Business logic in usecase
```go
func (h *Handler) CreateOrder(ctx context.Context, req *pb.Request) (*pb.Response, error) {
    order, err := h.uc.Create(ctx, req.Price, req.Quantity)
    if err != nil { return nil, err }
    return &pb.Response{OrderId: order.ID}, nil
}

func (u *OrderUsecase) Create(ctx context.Context, price, qty int) (*domain.Order, error) {
    order, err := domain.NewOrder(price, qty) // domain invariant
    if err != nil { return nil, err }
    return u.repo.Save(ctx, order)
}
```

### ❌ Repository with business rules
```go
func (r *OrderRepo) Save(ctx context.Context, order *domain.Order) error {
    if order.Total > 1_000_000 { // BAD business rule
        order.Status = "needs_approval"
    }
    return r.db.Create(order)
}
```

### ✅ Repository does CRUD/mapping only
```go
func (r *OrderRepo) Save(ctx context.Context, order *domain.Order) error {
    return r.db.Create(order)
}
```

---

## Error Mapping

Use typed categories and map them consistently:

- `ValidationError` -> HTTP 400 / gRPC InvalidArgument
- `BusinessRuleError` -> HTTP 422 / gRPC FailedPrecondition
- `NotFoundError` -> HTTP 404 / gRPC NotFound
- `ConflictError` -> HTTP 409 / gRPC AlreadyExists
- `UnauthorizedError` -> HTTP 401 / gRPC Unauthenticated
- `ForbiddenError` -> HTTP 403 / gRPC PermissionDenied
- `TransientInfraError` -> HTTP 503 / gRPC Unavailable
- `UnexpectedError` -> HTTP 500 / gRPC Internal

Logging rule:
- Return safe client message
- Log internal cause + correlation ID
- Never leak SQL/stack/secrets

---

## Testing Strategy

- **Delivery**: contract tests (mapping/validation/status)
- **Usecase**: unit tests (orchestration/business rules)
- **Repository**: integration tests (query/mapping/tx)
- **Domain**: unit tests (invariants/behavior)

Priority coverage:
- Rule-violation paths
- Error mapping
- Transaction rollback/idempotency
- Permission-sensitive usecases

---

## Audit Workflow

1. Identify package boundaries (delivery/usecase/repository/domain/config)
2. Check imports for inward dependency rule
3. Audit handlers for business logic leakage
4. Audit usecases for orchestration + interface dependencies
5. Audit repositories for CRUD-only behavior
6. Check constructors for DI (no concrete creation in inner layers)
7. Validate tests per layer

### Output format

```text
## Architecture Violations: <count>

### [<rule-id>] (File: path/to/file.go)
Layer: Delivery | Usecase | Repository | Domain
Issue: <brief violation>
Impact: <tight coupling / untestable / wrong responsibility>
Fix: <specific correction>
Example:
// corrected snippet
```

Severity:
- High: all `high-*`
- Medium: `arch-*`
- Upgrade to High when it blocks testability or violates domain purity

---

## Migration Playbook

1. Identify business logic in handlers/services
2. Introduce usecase interfaces and I/O contracts
3. Move orchestration into usecases
4. Extract repository ports from usecase perspective
5. Move DB/ORM details to repository adapters
6. Implement typed error mapping end-to-end
7. Wire concrete implementations in composition root (`main/config`)
8. Add layer tests before removing legacy path

Done criteria:
- Delivery thin and transport-focused
- Usecases own orchestration
- Repositories data-only
- Domain framework-free
- 9 rules pass review

---

## Trigger phrases

- "Audit architecture"
- "Check layer dependencies"
- "Review Clean Architecture"
- "Verify separation of concerns"
- "Check dependency rules"
- "Review usecase/repository pattern"
- "Check for layer violations"
- "Audit service structure"

## Related skills

- `@[skills/golang-patterns]`
- `@[skills/api-patterns]`
- `@[skills/testing-patterns]`
- `@[skills/architecture]`
