---
name: caching-patterns
description: Caching patterns and decision-making. Redis vs in-memory cache selection, cache strategies, invalidation patterns, and distributed caching.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Caching Patterns

> **Learn to THINK about caching, not copy Redis commands.**

## 🎯 Selective Reading Rule

**Read ONLY files relevant to the request!** Check the content map, find what you need.

| File | Description | When to Read |
|------|-------------|--------------|
| `cache-selection.md` | Redis vs in-memory vs CDN | Choosing cache type |
| `redis-patterns.md` | Cache-aside, write-through, TTL | Working with Redis |
| `in-memory-patterns.md` | sync.Map, ristretto, bigcache | In-memory caching in Go |
| `invalidation.md` | Cache invalidation strategies | Keeping cache fresh |
| `golang-integration.md` | Go libraries and patterns | Implementing in Go |

---

## ⚠️ Core Principles

- **Cache what's expensive**: Database queries, API calls, computations
- **Invalidation is hard**: Plan your strategy upfront
- **TTL is your friend**: Set expiration times
- **Monitor hit rate**: Low hit rate = wasted resources
- **Handle cache misses**: Graceful degradation

---

## Decision Framework

### When to use which cache?

| Scenario | Recommendation | Why |
|----------|---------------|-----|
| **Distributed system** | Redis | Shared across instances |
| **Single instance** | In-memory (ristretto) | Faster, no network |
| **Session storage** | Redis | Persistent, distributed |
| **Rate limiting** | Redis | Atomic operations |
| **CDN cacheable** | CDN (Cloudflare) | Edge caching |
| **Hot data** | In-memory + Redis | Two-tier caching |

### Cache Strategies

| Strategy | Use Case | Pros | Cons |
|----------|----------|------|------|
| **Cache-Aside** | Read-heavy | Simple | Cache miss penalty |
| **Write-Through** | Write consistency | Always fresh | Write latency |
| **Write-Behind** | Write-heavy | Fast writes | Eventual consistency |
| **Read-Through** | Transparent caching | Simplified code | Complex setup |

---

## Anti-Patterns

❌ Caching everything (cache only expensive operations)
❌ No TTL (stale data forever)
❌ Ignoring cache stampede
❌ Not monitoring hit rate
❌ Caching user-specific data globally
❌ No fallback for cache failures
