# ============================================================
# Panaversity - MASTER DEPLOYMENT SCRIPT (PowerShell)
# v4.1: Verified Vercel Mapping & Zero Structural Chaos
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

# --- Module Definitions (VERIFIED MAPPING) ---
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
        project = "hackathon-1-robotics"
    },
    @{
        id      = "h2"
        name    = "H2: Evolution of To-Do"
        path    = "$ROOT\hackathon-2-todo\hackathon-2\frontend"
        project = "evolution-of-todo"
    },
    @{
        id      = "h3"
        name    = "H3: LearnFlow Platform"
        path    = "$ROOT\hackathon-3\learnflow-app\frontend"
        project = "learnflow-platform-h3"
    },
    @{
        id      = "h4"
        name    = "H4: Companion FTE"
        path    = "$ROOT\hackathon-4-companion\digital-fte-hackathon-autonomous-crm-master\frontend"
        project = "frontend"
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

        # Check for .vercel/project.json consistency
        if (Test-Path ".vercel/project.json") {
             $v_json = Get-Content ".vercel/project.json" | ConvertFrom-Json
             if ($v_json.projectName -ne $mod.project) {
                 Show-Warn "Project mismatch! Vercel config says '$($v_json.projectName)', script expected '$($mod.project)'"
             }
        }

        # Clean previous build artifacts
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

        # Vercel Deployment (Prebuilt)
        Show-Info "Triggering Vercel build for '$($mod.project)' in $($mod.path)..."
        
        # Build locally for stability
        vercel build --prod --yes
        if ($LASTEXITCODE -ne 0) { Show-Fail "Vercel build failed for $($mod.name)." }

        # Deploy the prebuilt output
        Show-Info "Uploading prebuilt artifact..."
        vercel deploy --prebuilt --prod --yes
        
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
Show-Title "Panaversity Infrastructure Result"
Write-Host "Total time: ${elapsed}s" -ForegroundColor Green
Write-Host "All verified modules processed successfully." -ForegroundColor Green
