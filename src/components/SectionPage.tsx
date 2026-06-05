import { Page } from "./Page";
import { Highlight } from "./Highlight";
import { ResourceCard, CompactCard, FeatureCard } from "./ResourceCard";
import { GROUPS, type Section } from "../content";

export function SectionPage({ section, pageNo }: { section: Section; pageNo: number }) {
  const isFeature =
    !section.compact && !section.variant && section.resources?.length === 1;

  return (
    <Page pageNo={pageNo}>
      <SectionHeader section={section} />
      {section.intro && (
        <p className="mb-4 max-w-[165mm] text-[10.5px] leading-[1.6] text-ink">
          {section.intro}
        </p>
      )}

      {section.variant === "map" ? (
        <MapBody />
      ) : section.variant === "destinations" ? (
        <DestinationsBody section={section} />
      ) : isFeature ? (
        <FeatureCard r={section.resources![0]} />
      ) : section.compact ? (
        <div className="grid grid-cols-2 gap-3">
          {section.resources?.map((r) => (
            <CompactCard key={r.name} r={r} />
          ))}
        </div>
      ) : (
        section.resources && (
          <div className="grid grid-cols-2 gap-3.5">
            {section.resources.map((r) => (
              <ResourceCard key={r.name} r={r} />
            ))}
          </div>
        )
      )}

      {section.notes && (
        <div className="mt-4 rounded-2xl bg-mist p-4">
          <ul className="space-y-2">
            {section.notes.map((n) => (
              <li key={n} className="flex gap-2.5 text-[10px] leading-snug text-ink">
                <span className="mt-[5px] inline-block h-2 w-2 shrink-0 rounded-full bg-gri-green" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Page>
  );
}

export function SectionHeader({ section }: { section: Section }) {
  const groupTitle = section.group ? GROUPS[section.group]?.title : "Settlement Guide";
  return (
    <header className="mb-4 flex items-start gap-4">
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

function DestinationsBody({ section }: { section: Section }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {section.destinations?.map((d) => (
        <div
          key={d.name}
          className="flex flex-col rounded-2xl border border-cloud bg-white p-3.5 shadow-[0_1px_3px_rgba(28,37,57,0.06)]"
        >
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gri-blue/10">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-gri-blue">
                <path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="font-display text-[12px] font-bold text-navy">{d.name}</p>
              {d.region && (
                <p className="text-[7px] font-semibold uppercase tracking-wide text-gri-green">{d.region}</p>
              )}
            </div>
          </div>
          <p className="text-[8.5px] leading-snug text-slate">{d.blurb}</p>
        </div>
      ))}
    </div>
  );
}

function MapBody() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="relative flex h-[200mm] w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-gri-blue/30 bg-cloud">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,117,187,0.05)_25%,transparent_25%,transparent_50%,rgba(27,117,187,0.05)_50%,rgba(27,117,187,0.05)_75%,transparent_75%)] bg-[length:14px_14px]" />
        <div className="relative flex flex-col items-center gap-2 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-gri-blue/50">
            <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gri-blue/60">
            New Zealand map artwork
          </span>
        </div>
      </div>
    </div>
  );
}
