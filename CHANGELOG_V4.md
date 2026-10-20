# Guided Menu V4 — Interaction corrections

1. Branch/location is selected before any menu photography.
2. Food / Drinks is an explicit second decision.
3. An additional Food/Drinks-specific prompt asks familiar vs something new and records that preference in the next step’s copy. No product is opened automatically.
4. The next screen shows the original category tabs **and** polished, text-only category selection cards. Photographs are still hidden.
5. Selecting a category is the only action that opens menu photography and products.
6. Food / Drinks is a persistent switch in the header from step three onward (including mobile). Switching retains the branch and clears the previous category.
7. Product cards retain V3’s shorter wide aspect ratio; Haile’s original local image mapping is untouched.

Browser storage still holds visits, favourites and points; these are not server-backed user accounts or redeemable loyalty rewards.

Run locally:
`cd /d "%USERPROFILE%\Downloads\enjoycafeke"`
`npm install`
`npm run dev`

Open http://localhost:4173.
