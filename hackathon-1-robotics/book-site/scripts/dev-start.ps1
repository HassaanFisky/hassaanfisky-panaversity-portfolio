# dev-start.ps1
# One-command dev environment

Write-Host "🤖 Identifying Neural Interfaces..." -ForegroundColor Cyan

# Start Docusaurus in background? No, usually foreground for dev
Write-Host "📚 Starting Textbook UI (Docusaurus)..." -ForegroundColor Green
npm start
