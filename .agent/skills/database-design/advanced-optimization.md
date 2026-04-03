# Advanced Database Optimization

> Deep dive into internals and optimization strategies for Principal Engineers.

## PostgreSQL Internals

### MVCC (Multi-Version Concurrency Control)
Postgres doesn't update rows in place. It creates a new version (`xmax` set on old, `xmin` on new).
- **Implication**: UPDATEs are INSERTs + DELETEs.
- **Problem**: Dead tuples (bloat) accumulate.
- **Solution**: `autovacuum`.
    - **Tuning**: Increase `autovacuum_vacuum_cost_limit` (default is too low for SSDs).
    - **Monitoring**: Check `pg_stat_user_tables.n_dead_tup`.

### WAL (Write-Ahead Log)
Changes are written to the WAL first (append-only, fast) then to the heap (random IO, slow).
- **Checkpoint**: Flushes dirty pages from memory to disk.
- **Tuning**: Increase `max_wal_size` to reduce checkpoint frequency (fewer I/O spikes).
- **Archiving**: Use WAL-G or pgBackRest to stream WALs to S3 for Point-in-Time Recovery (PITR).

### Buffer Cache
- **shared_buffers**: PostgreSQL's shared memory area. Rule of thumb: 25% of RAM.
- **OS Cache**: Postgres relies heavily on the OS Page Cache. Don't allocate all RAM to `shared_buffers`.

## Advanced Indexing

### 1. BRIN (Block Range Index)
- **Use case**: Large time-series or sequential ID data.
- **Size**: Tiny (store min/max per block).
- **Speed**: Very fast scans for ranges.

### 2. GIN (Generalized Inverted Index)
- **Use case**: JSONB documents, Arrays, Full-text search (`tsvector`).
- **Mechanism**: Maps values to list of rows.

### 3. Partial Indexes
- **Syntax**: `CREATE INDEX ... WHERE status = 'active'`.
- **Benefit**: Reduces index size significantly if you only query active rows.

### 4. Covering Indexes
- **Syntax**: `CREATE INDEX ... INCLUDE (col1, col2)`.
- **Benefit**: Index-only scan (doesn't visit the heap table).

## Connection Pooling

**Problem**: Postgres processes are heavy (fork per connection).
**Solution**: Use a pooler (PgBouncer, Odyssey).

### Pooling Modes
1.  **Session Mode**: Connection held for full client session. (Safe, but mimics standard connection).
2.  **Transaction Mode** (Recommended): Server connection released after every transaction.
    - **Scale**: Supports 10k+ client connections with ~100 server connections.
    - **Caveat**: Can't use session-level features (Prepared Statements needs care, SET commands).

## Query Optimization Patterns

### The "Lateral" Join
Iterate over the left table and execute the right side for each row.
```sql
SELECT * FROM users u,
LATERAL (
  SELECT * FROM orders o 
  WHERE o.user_id = u.id 
  ORDER BY o.created_at DESC LIMIT 5
) top_orders;
```
*Use case*: Fetch "Top N items" per category efficiently (Top-N-per-group).

### CTE Optimization (Materialized vs Not)
- **Postgres 12+**: Inlines CTEs unless `MATERIALIZED` is specified.
- Use `MATERIALIZED` if the CTE is expensive and computed once.
- Avoid CTEs for simple filter lists (use `IN (...)`).

### Window Functions
- `RANK()`, `DENSE_RANK()`, `ROW_NUMBER()`
- **Anti-pattern**: Doing this in application code (fetching all rows and sorting). DB is faster.
