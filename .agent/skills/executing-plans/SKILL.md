---
name: executing-plans
description: Use when you already have a written implementation plan and need to execute it methodically with verification and checkpoints
---

# Executing Plans

## Overview

Read the plan, challenge it if needed, then execute tasks in order without improvising away the spec.

**Core principle:** review first, execute second, verify throughout.

## Process

### 1. Load and Review

1. Read the plan file completely
2. Identify risks, gaps, or unclear instructions
3. Raise blockers before starting code changes

### 2. Execute Task by Task

For each task:

1. Mark it in progress
2. Follow the described steps exactly
3. Run the listed verification
4. Mark it complete only after evidence

### 3. Finish Cleanly

After all tasks are verified:

- run final project verification
- use `verification-before-completion`
- if working on a branch/worktree, use `finishing-a-development-branch`

## Stop and Ask When

- the plan is missing key context
- a verification step fails repeatedly
- the task conflicts with current codebase reality
- the plan asks for something unsafe or clearly outdated

## Red Flags

- treating the plan as optional
- skipping verification because the change looks simple
- silently changing architecture without surfacing it
- continuing on a broken baseline without agreement

## Related Skills

- `plan-writing`
- `verification-before-completion`
- `using-git-worktrees`
- `requesting-code-review`
