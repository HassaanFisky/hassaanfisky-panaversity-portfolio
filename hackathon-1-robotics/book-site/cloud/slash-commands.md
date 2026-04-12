# Cloud Slash Commands

Quick reference for CLI commands to manage this project.

## Development

```powershell
# Start local dev server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## Git Operations

```powershell
# Add all changes
git add -A

# Commit with message
git commit -m "feat: description"

# Push to main
git push origin main
```

## Deployment

```powershell
# Vercel CLI deploy
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls
```

## Backend Operations

```powershell
# Run textbook indexer
cd backend && python process.py

# Install Python deps
cd backend && pip install -r requirements.txt
```

## MCP Server

```powershell
# Build MCP server
cd mcp-server && npm run build

# Start MCP server
cd mcp-server && npm start
```

## Linting & Testing

```powershell
# Type check (if TS is configured)
npx tsc --noEmit

# Check for broken links
npm run build 2>&1 | Select-String "broken"
```

## Environment

```powershell
# Set env var (PowerShell)
$env:OPENROUTER_API_KEY = "your-key"

# Check current env
echo $env:OPENROUTER_API_KEY
```
