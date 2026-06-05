// Generates GRI-blue QR codes for every partner link and social channel.
// Output: public/img/qr/*.png  (names match the qr paths referenced in content.ts)
import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "img", "qr");

const TARGETS = {
  // Arrival & settling
  glowtrips: "https://glowtravel.tours/",
  nztd: "https://www.travellerdeclaration.govt.nz/completing-your-declaration/",
  slhub: "https://www.slhub.co.nz",
  "trademe-property": "https://www.trademe.co.nz/a/property",
  airbnb: "https://www.airbnb.co.nz",
  booking: "https://www.booking.com",
  // Money & getting around
  ird: "https://www.ird.govt.nz",
  asb: "https://www.asb.co.nz",
  bnz: "https://www.bnz.co.nz",
  westpac: "https://www.westpac.co.nz",
  anz: "https://www.anz.co.nz",
  kiwibank: "https://www.kiwibank.co.nz",
  bluedot: "https://bluedotrentals.co.nz",
  "trademe-motors": "https://www.trademe.co.nz/a/motors",
  turners: "https://www.turners.co.nz",
  guardian: "https://guardianfinance.co.nz/",
  // Daily life
  healthpoint: "https://www.healthpoint.co.nz/",
  "enrol-gp": "https://www.live-work.immigration.govt.nz/resources/enroling-with-your-local-doctor",
  "find-doctor": "https://www.govt.nz/browse/health/gps-and-prescriptions/find-a-doctor/",
  warehouse: "https://www.thewarehouse.co.nz",
  kmart: "https://www.kmart.co.nz",
  briscoes: "https://www.briscoes.co.nz",
  noelleeming: "https://www.noelleeming.co.nz",
  paknsave: "https://www.paknsave.co.nz/",
  woolworths: "https://www.woolworths.co.nz",
  newworld: "https://www.newworld.co.nz/",
  athop: "https://at.govt.nz/bus-train-ferry/at-hop-card",
  snapper: "https://www.snapper.co.nz/buying-a-snapper-card/",
  metrocard: "https://www.metroinfo.co.nz/metrocard/",
  beecard: "https://www.gobay.co.nz/bee-card/",
  "beecard-otago": "https://www.orc.govt.nz/public-transport",
  // Work & careers
  smartcv: "https://smartcvs.ai/",
  doitright: "https://www.doitrightnz.co.nz",
  "tahatu-cv": "https://tahatu.govt.nz/work/applying-for-a-job/how-to-write-a-cv",
  canva: "https://www.canva.com",
  "seek-cv": "https://www.seek.co.nz/career-advice/article/free-resume-template",
  seek: "https://www.seek.co.nz",
  "trademe-jobs": "https://www.trademe.co.nz/a/jobs",
  sidekicker: "https://sidekicker.com/",
  sjs: "https://www.sjs.co.nz",
  uber: "https://www.uber.com/nz/en/",
  tahatu: "https://tahatu.govt.nz",
  drive: "https://drive.govt.nz/#get-my-licence",
  // Family & exploring
  findschool: "https://www.educationcounts.govt.nz/find-school",
  cab: "https://www.cab.org.nz/",
  // Closing — socials (placeholders until real GRI channels supplied)
  website: "https://www.grieducation.com",
  youtube: "https://www.youtube.com/@grieducation",
  facebook: "https://www.facebook.com/grieducation",
  instagram: "https://www.instagram.com/grieducation",
  tiktok: "https://www.tiktok.com/@grieducation",
  whatsapp: "https://wa.me/64211419478",
  community: "https://www.grieducation.com/community",
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
}
console.log(`Generated ${Object.keys(TARGETS).length} QR codes in ${outDir}`);
