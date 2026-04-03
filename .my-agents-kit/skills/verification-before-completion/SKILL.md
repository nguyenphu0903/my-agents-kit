---
name: verification-before-completion
description: Use when about to claim work is complete, fixed, or passing, before handing off, committing, or moving to the next task; requires fresh verification evidence before any success claim
---

# Verification Before Completion

## Overview

Claiming work is done without fresh verification is not acceptable.

**Core principle:** Evidence before claims, always.

## The Rule

```text
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

If you did not run the verification command in the current flow, you cannot claim success.

## Gate Checklist

Before saying "done", "fixed", "passing", or equivalent:

1. Identify the exact command that proves the claim
2. Run the full command
3. Read the output and exit code
4. Confirm the output actually supports the claim
5. Only then report status

## Common Cases

| Claim | Required Evidence |
|------|-------------------|
| Tests pass | Test command shows 0 failures |
| Build succeeds | Build command exits 0 |
| Bug fixed | Original repro no longer fails |
| Feature complete | Checklist or acceptance steps verified |
| Review complete | Review findings addressed and rechecked |

## Red Flags

- "should work now"
- "probably fixed"
- "looks good"
- committing or handing off without rerunning checks
- relying on earlier output from a different step

## Practical Pattern

```text
Claim: "Auth fix is done"
Proof:
1. Run project test command
2. Reproduce original auth bug path
3. Report exact evidence
```

## Integrations

- Use with `tdd-workflow`
- Use with `testing-patterns`
- Use before finishing a branch, opening a PR, or reporting task completion
