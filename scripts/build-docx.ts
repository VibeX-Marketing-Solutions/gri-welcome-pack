// Builds an editable Word (.docx) version of the GRI NZ Welcome Pack from the
// same content.ts source. Word-native layout (no full-bleed gradients) — a
// clean, brand-coloured, fully-editable handout.
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ImageRun,
  ShadingType,
  PageBreak,
} from "docx";
import { writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { COLORS } from "../src/theme.ts";
import {
  META,
  LETTER,
  DIRECTORS,
  SECTIONS,
  CLOSING,
  type Section,
  type Resource,
} from "../src/content.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const outFile = join(root, "GRI-NZ-Welcome-Pack.docx");

const B = COLORS.griBlue;
const G = COLORS.griGreen;
const NAVY = COLORS.navy;
const SLATE = COLORS.slate;

async function img(p?: string, w = 90, h = 90) {
  if (!p) return null;
  const abs = join(pub, p.replace(/^\//, ""));
  if (!existsSync(abs)) return null;
  const data = await readFile(abs);
  const type = p.endsWith(".jpg") || p.endsWith(".jpeg") ? "jpg" : "png";
  return new ImageRun({ data, transformation: { width: w, height: h }, type });
}

const FONT = "Calibri";

function eyebrow(text: string) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, color: B, size: 16, characterSpacing: 40, font: FONT }),
    ],
  });
}

function h1(text: string) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    children: [new TextRun({ text, bold: true, color: NAVY, size: 40, font: FONT })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: G, space: 6 } },
  });
}

function body(text: string) {
  return new Paragraph({
    spacing: { after: 120, line: 264 },
    children: [new TextRun({ text, color: "2B3445", size: 21, font: FONT })],
  });
}

function bullet(text: string) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, color: "2B3445", size: 21, font: FONT })],
  });
}

// ── Resource as a bordered table row card ──────────────────────────────────
async function resourceTable(resources: Resource[]) {
  const rows: TableRow[] = [];
  for (const r of resources) {
    const logo = await img(r.logo, 80, 28);
    const qr = await img(r.qr, 64, 64);
    const left: Paragraph[] = [];
    if (r.preferred) {
      left.push(
        new Paragraph({
          shading: { type: ShadingType.SOLID, color: G, fill: G },
          spacing: { after: 40 },
          children: [new TextRun({ text: " GRI PREFERRED PARTNER ", bold: true, color: "FFFFFF", size: 14, font: FONT })],
        })
      );
    }
    left.push(
      new Paragraph({
        spacing: { after: 20 },
        children: logo
          ? [logo, new TextRun({ text: `  ${r.name}`, bold: true, color: NAVY, size: 22, font: FONT })]
          : [new TextRun({ text: r.name, bold: true, color: NAVY, size: 22, font: FONT })],
      })
    );
    if (r.note) left.push(new Paragraph({ children: [new TextRun({ text: r.note, color: SLATE, size: 18, italics: true, font: FONT })] }));
    for (const c of r.contacts ?? []) left.push(new Paragraph({ children: [new TextRun({ text: c, color: B, size: 18, bold: true, font: FONT })] }));
    if (r.link) left.push(new Paragraph({ children: [new TextRun({ text: r.link, color: B, size: 18, font: FONT })] }));
    if (r.image) left.push(new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: `▢ Image: ${r.image.label}`, color: "9AA4AD", size: 16, italics: true, font: FONT })] }));

    const qrCell = new TableCell({
      width: { size: 18, type: WidthType.PERCENTAGE },
      verticalAlign: "center",
      margins: { top: 80, bottom: 80, left: 80, right: 80 },
      children: qr
        ? [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [qr] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "SCAN ME", bold: true, color: SLATE, size: 12, font: FONT })] }),
          ]
        : [new Paragraph({ text: "" })],
    });

    rows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: 82, type: WidthType.PERCENTAGE },
            margins: { top: 80, bottom: 80, left: 120, right: 80 },
            children: left,
          }),
          qrCell,
        ],
      })
    );
  }

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "EEF3F8" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "EEF3F8" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "EEF3F8" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "EEF3F8" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "EEF3F8" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "EEF3F8" },
    },
    rows,
  });
}

async function sectionContent(section: Section) {
  const out: (Paragraph | Table)[] = [];
  out.push(eyebrow(section.group ? section.group.title : "Settlement Guide"));
  out.push(h1(`${String(section.num).padStart(2, "0")}.  ${section.title}`));
  if (section.intro) out.push(body(section.intro));
  if (section.resources) out.push(await resourceTable(section.resources));
  for (const n of section.notes ?? []) out.push(bullet(n));
  return out;
}

// ── Assemble document ──────────────────────────────────────────────────────
const children: (Paragraph | Table)[] = [];

// Cover
const coverImg = await img(META.coverPhoto, 480, 250);
if (coverImg) children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [coverImg] }));
children.push(new Paragraph({ spacing: { before: 200, after: 40 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${META.brand} · ${META.country}`.toUpperCase(), bold: true, color: B, size: 20, characterSpacing: 60, font: FONT })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: META.title, bold: true, color: NAVY, size: 64, font: FONT })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: META.subtitle, color: B, size: 32, font: FONT })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: META.tagline, italics: true, bold: true, color: G, size: 24, font: FONT })] }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// Directors' letter
children.push(eyebrow(LETTER.greeting));
children.push(h1(LETTER.heading));
for (const p of LETTER.paragraphs) children.push(body(p));
children.push(new Paragraph({ spacing: { before: 80, after: 60 }, children: [new TextRun({ text: "To build a strong foundation, practise:", bold: true, color: NAVY, size: 22, font: FONT })] }));
for (const f of LETTER.foundations) children.push(bullet(f));
children.push(new Paragraph({ spacing: { before: 120, after: 120 }, alignment: AlignmentType.CENTER, shading: { type: ShadingType.SOLID, color: "F7F9FB", fill: "F7F9FB" }, children: [new TextRun({ text: `“${LETTER.quote}”`, italics: true, color: B, size: 24, font: FONT })] }));
for (const d of DIRECTORS) {
  children.push(new Paragraph({ spacing: { before: 120 }, border: { top: { style: BorderStyle.SINGLE, size: 12, color: G, space: 4 } }, children: [new TextRun({ text: d.name, bold: true, color: NAVY, size: 22, font: FONT })] }));
  children.push(new Paragraph({ children: [new TextRun({ text: `${d.role}, ${d.org}`, color: SLATE, size: 18, font: FONT })] }));
  children.push(new Paragraph({ children: [new TextRun({ text: `${d.phone}  ·  ${d.email}`, color: B, size: 18, bold: true, font: FONT })] }));
}
children.push(new Paragraph({ children: [new PageBreak()] }));

// Sample section: Accommodation (full rollout adds the rest)
const accommodation = SECTIONS.find((s) => s.num === 5)!;
children.push(...(await sectionContent(accommodation)));

const doc = new Document({
  creator: "GRI Education",
  title: "GRI NZ Welcome Pack",
  styles: { default: { document: { run: { font: FONT } } } },
  sections: [
    {
      properties: { page: { margin: { top: 720, bottom: 720, left: 900, right: 900 } } },
      children,
    },
  ],
});

await writeFile(outFile, await Packer.toBuffer(doc));
console.log("DOCX →", outFile);
