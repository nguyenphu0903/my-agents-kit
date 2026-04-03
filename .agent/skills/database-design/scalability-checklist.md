# Scalability & Reliability Checklist

> Principal-level checklist for ensuring system stability at scale.

## High Availability (HA) & Disaster Recovery (DR)

- [ ] **Define RPO (Recovery Point Objective)**
    - *How much data can we lose?*
    - **Zero**: Sync replication (performance penalty).
    - **Seconds**: Async replication (standard).
- [ ] **Define RTO (Recovery Time Objective)**
    - *How long to get back online?*
    - **Minutes**: Automated failover (Patroni, AWS RDS Multi-AZ).
    - **Hours**: Restore from backup.
- [ ] **Backup Verification**
    - Are backups actually usable? (Test restores quarterly).
    - Is WAL archiving monitoring active?

## Scaling Strategies

### 1. Vertical Scaling (Scale Up)
- **First Step**: Upgrade instance size.
- **Pros**: Zero code change.
- **Limit**: Hardware limits, cost curve becomes exponential.

### 2. Read Scalability (Replica)
- **Strategy**: Offload reads to Read Replicas.
- **Gotcha**: **Replication Lag**. Application must tolerate "stale" reads (Eventual Consistency).
- **Pattern**: `Write Connection` vs `Read Connection` in app.

### 3. Caching Strategy
- **Look-aside**: App checks Redis -> Miss -> DB -> Set Redis.
- **Write-through**: App writes to Cache, Cache writes to DB (Rare/Complex).
- **Write-behind**: App writes to Cache, Queue writes to DB (High risk of data loss).
- **Anti-pattern**: Caching everything. Only cache high-read, low-change data.

## Load Testing

- [ ] **Tooling**: k6, artillery, or ghz (gRPC).
- [ ] **Scenario**: Test "thundering herd" (Cache clear -> DB spike).
- [ ] **Connection Evaluation**: Check `max_connections` vs Pool size during load.

## Security at Scale

- [ ] **Row Level Security (RLS)**: Enforce tenancy at DB layer (Supabase approach).
- [ ] **Encryption**: At Rest (Disk), In Transit (TLS 1.3).
- [ ] **Least Privilege**: Application user should NOT have `DROP TABLE` or `ALTER TABLE` rights.
