# Go 1.25 Features & Performance Guide

> **Release Date**: August 2025
> **Focus**: Latency reduction, container awareness, and modernizing stdlib (`json/v2`, `synctest`).

---

## 🍵 1. "Green Tea" Garbage Collector

### What is it?
A new, optional GC mode designed for **latency-sensitive** applications with large heaps. 
- **Flag**: `GOEXPERIMENT=greenteagc`
- **Goal**: Reduce "Stop-The-World" (STW) pauses and tail latency (p99).

### When to use?
- **High-throughput servers**: gRPC services handling 100k+ RPS.
- **Large Heaps**: Applications using >10GB RAM where standard GC scan times are noticeable.
- **Trade-off**: Might have slightly lower *throughput* (CPU usage) in exchange for better *latency* consistency.

---

## 📦 2. Container-Aware GOMAXPROCS

### The Problem (Before 1.25)
Go runtime saw the **Host CPU count**, not the **Container CPU limit**.
- Host: 64 cores. Container limit: 4 cores.
- Go launched 64 OS threads (M) and 64 Processors (P).
- **Result**: Massive OS context switching penalty. We had to use `uber-go/automaxprocs` to fix this.

### The Solution (1.25)
Go runtime is now cgroup-aware by default.
- **Behavior**: Automatically sets `GOMAXPROCS` to match the container's CPU quota (if defined).
- **Action**: You can likely remove `_ "go.uber.org/automaxprocs"` imports from new services.

---

## ⚡ 3. JSON v2 (`encoding/json/v2`)

### Major Upgrade (Experimental)
A complete rewrite of the JSON library to fix long-standing performance and correctness issues.

### Key features:
- **Performance**: ~2x faster unmarshaling, less allocations.
- **Strictness**: options for `RejectUnknownMembers` (no more custom decoders needed).
- **Date/Time**: Correct RFC 3339 nano handling.
- **Streaming**: Better `Encoder/Decoder` APIs.

```go
// Old
json.Unmarshal(data, &v)

// New (v2)
jsonv2.Unmarshal(data, &v, jsonv2.RejectUnknownMembers(true))
```

---

## 🧪 4. Deterministic Testing (`testing/synctest`)

### The End of `time.Sleep()` in Tests
A new package to control the extensive runtime clock (`time.Now`).

**Before (Flaky):**
```go
go func() { time.Sleep(1 * time.Second); done <- true }()
// Hope it finished?
time.Sleep(1100 * time.Millisecond)
```

**After (Deterministic):**
```go
synctest.Run(func() {
    go func() { time.Sleep(1 * time.Second); done <- true }()
    
    // Fast-forward time instantly!
    synctest.Advance(1 * time.Second)
    <-done
})
```

---

## 🛠️ 5. Default DWARF 5
- **Impact**: Smaller binaries (debug info compression) and faster link times.
- **Action**: None (automatic benefit). If using ancient debuggers (gdb < 8), you might need update tools.

---

## 📋 Action Items for Upgrade
1. **Audit `automaxprocs`**: Test removing it in localized environments.
2. **Benchmark Green Tea GC**: If you have latency-critical services, run a canary with `GOEXPERIMENT=greenteagc`.
3. **Refactor Tests**: Identify flaky time-based tests and rewrite with `synctest`.
