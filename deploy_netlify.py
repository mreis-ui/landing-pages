#!/usr/bin/env python3
"""
Deploy landing pages to Netlify via API.
Creates a new site with all files using the file digest method.
"""
import hashlib
import json
import os
import sys
import urllib.request

DEPLOY_DIR = os.path.dirname(os.path.abspath(__file__))
API = "https://api.netlify.com/api/v1"

# Files to deploy
DEPLOY_FILES = []
for root, dirs, files in os.walk(DEPLOY_DIR):
    # Skip .git and deploy scripts
    dirs[:] = [d for d in dirs if d != '.git']
    for f in files:
        if f.endswith(('.sh', '.py')):
            continue
        full = os.path.join(root, f)
        rel = os.path.relpath(full, DEPLOY_DIR)
        DEPLOY_FILES.append((rel, full))

print("╔═════════════════════════════════════════╗")
print("║   Werkstatt ONE → Netlify Deploy        ║")
print("╚═════════════════════════════════════════╝")
print()

# Step 1: Calculate SHA1 digest for each file
file_digests = {}
for rel, full in DEPLOY_FILES:
    with open(full, 'rb') as fh:
        sha1 = hashlib.sha1(fh.read()).hexdigest()
    file_digests["/" + rel] = sha1
    print(f"  📄 {rel} ({sha1[:8]}...)")

print(f"\n  Total: {len(file_digests)} files")

# Step 2: Create site with file digest
print("\n─── Creating Netlify site ───")
site_data = json.dumps({
    "files": file_digests
}).encode()

req = urllib.request.Request(
    f"{API}/sites",
    data=site_data,
    headers={"Content-Type": "application/json"},
    method="POST"
)

try:
    resp = urllib.request.urlopen(req)
    site = json.loads(resp.read())
except urllib.error.HTTPError as e:
    print(f"❌ Site creation failed: {e.code}")
    print(e.read().decode())
    sys.exit(1)

site_id = site["id"]
deploy_id = site.get("deploy_id") or site["id"]
site_url = site.get("ssl_url") or site.get("url", "")
required = site.get("required", list(file_digests.keys()))

print(f"  ✅ Site: {site_id}")
print(f"  🌐 URL: {site_url}")

# Step 3: Upload required files
if required:
    print(f"\n─── Uploading {len(required)} files ───")
    
    # Get deploy info for upload
    deploy_url = f"{API}/sites/{site_id}/deploys"
    deploy_data = json.dumps({"files": file_digests}).encode()
    req = urllib.request.Request(
        deploy_url,
        data=deploy_data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        resp = urllib.request.urlopen(req)
        deploy = json.loads(resp.read())
        deploy_id = deploy["id"]
        required = deploy.get("required", [])
    except urllib.error.HTTPError as e:
        print(f"⚠️ Deploy creation: {e.code}")
        required = list(file_digests.keys())
    
    # Upload each required file
    sha_to_path = {v: k for k, v in file_digests.items()}
    for sha in required:
        rel_path = sha_to_path.get(sha, "")
        if not rel_path:
            continue
        local_path = os.path.join(DEPLOY_DIR, rel_path.lstrip("/"))
        
        with open(local_path, 'rb') as fh:
            file_data = fh.read()
        
        upload_url = f"{API}/deploys/{deploy_id}/files{rel_path}"
        req = urllib.request.Request(
            upload_url,
            data=file_data,
            headers={"Content-Type": "application/octet-stream"},
            method="PUT"
        )
        
        try:
            resp = urllib.request.urlopen(req)
            print(f"  ✅ {rel_path}")
        except urllib.error.HTTPError as e:
            print(f"  ❌ {rel_path}: {e.code}")

print()
print("═══════════════════════════════════════════")
print(f"🌐 LIVE: {site_url}")
print("═══════════════════════════════════════════")
print()
print("Next steps:")
print("  1. Go to https://app.netlify.com to claim this site")
print("  2. Add custom domain in site settings")
