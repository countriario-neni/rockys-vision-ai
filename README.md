# Rocky's Vision AI

Content, marketing and AI systems for growing brands, across every industry.
A studio inside Rocky Solutions LLC.

Live at **https://hirerockysolutions.com**

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Check

```bash
npm test             # vitest — content guardrails and contact/link invariants
npm run lint
npm run build        # static export to out/
```

Both must be green before deploying. The deploy workflow runs `npm test` first, so a red
suite blocks the live site.

To preview the real static export rather than the dev server:

```bash
npm run build
npx serve out        # or: cd out && python -m http.server 4321
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`: install → test → build →
publish `out/` to GitHub Pages.

Things that will break the deploy if changed carelessly:

1. **`public/CNAME` holds the custom domain.** It is republished on every deploy;
   deleting it drops the site back to the `github.io` URL.
2. **`basePath` must stay empty** while a custom domain serves the site from its root.
   If the custom domain is ever removed, set `NEXT_PUBLIC_BASE_PATH=/<repo>` or every
   asset URL 404s.
3. **`SITE.domain` must match the deployed host** — canonical, OG, sitemap and JSON-LD
   all derive from it.
4. **No custom headers.** GitHub Pages cannot set them.

### DNS for the apex

An apex domain cannot use a CNAME. Point `hirerockysolutions.com` at GitHub Pages with:

```
A     185.199.108.153
A     185.199.109.153
A     185.199.110.153
A     185.199.111.153
AAAA  2606:50c0:8000::153
AAAA  2606:50c0:8001::153
AAAA  2606:50c0:8002::153
AAAA  2606:50c0:8003::153
```

Any existing redirect on the apex must be removed first.

## Structure

```
app/                 routes — home, services index, /services/[slug], about, contact
components/sections/ page sections
components/ui/       nav, footer, logo, WhatsApp button
components/motion/   Lenis provider, scroll reveal
content/             site.ts, services.ts, founders.ts — all copy lives here
public/reel|media/   generated reference imagery, see tools/gen-media.py
tests/               vitest
```

All copy lives in `content/`. Components read it; they do not hold strings worth editing.

## Image licensing

Photography in `public/solutions/`, `public/reel/` and `public/media/` is generated
locally with an open-weights model (`stabilityai/sdxl-turbo`, see `tools/gen-solutions.py`
and `tools/gen-media.py`) — no stock library, no attribution required. It is labeled on
the page as reference material, not as the studio's own client work.
