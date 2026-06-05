import { Page } from "./Page";
import { META } from "../content";

export function Cover() {
  return (
    <Page bleed>
      <div className="relative flex h-full w-full flex-col bg-gri-blue-dark text-white">
        {/* Hero photograph, top ~62% */}
        <div className="relative h-[62%] w-full overflow-hidden">
          <img
            src={META.coverPhoto}
            alt="New Zealand"
            className="h-full w-full object-cover"
          />
          {/* gradient veil blending photo into the blue panel */}
          <div className="absolute inset-0 bg-gradient-to-b from-gri-blue-dark/30 via-transparent to-gri-blue-dark" />
          {/* signature GRI flowing line accent */}
          <svg
            className="absolute bottom-0 left-0 h-24 w-full"
            viewBox="0 0 800 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,90 C220,10 420,160 800,40"
              fill="none"
              stroke="#8BC53F"
              strokeWidth="4"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Blue title panel, bottom */}
        <div className="relative flex flex-1 flex-col justify-between bg-gradient-to-br from-gri-blue via-gri-blue-deep to-gri-blue-dark px-[18mm] py-[14mm]">
          <div className="flex items-center justify-between">
            <img
              src="/img/logo-white.svg"
              alt="GRI Education"
              className="h-12 w-auto"
            />
            <span className="rounded-full border border-white/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
              {META.edition}
            </span>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.28em] text-gri-green">
              {META.brand} · {META.country}
            </p>
            <h1 className="font-display text-[52px] font-extrabold leading-[1.02] tracking-tight">
              Welcome to
              <br />
              New <span className="text-gri-green">Zealand</span>
            </h1>
            <p className="mt-3 font-display text-[22px] font-medium text-white/90">
              {META.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-[3px] w-10 rounded-full bg-gri-green" />
            <p className="font-display text-[14px] font-semibold italic text-white/85">
              {META.tagline}
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
