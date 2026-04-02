# ============================================================
# Panaversity - MASTER DEPLOYMENT SCRIPT (PowerShell)
# Deploys all 5 hackathon frontends via Vercel CLI
# Usage: .\deploy.ps1
# Usage (single): .\deploy.ps1 -Only h1
# ============================================================

param(
    [string]$Only = "all"  # Options: all | h0 | h1 | h2 | h3 | h4
)

$ErrorActionPreference = "Stop"
$ROOT = "E:\panaversity"

# --- Define Helper Functions ---
function Show-Info  { param($msg) Write-Host "  [i] $msg" -ForegroundColor Cyan }
function Show-Ok    { param($msg) Write-Host "  [v] $msg" -ForegroundColor Green }
function Show-Warn  { param($msg) Write-Host "  [!] $msg" -ForegroundColor Yellow }
function Show-Fail  { param($msg) Write-Host "  [x] $msg" -ForegroundColor Red; exit 1 }
function Show-Title { param($msg) Write-Host "`n=== $msg ===" -ForegroundColor Magenta }

# --- Pre-flight: Check Vercel CLI ---
Show-Title "Pre-flight checks"
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Show-Fail "Vercel CLI not found. Run: npm i -g vercel"
}
$v_version = vercel --version
Show-Ok "Vercel CLI found: $v_version"

# --- Module Definitions (REFINED with actual project names) ---
$modules = @(
    @{
        id      = "h0"
        name    = "H0: Portfolio Hub"
        path    = "$ROOT\hackathon-0\frontend"
        project = "panaversity-h0-portfolio"
    },
    @{
        id      = "h1"
        name    = "H1: AI Robotics Textbook"
        path    = "$ROOT\hackathon-1-robotics"
        project = "panaversity-h1-robotics"
    },
    @{
        id      = "h2"
        name    = "H2: Smart Todo App"
        path    = "$ROOT\hackathon-2-todo\hackathon-2\frontend"
        project = "hackathon-2-todo"
    },
    @{
        id      = "h3"
        name    = "H3: LearnFlow Platform"
        path    = "$ROOT\hackathon-3\learnflow-app\frontend"
        project = "hassaanfisky-panaversity-learnflow"
    },
    @{
        id      = "h4"
        name    = "H4: Course Companion FTE"
        path    = "$ROOT\hackathon-4-companion\digital-fte-hackathon-autonomous-crm-master\frontend"
        project = "hassaanfisky-panaversity-companion"
    }
)

# --- Filter Modules ---
if ($Only -ne "all") {
    $modules = $modules | Where-Object { $_.id -eq $Only }
    if ($modules.Count -eq 0) { 
        Show-Fail "Unknown module: $Only. Use: all | h0 | h1 | h2 | h3 | h4" 
    }
}

# --- Deployment Logic ---
function Start-Deployment {
    param($mod)

    Show-Title "Deploying: $($mod.name)"

    if (-not (Test-Path $mod.path)) {
        Show-Warn "Path not found: $($mod.path) -- SKIPPING"
        return
    }

    $currentLocation = Get-Location
    try {
        Set-Location $mod.path

        # Clean previous build artifacts that might cause double-nesting issues
        if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
        if (Test-Path ".vercel/output") { Remove-Item -Recurse -Force ".vercel/output" }

        if (-not (Test-Path "package.json")) {
            Show-Warn "No package.json in $($mod.path) -- SKIPPING"
            return
        }

        # Node Modules Check
        if (-not (Test-Path "node_modules")) {
            Show-Info "node_modules missing -- running npm install..."
            npm install --silent --legacy-peer-deps
            if ($LASTEXITCODE -ne 0) { Show-Fail "npm install failed for $($mod.name)" }
            Show-Ok "Dependencies installed."
        }

        # Vercel Deployment (Remote Build)
        Show-Info "Triggering Vercel deployment for $($mod.project) via CLI..."
        
        # Link project and deploy directly
        vercel link --project $($mod.project) --yes
        vercel deploy --prod --yes
        
        if ($LASTEXITCODE -ne 0) { Show-Fail "Vercel deploy failed for $($mod.name)." }
        Show-Ok "$($mod.name) is LIVE!"

    } finally {
        Set-Location $currentLocation
    }
}

# --- Main Run ---
$startTime = Get-Date
foreach ($mod in $modules) {
    Start-Deployment $mod
}

$elapsed = [math]::Round(((Get-Date) - $startTime).TotalSeconds, 1)
Show-Title "Final Result"
Write-Host "Total time: ${elapsed}s" -ForegroundColor Green
Write-Host "All modules processed." -ForegroundColor Green
