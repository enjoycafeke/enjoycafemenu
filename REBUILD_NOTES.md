# Enjoy Café rebuild — Oct 20 2026

## Implemented
- Preserved React/Vite application, search, favourites, feedback and product data.
- Replaced `public/assets/images/Haile_Branch` with branch-first `public/assets/haile/{food,drinks}` and scaffolded other branches.
- Built `src/data/haile-images.json` from the uploaded files, and stopped fetching random product imagery from LoremFlickr.
- Haile is the landing branch; the reference-inspired category navigation, ratings and discovery interactions remain.
- Updated branch-specific commercial priorities.
- Introduced warm brand discovery hero, category adventure tiles and locally stored visit counter.
- Prices are retained from the pre-existing project, not newly crosschecked with an uploaded PDF.

## Still required before production
- Full verified menus and approved prices for Karen, Delamere and Imara; older baseline data is retained for Karen/Imara and MUST be reverified.
- Approval of Haile photo-to-product associations where filenames differ; the fallback is the Enjoy mark to prevent misleading imagery.
- Persistent server-side event tracking, real per-guest repeat visits, campaign analytics and rewards/redemption anti-fraud. Current data is local to each browser.
- Device/browser QA and production build. Package install/build was unavailable in this execution environment.
