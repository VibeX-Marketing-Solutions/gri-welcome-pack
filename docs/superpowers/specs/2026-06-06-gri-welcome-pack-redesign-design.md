# GRI NZ Welcome Pack — Redesign Spec

**Date:** 2026-06-06
**Owner:** rukshan@vibex.co.nz

## Purpose

Re-skin the existing GRI Education "NZ Welcome Pack" (a 25-page settlement guide for
international students moving to New Zealand) from a raw Google-Docs export into a
polished, GRI-branded document. Bring Hays-Salary-Guide-level design discipline, but
in GRI's own brand identity. Produce both a **PDF** (primary, design-faithful) and an
editable **DOCX** (secondary, Word-native) from a single content source.

## Brand system

Derived from gri-public (`styles/global.css`, `public/img/logo.svg`, OG marketing image).

| Token            | Value      | Use                                                        |
| ---------------- | ---------- | ---------------------------------------------------------- |
| GRI Blue         | `#1B75BB`  | Primary — headers, links, accents, gradient base           |
| GRI Deep Blue    | `#0E4C8A`  | Gradient depth, cover background (derived)                  |
| GRI Green        | `#8BC53F`  | Highlight accent — headline keywords, rules, callouts       |
| Navy             | `#1C2539`  | Body text                                                  |
| Off-white        | `#F7F9FB`  | Section/zebra backgrounds                                  |
| White            | `#FFFFFF`  | Page background, reversed text                             |

- **Logo:** `logo.svg` (dark) / `logo-white.svg` (reversed) copied from gri-public.
- **Typography:** geometric sans (Inter / Plus Jakarta Sans, self-hosted woff2).
  Bold headings, regular body. Headline keyword highlighted in GRI Green — echoes the
  Hays italic-accent headline device, but in GRI green.
- **Tagline:** "Your Future Begins Here".

## Architecture

Single source of content, two renderers.

```
gri-welcome-pack/
├── src/
│   ├── content.ts          # all copy: directors' letter, 27 sections, partners, closing
│   ├── theme.ts            # GRI design tokens
│   ├── components/         # Page, Cover, LetterPage, TOC, SectionDivider,
│   │                       # ResourceCard, PartnerImage, Callout, Footer
│   └── App.tsx             # assembles pages in document order
├── scripts/
│   ├── print-pdf.mjs       # Puppeteer → dist PDF (A4, printBackground)
│   └── build-docx.mjs      # `docx` lib → DOCX from the same content.ts
├── public/img/             # Unsplash photos, partner logos, image placeholders
└── docs/superpowers/specs/ # this spec
```

- **Page format:** A4 portrait (210×297mm). Printable settlement booklet.
- **Content model:** every section + partner is structured data in `content.ts`, so the
  two renderers never diverge. A partner/resource record carries:
  `{ name, blurb?, link?, logo?, qr?, image? (placeholder slot), preferredPartner? }`.

### PDF renderer (primary)

- Vite + React + Tailwind v4. Document is a sequence of `<Page>` components, each sized
  to A4 with consistent margins and a running header/footer (GRI logo left; "NZ Welcome
  Pack" + page number right).
- `scripts/print-pdf.mjs`: build static site, Puppeteer loads it, `page.pdf()` with
  `format: 'A4'`, `printBackground: true`, CSS `@page`/`page-break` controlling pagination.

### DOCX renderer (secondary)

- `scripts/build-docx.mjs` uses the `docx` npm library to emit a clean, fully-editable
  Word document from the same `content.ts`. GRI-coloured styled headings, tables,
  embedded images + QR codes, "GRI Preferred Partner" callouts. Laid out the Word way
  (no full-bleed gradients) — an editable handout, not a pixel match to the PDF.

## Page templates

1. **Cover** — blue→deep-blue gradient, GRI white logo, "Welcome to New Zealand /
   Student Settlement Guide", hero photo, green accent rule.
2. **Directors' letter** — editorial layout, signature block for both directors,
   pull-quote in green.
3. **Table of contents** — two-column numbered list, blue numbers, green rule.
4. **Content section** — section-number chip + title (green keyword), intro paragraph,
   `ResourceCard` grid. Each card = partner logo + branded **image placeholder**
   (labelled, correct aspect ratio) + QR "SCAN ME" + link. "GRI Preferred Partner"
   badge where applicable.
5. **Section dividers** — full-width photo for each major theme group (Arrival,
   Settling In, Money & Admin, Transport, Work & Careers, Family, Support).
6. **Closing** — GRI ongoing support list + social QR codes + director contact block.

## Content scope (27 sections)

Directors' letter → TOC → 1. Air Tickets · 2. NZTD · 3. Airport Pickup · 4. SL Hub ·
5. Accommodation/Rental · 6. Insurance · 7. SIM/Mobile · 8. IRD Number · 9. Bank Account ·
10. Buy/Rent a Car · 11. Car Finance · 12. Doctors · 13. Appliances · 14. Groceries ·
15. Bus Cards · 16. CV & Cover Letters · 17. Part-time Jobs · 18. Partner Work Visa Jobs ·
19. Driving Licence · 20. Schools · 21. Daycare · 22. Citizens Advice Bureau ·
23. Currency Exchange · 24. Places to Visit · 25. NZ Map · 26. GRI Ongoing Support ·
27. Visit & Follow Us → Closing.

Audience signal preserved: Sri Lankan student focus ("Kia Ora", SL Hub, Sri Lankan
community references, Sri Lankan licence conversion).

## Build order

1. `git init` (author rukshan@vibex.co.nz), scaffold Vite+React+Tailwind, brand tokens,
   both render pipelines, Puppeteer + docx wiring.
2. **Sample pages:** Cover, Directors' Letter, Accommodation section (logo+QR+image
   placeholder rich — good stress test).
3. Render **both** PDF + DOCX → user review → roll out to all 27 sections + closing.

## Out of scope (YAGNI)

- No CMS/Sanity integration; static content file is sufficient.
- No interactive web deployment; the React app exists only to render the PDF.
- DOCX is not a pixel match to the PDF — Word-native layout is acceptable and intended.
- Final licensed brand photography is dropped into placeholder slots later; Unsplash
  images are used for the draft.

## Success criteria

- `GRI-NZ-Welcome-Pack.pdf` renders all pages, A4, GRI-branded, with working QR codes
  and links, image placeholders ready for real photos.
- `GRI-NZ-Welcome-Pack.docx` opens cleanly in Word, fully editable, GRI-branded, same
  content as the PDF.
- Both regenerate from `content.ts` with a single command each.
