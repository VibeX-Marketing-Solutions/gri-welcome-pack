import { Page } from "./Page";
import { Highlight } from "./Highlight";
import { LETTER, DIRECTORS } from "../content";

export function LetterPage({ pageNo }: { pageNo: number }) {
  return (
    <Page pageNo={pageNo}>
      {/* Eyebrow + heading */}
      <header className="mb-5">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-[3px] w-10 rounded-full bg-gri-green" />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gri-blue">
            {LETTER.greeting}
          </span>
        </div>
        <h2 className="font-display text-[34px] font-extrabold leading-tight text-navy">
          <Highlight text={LETTER.heading} word={LETTER.highlight} />
        </h2>
      </header>

      <div className="flex flex-1 gap-7">
        {/* Letter body */}
        <div className="flex-1">
          {LETTER.paragraphs.map((p, i) => (
            <p
              key={i}
              className="mb-3 text-[10.5px] leading-[1.62] text-ink"
            >
              {p}
            </p>
          ))}

          {/* Signature block */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            {DIRECTORS.map((d) => (
              <div key={d.email} className="border-t-2 border-gri-green pt-2">
                <p className="font-display text-[12px] font-bold text-navy">
                  {d.name}
                </p>
                <p className="text-[8.5px] font-medium text-slate">{d.role}</p>
                <p className="text-[8.5px] text-slate">{d.org}</p>
                <p className="mt-1 text-[8.5px] font-semibold text-gri-blue">
                  {d.phone}
                </p>
                <p className="text-[8.5px] text-gri-blue">{d.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Side rail: foundations + quote */}
        <aside className="flex w-[58mm] shrink-0 flex-col gap-5">
          <div className="rounded-2xl bg-mist p-5">
            <h3 className="mb-3 font-display text-[12px] font-bold text-navy">
              To build a strong foundation, practise:
            </h3>
            <ul className="space-y-2.5">
              {LETTER.foundations.map((f) => (
                <li key={f} className="flex gap-2.5 text-[9.5px] leading-snug text-ink">
                  <span className="mt-[3px] inline-block h-2 w-2 shrink-0 rounded-full bg-gri-green" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl bg-gradient-to-br from-gri-blue to-gri-blue-deep p-5 text-white">
            <span className="font-display text-[44px] leading-none text-gri-green">
              &ldquo;
            </span>
            <p className="-mt-3 font-display text-[12.5px] font-medium italic leading-[1.5]">
              {LETTER.quote}
            </p>
          </div>
        </aside>
      </div>
    </Page>
  );
}
