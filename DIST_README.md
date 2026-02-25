How to deploy this site to Cloudflare Pages

Options (pick one):

1) Git-based Pages (recommended)
- In Cloudflare Pages, connect this repository.
- Set Build command: `npm run build`
- Set Build output directory: `dist`
- Cloudflare will run `npm install` then `npm run build` and publish the `dist/` folder.

2) Drag & drop upload (quick)
- Run locally: `node ./scripts/build.js` (creates `dist/`).
- Zip or drag the `dist/` folder contents to Cloudflare Pages upload UI.
- Important: only upload the `dist/` output — do not upload the repo root (that contains node_modules). Uploading node_modules triggers a TypeScript detection error.

Notes
- The `build` script creates a self-contained `dist/` folder with only static assets.
- No TypeScript source is included in `dist/`, so Cloudflare drag-and-drop will accept it.
