"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { Logo } from "../ui";

export function SiteFooter() {
  const { t } = useLang();
  const f = t.footer;
  const cols = [
    { title: f.product, hrefs: ["/#fitur", "/#cara-kerja", "/#harga", "/verifikasi"], labels: f.productLinks },
    { title: f.loginAs, hrefs: ["/koperasi", "/lapangan", "/pengepul", "/qc"], labels: f.loginLinks },
    { title: f.refs, hrefs: ["#", "#", "#", "#"], labels: f.refLinks },
  ];

  return (
    <footer className="overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 pt-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">{f.about}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-medium">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.labels.map((label, i) => (
                <li key={label}>
                  <Link href={c.hrefs[i]} className="text-sm text-muted hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-[1280px] flex-wrap justify-between gap-3 border-t border-line px-4 pt-5 text-xs text-muted sm:px-8">
        <span>{f.disclaimer}</span>
        <span>{f.data}</span>
      </div>
      <p
        aria-hidden
        className="mx-auto -mb-[0.2em] mt-4 max-w-[1280px] select-none px-2 text-center text-[21vw] font-semibold leading-none tracking-[-0.06em] text-forest-900 xl:text-[270px]"
      >
        FARMLINK
      </p>
    </footer>
  );
}
