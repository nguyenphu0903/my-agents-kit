# Golang Advanced Memory Management

> **Core Truth**: The fastest memory allocation is the one you never make. The second fastest is on the stack.

---

## 🗑️ 1. Garbage Collector Tuning

### GOGC (The Knob)
- **Default**: 100 (GC runs when heap size doubles from live heap size).
- **Trade-off**:
  - Higher GOGC (e.g., 200, 500) = Fewer GC cycles = Higher Throughput = More RAM usage.
  - Lower GOGC (e.g., 50) = More GC cycles = Lower Throughput = Less RAM usage.
- **Microservices**: RAM is often cheap; CPU is expensive. Setting `GOGC=200` often saves CPU cycles if you have spare RAM.

### GOMEMLIMIT (Go 1.19+)
- **Problem**: With just GOGC, a memory spike can trigger OOM even if GC could have run.
- **Solution**: Soft memory limit. GC becomes aggressive as heap approaches this limit, regardless of GOGC.
- **Pattern**: Set `GOMEMLIMIT` to ~90% of container memory limit.
  - Example: Container has 1GB RAM. Set `GOMEMLIMIT=900MiB`.
  - Now you can safely set `GOGC=off` (or very high) for max throughput, and GC will only kick in to prevent OOM.

### GC Pacing
- **Scavenging**: Releasing memory back to OS. Go releases memory gradually (5 mins retention roughly).
- **FreeOSMemory**: `debug.FreeOSMemory()` forces release (rarely needed, maybe for job workers that sleep long).

---

## 🧱 2. Memory Layout & Alignment

### Data Structure Alignment
CPU reads memory in words (8 bytes on 64-bit). Struct fields are padded to aligns with word boundaries.

**Bad (24 bytes):**
```go
type Bad struct {
    a bool   // 1 byte
             // 7 bytes padding (waste)
    b int64  // 8 bytes
    c bool   // 1 byte
             // 7 bytes padding (waste)
}
```

**Good (16 bytes):**
```go
type Good struct {
    b int64  // 8 bytes
    a bool   // 1 byte
    c bool   // 1 byte
             // 6 bytes padding
}
```
**Tool**: Use `fieldalignment` tool to auto-detect.
`go install golang.org/x/tools/go/analysis/passes/fieldalignment/cmd/fieldalignment@latest`

### Slice Internals
- **Structure**: `[ptr][len][cap]` (24 bytes).
- **Memory Leak**: Slicing a large array keeps the *underlying backing array* inside memory.
  ```go
  var tiny []byte
  func read() {
      huge := make([]byte, 1000000)
      // tiny keeps 'huge' alive in memory even if we only need 10 bytes!
      tiny = huge[:10] 
  }
  
  // Fix: Copy
  func fix() {
      huge := make([]byte, 1000000)
      tiny = make([]byte, 10)
      copy(tiny, huge[:10]) // huge can be collected now
  }
  ```

---

## 🌊 3. Allocation Optimization

### Sync.Pool
- **Use Case**: Reusing objects that are expensive to allocate and short-lived (e.g., JSON buffers, Request contexts).
- **Pitfall**: Don't put pointers to other objects inside pooled objects unless you reset them (memory leak risk).
- **Pitfall**: Pool is drained during GC. Don't use for long-lived cache.
```go
var bufPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

func log() {
    b := bufPool.Get().(*bytes.Buffer)
    b.Reset() // Critical!
    defer bufPool.Put(b)
    // use b
}
```

### Stack vs Heap Allocation
- **Size matters**: Large allocations (>32KB) go directly to heap.
- **Pointer escaping**: Passing pointers to functions *can* act as escape barriers if the function is complex or interface-based.
- **Pre-allocation**: Always pre-allocate slices/maps if size is known.
  ```go
  // Bad: Multi-allocs + copy resizing
  s := make([]int, 0)
  
  // Good: Single alloc
  s := make([]int, 0, 1000)
  ```

### Arena (Experimental Go 1.20+)
- **Concept**: Region-based memory management. Allocate a block, free the whole block at once.
- **Benefit**: No GC overhead for individual objects inside the arena.
- **Status**: Still experimental (`GOEXPERIMENT=arenas`), but powerful for extremely high-throughput/low-latency paths.
