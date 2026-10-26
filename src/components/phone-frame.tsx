import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { Logo, Tag } from "./ui";

/**
 * Bingkai ponsel untuk pratinjau aplikasi lapangan di desktop.
 * Di layar kecil, isi aplikasi tampil penuh tanpa bingkai.
 */
export function PhoneFrame({
  title,
  points,
  children,
}: {
  title: string;
  points: string[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12 lg:px-10 lg:py-10">
      <aside className="hidden max-w-sm justify-self-end lg:block">
        <Link href="/masuk" className="mb-10 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <ChevronLeft className="size-4" /> Ganti peran
        </Link>
        <div>
          <Logo />
        </div>
        <div className="mt-8">
          <Tag>Pratinjau aplikasi lapangan</Tag>
        </div>
        <h1 className="mt-4 text-[34px] leading-tight tracking-tight">{title}</h1>
        <ul className="mt-6 space-y-3 text-sm text-muted">
          {points.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-forest-700" />
              {p}
            </li>
          ))}
        </ul>
      </aside>

      <div className="relative mx-auto min-h-screen w-full bg-paper lg:h-[820px] lg:min-h-0 lg:w-[400px] lg:overflow-hidden lg:rounded-[44px] lg:border-[10px] lg:border-forest-950 lg:shadow-2xl lg:shadow-forest-900/25">
        <div className="absolute left-1/2 top-2 z-50 hidden h-6 w-28 -translate-x-1/2 rounded-full bg-forest-950 lg:block" />
        <div className="h-full overflow-y-auto no-scrollbar">{children}</div>
      </div>

      <div className="hidden lg:block" />
    </div>
  );
}

export function PhoneStatusBar({ offline = true, dark = false }: { offline?: boolean; dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-6 pb-2 pt-3 text-[11px] lg:pt-10 ${dark ? "text-white/80" : "text-ink/70"}`}>
      <span className="font-medium">09.41</span>
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${offline ? "bg-warn-soft text-warn" : "bg-ok-soft text-ok"}`}>
        <span className="size-1.5 rounded-full bg-current" />
        {offline ? "Mode offline" : "Online"}
      </span>
    </div>
  );
}
