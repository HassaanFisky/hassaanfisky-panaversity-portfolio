---
name: vault-management
description: Moves files between vault folders and updates Dashboard.md.
trigger_keywords: ["move", "update", "dashboard", "vault"]
---

## When to Use
- Triggered when a task status changes or the dashboard needs updating.

## Instructions
1. Move processing files between `Needs_Action/`, `Pending_Approval/`, and `Done/`.
2. Update counts and stats on `Dashboard.md`.
3. Log all movements in `Logs/`.

## Validation
- [ ] Files are in correct folders.
- [ ] Dashboard counts match the filesystem.
