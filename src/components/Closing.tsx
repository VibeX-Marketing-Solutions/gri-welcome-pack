import { Page } from "./Page";
import { Highlight } from "./Highlight";
import { SectionHeader } from "./SectionPage";
import { CLOSING, DIRECTORS } from "../content";

export function SupportPage({ pageNo }: { pageNo: number }) {
  return (
    <Page pageNo={pageNo}>
      <SectionHeader
        section={{ num: CLOSING.supportNum, title: CLOSING.supportTitle, highlight: CLOSING.supportHighlight }}
      />
      <p className="mb-5 max-w-[165mm] text-[10.5px] leading-[1.6] text-ink">
        {CLOSING.supportIntro}
      </p>

      <div className="grid grid-cols-2 gap-3.5">
        {CLOSING.services.map((s) => (
          <div
            key={s}
            className="flex items-center gap-3 rounded-xl border border-cloud bg-mist p-3.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gri-green/15">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gri-green-deep">
                <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[10px] font-semibold text-navy">{s}</span>
          </div>
        ))}
      </div>

      {/* Director contact block */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-gri-blue to-gri-blue-deep p-6 text-white">
        <h3 className="mb-4 font-display text-[15px] font-bold">GRI New Zealand — Contact Us</h3>
        <div className="grid grid-cols-2 gap-5">
          {DIRECTORS.map((d) => (
            <div key={d.email}>
              <p className="font-display text-[13px] font-bold">{d.name}</p>
              <p className="text-[9px] text-white/75">{d.role}</p>
              <p className="mt-1.5 text-[10px] font-semibold text-gri-green">{d.phone}</p>
              <p className="text-[9.5px] text-white/90">{d.email}</p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

export function FollowPage({ pageNo }: { pageNo: number }) {
  return (
    <Page pageNo={pageNo}>
      <SectionHeader
        section={{ num: CLOSING.followNum, title: CLOSING.followTitle, highlight: CLOSING.followHighlight }}
      />
      <p className="mb-6 max-w-[165mm] text-[10.5px] leading-[1.6] text-ink">
        {CLOSING.followIntro}
      </p>

      <div className="grid grid-cols-3 gap-4">
        {CLOSING.socials.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center rounded-2xl border border-cloud bg-white p-4 shadow-[0_1px_3px_rgba(28,37,57,0.06)]"
          >
            <img src={s.qr} alt={s.label} className="h-[80px] w-[80px]" />
            <span className="mt-1 text-[7px] font-semibold tracking-wide text-slate">SCAN ME</span>
            <span className="mt-1.5 font-display text-[11px] font-bold text-navy">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Community highlight */}
      <div className="mt-6 flex items-center gap-6 rounded-2xl bg-gradient-to-br from-gri-blue to-gri-blue-deep p-6 text-white">
        <div className="flex flex-col items-center rounded-xl bg-white p-3">
          <img src={CLOSING.communityQr} alt="Community" className="h-[88px] w-[88px]" />
          <span className="mt-1 text-[7px] font-semibold tracking-wide text-slate">SCAN ME</span>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-[3px] w-8 rounded-full bg-gri-green" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gri-green">Join us</span>
          </div>
          <h3 className="font-display text-[24px] font-extrabold leading-tight">
            {CLOSING.communityLabel}
          </h3>
          <p className="mt-1.5 max-w-[110mm] text-[10px] text-white/85">
            You are now part of the GRI family — scan to connect with fellow students and our team in New Zealand.
          </p>
        </div>
      </div>
    </Page>
  );
}
