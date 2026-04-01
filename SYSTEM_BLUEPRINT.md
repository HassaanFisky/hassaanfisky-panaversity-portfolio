# Panaversity - Master System Blueprint

## Confirmed Structure (Scanned)
`
E:\panaversity\
├── hackathon-0\              <- H0: Personal AI Employee
│   └── frontend\            <- Next.js 15 Portfolio Dashboard
├── hackathon-0-portfolio\   <- Obsidian Vault + Watchers
├── hackathon-1-robotics\    <- H1: AI Robotics Textbook (Next.js 15)
├── hackathon-2-todo\
│   └── hackathon-2\         <- H2: Todo App (frontend + backend + k8s)
├── hackathon-3\             <- H3: Skills Library + LearnFlow
│   ├── skills-library\
│   └── learnflow-app\
├── hackathon-4-companion\   <- H4: Course Companion FTE
│   ├── content\
│   ├── backend\
│   └── frontend\
└── design-system\           <- Shared design tokens (not deployed)
`

## GitHub Repo Isolation Rules
- H0: panaversity/hackathon-0-ai-employee  -> hackathon-0/
- H1: panaversity/hackathon-1-robotics     -> hackathon-1-robotics/
- H2: panaversity/hackathon-2-todo         -> hackathon-2-todo/
- H3: panaversity/hackathon-3-learnflow    -> hackathon-3/
- H4: panaversity/hackathon-4-companion    -> hackathon-4-companion/

RULE: Har bandwidth apni repo mein ONLY push karega.
Each folder has its own .git - cross-push physically impossible.

## Environment Variable Isolation
- hackathon-1-robotics/.env.local
- hackathon-2-todo/hackathon-2/.env
- hackathon-3/learnflow-app/.env
- hackathon-4-companion/backend/.env
- hackathon-4-companion/frontend/.env.local

Rules:
- .env* files NEVER committed (har .gitignore mein listed)
- Vercel pe har project ka apna Environment Variables section
- GROQ_API_KEY har project mein alag Vercel secret

## Vercel Project Mapping
| Project Name              | Source Folder                            |
|---------------------------|------------------------------------------|
| panaversity-h0-portfolio  | hackathon-0/frontend                     |
| panaversity-h1-robotics   | hackathon-1-robotics                     |
| panaversity-h2-todo       | hackathon-2-todo/hackathon-2/frontend    |
| panaversity-h3-learnflow  | hackathon-3/learnflow-app/frontend       |
| panaversity-h4-companion  | hackathon-4-companion/frontend           |

## Portfolio Hub - Main Connector
hackathon-0/frontend connects all via env vars:
- NEXT_PUBLIC_H1_URL -> H1 deployment URL
- NEXT_PUBLIC_H2_URL -> H2 deployment URL
- NEXT_PUBLIC_H3_URL -> H3 deployment URL
- NEXT_PUBLIC_H4_URL -> H4 deployment URL
NO hardcoded URLs.

## 7 Golden Rules
1. Sirf apni repo - koi cross-push nahi
2. Clean folder separation - root mein koi loose file nahi
3. Portfolio hub connects all via env vars
4. Vercel CLI se deploy - terminal se directly
5. Env vars isolated - no leaks between projects
6. Production mindset - strict TS, no any, no TODOs
7. One script deploy - deploy.ps1 se poora system up
