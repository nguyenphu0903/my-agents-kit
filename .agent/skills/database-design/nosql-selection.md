# NoSQL Database Selection

> **Choose based on data model and access patterns, not popularity.**

## Decision Framework

### When to use which NoSQL database?

| Scenario | Recommendation | Why |
|----------|---------------|-----|
| **Document storage** | MongoDB | Flexible schema, rich queries |
| **Key-value with scale** | DynamoDB | Serverless, auto-scaling |
| **Time-series data** | Cassandra | Write-optimized, distributed |
| **Wide-column data** | Cassandra | Flexible columns, high write throughput |
| **Global distribution** | DynamoDB or Cassandra | Multi-region replication |
| **Complex queries** | MongoDB | Aggregation pipeline, indexes |

---

## MongoDB

### When to use
- Flexible, evolving schemas
- Rich query capabilities needed
- Document-oriented data
- Aggregation pipelines

### Go Libraries
- `mongo-go-driver` (official)

### Patterns
- **Document Design**: Embed vs reference
- **Aggregation Pipeline**: Complex queries
- **Indexes**: Single-field, compound, text
- **Transactions**: Multi-document ACID

### Anti-Patterns
❌ Using MongoDB as relational DB
❌ Not indexing query fields
❌ Embedding everything (document size limits)
❌ Ignoring schema validation

---

## DynamoDB

### When to use
- Serverless architecture
- Predictable performance at scale
- Key-value or simple queries
- AWS ecosystem

### Go Libraries
- `aws-sdk-go-v2/service/dynamodb`

### Patterns
- **Single-Table Design**: One table for entire app
- **Partition Keys**: Even distribution
- **Sort Keys**: Range queries
- **GSI/LSI**: Alternative access patterns

### Anti-Patterns
❌ Multiple tables (use single-table design)
❌ Hot partitions (uneven key distribution)
❌ Scanning instead of querying
❌ Not planning access patterns upfront

---

## Cassandra

### When to use
- Massive write throughput
- Time-series data
- No single point of failure
- Linear scalability

### Go Libraries
- `gocql` (DataStax driver)

### Patterns
- **Partition Keys**: Data distribution
- **Clustering Columns**: Sorting within partition
- **Wide Rows**: Time-series data
- **Denormalization**: Query-driven design

### Anti-Patterns
❌ Using as relational DB
❌ Joins (not supported)
❌ Hot partitions
❌ Not modeling for queries

---

## SQL vs NoSQL Decision

| Factor | Use SQL | Use NoSQL |
|--------|---------|-----------|
| **Schema** | Fixed, relational | Flexible, evolving |
| **Transactions** | Complex, multi-table | Simple, single-document |
| **Queries** | Complex joins | Key-based or simple |
| **Scale** | Vertical | Horizontal |
| **Consistency** | Strong ACID | Eventual (configurable) |

---

## Go Integration Examples

### MongoDB
```go
import "go.mongodb.org/mongo-driver/mongo"

// Document design
type User struct {
    ID       primitive.ObjectID `bson:"_id,omitempty"`
    Name     string            `bson:"name"`
    Emails   []string          `bson:"emails"` // Embedded
    Posts    []primitive.ObjectID `bson:"post_ids"` // Referenced
}
```

### DynamoDB
```go
import "github.com/aws/aws-sdk-go-v2/service/dynamodb"

// Single-table design
// PK: USER#<id>, SK: PROFILE
// PK: USER#<id>, SK: POST#<timestamp>
```

### Cassandra
```go
import "github.com/gocql/gocql"

// Time-series schema
// CREATE TABLE metrics (
//   sensor_id uuid,
//   timestamp timestamp,
//   value double,
//   PRIMARY KEY (sensor_id, timestamp)
// )
```

---

## Migration Considerations

### From SQL to NoSQL
- Denormalize data
- Design for queries, not normalization
- Accept eventual consistency
- Rethink transactions

### From NoSQL to SQL
- Normalize data
- Define foreign keys
- Leverage ACID transactions
- Use joins for relationships
