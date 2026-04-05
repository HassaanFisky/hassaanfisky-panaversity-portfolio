#!/usr/bin/env python3
import sys
import os

def generate_agents_md(repo_path):
    agents_md_content = """# Agentic Conventions (AGENTS.md)

This repository follows the Agentic AI Foundation (AAIF) standards for AI-assisted development.

## AI Agent Guidelines
1. **Understand Before Modifying**: Review existing context and architecture before making changes.
2. **Follow MCP Code Execution**: Prefer writing scripts that interact with APIs/data instead of loading large contexts directly.
3. **Small, Atomic Commits**: Keep changes isolated and well-documented.
4. **Skills as Product**: Ensure any new capabilities are documented as standard Skills (`SKILL.md`).

## Stack
- Frontend: Next.js + Tailwind
- Backend: FastAPI + Dapr
- Infrastructure: Kubernetes / Koyeb
"""
    
    file_path = os.path.join(repo_path, 'AGENTS.md')
    
    try:
        # Create directory if it doesn't exist
        os.makedirs(repo_path, exist_ok=True)
        
        with open(file_path, 'w') as f:
            f.write(agents_md_content)
        print(f"✓ Successfully generated AGENTS.md at {file_path}")
        sys.exit(0)
    except Exception as e:
        print(f"✗ Failed to generate AGENTS.md: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("✗ Usage: python generate.py <path_to_repo>")
        sys.exit(1)
        
    repo_path = sys.argv[1]
    generate_agents_md(repo_path)
