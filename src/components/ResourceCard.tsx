import { useState } from "react";
import type { Resource } from "../content";

// ── Brand name lockup ───────────────────────────────────────────────────────
function NameLockup({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  const bar = size === "lg" ? "h-7 w-1.5" : "h-5 w-1.5";
  const txt = size === "lg" ? "text-[17px]" : "text-[13px]";
  return (
    <div className="flex items-center gap-2">
      <span className={`${bar} shrink-0 rounded-full bg-gri-green`} />
      <span className={`font-display ${txt} font-bold leading-tight text-navy`}>{name}</span>
    </div>
  );
}

function CameraHint() {
  return (
    <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-white/70 px-2 py-[3px] backdrop-blur-sm">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-gri-blue/70">
        <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 6l1.5-2h5L16 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <span className="text-[6px] font-bold uppercase tracking-wide text-gri-blue/70">Photo</span>
    </div>
  );
}

// ── Media: real photo if provided, else a designed branded placeholder ──────
function Media({ r, rounded = "rounded-t-2xl" }: { r: Resource; rounded?: string }) {
  const [imgOk, setImgOk] = useState(true);
  if (r.image?.src && imgOk) {
    return (
      <img
        src={r.image.src}
        alt={r.image.label}
        onError={() => setImgOk(false)}
        className={`h-full w-full object-cover ${rounded}`}
      />
    );
  }
  const [logoOk, setLogoOk] = useState(true);
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${rounded} bg-gradient-to-br from-mist to-cloud`}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,117,187,0.05)_25%,transparent_25%,transparent_50%,rgba(27,117,187,0.05)_50%,rgba(27,117,187,0.05)_75%,transparent_75%)] bg-[length:14px_14px]" />
      <CameraHint />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        {r.logo && logoOk ? (
          <img
            src={r.logo}
            alt={r.name}
            onError={() => setLogoOk(false)}
            className="max-h-[20mm] max-w-[70%] object-contain"
          />
        ) : (
          <NameLockup name={r.name} size="lg" />
        )}
      </div>
    </div>
  );
}

function Qr({ src, name, size = 34 }: { src: string; name: string; size?: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <img src={src} alt={`${name} QR`} style={{ height: size, width: size }} />
      <span className="text-[6px] font-semibold tracking-wide text-slate">SCAN ME</span>
    </div>
  );
}

// ── Filling image card (used everywhere in the auto-stretch grid) ───────────
export function ServiceCard({ r }: { r: Resource }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-cloud bg-white shadow-[0_1px_3px_rgba(28,37,57,0.06)]">
      {r.preferred && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-gri-green px-2.5 py-[3px] text-[7.5px] font-bold uppercase tracking-wide text-white shadow-sm">
          GRI Preferred Partner
        </span>
      )}
      <div className="min-h-0 flex-1">
        <Media r={r} />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-cloud px-3.5 py-2.5">
        <div className="min-w-0">
          <p className="font-display text-[11.5px] font-bold leading-tight text-navy">{r.name}</p>
          {r.note && <p className="truncate text-[8px] leading-snug text-slate">{r.note}</p>}
          {r.contacts?.map((c) => (
            <p key={c} className="truncate text-[8px] font-semibold text-gri-blue">{c}</p>
          ))}
          {r.link && (
            <p className="truncate text-[8px] font-semibold text-gri-blue">
              {r.link.replace(/^https?:\/\//, "")}
            </p>
          )}
        </div>
        {r.qr && <Qr src={r.qr} name={r.name} />}
      </div>
    </div>
  );
}

// ── Horizontal card: image beside content (used for 2–3 item pages) ─────────
export function HorizontalCard({ r }: { r: Resource }) {
  return (
    <div className="relative flex h-full min-h-0 overflow-hidden rounded-2xl border border-cloud bg-white shadow-[0_1px_3px_rgba(28,37,57,0.06)]">
      <div className="relative w-[40%] shrink-0">
        <Media r={r} rounded="" />
        {r.preferred && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-gri-green px-2.5 py-[3px] text-[7.5px] font-bold uppercase tracking-wide text-white shadow-sm">
            GRI Preferred Partner
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5 p-6">
        <div className="flex items-center gap-2.5">
          <span className="h-7 w-1.5 shrink-0 rounded-full bg-gri-green" />
          <p className="font-display text-[16px] font-extrabold leading-tight text-navy">{r.name}</p>
        </div>
        <div>
          {r.note && <p className="text-[10.5px] leading-snug text-slate">{r.note}</p>}
          <div className="mt-1 space-y-0.5">
            {r.contacts?.map((c) => (
              <p key={c} className="text-[10.5px] font-semibold text-gri-blue">{c}</p>
            ))}
            {r.link && (
              <p className="text-[10.5px] font-semibold text-gri-blue">
                {r.link.replace(/^https?:\/\//, "")}
              </p>
            )}
          </div>
        </div>
        {r.qr && (
          <div className="mt-1 flex items-center gap-2.5">
            <img src={r.qr} alt={`${r.name} QR`} className="h-[46px] w-[46px]" />
            <span className="text-[8px] font-bold uppercase tracking-wide text-slate">Scan me</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Auto-stretching grid. 2–3 items → stacked horizontal cards; 4+ → 2-col ──
export function ServiceGrid({ resources }: { resources: Resource[] }) {
  if (resources.length <= 3) {
    return (
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3" style={{ gridAutoRows: "1fr" }}>
        {resources.map((r) => (
          <div key={r.name} className="min-h-0">
            <HorizontalCard r={r} />
          </div>
        ))}
      </div>
    );
  }
  const odd = resources.length % 2 === 1;
  return (
    <div className="grid min-h-0 flex-1 grid-cols-2 gap-3" style={{ gridAutoRows: "1fr" }}>
      {resources.map((r, i) => (
        <div
          key={r.name}
          className={`min-h-0 ${odd && i === resources.length - 1 ? "col-span-2" : ""}`}
        >
          <ServiceCard r={r} />
        </div>
      ))}
    </div>
  );
}

// ── Large single-resource feature: photo banner + horizontal detail bar ─────
export function FeatureCard({ r }: { r: Resource }) {
  const [imgOk, setImgOk] = useState(true);
  const [logoOk, setLogoOk] = useState(true);
  const hasPhoto = r.image?.src && imgOk;
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-cloud bg-white shadow-[0_2px_12px_rgba(28,37,57,0.08)]">
      {/* Photo banner — fills the upper portion */}
      <div className="relative min-h-0 flex-[1.9] bg-navy">
        {hasPhoto ? (
          <img
            src={r.image!.src}
            alt={r.image!.label}
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-mist to-cloud">
            <CameraHint />
            <NameLockup name={r.name} size="lg" />
          </div>
        )}
        {r.preferred && (
          <span className="absolute left-5 top-5 rounded-full bg-gri-green px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow">
            GRI Preferred Partner
          </span>
        )}
        <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gri-green/90" />
      </div>

      {/* Detail bar — horizontal, vertically centred, fills the lower portion */}
      <div className="flex min-h-0 flex-1 items-center justify-between gap-7 px-8 py-5">
        <div className="min-w-0 flex-1">
          {r.logo && logoOk ? (
            <div className="mb-3 flex h-[14mm] items-center justify-start rounded-xl border border-cloud bg-white px-4">
              <img
                src={r.logo}
                alt={r.name}
                onError={() => setLogoOk(false)}
                className="max-h-[70%] max-w-[55%] object-contain"
              />
            </div>
          ) : (
            <div className="mb-3">
              <NameLockup name={r.name} size="lg" />
            </div>
          )}
          {r.note && <p className="mb-2 max-w-[110mm] text-[11px] leading-relaxed text-slate">{r.note}</p>}
          <div className="space-y-0.5">
            {r.contacts?.map((c) => (
              <p key={c} className="text-[11.5px] font-semibold text-gri-blue">{c}</p>
            ))}
            {r.link && (
              <p className="text-[11.5px] font-semibold text-gri-blue">
                {r.link.replace(/^https?:\/\//, "")}
              </p>
            )}
          </div>
        </div>

        {r.qr && (
          <div className="flex shrink-0 flex-col items-center rounded-2xl bg-mist px-5 py-4">
            <img src={r.qr} alt={`${r.name} QR`} className="h-[64px] w-[64px]" />
            <p className="mt-1.5 text-[9px] font-bold uppercase tracking-wide text-navy">Scan to open</p>
            <p className="text-[7.5px] text-slate">Point your camera here</p>
          </div>
        )}
      </div>
    </div>
  );
}
