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
  // Hero photos for single-resource feature pages
  "feat-flights": ["https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1400&q=80", "flights"],
  "feat-airport": ["https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1400&q=80", "airport"],
  "feat-pickup": ["https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1400&q=80", "pickup"],
  "feat-community": ["https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80", "community"],
  "feat-insurance": ["https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80", "insurance"],
  "feat-finance": ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1400&q=80", "finance"],
  "feat-school": ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80", "school"],
  "feat-cab": ["https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80", "cab"],
  // Places to visit
  "dest-queenstown": ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80", "queenstown"],
  "dest-taupo": ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80", "taupo"],
  "dest-rotorua": ["https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&q=80", "rotorua"],
  "dest-waiheke": ["https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80", "waiheke"],
  "dest-aucklandzoo": ["https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=1200&q=80", "zoo"],
  "dest-coromandel": ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80", "coromandel"],
  "dest-hawkesbay": ["https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=1200&q=80", "hawkesbay"],
  "dest-ruapehu": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", "ruapehu"],
  "dest-abeltasman": ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", "abeltasman"],
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
