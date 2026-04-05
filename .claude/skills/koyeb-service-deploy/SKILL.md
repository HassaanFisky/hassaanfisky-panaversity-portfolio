---
name: koyeb-service-deploy
description: Deploy Python backend services to Koyeb using the Koyeb REST API
---

# Koyeb Service Deployment Skill

## When to Use
- When you need to deploy a FastAPI/Python microservice to Koyeb.
- When scaling backend agents (e.g., Triage Svc, Concepts Svc) to a cloud environment.

## Instructions
1. Navigate to the service directory within `learnflow-app`.
2. Ensure `Dockerfile` and `requirements.txt` are created.
3. Run the deployment script via WSL: `python3 /mnt/e/panaversity/skills-library/.claude/skills/koyeb-service-deploy/scripts/koyeb_api_client.py <app-name> <service-name>`
4. Monitor the terminal to see if the service successfully reaches a running state.

## Validation
- [ ] Koyeb API returns success.
- [ ] Service URL is visible.

See [REFERENCE.md](./REFERENCE.md) for architecture.
