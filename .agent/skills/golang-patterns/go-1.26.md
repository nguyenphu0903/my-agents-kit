# Go 1.26 Features & Upgrade Guide

> **Release Date**: February 2026
> **Focus**: Language refinements, GC defaulting, better tooling, stronger crypto defaults, and safer runtime behavior.

---

## 1. Language Changes

### `new` accepts expressions

You can now allocate initialized pointer values directly.

```go
type Person struct {
    Age *int `json:"age"`
}

p := Person{Age: new(42)}
```

This is especially useful for optional pointer fields in JSON, protobuf, and config structs.

### Self-referential type constraints

Generic constraints can now refer to the constrained type itself.

```go
type Adder[A Adder[A]] interface {
    Add(A) A
}
```

This improves type-safe algebraic and fluent APIs.

---

## 2. Runtime, Compiler, and Performance

### Green Tea GC is now the default

- The Go 1.25 experimental collector is now enabled by default.
- Expect roughly 10-40% lower GC overhead in GC-heavy real workloads.
- Newer amd64 CPUs may see further gains from vectorized scanning.
- Temporary opt-out: `GOEXPERIMENT=nogreenteagc`

**Action:** Re-benchmark latency-sensitive services after upgrading. Remove old assumptions based on pre-1.26 heap behavior.

### Faster cgo calls

- Baseline cgo overhead is reduced by about 30%.

**Action:** Re-test cgo-heavy hot paths before reaching for manual batching or native rewrites.

### Heap base address randomization

- 64-bit platforms now randomize heap base addresses at startup.
- This hardens cgo-enabled programs against address-prediction attacks.

### Experimental goroutine leak profile

- New `runtime/pprof` profile: `goroutineleak`
- Enable with `GOEXPERIMENT=goroutineleakprofile`
- Exposed through `net/http/pprof` as `/debug/pprof/goroutineleak`

Use this in CI or staging when investigating blocked goroutines that never recover.

### More stack allocation for slices

- The compiler can now place slice backing storage on the stack in more situations.

**Action:** Good for performance, but if an upgrade changes behavior in subtle low-level code, use `bisect` or disable with compiler flags during diagnosis.

---

## 3. Tooling Updates

### `go fix` is now a real modernization tool

- Rewritten on the same analysis framework used by `go vet`
- Old obsolete fixers removed
- New modernizers help migrate code to current language and stdlib idioms
- Supports `//go:fix inline` directives for API migrations

**Action:** Run `go fix ./...` during upgrade branches and inspect the diff carefully.

### `go mod init` now defaults lower

When using toolchain `1.N.x`, new modules default to `go 1.(N-1).0`.

Example:
- Go 1.26 creates `go.mod` with `go 1.25.0`

This encourages compatibility with currently supported releases.

### `go tool doc` is gone

- `cmd/doc` and `go tool doc` were removed
- Use `go doc` instead

### `pprof -http` defaults to flame graph

- Better default for everyday profiling and hotspot discovery

### Bootstrap requirement

- Building Go 1.26 from source now requires Go 1.24.6 or later for bootstrap

---

## 4. Standard Library Highlights

### New crypto and security capabilities

- `crypto/hpke` adds HPKE support (RFC 9180)
- `testing/cryptotest.SetGlobalRandom` provides deterministic crypto randomness in tests
- Hybrid post-quantum TLS key exchanges are now enabled by default:
  - `SecP256r1MLKEM768`
  - `SecP384r1MLKEM1024`

**Action:** If you run strict interoperability or regulated environments, explicitly validate your `crypto/tls` config instead of assuming old defaults.

### HTTP and reverse proxy safety

- `net/http/httputil.ReverseProxy.Director` is deprecated
- Prefer `ReverseProxy.Rewrite`, which is safer because it sees both inbound and outbound requests

**Action:** Update internal proxies and gateways away from `Director`.

### Test output improvements

- `testing.T.ArtifactDir`
- `testing.B.ArtifactDir`
- `testing.F.ArtifactDir`

Use these for integration-test logs, snapshots, or repro artifacts.

### Useful smaller additions

- `bytes.Buffer.Peek`
- New reflect iterators: `Type.Fields`, `Type.Methods`, `Type.Ins`, `Type.Outs`, plus value iterators
- New runtime metrics under `/sched/goroutines` and `/sched/threads`

---

## 5. Ports & Platform Notes

- Go 1.26 is the last release that runs on macOS 12 Monterey
- 32-bit `windows/arm` was removed
- `linux/riscv64` now supports the race detector
- `freebsd/riscv64` is marked broken

---

## Upgrade Checklist

1. Run `go fix ./...` and review modernizer output.
2. Re-benchmark under the default Green Tea GC.
3. Check reverse proxies and replace `Director` with `Rewrite`.
4. Validate TLS handshakes if you depend on strict curve or cipher behavior.
5. Add `ArtifactDir` for tests that emit logs or fixture artifacts.
6. Revisit any cgo hot paths; some manual optimizations may no longer be worth the complexity.
7. If you build Go from source internally, verify the bootstrap toolchain is at least Go 1.24.6.
