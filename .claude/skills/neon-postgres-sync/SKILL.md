---
name: neon-postgres-sync
description: Sync local Prisma schemas to Neon Database on Koyeb deployments
---

# Neon Postgres Sync Skill

## When to Use
- When deploying to Koyeb and database migrations must be applied to Neon.
- When `mastery_score` schemas need to be pushed to production.

## Instructions
1. Run the migration script via WSL: `python3 /mnt/e/panaversity/skills-library/.claude/skills/neon-postgres-sync/scripts/neon_migrate.py`
2. Monitor output for successful migration matching.

## Validation
- [ ] Database schema synced without losing data.
- [ ] Tables are created successfully on the Neon DB.
