import { Page } from "./Page";
import { Highlight } from "./Highlight";
import { ServiceGrid, FeatureCard } from "./ResourceCard";
import { GROUPS, type Section } from "../content";

export function SectionPage({ section, pageNo }: { section: Section; pageNo: number }) {
  const resources = section.resources ?? [];
  const single = resources.length === 1 && !section.compact;

  return (
    <Page pageNo={pageNo}>
      <SectionHeader section={section} />
      {section.intro && (
        <p className="mb-3.5 max-w-[170mm] text-[10px] leading-[1.55] text-ink">
          {section.intro}
        </p>
      )}

      {/* Main content fills the remaining page height */}
      <div className="flex min-h-0 flex-1 flex-col pb-[6mm]">
        {section.variant === "map" ? (
          <MapBody />
        ) : section.variant === "destinations" ? (
          <DestinationsBody section={section} />
        ) : single ? (
          <FeatureCard r={resources[0]} />
        ) : resources.length > 0 ? (
          <ServiceGrid resources={resources} />
        ) : (
          <NotesPanel notes={section.notes ?? []} />
        )}

        {/* When a section has BOTH resources and notes, notes sit in a strip below */}
        {resources.length > 0 && section.notes && (
          <div className="mt-3 shrink-0 rounded-2xl bg-mist p-3.5">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-[3px] w-6 rounded-full bg-gri-green" />
              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-gri-blue">Good to know</span>
            </div>
            <ul className="space-y-1">
              {section.notes.map((n) => (
                <li key={n} className="flex gap-2 text-[9px] leading-snug text-ink">
                  <span className="mt-[4px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gri-green" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Page>
  );
}

export function SectionHeader({ section }: { section: Section }) {
  const groupTitle = section.group ? GROUPS[section.group]?.title : "Settlement Guide";
  return (
    <header className="mb-3.5 flex items-start gap-4">
      <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gri-blue to-gri-blue-deep font-display text-[18px] font-extrabold text-white">
        {String(section.num).padStart(2, "0")}
      </div>
      <div className="pt-0.5">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-[3px] w-6 rounded-full bg-gri-green" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gri-blue">
            {groupTitle}
          </span>
        </div>
        <h2 className="font-display text-[26px] font-extrabold leading-tight text-navy">
          <Highlight text={section.title} word={section.highlight} />
        </h2>
      </div>
    </header>
  );
}

// ── Destinations: image-led cards, 3-col grid that fills the page ───────────
function DestinationsBody({ section }: { section: Section }) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-3 gap-3" style={{ gridAutoRows: "1fr" }}>
      {section.destinations?.map((d) => (
        <div
          key={d.name}
          className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-cloud bg-white shadow-[0_1px_3px_rgba(28,37,57,0.06)]"
        >
          <div className="relative min-h-0 flex-1 overflow-hidden bg-gradient-to-br from-mist to-cloud">
            {d.image ? (
              <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,117,187,0.05)_25%,transparent_25%,transparent_50%,rgba(27,117,187,0.05)_50%,rgba(27,117,187,0.05)_75%,transparent_75%)] bg-[length:12px_12px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gri-blue/40">
                    <path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </div>
              </>
            )}
          </div>
          <div className="px-3 py-2">
            <p className="font-display text-[11.5px] font-bold leading-tight text-navy">{d.name}</p>
            {d.region && (
              <p className="mb-0.5 text-[6.5px] font-bold uppercase tracking-wide text-gri-green">{d.region}</p>
            )}
            <p className="text-[8px] leading-snug text-slate">{d.blurb}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Notes-only page (e.g. Daycare): image placeholder + numbered steps, fills ─
function NotesPanel({ notes }: { notes: string[] }) {
  return (
    <div className="flex min-h-0 flex-1 gap-4">
      {/* image placeholder */}
      <div className="relative w-[42%] overflow-hidden rounded-2xl bg-gradient-to-br from-mist to-cloud">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,117,187,0.05)_25%,transparent_25%,transparent_50%,rgba(27,117,187,0.05)_50%,rgba(27,117,187,0.05)_75%,transparent_75%)] bg-[length:16px_16px]" />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/70 px-2 py-[3px]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-gri-blue/70">
            <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-[6px] font-bold uppercase tracking-wide text-gri-blue/70">Photo</span>
        </div>
      </div>
      {/* steps */}
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {notes.map((n, i) => (
          <div key={n} className="flex min-h-0 flex-1 items-center gap-3.5 rounded-2xl border border-cloud bg-white p-4 shadow-[0_1px_3px_rgba(28,37,57,0.06)]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gri-blue to-gri-blue-deep font-display text-[14px] font-extrabold text-white">
              {i + 1}
            </span>
            <p className="text-[10.5px] leading-snug text-ink">{n}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── NZ map, fills ───────────────────────────────────────────────────────────
function MapBody() {
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-mist to-cloud p-3">
      <img src="/img/nz-map.png" alt="Map of New Zealand" className="h-full w-full object-contain" />
    </div>
  );
}
