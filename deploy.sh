#!/bin/bash
# ═══════════════════════════════════════════════════
# Werkstatt ONE — Landing Pages Deploy Script
# Pushes to GitHub → GitHub Pages auto-deploys
# ═══════════════════════════════════════════════════

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

echo "🚀 Werkstatt ONE — Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if PAT is provided as argument or env var
PAT="${1:-$GITHUB_PAT}"
if [ -z "$PAT" ]; then
    echo "❌ GitHub PAT fehlt!"
    echo ""
    echo "Verwendung:"
    echo "  ./deploy.sh ghp_xxxxxxxxxxxx"
    echo ""
    echo "Oder als Umgebungsvariable:"
    echo "  GITHUB_PAT=ghp_xxxx ./deploy.sh"
    echo ""
    echo "PAT erstellen: https://github.com/settings/tokens/new"
    echo "  Scope: repo (Full control of private repositories)"
    exit 1
fi

# Set remote with PAT
REMOTE_URL="https://mreis-ui:${PAT}@github.com/mreis-ui/landing-pages.git"
git remote set-url origin "$REMOTE_URL"

# Stage and commit any uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Uncommitted changes found — staging..."
    git add -A
    git commit -m "deploy: $(date '+%Y-%m-%d %H:%M') — auto-commit before deploy"
fi

# Force push (GitHub remote has placeholder files with different history)
echo "📤 Pushing to GitHub..."
git push --force origin main 2>&1

# Clean the PAT from the remote URL
git remote set-url origin https://github.com/mreis-ui/landing-pages.git

echo ""
echo "✅ Deployed! GitHub Pages wird in ~60 Sekunden aktualisiert."
echo ""
echo "🌐 Live URLs:"
echo "   https://mreis-ui.github.io/landing-pages/"
echo "   https://mreis-ui.github.io/landing-pages/awareness.html"
echo "   https://mreis-ui.github.io/landing-pages/consideration.html"
echo "   https://mreis-ui.github.io/landing-pages/decision.html"
echo ""
echo "⏳ Custom Domain? In GitHub → Settings → Pages → Custom domain eintragen"
