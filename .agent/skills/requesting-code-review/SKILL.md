---
name: requesting-code-review
description: Use when completing a task, finishing a major feature, or before merging so that an independent review can catch issues early
---

# Requesting Code Review

## Overview

Request review before problems compound.

**Core principle:** review early, review often.

## When to Request Review

Mandatory:

- after a meaningful task or batch of changes
- before merge or PR
- after a risky refactor or bugfix

Optional but useful:

- when stuck
- when touching unfamiliar code
- when requirements are subtle

## What Good Review Context Includes

- what changed
- what requirement or plan the change is meant to satisfy
- exact files or commit range to inspect
- known tradeoffs or open questions

## Review Response Pattern

1. collect the diff or file list
2. state intended behavior or acceptance criteria
3. ask for bugs, regressions, risks, and missing tests first
4. fix important findings before moving on

## Severity Guidance

- Critical: must fix now
- Important: should fix before continuing
- Minor: can batch or note

## Red Flags

- skipping review because the change feels small
- asking for "general thoughts" without scope
- continuing with unfixed important findings

## Pairs With

- `code-review-checklist`
- `receiving-code-review`
- `verification-before-completion`
