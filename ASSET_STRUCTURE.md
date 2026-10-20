# Enjoy Café — branch-first asset hierarchy

`public/assets/<branch>/<food|drinks>/<main-category>/<sub-category>/<Exact_Product_Name>.png`

Branches: `haile`, `karen`, `delamere`, `imara`.

Haile files were migrated from `public/assets/images/Haile_Branch/` into `public/assets/haile/`. The product image manifest lives in `src/data/haile-images.json`. Existing images have not been re-rendered, cropped, or modified. Empty future-branch directories are ready.

When importing future branch images, update a *branch-specific* image manifest and resolve images using branch + product ID; never borrow a photo from another branch. No invented prices. Any branch without approved product data is intentionally empty.

Progress and visit counts are device-local prototype data, not verified cross-device analytics. Real multi-device visit records, redeemed awards, and manager reporting require a server/database, guest consent and abuse controls. Points are discovery milestones, not monetary rewards.
