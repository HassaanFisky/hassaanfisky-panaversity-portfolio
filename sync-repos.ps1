# sync-repos.ps1
# Synchronizes the Panaversity ecosystem to their respective repositories.

$ROOT = "E:\panaversity"
$User = "HassaanFisky"

$Mapping = @(
    @{ id = "h0"; path = "$ROOT\hackathon-0"; repo = "panaversity-h0-portfolio" },
    @{ id = "h1"; path = "$ROOT\hackathon-1-robotics"; repo = "Physical-AI-Humanoid-Robots-Textbook" },
    @{ id = "h2"; path = "$ROOT\hackathon-2-todo"; repo = "hassaanfisky-panaversity-todo" },
    @{ id = "h3"; path = "$ROOT\hackathon-3"; repo = "hassaanfisky-panaversity-learnflow" },
    @{ id = "h4"; path = "$ROOT\hackathon-4-companion"; repo = "AIRA-Digital" }
)

Write-Host "--- Initiating Multi-Repository Synchronization ---" -ForegroundColor Magenta

foreach ($item in $Mapping) {
    Write-Host "`nProcessing: $($item.id) -> $($item.repo)" -ForegroundColor Cyan
    
    if (-not (Test-Path $item.path)) {
        Write-Host "Error: Path not found: $($item.path)" -ForegroundColor Red
        continue
    }

    Set-Location $item.path

    # Initialize Git if missing (unlikely given previous check, but safe)
    if (-not (Test-Path ".git")) {
        Write-Host "Initializing Git repository..." -ForegroundColor Yellow
        git init -b main
    }

    # Setup Remote URL
    $remoteUrl = "https://github.com/$User/$($item.repo).git"
    
    # Check current remote
    $currentRemote = git remote get-url origin 2>$null
    if ($null -eq $currentRemote) {
        Write-Host "Adding remote origin: $remoteUrl" -ForegroundColor Green
        git remote add origin $remoteUrl
    } elseif ($currentRemote -ne $remoteUrl) {
        Write-Host "Updating remote origin from $currentRemote to $remoteUrl" -ForegroundColor Yellow
        git remote set-url origin $remoteUrl
    } else {
        Write-Host "Remote origin already correctly mapped." -ForegroundColor Green
    }

    # Sync: Clean cache to respect new .gitignore, then Stage and Commit
    Write-Host "Cleaning index and staging changes..." -ForegroundColor DarkGray
    git rm -r --cached . 2>$null
    git add .
    git commit -m "Ecosystem Sync: Finalizing repository mapping and deployment preparation" 2>$null

    # Push
    Write-Host "Pushing to $remoteUrl..." -ForegroundColor Green
    git push -u origin main --force # Using force if remotes were swapped from portfolio repo
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS: $($item.id) synchronized." -ForegroundColor Green
    } else {
        Write-Host "FAILED: $($item.id) push encountered an error." -ForegroundColor Red
    }
}

Set-Location $ROOT
Write-Host "`n--- Synchronization Complete ---" -ForegroundColor Magenta
