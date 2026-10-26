"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { ImageSlot } from "../image-slot";
import { cx } from "../ui";

// Kebutuhan tiap persona, diringkas dari PRD. Bukan testimoni pengguna.
const images = ["persona-pengelola-koperasi.jpg", "persona-petani.jpg", "persona-enumerator.jpg"];

export function Voices() {
  const { t } = useLang();
  const items = t.voices.items;
  const [i, setI] = useState(0);
  const v = items[i];
  const n = (i + 1) % items.length;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12">
      <div className="order-2 lg:order-1">
        <p key={`${i}-${v.quote}`} className="page-enter max-w-xl text-2xl leading-snug sm:text-[28px]">
          &ldquo;{v.quote}&rdquo;
        </p>
        <p className="mt-5 text-sm">{v.who}</p>
        <p className="text-xs text-white/55">{v.where}</p>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={() => setI((i + items.length - 1) % items.length)}
            className="grid size-10 place-items-center rounded-full ring-1 ring-white/20 text-white/80 hover:text-white"
            aria-label={t.voices.prev}
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            onClick={() => setI(n)}
            className="grid size-10 place-items-center rounded-full bg-lime text-forest-900"
            aria-label={t.voices.next}
          >
            <ArrowRight className="size-4" />
          </button>
          <div className="ml-2 flex gap-1.5">
            {items.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`${k + 1}`}
                className={cx("h-1.5 rounded-full transition-all", k === i ? "w-6 bg-lime" : "w-1.5 bg-white/30")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="order-1 flex items-start gap-3 lg:order-2">
        <ImageSlot key={images[i]} name={images[i]} alt={v.who} className="page-enter h-64 flex-1 sm:h-80" />
        <button onClick={() => setI(n)} className="w-[32%] shrink-0" aria-label={t.voices.next}>
          <ImageSlot key={images[n]} name={images[n]} alt={items[n].who} className="h-40 opacity-70 transition-opacity hover:opacity-100 sm:h-48" hideLabel />
        </button>
      </div>
    </div>
  );
}
