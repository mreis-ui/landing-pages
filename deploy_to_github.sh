#!/bin/bash
# ═══════════════════════════════════════════════════════
# FlowByte Landing Pages - GitHub Deploy Script
# Lädt alle Dateien hoch + aktiviert GitHub Pages
# ═══════════════════════════════════════════════════════
# USAGE: GH_TOKEN="ghp_xxxx" bash deploy_to_github.sh
# ═══════════════════════════════════════════════════════

set -e

REPO="mreis-ui/landing-pages"
DIR="/Users/flowbyte_ai_mac/GoogleAds/landing-pages"
API="https://api.github.com"

if [ -z "$GH_TOKEN" ]; then
  echo "❌ GH_TOKEN nicht gesetzt. Bitte: export GH_TOKEN='ghp_xxxx'"
  exit 1
fi

echo "╔═════════════════════════════════════════╗"
echo "║   FlowByte LP Deploy → GitHub Pages    ║"
echo "╚═════════════════════════════════════════╝"

# Upload each file
for FILE in index.html awareness.html consideration.html decision.html ghl-proxy-worker.js README.md netlify.toml _redirects .gitignore; do
  [ ! -f "$DIR/$FILE" ] && continue
  echo ""
  echo "─── Uploading: $FILE ───"
  
  CONTENT=$(base64 -i "$DIR/$FILE")
  SHA=$(curl -s "$API/repos/$REPO/contents/$FILE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('sha',''))" 2>/dev/null)
  
  if [ -n "$SHA" ] && [ "$SHA" != "" ]; then
    # Update existing file
    RESULT=$(curl -s -w "|%{http_code}" -X PUT "$API/repos/$REPO/contents/$FILE" \
      -H "Authorization: Bearer $GH_TOKEN" \
      -H "Accept: application/vnd.github+json" \
      -d "{\"message\":\"Deploy $FILE\",\"content\":\"$CONTENT\",\"sha\":\"$SHA\"}")
  else
    # Create new file
    RESULT=$(curl -s -w "|%{http_code}" -X PUT "$API/repos/$REPO/contents/$FILE" \
      -H "Authorization: Bearer $GH_TOKEN" \
      -H "Accept: application/vnd.github+json" \
      -d "{\"message\":\"Deploy $FILE\",\"content\":\"$CONTENT\"}")
  fi
  
  HTTP=$(echo "$RESULT" | awk -F'|' '{print $NF}')
  [ "$HTTP" = "200" ] || [ "$HTTP" = "201" ] && echo "  ✅ $FILE uploaded ($HTTP)" || echo "  ❌ $FILE failed ($HTTP)"
done

# Enable GitHub Pages
echo ""
echo "─── Activating GitHub Pages ───"
PAGES=$(curl -s -w "|%{http_code}" -X POST "$API/repos/$REPO/pages" \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d '{"source":{"branch":"main","path":"/"}}')

PH=$(echo "$PAGES" | awk -F'|' '{print $NF}')
[ "$PH" = "201" ] || [ "$PH" = "200" ] || [ "$PH" = "409" ] && echo "  ✅ Pages activated" || echo "  ⚠️ Pages: HTTP $PH"

echo ""
echo "═══════════════════════════════════════════"
echo "🌐 URL: https://mreis-ui.github.io/landing-pages/"
echo "═══════════════════════════════════════════"
echo ""
echo "Warte 60 Sekunden auf GitHub Pages Deploy..."
sleep 60

# Verify
echo ""
echo "─── Verify ───"
curl -s -o /dev/null -w "decision.html: %{http_code}\n" "https://mreis-ui.github.io/landing-pages/decision.html"
