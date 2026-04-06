---
name: email-processing
description: Processes email-related files in the vault.
trigger_keywords: ["email", "reply", "draft"]
---

## When to Use
- Triggered when a new email is detected in the `Needs_Action/` folder.

## Instructions
1. Read the metadata and content of the email file from `Needs_Action/`.
2. Categorize the email (Inquiry, Feedback, Task, Spam).
3. Draft a professional reply using the context available.
4. Save the draft metadata to `Pending_Approval/` for human review.

## Validation
- [ ] Reply is professional.
- [ ] Correct metadata is included.
