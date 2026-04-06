# BASELINE.md - Project State Analysis

## Framework

- **Platform**: Docusaurus 3.6.3
- **Deployment**: Vercel
- **Live URL**: https://hassaans-physical-ai-humanoid-robot.vercel.app/

## File Tree Summary

```
book-site/
├── api/chat.ts              # Serverless chat endpoint (OpenRouter)
├── backend/process.py       # Python textbook indexer
├── docs/                    # 4 modules, 12 chapters total
├── mcp-server/              # MCP integration stub
├── scripts/                 # PowerShell + Node automation
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx    # Login/Signup modal
│   │   ├── ChatWidget.jsx   # Floating chat UI
│   │   └── SnowOverlay.jsx  # Canvas snow effect
│   ├── lib/auth/            # DemoAuth provider
│   └── theme/Layout/        # Docusaurus layout wrapper
└── static/                  # Images, favicon, assets
```

## Current Chat Flow

1. User types message in ChatWidget
2. POST to `/api/chat` with message + history
3. OpenRouter API call (gpt-3.5-turbo)
4. Response rendered with Markdown

## Snow Button Implementation

- `SnowButton.jsx`: Toggle button at bottom-left
- Dispatches custom event `snow-toggle`
- `SnowOverlay.jsx`: Listens for event, renders canvas
- Canvas: position fixed, z-index 999999, pointer-events none

## Identified Issues

1. **Snow**: Event listener may not fire correctly
2. **Auth**: Free answer counter not implemented
3. **Thinking Sound**: Not implemented
4. **Branding**: Dino logo still present
