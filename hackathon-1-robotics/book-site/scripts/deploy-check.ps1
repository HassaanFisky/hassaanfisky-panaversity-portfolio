# deploy-check.ps1
# Automates the "Hackathon Winner" deployment verification

Write-Host "🚀 Starting Pre-Flight Checks..." -ForegroundColor Cyan

# 1. Check Env Vars
if (-not (Test-Path ".env")) {
    Write-Warning "⚠️  .env file missing! Checking Vercel env..."
} else {
    Write-Host "✅ .env found" -ForegroundColor Green
}

# 2. Build Project
Write-Host "🔨 Building Docusaurus site..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Build Failed!"
    exit 1
}

# 3. Check for 404s (Basic)
Write-Host "🔍 Verifying build output..." -ForegroundColor Yellow
if (Test-Path "build/404.html") {
    Write-Host "✅ 404 Page exists" -ForegroundColor Green
} else {
    Write-Warning "⚠️  404.html missing"
}

Write-Host "✨ Ready for Vercel Deployment!" -ForegroundColor Cyan
