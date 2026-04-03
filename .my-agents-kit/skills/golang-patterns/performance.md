# Golang Performance Profiling & Optimization (Senior Level)

> **Philosophy**: Measure first (Profile), understand why (Compiler/Hardware), then optimize. Blind optimization is the root of all evil.

> **Go 1.26 Update**:
> - **Green Tea GC default**: No experiment flag needed; benchmark again before carrying old GC tuning forward.
> - **Faster cgo**: Baseline cgo overhead is lower, so re-measure before rewriting cgo-heavy paths.
> - **More stack allocation**: The compiler keeps more slice backing storage on stack in some cases.
> - **Container-aware runtime**: `GOMAXPROCS` still respects cgroups automatically; avoid stale `automaxprocs` cargo cult.
> - **JSON v2**: Still a strong option for new projects where ecosystem compatibility is acceptable.

---

## 🔬 1. Profiling Mastery (Beyond Basics)

### The "Big Three" Profiles

#### CPU Profile (`go tool pprof http://localhost:8080/debug/pprof/profile?seconds=30`)
- **Flat vs Cum**: `Flat` is time spent *in* the function. `Cum` includes callees.
- **Top offenders**: Look for standard library functions (e.g., `syscall`, `runtime.mallocgc`) appearing in `flat` top 10.
  - `runtime.mallocgc` high? → Excessive allocation (check Memory Profile).
  - `syscall.Read/Write` high? → I/O bound (check Block Profile).
  - `runtime.futex`? → Lock contention (check Mutex Profile).

#### Memory Profile (`/debug/pprof/heap`)
- **Alloc Objects vs Alloc Space**:
  - `alloc_objects`: Better for spotting "death by 1000 cuts" (many tiny allocations).
  - `inuse_space`: Better for spotting memory leaks.
- **Flag**: Use `--alloc_objects` to find allocation hotspots even if they are GC'd quickly.

#### Execution Trace (`go tool trace`)
- **Scheduler Latency**: Visualize *when* goroutines run vs waiting.
- **M:P:G view**: See if processors (P) are idle while work exists (load balancing issues).
- **GC Pauses**: Exact STW (Stop-The-World) duration and frequency.

### Advanced: Custom Profiles
Use `pprof.Profile` labels to tag goroutines with context (e.g., `user_id`, `endpoint_id`).
```go
pprof.Do(ctx, pprof.Labels("worker_id", "42"), func(ctx context.Context) {
    // profiling data from here is tagged
})
```

---

## 🛠️ 2. Compiler Optimizations

### Inlining (`-l`)
- **Cost Model**: Go inlines simple functions (leaf functions, low complexity cost).
- **Control**:
  - `//go:noinline`: Stop inlining (good for profiling/debugging).
  - `-gcflags '-m -m'`: See inline decisions (verbose).
- **Impact**: Removes function call overhead, enables further optimizations (DCE, CSE).

### Bounds Check Elimination (BCE) (`-d=ssa/check_bce`)
Go checks array/slice bounds by default. The compiler can remove these checks if it *proves* safety.

**Bad (2 checks):**
```go
func foo(s []int) {
    _ = s[0] // Check 1
    _ = s[1] // Check 2
}
```

**Good (1 check):**
```go
func foo(s []int) {
    _ = s[1] // Check 1 (implies s[0] exists)
    _ = s[0] // Check removed
}
```

**Loop Optimization:**
```go
// Check moved outside loop
func sum(s []int) int {
    if len(s) == 0 { return 0 }
    // Hint to compiler: s is at least len(s) long
    _ = s[len(s)-1] 
    t := 0
    for _, v := range s { t += v }
    return t
}
```

### Escape Analysis (`-m`)
Decides Stack vs Heap.
- **Stack**: Fast (pointer bump), no GC cost.
- **Heap**: Slow (malloc), causes GC pressure.
- **Common Escapes**:
  - Interfaces: `fmt.Println(x)` (x escapes because `any` interface).
  - Returning pointer to local var: `return &x`.
  - Closures capturing variables.
  - Slice size unknown at compile time (`make([]int, n)`).

---

## ⚡ 3. CPU Mechanics & Loop Optimization

### Loop Performance: `for i` vs `for range`

#### Value Copy Cost
```go
// BAD for large structs: Copies each element (128 bytes)
type Big [128]byte
var list []Big
for _, v := range list { /* use v */ }

// GOOD: No copy (index only)
for i := range list { _ = list[i] }

// GOOD: Pointer
var ptrList []*Big
for _, v := range ptrList { /* copy 8 bytes (ptr) */ }
```

#### Memory Locality (Cache Friendly)
- **Slice vs Docs**: Slice elements are contiguous. Linked list (or pointer-heavy structures) jump around heap.
- **AoS vs SoA** (Array of Structs vs Struct of Arrays):
  - AoS: `[]Point{ {x,y,z}, {x,y,z} }` → Good if accessing x,y,z together.
  - SoA: `[]floatX, []floatY` → Good if SIMD processing or only accessing X.

### Branch Prediction
- **Sorted Data**: Processing sorted data is often faster because branches (if statements) become predictable.
- **Branchless**:
  ```go
  // Branchy
  if v > 100 { x = 1 } else { x = 0 }

  // Branchless (no pipeline stall)
  // (compiler often does this automatically for simple cases)
  ```

---

## 📉 4. Benchmarking Best Practices

### Reset Timer
Always reset timer if you have setup code:
```go
func BenchmarkFoo(b *testing.B) {
    data := setup()
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        process(data)
    }
}
```

### Benchstat
Never rely on a single run. Use `benchstat` to compare changes with statistical significance.
1. `go test -bench=. -count=10 > old.txt`
2. (Make changes)
3. `go test -bench=. -count=10 > new.txt`
4. `benchstat old.txt new.txt`

### Sub-benchmarks
Detailed breakdown:
```go
b.Run("Small", func(b *testing.B) { ... })
b.Run("Large", func(b *testing.B) { ... })
```
