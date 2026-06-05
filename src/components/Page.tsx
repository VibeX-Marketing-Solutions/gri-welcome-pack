import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  /** Full-bleed page (cover / divider) — removes inner padding & footer. */
  bleed?: boolean;
  /** Page number shown in the footer. Omit to hide footer. */
  pageNo?: number;
  className?: string;
};

export function Page({ children, bleed, pageNo, className = "" }: PageProps) {
  return (
    <section className={`page ${bleed ? "page-bleed" : ""} ${className}`}>
      <div className="page-body">{children}</div>
      {!bleed && pageNo != null && <Footer pageNo={pageNo} />}
    </section>
  );
}

function Footer({ pageNo }: { pageNo: number }) {
  return (
    <footer className="absolute inset-x-0 bottom-0 flex items-center justify-between px-[16mm] pb-[8mm] pt-2">
      <div className="flex items-center gap-2">
        <img src="/img/logo.svg" alt="GRI Education" className="h-[18px] w-auto" />
        <span className="text-[8.5px] font-medium tracking-wide text-slate">
          NZ Student Welcome Pack
        </span>
      </div>
      <div className="flex items-center gap-2 text-[8.5px] font-semibold text-gri-blue">
        <span className="h-[3px] w-6 rounded-full bg-gri-green" />
        <span>{String(pageNo).padStart(2, "0")}</span>
      </div>
    </footer>
  );
}
