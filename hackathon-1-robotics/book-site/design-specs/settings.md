# Environment Settings

## Authentication

This project uses a Dual-Mode Auth system.

### Demo Mode (Default)

No configuration required. Users are stored in localStorage.

### Production Mode

Set the following variables in Vercel:

- `NEXT_PUBLIC_AUTH_MODE=PRODUCTION`
- `NEXTAUTH_SECRET=...`
- `DATABASE_URL=...`

## AI Integration

To enable the Chatbot to work with real LLMs:

- `OPENROUTER_API_KEY=...`

## Analytics

- `NEXT_PUBLIC_ANALYTICS_ID=...`
