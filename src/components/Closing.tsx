import { Page } from "./Page";
import { Highlight } from "./Highlight";
import { SectionHeader } from "./SectionPage";
import { ServiceIcon } from "./ServiceIcon";
import { CLOSING, DIRECTORS, META } from "../content";

export function SupportPage({ pageNo }: { pageNo: number }) {
  return (
    <Page pageNo={pageNo}>
      <SectionHeader
        section={{ num: CLOSING.supportNum, title: CLOSING.supportTitle, highlight: CLOSING.supportHighlight }}
      />
      <p className="mb-5 max-w-[165mm] text-[10.5px] leading-[1.6] text-ink">
        {CLOSING.supportIntro}
      </p>

      {/* Hays-style services panel: deep-blue, icon-led 3×2 grid */}
      <div className="relative flex-1 overflow-hidden rounded-3xl bg-gradient-to-br from-gri-blue-deep via-gri-blue-deep to-gri-blue-dark p-7 text-white">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-[3px] w-9 rounded-full bg-gri-green" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gri-green">
            What we help you with
          </span>
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-6">
          {CLOSING.services.map((s) => (
            <div key={s.title} className="flex flex-col">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <ServiceIcon name={s.icon} className="text-gri-green" />
              </div>
              <h4 className="mb-1.5 font-display text-[12.5px] font-bold leading-tight text-white">
                {s.title}
              </h4>
              <p className="text-[8.5px] leading-snug text-blue-100/80">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Director contact band */}
      <div className="mt-5 rounded-2xl border border-cloud bg-mist p-5">
        <div className="mb-3.5 flex items-center gap-3">
          <span className="h-[3px] w-9 rounded-full bg-gri-green" />
          <h3 className="font-display text-[13px] font-bold text-navy">
            GRI New Zealand — Talk to us
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {DIRECTORS.map((d) => (
            <div key={d.email} className="flex items-center gap-3.5">
              <img
                src={d.photo}
                alt={d.name}
                className="h-[17mm] w-[17mm] shrink-0 rounded-2xl object-cover object-top ring-2 ring-white"
              />
              <div className="min-w-0">
                <p className="font-display text-[12.5px] font-bold text-navy">{d.name}</p>
                <p className="text-[8.5px] text-slate">{d.role}</p>
                <p className="mt-1 text-[10px] font-semibold text-gri-blue">{d.phone}</p>
                <p className="truncate text-[9px] text-gri-blue">{d.email}</p>
              </div>
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

      {/* Colored GRI logo sign-off */}
      <div className="mt-auto flex flex-col items-center pb-2 pt-8">
        <img src="/img/logo.svg" alt="GRI Education" className="h-[18mm] w-auto" />
        <div className="mt-3 flex items-center gap-2.5">
          <span className="h-[3px] w-7 rounded-full bg-gri-green" />
          <span className="font-display text-[11px] font-semibold italic text-gri-blue">
            {META.tagline}
          </span>
          <span className="h-[3px] w-7 rounded-full bg-gri-green" />
        </div>
      </div>
    </Page>
  );
}
