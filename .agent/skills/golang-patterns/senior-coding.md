# Senior Golang Coding Standards: The "Senior" Difference

> **Objective**: Move beyond "making it work" to "making it maintainable, evolvable, and efficient."

---

## 🏗️ 1. Abstraction & Interfaces

### The Golden Rule: "Accept Interfaces, Return Structs"
Junior code often returns interfaces, which locks the consumer into a specific abstraction and makes the implementation harder to update.

**Junior:**
```go
type Storage interface { Save(data string) }

func NewStorage() Storage { // Returns interface (Bad)
    return &diskStorage{}
}
```

**Senior:**
```go
type DiskStorage struct {} // Concrete type

func NewDiskStorage() *DiskStorage { // Returns struct (Good)
    return &DiskStorage{}
}

// Consumer defines the interface it needs!
type Saver interface {
    Save(data string)
}

func BusinessLogic(s Saver) { ... }
```
**Why?**
1.  **Flexibility**: The consumer decides what subset of methods they need.
2.  **Evolution**: You can add methods to `DiskStorage` without breaking existing consumers.

### Interface Pollution
**Junior**: Defines 20-method interfaces in a shared `types` package.
**Senior**: Defines 1-2 method interfaces *exactly where they are used*.

---

## 🛠️ 2. API Design: Functional Options Pattern

When a struct has many configuration parameters (some optional), don't use a massive config struct or multiple constructors.

**Junior**:
```go
func NewServer(addr string, timeout int, logger *Logger, retryCount int) *Server
// Call: NewServer(":8080", 30, nil, 0) // What is nil? What is 0?
```

**Senior (Functional Options)**:
```go
type Server struct {
    timeout time.Duration
    maxConn int
}

type Option func(*Server)

func WithTimeout(d time.Duration) Option {
    return func(s *Server) { s.timeout = d }
}

func NewServer(addr string, opts ...Option) *Server {
    s := &Server{timeout: 30 * time.Second} // Default
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// Call is readable and extensible:
// NewServer(":8080", WithTimeout(10*time.Second))
```

---

## 🚫 3. Error Handling Mastery

### Behavior over Type
Don't check error types/strings. Check behavior.

**Junior**:
```go
if err.Error() == "network timeout" { ... } // Brittle
```

**Senior**:
```go
type Temporary interface {
    Temporary() bool
}

if temp, ok := err.(Temporary); ok && temp.Temporary() {
    // Retry logic
}
```

### Wrapping for Context
Never just return `err`. Answer WHO failed and WHY.

**Junior**: `return err`
**Senior**: `return fmt.Errorf("saving user profile %s: %w", userID, err)`

### Sentinel Errors vs Custom Types
- Use **Sentinel** (`var ErrNotFound = errors.New("...")`) for simple equality checks.
- Use **Custom Types** (`type ValidationError struct...`) when the caller needs data (e.g., which field failed).

---

## 🏛️ 4. Project Architecture

### Package Layout
**Junior**: Dump everything in `main.go` or flat structure.
**Senior**: Separate by responsibility (Domain vs Adapters).

- `internal/domain`: Pure business logic (User, Order). NO import of HTTP/SQL.
- `internal/adapter`:
  - `storage/postgres`: Implements domain repositories.
  - `handler/http`: Implements HTTP handlers.
- `cmd/app`: Wires them together (Dependency Injection).

### Dependency Injection
**Senior code explicitly passes dependencies.** No globals. No `init()` magic.

```go
// cmd/main.go
func main() {
    db := postgres.New(...)
    service := domain.NewService(db)
    handler := http.NewHandler(service) // Wiring graph is visible here
    handler.Serve()
}
```

---

## 🏎️ 5. Concurrency Discipline

### Channel Hygiene
**Senior Rule**: The goroutine that writes to a channel is responsible for closing it.

### Context Propagation
**Always** pass `context.Context` as the first argument to any function doing I/O or long calculations.
**Never** store Context in a struct. Pass it down the stack.

### Leak Prevention
**Junior**: Fires a goroutine and hopes it finishes.
**Senior**: Uses `sync.WaitGroup` or `errgroup.Group` to ensure all goroutines are accounted for before shutdown.

```go
g, ctx := errgroup.WithContext(ctx)
g.Go(func() error {
    return server.Run(ctx)
})
if err := g.Wait(); err != nil {
    log.Fatal(err)
}
```
