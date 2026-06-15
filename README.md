# Flowbyte Systems — Website (Werkstatt ONE)

Marketing site for **Werkstatt ONE**, the workshop software by Flowbyte Systems.
Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel**.

The visual design mirrors the Werkstatt ONE Cloud product: light-dominant,
industrial-technical, type-driven. Tokens live in `src/styles/tokens.css` and are
exposed to Tailwind via `tailwind.config.ts`. No gradients/glows by design.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
src/
  app/                 # routes (App Router)
    page.tsx           # Home
    funktionen/        # Features overview + [slug] detail pages
    loesungen/         # Solutions
    referenzen/        # Case study (KFZ-Kruse)
    vision/  faq/  kontakt/
    impressum/  datenschutz/  cookies/
    api/contact/       # contact form handler
    sitemap.ts  robots.ts  opengraph-image.tsx  icon.tsx
  components/          # Header, Footer, DashboardPreview, ModuleCard, …
  lib/site.ts          # single source of truth for all copy/content
  styles/              # tokens.css + globals.css
```

## Content

Almost all copy is centralized in `src/lib/site.ts` — edit there to update
modules, pricing, FAQ, nav and footer across the whole site.

## Contact form

`POST /api/contact` validates input and (optionally) forwards the lead to an
n8n webhook. Configure in Vercel → Project → Environment Variables:

| Variable                  | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| `CONTACT_WEBHOOK_URL`     | n8n webhook the lead is POSTed to              |
| `CONTACT_WEBHOOK_API_KEY` | optional, sent as `X-API-Key` header           |

Without `CONTACT_WEBHOOK_URL` the lead is logged (not lost), and the form still
returns success.
