import { Page } from "./Page";
import { SectionHeader } from "./SectionPage";
import type { Destination, Section } from "../content";

// Full-bleed photo tile with text set on the image over a subtle gradient —
// the Hays "hero photo + overlay" treatment.
function DestinationTile({ d, hero }: { d: Destination; hero?: boolean }) {
  const img = d.images?.[0];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-navy">
      {img && <img src={img} alt={d.name} className="absolute inset-0 h-full w-full object-cover" />}
      {/* subtle bottom-up gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
      {hero && <div className="absolute inset-0 bg-gradient-to-r from-navy/40 to-transparent" />}

      <div className={`absolute inset-x-0 bottom-0 text-white ${hero ? "p-7" : "p-5"}`}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-[3px] w-6 rounded-full bg-gri-green" />
          <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-gri-green">
            {d.region}
          </span>
        </div>
        <h3
          className={`font-display font-extrabold leading-[1.05] tracking-tight ${
            hero ? "text-[34px]" : "text-[19px]"
          }`}
        >
          {d.name}
        </h3>
        <p
          className={`mt-1.5 leading-snug text-white/85 ${
            hero ? "max-w-[125mm] text-[10px]" : "line-clamp-2 text-[8px]"
          }`}
        >
          {d.blurb}
        </p>
        {hero && d.highlights && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {d.highlights.map((h) => (
              <span
                key={h}
                className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-[3px] text-[7.5px] font-semibold text-white backdrop-blur-sm"
              >
                <span className="h-1 w-1 rounded-full bg-gri-green" />
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function DestinationPage({
  section,
  destinations,
  heroBottom,
  showHeader,
  pageNo,
}: {
  section: Section;
  destinations: Destination[];
  heroBottom: boolean;
  showHeader: boolean;
  pageNo: number;
}) {
  const [heroDest, ...rest] = destinations;

  const hero = (
    <div className="min-h-0 flex-[1.45]">
      <DestinationTile d={heroDest} hero />
    </div>
  );
  const smallRow = rest.length > 0 && (
    <div className="flex min-h-0 flex-1 gap-3">
      {rest.map((d) => (
        <div key={d.name} className="min-h-0 min-w-0 flex-1">
          <DestinationTile d={d} />
        </div>
      ))}
    </div>
  );

  return (
    <Page pageNo={pageNo}>
      {showHeader ? (
        <>
          <SectionHeader section={section} />
          {section.intro && (
            <p className="mb-3.5 max-w-[170mm] text-[10px] leading-[1.55] text-ink">
              {section.intro}
            </p>
          )}
        </>
      ) : (
        <div className="mb-3.5 flex items-center gap-3">
          <span className="h-[3px] w-10 rounded-full bg-gri-green" />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gri-blue">
            Places to Visit · continued
          </span>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col gap-3 pb-[6mm]">
        {heroBottom ? (
          <>
            {smallRow}
            {hero}
          </>
        ) : (
          <>
            {hero}
            {smallRow}
          </>
        )}
      </div>
    </Page>
  );
}
