"use client";

import { Languages } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { cx } from "./ui";

/** Tombol ganti bahasa ID / EN. */
export function LangSwitch({ light = false, className }: { light?: boolean; className?: string }) {
  const { lang, setLang } = useLang();
  const opts: Lang[] = ["id", "en"];
  return (
    <div
      role="group"
      aria-label="Bahasa / Language"
      className={cx(
        "inline-flex items-center gap-0.5 rounded-full p-1 text-[12px]",
        light ? "bg-forest-950/55 text-white backdrop-blur-md" : "border border-line bg-paper text-ink",
        className,
      )}
    >
      <Languages className={cx("mx-1.5 size-3.5", light ? "text-white/60" : "text-muted")} aria-hidden />
      {opts.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => setLang(o)}
          aria-pressed={lang === o}
          className={cx(
            "rounded-full px-2.5 py-1 font-medium uppercase transition-colors",
            lang === o ? "bg-lime text-forest-900" : light ? "text-white/70 hover:text-white" : "text-muted hover:text-ink",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
