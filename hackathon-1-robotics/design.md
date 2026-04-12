# Physical AI & Humanoid Robotics Textbook — Design Document

## Project Overview

This textbook provides a comprehensive educational resource on physical AI and humanoid robotics, covering fundamentals through advanced deployment strategies. The project combines a Docusaurus documentation site with an AI-powered chat assistant.

## Design Philosophy

### Visual Design: iOS-26 Glassmorphism

The UI implements Apple's iOS-26 design language featuring:

1. **Frosted Glass Panels**

   - Background blur: 14-24px Gaussian
   - Semi-transparent backgrounds: rgba(255, 255, 255, 0.08-0.12)
   - 1px highlight borders at low opacity

2. **Color System**

   - Primary: HSL 220° (deep blue)
   - Accent: HSL 280° (purple)
   - Gradients using curated palettes, avoiding generic colors

3. **Depth & Motion**

   - Animated gradient orbs in background
   - Hover state transforms (translateY, scale)
   - Smooth transitions (150-400ms cubic-bezier)

4. **Typography**
   - Font family: Inter / SF Pro Display
   - Size scale: 0.75rem to 3.5rem
   - Light weights (300-600) for elegance

### Architecture Decisions

```
┌─────────────────────────────────────────────────────────────┐
│                    Physical AI Textbook                      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Docusaurus  │  │  UI Variant  │  │  Chat API    │       │
│  │  (book-site) │  │  (Prototype) │  │  (OpenRouter)│       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                  │                  │              │
│         ▼                  ▼                  ▼              │
│  ┌──────────────────────────────────────────────────┐       │
│  │              Static Build / Vercel               │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Content Strategy

**Chapter Structure:**

- Learning outcomes (3 per chapter)
- 600-900 words of original content
- Practical code example
- 3 reference sources

**Voice & Tone:**

- Student-friendly, accessible
- Progressive complexity
- Practical, implementation-focused

## Technology Stack

| Component      | Technology     | Rationale                           |
| -------------- | -------------- | ----------------------------------- |
| Site Generator | Docusaurus 3.6 | Industry standard for tech docs     |
| Styling        | Custom CSS     | Full control, no framework overhead |
| Chat Backend   | Express.js     | Lightweight, well-understood        |
| AI Provider    | OpenRouter     | Cost-effective multi-model access   |
| Deployment     | Vercel         | Zero-config, excellent DX           |

## File Structure

```
submissions/textbook-variant/
├── spec-project.json          # Project specification
├── .env                       # Environment variables (gitignored)
├── bot_system_prompt.txt      # AI behavior rules
│
├── book-site/                 # Docusaurus site
│   ├── docs/                  # Chapter content
│   │   ├── 01-intro.md
│   │   ├── 02-core.md
│   │   ├── 03-howto.md
│   │   ├── 04-examples.md
│   │   └── 05-appendix.md
│   ├── src/components/        # React components
│   │   └── ChatWidget.jsx
│   └── docusaurus.config.js
│
├── examples/                  # Runnable code
│   └── run-example.js
│
├── ui-variant/               # iOS-26 prototype
│   ├── index.html
│   └── styles.css
│
├── api/                      # Chat backend
│   └── chat.js
│
└── static/img/               # Assets
```

## Accessibility Considerations

- Semantic HTML structure
- ARIA labels on interactive elements
- Color contrast ratios ≥ 4.5:1
- Keyboard navigation support
- Focus indicators preserved

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance: > 90
- Core Web Vitals: Pass

## Security Measures

- API keys in environment variables only
- No secrets in repository
- CORS configured for production domain
- Input sanitization on chat API
