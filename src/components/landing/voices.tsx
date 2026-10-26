"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { ImageSlot } from "../image-slot";
import { cx } from "../ui";

// Kebutuhan tiap persona, diringkas dari PRD. Bukan testimoni pengguna.
const voices = [
  {
    quote:
      "Pembeli kami di Belgia minta titik koordinat semua kebun pemasok. Kami punya ratusan petani, dan belum satu pun terpetakan.",
    who: "Pengelola koperasi kopi",
    where: "Persona · pembayar utama",
    img: "persona-pengelola-koperasi.jpg",
  },
  {
    quote:
      "Saya mau tahu kebun saya sudah tercatat, datanya dipakai untuk apa, dan bisa keberatan kalau hasil cek satelitnya salah.",
    who: "Petani kopi",
    where: "Persona · pemilik data",
    img: "persona-petani.jpg",
  },
  {
    quote:
      "Di kebun tidak ada sinyal. Aplikasinya harus bisa jalan offline dan langsung kasih tahu kalau titiknya kurang akurat.",
    who: "Enumerator lapangan",
    where: "Persona · mahasiswa KKN",
    img: "persona-enumerator.jpg",
  },
];

export function Voices() {
  const [i, setI] = useState(0);
  const v = voices[i];
  const next = voices[(i + 1) % voices.length];
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
      <div>
        <p key={v.quote} className="max-w-xl text-2xl leading-snug sm:text-[28px]">
          &ldquo;{v.quote}&rdquo;
        </p>
        <p className="mt-6 text-sm">{v.who}</p>
        <p className="text-xs text-white/55">{v.where}</p>
      </div>
      <div>
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            onClick={() => setI((i + voices.length - 1) % voices.length)}
            className="grid size-9 place-items-center rounded-full text-white/70 hover:text-white"
            aria-label="Sebelumnya"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            onClick={() => setI((i + 1) % voices.length)}
            className="grid size-9 place-items-center rounded-full bg-lime text-forest-900"
            aria-label="Berikutnya"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="flex items-start gap-4">
          <ImageSlot key={v.img} name={v.img} alt={v.who} className="aspect-[4/5] flex-1" />
          <ImageSlot key={next.img} name={next.img} alt={next.who} className={cx("aspect-[4/5] w-[34%] opacity-80")} hideLabel />
        </div>
        <div className="mt-4 flex justify-center gap-1.5">
          {voices.map((_, k) => (
            <span key={k} className={cx("h-1.5 rounded-full transition-all", k === i ? "w-6 bg-lime" : "w-1.5 bg-white/30")} />
          ))}
        </div>
      </div>
    </div>
  );
}
