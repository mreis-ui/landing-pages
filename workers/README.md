# Cloudflare Worker — GoHighLevel Proxy

These files power the CRM lead flow and are deployed **separately** from this
Next.js site (they are NOT part of the Vercel build).

- `ghl-proxy-worker.js` — Cloudflare Worker behind `https://ghl-proxy.flowbytesystems.com/api/lead`.
  Receives lead submissions from the site forms, creates a GoHighLevel contact +
  pipeline opportunity. The GHL API token stays server-side as a Worker secret.
  Required env vars: `GHL_TOKEN`, `GHL_LOCATION_ID`.
- `ghl-pipeline-manager.js` — helper functions for moving opportunities between
  pipeline stages (used by the Worker / n8n).

The website forms (`src/components/LeadForm.tsx`) POST to the Worker URL; on
localhost they fall back to the GHL inbound webhook for testing.
