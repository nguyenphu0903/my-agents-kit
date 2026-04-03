# Distributed Database Patterns

> Core patterns for architecting scalable, distributed data systems.

## CAP Theorem vs PACELC

**CAP** states you can only pick 2:
- **Consistency**: Every read receives the most recent write or an error.
- **Availability**: Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
- **Partition Tolerance**: The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.

**PACELC** expands on this for non-partitioned states:
> If Partitioned (P), choose Availability (A) or Consistency (C).
> Else (E), choose Latency (L) or Consistency (C).

**Example Application**:
- **DynamoDB**: PA/EL (Partitioned? Available. Else? Low Latency/Eventual Consistency).
- **Postgres (Async Replication)**: PA/EL (Primary fails? Promote secondary (Availability over Consistency)).
- **CockroachDB**: PC/EC (Partitioned? Consistent. Else? Consistent). Default is strong consistency.

## Consistency Models

1.  **Strict Linearizability** (Strongest):
    - Global clock ordering. Rare and expensive.
    - Use case: Global banking ledgers (Spanner).

2.  **Sequential Consistency**:
    - Operations from a single processor are sequential.
    - Use case: Local coordinated systems.

3.  **Causal Consistency**:
    - If A causes B, all nodes see A before B. Concurrent writes can be widely out of order.
    - Use case: Social media comments (A parent comment must appear before its child).

4.  **Read-Your-Writes** (Session Consistency):
    - A user sees their own updates immediately.
    - Use case: Profile updates, Shopping carts.

5.  **Eventual Consistency** (Weakest):
    - "Eventually" all nodes agree.
    - Use case: Analytics counters, DNS, CDN content.

## Sharding Strategies

### 1. Range Sharding
Rows are ordered by primary key and assigned to regions.
- **Pros**: Efficient range queries (`WHERE key BETWEEN A AND Z`).
- **Cons**: Write hotspots if keys are sequential (e.g., Timestamp).
- **Example**: HBase, TiKV (TiDB).

### 2. Hash Sharding
Rows are distributed by `hash(key) % N`.
- **Pros**: Uniform distribution, eliminates hotspots.
- **Cons**: Range queries require hitting ALL shards (scatter-gather). Resharding is expensive.
- **Example**: DynamoDB, Cassandra, MongoDB (hashed).

### 3. Directory-Based Sharding
A lookup service maps `Key -> Shard ID`.
- **Pros**: Highly flexible, can move individual tenants/keys without moving entire shards.
- **Cons**: Lookup service is a single point of failure/bottleneck.
- **Example**: Multi-tenant SaaS (TenantID -> Database Connection).

## Replication Patterns

### 1. Single Leader (Primary-Replica)
- **Writes**: Only to Leader.
- **Reads**: To Leader (Strong) or Replicas (Eventual).
- **Pros**: Simple conceptual model.
- **Cons**: Leader is write bottleneck. Failover time.

### 2. Multi-Leader
- **Writes**: To any Leader (one per datacenter).
- **Pros**: High availability, local write latency.
- **Cons**: Conflict resolution (Last-Write-Wins, CRDTs) is hard.

### 3. Leaderless (Dynamo-style)
- **Writes**: To `W` nodes in a quorum.
- **Reads**: From `R` nodes in a quorum.
- **Consensus**: `R + W > N`.
- **Pros**: No failover needed. High availability.
- **Cons**: "Read repair" overhead.
