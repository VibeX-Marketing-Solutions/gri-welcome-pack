import { Page } from "./Page";
import { Highlight } from "./Highlight";
import { LETTER, DIRECTORS } from "../content";

export function LetterPage({ pageNo }: { pageNo: number }) {
  return (
    <Page pageNo={pageNo}>
      {/* Heading */}
      <header className="mb-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="h-[3px] w-10 rounded-full bg-gri-green" />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gri-blue">
            {LETTER.greeting}
          </span>
        </div>
        <h2 className="font-display text-[32px] font-extrabold leading-tight text-navy">
          <Highlight text={LETTER.heading} word={LETTER.highlight} />
        </h2>
      </header>

      {/* Editorial row: text left, large director portraits right */}
      <div className="flex flex-1 gap-7">
        <div className="flex flex-1 flex-col">
          {LETTER.paragraphs.map((p, i) => (
            <p key={i} className="mb-2.5 text-[10px] leading-[1.6] text-ink">
              {p}
            </p>
          ))}

          <div className="mt-2 rounded-2xl bg-mist p-4">
            <h3 className="mb-2.5 font-display text-[11px] font-bold text-navy">
              To build a strong foundation, practise:
            </h3>
            <ul className="grid grid-cols-1 gap-y-1.5">
              {LETTER.foundations.map((f) => (
                <li key={f} className="flex gap-2 text-[9px] leading-snug text-ink">
                  <span className="mt-[3px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gri-green" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large stacked director portraits, Hays-style caption overlay */}
        <aside className="flex w-[74mm] shrink-0 flex-col gap-4">
          {DIRECTORS.map((d) => (
            <DirectorPortrait key={d.email} director={d} />
          ))}
        </aside>
      </div>

      {/* Full-width green-accent quote band */}
      <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-gri-blue to-gri-blue-deep px-7 py-5 text-white">
        <span className="absolute right-6 top-1 font-display text-[80px] leading-none text-white/10">
          &rdquo;
        </span>
        <p className="relative max-w-[150mm] font-display text-[15px] font-semibold italic leading-[1.45]">
          <span className="text-gri-green">&ldquo;</span>
          {LETTER.quote}
          <span className="text-gri-green">&rdquo;</span>
        </p>
      </div>
    </Page>
  );
}

function DirectorPortrait({
  director: d,
}: {
  director: (typeof DIRECTORS)[number];
}) {
  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl bg-navy">
      <img
        src={d.photo}
        alt={d.name}
        className="h-full w-full object-cover object-[center_20%]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent px-4 pb-3 pt-10">
        <div className="mb-1 h-[3px] w-7 rounded-full bg-gri-green" />
        <p className="font-display text-[13px] font-bold leading-tight text-white">
          {d.name}
        </p>
        <p className="text-[8px] font-medium text-white/70">{d.role}</p>
        <p className="mt-1 text-[8.5px] font-semibold text-gri-green">{d.phone}</p>
        <p className="text-[8px] text-white/85">{d.email}</p>
      </div>
    </div>
  );
}
