---
name: writing-skills
description: Use when creating new skills, refining existing skills, or validating that a skill is discoverable and useful in real agent workflows
---

# Writing Skills

## Overview

Treat skill authoring like process-level TDD: identify the failure mode, write the guidance, then validate the guidance changes behavior.

**Core principle:** skills should encode reusable judgment, not one-off stories.

## What Belongs in a Skill

Create a skill when:

- the technique is reusable across projects
- the model is likely to miss or shortcut it
- the guidance requires judgment, not simple linting

Do not create a skill for:

- one-off project facts
- rules better enforced by automation
- generic guidance already obvious from the environment

## Good Skill Structure

Every `SKILL.md` should have:

- a discoverable `name`
- a `description` focused on triggering conditions
- a short overview
- concrete patterns or checklists
- common mistakes

## Discovery Rules

- name should be concise and searchable
- description should start with "Use when..."
- description should explain when to load the skill, not summarize the whole workflow

## Validation Loop

1. identify the failure or blind spot
2. write the minimal skill that addresses it
3. test whether an agent would now choose and follow it
4. tighten wording if the skill is skipped or misused

## Common Mistakes

- long descriptions that hide the trigger
- mixing project-specific instructions into a general skill
- writing narrative history instead of operational guidance

## Pairs With

- `plan-writing`
- `verification-before-completion`
