# Production Readiness Review (PRR) - Short Guide

Goal

- Reduce launch risk by validating reliability, security, and operations.

Scope

- New services, major features, or high-impact changes.

PRR Checklist (Short)

1. Reliability

- Defined SLOs and error budgets.
- Capacity estimate and scaling strategy.
- Known failure modes and mitigation.

2. Observability

- Dashboards for latency, errors, saturation.
- Alerts with clear thresholds and owners.
- Runbooks for top incidents.

3. Deployment and Rollback

- Safe rollout strategy (canary, blue-green, rolling).
- Automated rollback trigger or manual steps documented.
- Backward-compatible changes or migration plan.

4. Security and Compliance

- Secrets management and rotation plan.
- Threat model for critical paths.
- Access control and audit logging where needed.

5. Data and Recovery

- Backups verified and restore tested.
- RPO/RTO defined and validated.
- Data migration plan with roll-forward and rollback.

6. Performance

- Load test or benchmark results recorded.
- Performance regressions tracked and accepted.

Decision Outcome

- Go: All critical items satisfied.
- Go with conditions: known risks and owners.
- No-go: block until high-risk gaps are closed.

Common Failure Modes

- No owner for alerts.
- Rollback plan is theoretical, not tested.
- Missing user-impact metrics.

Artifacts to Produce

- PRR doc or ticket with checklist results.
- Links to dashboards, runbooks, and load tests.
