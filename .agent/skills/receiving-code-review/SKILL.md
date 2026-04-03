---
name: receiving-code-review
description: Use when receiving code review feedback, especially when suggestions are unclear, broad, or might be wrong for this codebase
---

# Receiving Code Review

## Overview

Review feedback should be evaluated technically, not accepted performatively.

**Core principle:** verify before implementing; push back when justified.

## Response Pattern

1. Read all feedback fully
2. Restate the technical requirement in your own words
3. Check whether it matches codebase reality
4. Clarify unclear items before implementing anything
5. Fix issues one at a time and verify each change

## Good Responses

- "I understand items 1, 2, and 4; item 3 needs clarification."
- "Checked the codepath; that suggestion would break backward compatibility."
- "Verified the reviewer is correct. Fixing it now."

## Avoid

- performative agreement
- thanking instead of acting
- implementing half-understood feedback
- assuming external reviewers always have full context

## When to Push Back

- suggestion breaks existing behavior
- reviewer missed project constraints
- change adds YAGNI complexity
- recommendation conflicts with explicit architecture decisions

## Pairs With

- `requesting-code-review`
- `verification-before-completion`
