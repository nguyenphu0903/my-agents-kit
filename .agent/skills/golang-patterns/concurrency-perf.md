# Golang Concurrency Performance

> **Warning**: Concurrency is not parallelism. Concurrency is structure; parallelism is execution. Adding goroutines does not guarantee speedup (Amdahl's Law).

---

## 🧱 1. Hardware Sympathy

### False Sharing (The Silent Killer)
- **Problem**: CPU caches operate on "Cache Lines" (usually 64 bytes).
- **Scenario**: Two goroutines modify independent variables (`A` and `B`) that happen to sit on the *same* cache line.
- **Result**: Cores ping-pong ownership of the cache line. Performance tanks (10x-100x slower).

**Fix: Cache Line Padding**
```go
type Counter struct {
    count uint64
    _     [56]byte // Padding to fill 64-byte line (8 + 56 = 64)
}
```

### Atomic vs Mutex
- **Atomic (`sync/atomic`)**: Optimized CPU instructions (Compare-And-Swap). Extremely fast for simple counters/flags.
- **Mutex (`sync.Mutex`)**: OS-level signaling (sometimes). Slower, but composable.
- **RWMutex**: Only worth it if Reads >>> Writes. If writes are frequent, `RWMutex` is *slower* than `Mutex` due to complexity.

---

## 🚦 2. Scheduler Mechanics

### M:P:G Model
- **G (Goroutine)**: Logic + Stack (start 2KB).
- **M (Machine)**: OS Thread (expensive).
- **P (Processor)**: Logical context/resource (usually GOMAXPROCS).

### Blocking Cost
- **Syscall/Network**: Async. G is parked, M is freed (mostly). Efficient.
- **CGO/Heavy Lock**: Sync. M is blocked. New M must be spun up or parked. Expensive.
- **Context Switch**: Cheap (~200ns) for Goroutines vs Expensive (~2-10µs) for Threads.

### Starvation
- **Preemption**: Since Go 1.14, schedulers are preemptive (async). Long tight loops won't starve GC anymore.
- **Live Lock**: `atomic.SpinLoop` without `runtime.Gosched()` can hog the P.

---

## ⚔️ 3. High-Performance Patterns

### Lock-Free Structures
Only use when profiling proves Mutex is the bottleneck. Hard to get right.
- **Single Writer / Multi Reader**: Use `atomic.Value` (Load/Store). excellent for config updates.
- **CAS Loop**: 
  ```go
  for {
      old := atomic.LoadUint64(&ops)
      if atomic.CompareAndSwapUint64(&ops, old, old+1) {
          break
      }
  }
  ```

### Sharding (Striping)
Reduce lock contention by splitting one hot lock into N smaller locks.
- **Example**: `concurrent-map`
  ```go
  type ShardedMap struct {
      shards []*sync.RWMutex
      maps   []map[string]interface{}
  }
  func (m *ShardedMap) GetShard(key string) int {
      return hash(key) % len(shards)
  }
  ```

### Bounded Parallelism (Worker Pool)
Don't launch `go func()` for every request. Launch `GOMAXPROCS` (or `N`) workers and feed them via channel.
- **Reason**: Too many Goroutines = Memory overhead + GC pressure + Scheduling delay.

### Pipeline Bottlenecks
- **Unbuffered Channel**: Sync point. Every send waits for receive. 0 latency, but high coupling.
- **Buffered Channel**: Async. Decouples producer/consumer.
  - **Perf Tip**: Buffer size = 1 is often enough to smooth jitter. Large buffers just hide backpressure issues until OOM.

---

## 📉 4. Benchmarking Concurrency

Use `RunParallel` to test scalability across cores.

```go
func BenchmarkAtomic(b *testing.B) {
    var cnt uint64
    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            atomic.AddUint64(&cnt, 1)
        }
    })
}
```
If scaling is linear with cores → Good.
If scaling flattens or dips → Contention (False sharing or Lock contention).
