# Performance Profiling Playbook - Short Guide

Principles

- Measure first, change second.
- Fix the biggest bottleneck, not the easiest one.
- Validate with the same workload and tools.

Workflow

1. Define the goal

- Latency target, throughput target, or cost target.

2. Baseline

- Capture current metrics with realistic load.
- Record environment details to avoid false conclusions.

3. Isolate

- Identify the hottest paths and dominant waits.
- Separate CPU, IO, memory, and lock contention.

4. Hypothesize

- Write a testable guess about the bottleneck.

5. Change and verify

- Change one thing at a time.
- Re-run the same benchmark and compare.

6. Regression guard

- Add a benchmark or alert to prevent recurrence.

Common Pitfalls

- Comparing results from different environments.
- Optimizing before identifying the root cause.
- Ignoring tail latency (p95, p99).

Evidence to Collect

- Flame graphs or traces.
- Request latency distribution.
- Resource saturation data.

Output Expectations

- A short report: baseline, change, result, risk.
- A follow-up task for any remaining bottlenecks.
