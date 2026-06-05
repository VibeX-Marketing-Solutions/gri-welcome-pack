import { Page } from "./Page";
import { Highlight } from "./Highlight";
import { ResourceCard } from "./ResourceCard";
import type { Section } from "../content";

export function SectionPage({ section, pageNo }: { section: Section; pageNo: number }) {
  return (
    <Page pageNo={pageNo}>
      <SectionHeader section={section} />
      {section.intro && (
        <p className="mb-4 max-w-[150mm] text-[10.5px] leading-[1.6] text-ink">
          {section.intro}
        </p>
      )}

      {section.resources && (
        <div className="grid grid-cols-2 gap-3.5">
          {section.resources.map((r) => (
            <ResourceCard key={r.name} r={r} />
          ))}
        </div>
      )}

      {section.notes && (
        <ul className="mt-4 space-y-2">
          {section.notes.map((n) => (
            <li key={n} className="flex gap-2.5 text-[10px] leading-snug text-ink">
              <span className="mt-[5px] inline-block h-2 w-2 shrink-0 rounded-full bg-gri-green" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}

export function SectionHeader({ section }: { section: Section }) {
  return (
    <header className="mb-4 flex items-start gap-4">
      <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gri-blue to-gri-blue-deep font-display text-[18px] font-extrabold text-white">
        {String(section.num).padStart(2, "0")}
      </div>
      <div className="pt-0.5">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-[3px] w-6 rounded-full bg-gri-green" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gri-blue">
            {section.group ? section.group.title : "Settlement Guide"}
          </span>
        </div>
        <h2 className="font-display text-[26px] font-extrabold leading-tight text-navy">
          <Highlight text={section.title} word={section.highlight} />
        </h2>
      </div>
    </header>
  );
}
