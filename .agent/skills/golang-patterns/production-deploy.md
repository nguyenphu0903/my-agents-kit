# Golang Production Deployment (Go 1.26+)

> **Standard**: Container-Native, Distroless, Secure, and Observable.

---

## 🐳 1. The "Golden" Dockerfile (Go 1.26)

**Key Changes for 1.26:**
- No `automaxprocs` needed (Runtime is cgroup-aware).
- Green Tea GC is on by default, so benchmark with real memory limits.
- Post-quantum hybrid TLS key exchange is enabled by default in `crypto/tls`.
- `CGO_ENABLED=0` creates static binaries for scratch/distroless.
- `go mod download` layer cached separately.

```dockerfile
# syntax=docker/dockerfile:1

# --- Stage 1: Build ---
FROM golang:1.26-alpine AS builder
WORKDIR /app

# 1. Cache Params
COPY go.mod go.sum ./
RUN go mod download

# 2. Build
COPY . .
# -ldflags="-w -s" strips debug info (smaller binary)
# CGO_ENABLED=0 ensures static linking
RUN CGO_ENABLED=0 GOOS=linux go build \
    -ldflags="-w -s" \
    -o /server ./cmd/app

# --- Stage 2: Runtime ---
# Use "static" (non-root) variant of distroless
FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /

# Copy binary from builder
COPY --from=builder /server /server

# Config (Optional: Copy config files if not using Env Vars)
# COPY --from=builder /app/config /config

# Run as non-root (ID 65532)
USER nonroot:nonroot

ENTRYPOINT ["/server"]
```

---

## 🛡️ 2. Security hardening

### Read-Only Filesystem
Since the app is a single binary, it shouldn't need to write to disk (except `/tmp`).
**Kubernetes SecurityContext:**
```yaml
securityContext:
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  runAsUser: 65532
```

### Capabilities
Drop ALL Linux capabilities.
```yaml
securityContext:
  capabilities:
    drop: ["ALL"]
```

---

## 📡 3. Observability Standards

### Logging (Structured)
**Do not** log to files. Log to `stdout`.
**Do not** log text. Log **JSON**.

```go
// GOOD (slog in stdlib)
logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
logger.Info("request started", "method", "GET", "path", "/api/v1/users")
```
*Why?* Log aggregators (Datadog, CloudWatch, Loki) parse JSON automatically.

### Runtime Metrics
For Go 1.26 services, consider exporting runtime metrics around:
- `/sched/goroutines`
- `/sched/threads:threads`
- goroutine creation counts

These help spot scheduler pressure and goroutine leaks earlier.

### Health Checks
Expose a lightweight endpoint for the orchestrator.
```go
http.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK) // 200 OK
})
```

---

## 🚀 4. CI/CD Pipeline Steps

1.  **Test & Lint**:
    `go test -race -v ./...`
    `golangci-lint run`
2.  **Build**:
    `docker build -t my-app:${GITHUB_SHA} .`
3.  **Scan**:
    `trivy image my-app:${GITHUB_SHA}` (Scan for vulnerabilities)
4.  **Push**:
    `docker push my-app:${GITHUB_SHA}`
5.  **Deploy**:
    Update K8s manifest or Cloud Run service.

---

## 🔐 5. Go 1.26 Deployment Notes

### TLS compatibility checks
If your service terminates TLS directly, validate interoperability with older clients or constrained environments because Go 1.26 enables hybrid post-quantum key exchanges by default.

### Reverse proxies
If you maintain custom reverse proxies, prefer `httputil.ReverseProxy.Rewrite` over `Director` for new code and migrations.
