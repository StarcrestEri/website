const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');

const KEEP = [
  'index.html',
  'about.html',
  'games.html',
  'marketplace.html',
  'marketplace-games.html',
  'marketplace-music.html',
  'media.html',
  'eat-shit-and-die.html',
  'manifest.webmanifest',
  'sw.js',
  'pwa.js',
  'spa.js',
  'anti-inspect.js',
  'bandcamp-popup.js',
  'market-audio.js',
  'minify.ps1',
  'pretty-urls.ps1',
  'trim-icons.ps1',
  'Ice Cream.css',
  'ie1.css',
  'legacy-lowend.css',
  'ie-compat.js',
  'ie-fixes.js',
  'legacy-lowend.js',
  'sw.js'
];

const KEEP_DIRS = [
  'Images',
  'Audio',
  'about',
  'marketplace',
  'marketplace-games',
  'marketplace-music',
  'settings'
];

function removeDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) removeDir(full);
    else fs.unlinkSync(full);
  }
  fs.rmdirSync(dir);
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copy(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// clean output
if (fs.existsSync(out)) removeDir(out);
fs.mkdirSync(out, { recursive: true });

// copy files
for (const f of KEEP) {
  const src = path.join(root, f);
  if (fs.existsSync(src)) copy(src, path.join(out, f));
}
for (const d of KEEP_DIRS) {
  const src = path.join(root, d);
  if (fs.existsSync(src)) copy(src, path.join(out, d));
}

// helper: copy any top-level .html/.css/.js not explicitly listed (safe fallback)
for (const entry of fs.readdirSync(root)) {
  const full = path.join(root, entry);
  const stat = fs.statSync(full);
  if (stat.isFile()) {
    if (/\.(html|css|js|webmanifest|png|svg|jpg|jpeg|gif|ico)$/i.test(entry)) {
      const dest = path.join(out, entry);
      if (!fs.existsSync(dest)) copy(full, dest);
    }
  }
}

console.log('dist/ created — ready for Cloudflare Pages (upload or set Build output to dist)');
