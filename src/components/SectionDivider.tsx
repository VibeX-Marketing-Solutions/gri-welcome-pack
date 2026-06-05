import { Page } from "./Page";
import type { ThemeGroup } from "../content";

export function SectionDivider({ group }: { group: ThemeGroup }) {
  return (
    <Page bleed>
      <div className="relative h-full w-full bg-gri-blue-dark">
        <img src={group.photo} alt={group.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gri-blue-dark via-gri-blue-dark/40 to-gri-blue-dark/10" />
        {/* Top scrim keeps the white logo legible over bright photos */}
        <div className="absolute inset-x-0 top-0 h-[55mm] bg-gradient-to-b from-gri-blue-dark/75 to-transparent" />
        {/* Prominent GRI logo, top-left */}
        <div className="absolute left-[18mm] top-[16mm]">
          <img src="/img/logo-white.svg" alt="GRI Education" className="h-[26mm] w-auto" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-[18mm] pb-[20mm] text-white">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[3px] w-12 rounded-full bg-gri-green" />
            <span className="text-[12px] font-bold uppercase tracking-[0.24em] text-gri-green">
              Settlement Guide
            </span>
          </div>
          <h2 className="font-display text-[44px] font-extrabold leading-[1.04] tracking-tight">
            {group.title}
          </h2>
          <p className="mt-2 max-w-[120mm] text-[14px] font-medium text-white/85">
            {group.subtitle}
          </p>
        </div>
      </div>
    </Page>
  );
}
