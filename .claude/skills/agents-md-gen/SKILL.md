---
name: agents-md-gen
description: Generate AGENTS.md files for repositories to establish agentic conventions
---

# AGENTS.md Generator Skill

## When to Use
- When you need to initialize or update the `AGENTS.md` file in a repository.
- To document repository conventions and guidelines for AI agents.

## Instructions
1. Run the generation script: `python scripts/generate.py <path_to_repo>`
2. Review the output to ensure the `AGENTS.md` file was successfully created.

## Validation
- [ ] `AGENTS.md` exists in the target repository root.
- [ ] File contains AAIF standard guidelines.
