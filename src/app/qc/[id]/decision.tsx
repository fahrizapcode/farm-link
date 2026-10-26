"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardHeader, PillButton, cx, inputClass } from "@/components/ui";

export function Decision() {
  const [putusan, setPutusan] = useState<"hijau" | "merah" | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Card className="p-6 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-lime">
          <Check className="size-6 text-forest-900" />
        </span>
        <p className="mt-4 font-medium">Putusan tersimpan</p>
        <p className="mt-1 text-sm text-muted">
          Kebun menjadi {putusan}. Putusan, alasan, dan nama peninjau tercatat; koperasi dan petani diberi tahu.
        </p>
        <Link href="/qc" className="mt-5 inline-block text-sm text-forest-700 hover:underline">
          Kembali ke antrean
        </Link>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="Putusan" desc="Alasan wajib diisi dan tercatat bersama nama peninjau." />
      <div className="grid grid-cols-2 gap-2 p-5">
        <button
          onClick={() => setPutusan("hijau")}
          className={cx(
            "rounded-2xl p-4 text-left ring-1 transition-colors",
            putusan === "hijau" ? "bg-ok-soft ring-ok" : "ring-line hover:bg-cream",
          )}
        >
          <span className="size-2.5 rounded-full bg-ok inline-block" />
          <p className="mt-2 text-sm font-medium">Hijau</p>
          <p className="text-xs text-muted">Kanopi agroforestri, bukan deforestasi</p>
        </button>
        <button
          onClick={() => setPutusan("merah")}
          className={cx(
            "rounded-2xl p-4 text-left ring-1 transition-colors",
            putusan === "merah" ? "bg-bad-soft ring-bad" : "ring-line hover:bg-cream",
          )}
        >
          <span className="size-2.5 rounded-full bg-bad inline-block" />
          <p className="mt-2 text-sm font-medium">Merah</p>
          <p className="text-xs text-muted">Indikasi deforestasi setelah 2020</p>
        </button>
      </div>
      <div className="px-5 pb-5">
        <textarea
          className={inputClass}
          rows={4}
          placeholder="Contoh: citra 2019 dan 2022 menunjukkan kanopi kemiri yang sama; foto lapangan memperlihatkan kopi berumur ±20 tahun di bawah naungan."
        />
        <PillButton arrow className="mt-3 w-full justify-between" onClick={() => setDone(true)}>
          Simpan putusan
        </PillButton>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Hasil merah dikomunikasikan dengan bahasa yang hati-hati. Petani tetap bisa mengajukan keberatan dengan bukti
          baru.
        </p>
      </div>
    </Card>
  );
}
