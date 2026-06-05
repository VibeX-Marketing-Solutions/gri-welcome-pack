import { Page } from "./Page";

export type TocEntry = { num: number; title: string; page: number };

export function TOC({ entries, pageNo }: { entries: TocEntry[]; pageNo: number }) {
  // Split into three balanced columns.
  const per = Math.ceil(entries.length / 3);
  const cols = [entries.slice(0, per), entries.slice(per, per * 2), entries.slice(per * 2)];

  return (
    <Page pageNo={pageNo}>
      <header className="mb-7">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-[3px] w-10 rounded-full bg-gri-green" />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gri-blue">
            Inside this guide
          </span>
        </div>
        <h2 className="font-display text-[40px] font-extrabold leading-tight text-navy">
          Contents
        </h2>
      </header>

      <div className="grid grid-cols-3 gap-x-8">
        {cols.map((col, i) => (
          <ul key={i} className="space-y-0">
            {col.map((e) => (
              <li
                key={e.num}
                className="flex items-baseline gap-2.5 border-b border-cloud py-2.5"
              >
                <span className="w-5 shrink-0 font-display text-[12px] font-bold text-gri-blue">
                  {String(e.num).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[10px] font-medium leading-snug text-navy">
                  {e.title}
                </span>
                <span className="shrink-0 font-display text-[10px] font-bold text-slate">
                  {String(e.page).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </Page>
  );
}
