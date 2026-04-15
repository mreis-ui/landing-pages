#!/usr/bin/env python3
"""Add GTM + gtag tracking to all new landing pages that are missing it."""
import re
import os

DIR = os.path.dirname(os.path.abspath(__file__))

GTM_HEAD = """    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MDTTZXG5');</script>
    <!-- End Google Tag Manager -->

    <!-- Google Ads Conversion Tracking -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17943325984"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-17943325984', { 'allow_enhanced_conversions': true });
    </script>
"""

GTM_BODY = """    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MDTTZXG5"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
"""

files_to_fix = []
for f in os.listdir(DIR):
    if not f.endswith('.html'):
        continue
    path = os.path.join(DIR, f)
    with open(path, 'r') as fh:
        content = fh.read()
    if 'GTM-MDTTZXG5' in content:
        print(f"  ✅ {f} — tracking already present")
        continue
    if '<head>' not in content:
        print(f"  ⚠️ {f} — no <head> tag found, skipping")
        continue
    files_to_fix.append((f, path, content))

print(f"\n📊 {len(files_to_fix)} files need tracking\n")

for f, path, content in files_to_fix:
    # Insert GTM head snippet after first <style> or before first <style>
    # Find the position right before <style>
    style_pos = content.find('<style>')
    head_pos = content.find('</head>')
    
    if style_pos > 0:
        content = content[:style_pos] + GTM_HEAD + '\n    ' + content[style_pos:]
    elif head_pos > 0:
        content = content[:head_pos] + GTM_HEAD + '\n' + content[head_pos:]
    
    # Insert noscript after <body>
    body_match = re.search(r'<body[^>]*>', content)
    if body_match:
        end = body_match.end()
        content = content[:end] + '\n' + GTM_BODY + content[end:]
    
    with open(path, 'w') as fh:
        fh.write(content)
    print(f"  ✅ {f} — tracking added")

print("\n✅ Done!")
