"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { cx } from "../ui";

/** Daftar langkah berbentuk akordeon. Mengisi tinggi kolomnya agar sejajar dengan kolase foto. */
export function Steps() {
  const [open, setOpen] = useState(0);
  const { t } = useLang();
  return (
    <div className="flex h-full flex-col divide-y divide-line border-y border-line">
      {t.how.steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <button
            key={i}
            onClick={() => setOpen(i)}
            aria-expanded={isOpen}
            className="flex w-full flex-1 flex-col justify-center py-5 text-left"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <span className="text-[17px]">{s.title}</span>
              </span>
              <span
                className={cx(
                  "grid size-7 shrink-0 place-items-center rounded-full bg-lime text-forest-900 transition-transform duration-300",
                  isOpen ? "rotate-0" : "rotate-45",
                )}
              >
                <ArrowUpRight className="size-4" strokeWidth={2.4} />
              </span>
            </div>
            <div className={cx("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <p className="overflow-hidden pl-9 pr-10 pt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
