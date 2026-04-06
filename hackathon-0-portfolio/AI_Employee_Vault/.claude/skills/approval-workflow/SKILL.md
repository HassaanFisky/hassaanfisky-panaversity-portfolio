---
name: approval-workflow
description: Executes tasks once they are in the 'Approved' folder.
trigger_keywords: ["approve", "execute", "approved"]
---

## When to Use
- Triggered when a human moves a draft from `Pending_Approval/` to `Approved/`.

## Instructions
1. Watch the `Approved/` folder.
2. Execute the corresponding action (send email, post to social, etc.).
3. Move the file to `Done/` on success.
4. Log the result in `Logs/`.

## Validation
- [ ] Task executed before moving to Done.
- [ ] Error logged if execution fails.
