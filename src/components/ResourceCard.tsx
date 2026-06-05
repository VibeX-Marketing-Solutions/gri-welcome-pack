import { useState } from "react";
import type { Resource } from "../content";

/** Branded image placeholder — real photo drops into resource.image.src later. */
function ImageSlot({ label, src }: { label: string; src?: string }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <img
        src={src}
        alt={label}
        onError={() => setFailed(true)}
        className="h-[26mm] w-full rounded-xl object-cover"
      />
    );
  }
  return (
    <div className="relative flex h-[26mm] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-gri-blue/30 bg-cloud">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,117,187,0.06)_25%,transparent_25%,transparent_50%,rgba(27,117,187,0.06)_50%,rgba(27,117,187,0.06)_75%,transparent_75%)] bg-[length:10px_10px]" />
      <div className="relative flex flex-col items-center gap-1 px-2 text-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gri-blue/50">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.5" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 17l4.5-4 3 2.5L16 11l4 5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <span className="text-[7.5px] font-semibold uppercase tracking-wide text-gri-blue/60">
          {label}
        </span>
      </div>
    </div>
  );
}

/** Shows the partner's real logo if the file exists, else a clean GRI name-lockup. */
function BrandMark({ name, logo }: { name: string; logo?: string }) {
  const [failed, setFailed] = useState(false);
  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={name}
        onError={() => setFailed(true)}
        className="h-[24px] w-auto max-w-[150px] object-contain"
      />
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="h-5 w-1.5 rounded-full bg-gri-green" />
      <span className="font-display text-[13px] font-bold leading-tight text-navy">{name}</span>
    </div>
  );
}

/** Large photo-led feature card for single-resource sections (Hays split layout). */
export function FeatureCard({ r }: { r: Resource }) {
  return (
    <div className="relative flex flex-1 overflow-hidden rounded-3xl border border-cloud bg-white shadow-[0_2px_10px_rgba(28,37,57,0.07)]">
      {/* Left: large image */}
      <div className="relative w-[55%]">
        <FeatureImage label={r.image?.label ?? r.name} src={r.image?.src} />
        {r.preferred && (
          <span className="absolute left-5 top-5 rounded-full bg-gri-green px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow">
            GRI Preferred Partner
          </span>
        )}
      </div>
      {/* Right: details */}
      <div className="flex w-[45%] flex-col justify-between p-7">
        <div>
          <div className="mb-4">
            <BrandMark name={r.name} logo={r.logo} />
          </div>
          {r.note && <p className="mb-4 text-[11px] leading-relaxed text-slate">{r.note}</p>}
          <div className="space-y-1">
            {r.contacts?.map((c) => (
              <p key={c} className="text-[11px] font-semibold text-gri-blue">{c}</p>
            ))}
            {r.link && (
              <p className="text-[11px] font-semibold text-gri-blue">
                {r.link.replace(/^https?:\/\//, "")}
              </p>
            )}
          </div>
        </div>
        {r.qr && (
          <div className="flex items-center gap-3 border-t border-cloud pt-4">
            <img src={r.qr} alt={`${r.name} QR`} className="h-[52px] w-[52px]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-navy">Scan to open</p>
              <p className="text-[8.5px] text-slate">Point your camera at the code</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureImage({ label, src }: { label: string; src?: string }) {
  if (src) return <img src={src} alt={label} className="h-full w-full object-cover" />;
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-cloud to-[#dde9f4]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,117,187,0.07)_25%,transparent_25%,transparent_50%,rgba(27,117,187,0.07)_50%,rgba(27,117,187,0.07)_75%,transparent_75%)] bg-[length:14px_14px]" />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-gri-blue/45">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.5" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 17l4.5-4 3 2.5L16 11l4 5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <span className="text-[9px] font-semibold uppercase tracking-wide text-gri-blue/55">{label}</span>
      </div>
    </div>
  );
}

/** Compact card for link-dense sections — brand mark + QR + link, no image slot. */
export function CompactCard({ r }: { r: Resource }) {
  return (
    <div className="relative flex items-center gap-3 rounded-xl border border-cloud bg-white p-3 shadow-[0_1px_2px_rgba(28,37,57,0.05)]">
      {r.preferred && (
        <span className="absolute -top-2 left-3 rounded-full bg-gri-green px-2 py-[2px] text-[6.5px] font-bold uppercase tracking-wide text-white shadow-sm">
          GRI Provided
        </span>
      )}
      <span className="h-9 w-1.5 shrink-0 rounded-full bg-gri-green" />
      <div className="min-w-0 flex-1">
        <BrandMark name={r.name} logo={r.logo} />
        {r.note && <p className="mt-0.5 text-[8px] leading-snug text-slate">{r.note}</p>}
        {r.contacts?.map((c) => (
          <p key={c} className="text-[8px] font-medium text-gri-blue">{c}</p>
        ))}
        {r.link && (
          <p className="mt-0.5 truncate text-[8px] font-semibold text-gri-blue">
            {r.link.replace(/^https?:\/\//, "")}
          </p>
        )}
      </div>
      {r.qr && (
        <div className="flex shrink-0 flex-col items-center">
          <img src={r.qr} alt={`${r.name} QR`} className="h-[34px] w-[34px]" />
          <span className="text-[5.5px] font-semibold tracking-wide text-slate">SCAN ME</span>
        </div>
      )}
    </div>
  );
}

export function ResourceCard({ r }: { r: Resource }) {
  return (
    <div className="relative flex flex-col gap-2.5 rounded-2xl border border-cloud bg-white p-3.5 shadow-[0_1px_3px_rgba(28,37,57,0.06)]">
      {r.preferred && (
        <span className="absolute -top-2 right-3 rounded-full bg-gri-green px-2.5 py-[3px] text-[7.5px] font-bold uppercase tracking-wide text-white shadow-sm">
          GRI Preferred Partner
        </span>
      )}

      {/* Header: brand mark + QR */}
      <div className="flex min-h-[34px] items-start justify-between gap-2">
        <div className="pt-1">
          <BrandMark name={r.name} logo={r.logo} />
        </div>
        {r.qr && (
          <div className="flex shrink-0 flex-col items-center">
            <img src={r.qr} alt={`${r.name} QR`} className="h-[36px] w-[36px]" />
            <span className="text-[6px] font-semibold tracking-wide text-slate">SCAN ME</span>
          </div>
        )}
      </div>

      {r.image && <ImageSlot label={r.image.label} src={r.image.src} />}

      <div>
        {r.note && <p className="text-[8.5px] leading-snug text-slate">{r.note}</p>}
        {r.contacts?.map((c) => (
          <p key={c} className="text-[8.5px] font-medium text-gri-blue">{c}</p>
        ))}
        {r.link && (
          <p className="mt-0.5 truncate text-[8.5px] font-semibold text-gri-blue">
            {r.link.replace(/^https?:\/\//, "")}
          </p>
        )}
      </div>
    </div>
  );
}
