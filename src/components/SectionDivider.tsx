import { Page } from "./Page";
import type { ThemeGroup } from "../content";

export function SectionDivider({ group }: { group: ThemeGroup }) {
  return (
    <Page bleed>
      <div className="relative h-full w-full bg-gri-blue-dark">
        <img src={group.photo} alt={group.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gri-blue-dark via-gri-blue-dark/40 to-gri-blue-dark/10" />
        <div className="absolute inset-x-0 bottom-0 px-[18mm] pb-[20mm] text-white">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[3px] w-12 rounded-full bg-gri-green" />
            <img src="/img/logo-white.svg" alt="GRI" className="h-7 w-auto opacity-90" />
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
