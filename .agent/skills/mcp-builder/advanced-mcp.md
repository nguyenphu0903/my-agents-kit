# Advanced MCP Patterns (2026 Edition)

> **Objective**: Building the "Agent Web" — highly interactive, interconnected, and stateful agent systems.

---

## 🌊 1. Bidirectional Streaming

### The Shift
Old MCP (2024) was Request/Response.
New MCP (2026) is **Streaming First**.

### Pattern: Live Feedback Loop
Don't just return a final string. Stream progress, logs, and intermediate thoughts.

**Server Implementation (Go):**
```go
// Stream a long-running task
func (s *Server) ExecuteTask(ctx context.Context, req TaskReq) error {
    stream := s.NewStream(ctx)
    defer stream.Close()

    for i := 0; i < 100; i++ {
        // Send progress event
        stream.SendJSON(Event{Type: "progress", Value: i})
        time.Sleep(100 * time.Millisecond)
    }
    
    // Send final result
    return stream.SendJSON(Event{Type: "result", Data: "Done"})
}
```

### When to use?
- **Real-time logs**: Tail a log file to the agent.
- **Interactive coding**: Agent types code, server runs it and streams stdout back instantly.
- **Voice/Video**: Multimodal streaming context.

---

## 🧠 2. Stateful Sessions

### Context Continuity
Agents typically forget everything between tool calls. Stateful MCP servers maintain context.

### Pattern: Session ID
The client sends a `session_id` header or init param. The server maps this to an in-memory or Redis context.

**Resource Pattern:**
`resources://sessions/{session_id}/context`

**Workflow:**
1.  Agent calls `init_session()`. Server returns `sid_123`.
2.  Agent calls `add_memory(sid_123, "User likes blue")`.
3.  Agent calls `get_suggestion(sid_123)`. Server uses "blue" context.

---

## 🤝 3. Agent-to-Agent (A2A)

### The "Swarm" Architecture
An MCP Server isn't just a passive tool; it can be an **Agent** itself (an MCP Client).

### Pattern: The Router
An "Orchestrator Agent" connects to a "Router MCP Server".
The Router forwards requests to specific sub-agents (Coder, Researcher, Deployer).

**Structure:**
```
[User] -> [Orchestrator]
             |
             +-> [MCP: GitHub Agent] (Specialist)
             +-> [MCP: Linear Agent] (Specialist)
             +-> [MCP: Deploy Agent] (Specialist)
```

**Key Requirement**: The MCP Server must handle **Routing** and **Permission Delegation**.

---

## 🔐 4. Remote Authentication (OAuth 2.1)

### Public MCP Servers
To expose your laptop's tools to a cloud agent, you need auth.

### Pattern: OAuth Flow
1.  **Discovery**: Client hits `.well-known/mcp-configuration`.
2.  **Auth**: Client redirects user to `authorization_endpoint`.
3.  **Token**: Client gets Access Token.
4.  **Access**: Client sends `Authorization: Bearer <token>` in SSE headers.

**Security Checklist:**
- [ ] TLS (HTTPS) is mandatory.
- [ ] Scopes are strictly defined (e.g., `github:read` vs `github:write`).
- [ ] Tokens have short TTL (Time-To-Live).
