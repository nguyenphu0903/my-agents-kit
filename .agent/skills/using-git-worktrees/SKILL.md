---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from the current workspace or before executing a larger implementation plan on a separate branch
---

# Using Git Worktrees

## Overview

Git worktrees create isolated workspaces that share the same repository history.

**Core principle:** isolate risky work, verify the baseline, then implement.

## When to Use

- large feature work
- implementation from a written plan
- parallel development on multiple branches
- when the current workspace is already busy or dirty

## Directory Preference

Check in this order:

1. `.worktrees/`
2. `worktrees/`
3. project guidance files if they define a preferred location
4. ask the user if nothing is established

If using a project-local worktree folder, verify it is ignored before creating a worktree.

## Setup Flow

1. Detect repo root and base branch
2. Pick worktree directory
3. Create a new branch and worktree
4. Run project setup commands based on the stack
5. Run the baseline verification command
6. Only proceed if the baseline is understood

## Typical Commands

```bash
git worktree add .worktrees/<branch-name> -b <branch-name>
```

Then run the project's setup and baseline verification, for example:

- `npm install`
- `go mod download`
- `pytest`
- `go test ./...`

## Red Flags

- creating a worktree in a tracked directory
- skipping baseline verification
- starting implementation on `main`/`master` without user intent
- proceeding when baseline failures are unexplained

## Pairs With

- `plan-writing`
- `executing-plans`
- `finishing-a-development-branch`
