---
name: fastapi-koyeb-agent
description: Setup and deploy AI tutoring FastAPI microservices to Koyeb
---

# FastAPI / Koyeb AI Agent Deployment

## When to Use
- Deploying the AI Agents (Triage, Concepts, Code Review, Debug, Exercise).
- Updating agent prompts or models.

## Instructions
1. Navigate to the agent directory (e.g. `concepts-service`).
2. Verify OpenAI/Groq API keys are bound to Koyeb Secrets.
3. Run: `python3 /mnt/e/panaversity/skills-library/.claude/skills/fastapi-koyeb-agent/scripts/agent_deploy.py <service-name>`
