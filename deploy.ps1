# ============================================================
# Panaversity - MASTER DEPLOYMENT SCRIPT (PowerShell)
# v4.2: Direct Cloud Orchestration & Infrastructure Reporting
# ============================================================

param(
    [string]$Only = "all"  # Options: all | h0 | h1 | h2 | h3 | h4
)

$ROOT = "E:\panaversity"
$Results = @()

# --- Define Helper Functions ---
function Show-Info  { param($msg) Write-Host "  [i] $msg" -ForegroundColor Cyan }
function Show-Ok    { param($msg) Write-Host "  [v] $msg" -ForegroundColor Green }
function Show-Warn  { param($msg) Write-Host "  [!] $msg" -ForegroundColor Yellow }
function Show-Fail  { param($msg) Write-Host "  [x] $msg" -ForegroundColor Red }
function Show-Title { param($msg) Write-Host "`n=== $msg ===" -ForegroundColor Magenta }

# --- Module Definitions ---
$modules = @(
    @{ id = "h0"; name = "H0: Portfolio Hub"; path = "$ROOT\hackathon-0\frontend"; project = "panaversity-h0-portfolio" },
    @{ id = "h1"; name = "H1: AI Robotics Textbook"; path = "$ROOT\hackathon-1-robotics"; project = "hackathon-1-robotics" },
    @{ id = "h2"; name = "H2: Evolution of To-Do"; path = "$ROOT\hackathon-2-todo\hackathon-2\frontend"; project = "evolution-of-todo" },
    @{ id = "h3"; name = "H3: LearnFlow Platform"; path = "$ROOT\hackathon-3\learnflow-app\frontend"; project = "learnflow-platform-h3" },
    @{ id = "h4"; name = "H4: Companion FTE"; path = "$ROOT\hackathon-4-companion\digital-fte-hackathon-autonomous-crm-master\frontend"; project = "frontend" }
)

# --- Filter Modules ---
if ($Only -ne "all") {
    $modules = $modules | Where-Object { $_.id -eq $Only }
}

# --- Deployment Logic ---
function Start-Deployment {
    param($mod)
    Show-Title "Starting Cloud Run: $($mod.name)"

    if (-not (Test-Path $mod.path)) {
        Show-Fail "Path not found: $($mod.path)"
        return "MISSING_PATH"
    }

    $currentLocation = Get-Location
    try {
        Set-Location $mod.path

        # Clean local artifacts to avoid interference
        if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
        if (Test-Path ".vercel/output") { Remove-Item -Recurse -Force ".vercel/output" }

        # Trigger Direct Production Push
        Show-Info "Pinging Vercel API for '$($mod.project)'..."
        # We use --prod directly. Vercel will handle builds on their end.
        vercel --prod --yes --force
        
        if ($LASTEXITCODE -eq 0) {
            Show-Ok "$($mod.name) is successfully LIVE."
            return "SUCCESS"
        } else {
            Show-Fail "$($mod.name) deployment encountered a protocol error."
            return "FAILED"
        }
    } catch {
        Show-Fail "Unexpected exception in $($mod.name): $_"
        return "ERROR"
    } finally {
        Set-Location $currentLocation
    }
}

# --- Execution ---
Show-Title "Initiating Panaversity Master Deployment"
$startTime = Get-Date

foreach ($mod in $modules) {
    $status = Start-Deployment $mod
    $Results += [PSCustomObject]@{
        Module = $mod.id
        Name   = $mod.name
        Status = $status
    }
}

# --- Final Infrastructure Report ---
$elapsed = [math]::Round(((Get-Date) - $startTime).TotalSeconds, 1)
Show-Title "PANAVERSITY INFRASTRUCTURE REPORT"
$Results | Format-Table -AutoSize
Write-Host "Total Protocol Time: ${elapsed}s" -ForegroundColor Cyan

$failedCount = ($Results | Where-Object { $_.Status -ne "SUCCESS" }).Count
if ($failedCount -eq 0) {
    Write-Host "ALL NODES OPERATIONAL. ECOSYSTEM STABILIZED." -ForegroundColor Green -BackgroundColor Black
} else {
    Write-Host "$failedCount NODES OFFLINE. INVESTIGATION REQUIRED." -ForegroundColor Red -BackgroundColor Black
}
