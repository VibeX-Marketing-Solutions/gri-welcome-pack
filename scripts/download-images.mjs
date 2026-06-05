// Downloads sample photography into public/img/photos.
// Tries Unsplash CDN first; falls back to Lorem Picsum so a render always works.
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "img", "photos");
await mkdir(outDir, { recursive: true });

// name → [preferred Unsplash url, picsum fallback seed]
const IMAGES = {
  cover: ["https://images.unsplash.com/photo-1589802829985-817e51171b92?w=1600&q=80", "nzcover"],
  "divider-settling": ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80", "settling"],
  "divider-arrival": ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80", "arrival"],
  "divider-money": ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80", "money"],
  "divider-daily": ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80", "daily"],
  "divider-work": ["https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80", "work"],
  "divider-family": ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80", "family"],
};

async function grab(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

for (const [name, [url, seed]] of Object.entries(IMAGES)) {
  let buf;
  try {
    buf = await grab(url);
    console.log("unsplash →", name);
  } catch (e) {
    buf = await grab(`https://picsum.photos/seed/${seed}/1600/1000`);
    console.log(`picsum   → ${name} (unsplash failed: ${e.message})`);
  }
  await writeFile(join(outDir, `${name}.jpg`), buf);
}
console.log("\nImages saved to", outDir);
