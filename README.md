# Health Express Ambulette — Next.js 3D Website

The 3D homepage design converted to **Next.js 15 (App Router, TypeScript)**. The content follows healthexpressambulette.com. The photos come from health-express-rho.vercel.app.

*Prepared by SEO Team — Rank Mantra*

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```
`npm run dev` and `npm run build` first run `scripts/fetch-images.mjs`. That script downloads the fleet, hero and logo photos from the Vercel site into `public/images/`. Files that are already there are skipped. If a download fails, the build still runs and the site shows a fallback photo instead.

## Pages
| URL | Page |
|---|---|
| `/` | Home (3D hero) |
| `/about` | About Us |
| `/services` | All services |
| `/services/ambulette-services` · `/private-medical-transportation` · `/two-men-assist-over-stairs` · `/medicaid-ambulette-service` · `/wheelchair-handicapped-transportation` | Service pages |
| `/ambuletteService` | Ambulette Service Brooklyn NY |
| `/southBrooklyn` | South Brooklyn |
| `/faq` | F.A.Q. |
| `/contact` | Contact Us |
| `/schedule` | Schedule a ride (full form) |
| `/driverForm` | Apply as Driver |

These URLs are the same as on the current site, so Google rankings carry over. Short links `/brooklyn`, `/south-brooklyn`, `/book` and `/apply-as-driver` redirect to them.

## Where things are
| What | File |
|---|---|
| **All text, phone, address, FAQs, services, links** | `lib/site.ts` |
| Styles (gold/navy theme, 3D effects) | `app/globals.css` |
| SEO: title, meta, Open Graph, JSON-LD (MedicalBusiness + FAQPage) | `app/layout.tsx` |
| Page section order | `app/page.tsx` |
| 3D hero (parallax van, road reflections, rain canvas) | `components/Hero3D.tsx` |
| Loader, scroll progress, cursor glow, reveal, 3D tilt cards | `components/Effects.tsx` |
| Rotating 3D fleet photo ring | `components/FleetCarousel.tsx` |
| Forms (schedule, contact, driver application) | `components/Forms.tsx`, `components/ScheduleForm.tsx` |
| Form APIs | `app/api/book`, `app/api/contact`, `app/api/driver` |
| Inner-page 3D banner + breadcrumbs | `components/PageHero.tsx` |
| Shared sections (services grid, call band, map, neighborhoods) | `components/Blocks.tsx` |
| sitemap.xml / robots.txt | `app/sitemap.ts`, `app/robots.ts` |

## Forms
All forms are checked on the server. To receive them, set `FORMS_WEBHOOK_URL` in Vercel → Settings → Environment Variables. Point it at a Make.com or Zapier webhook that emails info@healthexpressambulette.com or adds a row to a Google Sheet (see `.env.example`).
- **Booking and contact forms:** if no webhook is set yet, the requests are kept in Vercel → Logs.
- **Driver applications:** these include the license, SSN card and medical documents, so they are **never logged**. In production they are refused until `FORMS_WEBHOOK_URL` is set, so no applicant's documents get lost.
- **Upload size:** Vercel limits a request to about 4.5 MB, so the form keeps the three documents under 4 MB in total.

## Deploy
Push to GitHub and import the repo in Vercel. No other settings are needed.
