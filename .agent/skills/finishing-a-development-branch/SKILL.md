---
name: finishing-a-development-branch
description: Use when implementation is complete, tests are green, and you need to decide whether to merge, push for PR, keep, or discard the branch
---

# Finishing a Development Branch

## Overview

End branch work with explicit choices instead of vague "what next?" handoffs.

**Core principle:** verify first, then choose integration path.

## Process

### 1. Verify

Run the relevant test/build checks first. If they fail, do not proceed to merge or PR.

### 2. Determine Base Branch

Confirm whether the target is `main`, `master`, or another branch.

### 3. Present Four Options

Offer exactly these:

1. Merge back locally
2. Push and create a PR
3. Keep the branch as-is
4. Discard the work

### 4. Execute Safely

- verify merged result if merging locally
- avoid force-push unless explicitly requested
- require explicit confirmation before discarding

### 5. Clean Up

Remove temporary worktrees only when appropriate.

## Red Flags

- offering completion options before verification
- deleting work without explicit confirmation
- auto-cleaning a branch the user may still want

## Pairs With

- `using-git-worktrees`
- `verification-before-completion`
