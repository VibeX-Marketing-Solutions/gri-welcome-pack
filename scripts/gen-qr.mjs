// Generates GRI-blue QR codes for partner links and social channels.
// Output: public/img/qr/*.png
import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "img", "qr");

// name → URL. Social URLs are placeholders until real GRI channels are supplied.
const TARGETS = {
  "trademe-property": "https://www.trademe.co.nz/a/property",
  airbnb: "https://www.airbnb.co.nz",
  booking: "https://www.booking.com",
  website: "https://www.grieducation.com",
  youtube: "https://www.youtube.com/@grieducation",
  facebook: "https://www.facebook.com/grieducation",
  instagram: "https://www.instagram.com/grieducation",
  tiktok: "https://www.tiktok.com/@grieducation",
  whatsapp: "https://wa.me/6421141947 8",
};

const opts = {
  margin: 1,
  width: 240,
  color: { dark: "#1B75BB", light: "#FFFFFF" },
  errorCorrectionLevel: "M",
};

await mkdir(outDir, { recursive: true });
for (const [name, url] of Object.entries(TARGETS)) {
  await QRCode.toFile(join(outDir, `${name}.png`), url.trim(), opts);
  console.log("qr →", name);
}
console.log(`\nGenerated ${Object.keys(TARGETS).length} QR codes in ${outDir}`);
