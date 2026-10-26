"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Lock } from "lucide-react";
import {
  Badge,
  Card,
  CardHeader,
  Field,
  KebunStatusBadge,
  PageHeader,
  PillLink,
  cx,
  inputClass,
} from "@/components/ui";
import { formatKg, formatTanggal, getKebun, getPetani, koperasi, setoran } from "@/lib/data";

export function LotBuilder() {
  const tersedia = setoran.filter((s) => !s.lotId);
  const bisa = (kebunId: string) => getKebun(kebunId)?.status === "siap-ekspor";
  const [pilih, setPilih] = useState<string[]>(tersedia.filter((s) => bisa(s.kebunId)).map((s) => s.id));

  const terpilih = tersedia.filter((s) => pilih.includes(s.id));
  const total = terpilih.reduce((a, s) => a + s.beratKg, 0);
  const kebunIds = [...new Set(terpilih.map((s) => s.kebunId))];
  const kapasitas = kebunIds.reduce((a, id) => {
    const k = getKebun(id)!;
    return a + k.luasHa * koperasi.hasilPerHaKg[k.komoditas];
  }, 0);

  const toggle = (id: string) => setPilih((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <>
      <Link href="/koperasi/lot" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Semua lot
      </Link>
      <PageHeader
        eyebrow="F8"
        title="Bentuk lot baru"
        desc="Hanya setoran dari kebun siap ekspor (hijau dan legalitas lengkap) yang bisa masuk lot Eropa."
      />

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader title="Pilih setoran" desc={`${tersedia.length} setoran belum masuk lot`} />
          <ul className="divide-y divide-line">
            {tersedia.map((s) => {
              const k = getKebun(s.kebunId)!;
              const ok = bisa(s.kebunId);
              return (
                <li key={s.id}>
                  <label
                    className={cx(
                      "flex items-center gap-4 px-5 py-3.5",
                      ok ? "cursor-pointer hover:bg-cream/60" : "cursor-not-allowed opacity-60",
                    )}
                  >
                    {ok ? (
                      <input
                        type="checkbox"
                        checked={pilih.includes(s.id)}
                        onChange={() => toggle(s.id)}
                        className="size-4 accent-forest-700"
                      />
                    ) : (
                      <Lock className="size-4 text-muted" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        {getPetani(s.petaniId)?.nama} · {formatKg(s.beratKg)}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {s.id} · {k.nama} · {formatTanggal(s.tanggalSetor)} · panen {s.periodePanen}
                      </p>
                    </div>
                    <KebunStatusBadge status={k.status} />
                  </label>
                </li>
              );
            })}
          </ul>
        </Card>

        <div className="grid content-start gap-4">
          <Card>
            <CardHeader title="Detail lot" />
            <div className="grid gap-4 p-5">
              <Field label="Kode lot">
                <input className={inputClass} defaultValue="LG-ARB-017" />
              </Field>
              <Field label="Deskripsi produk">
                <input className={inputClass} defaultValue="Green coffee Arabika Gayo, semi-washed, grade 1" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Kode HS">
                  <select className={inputClass} defaultValue="0901.11">
                    <option value="0901.11">0901.11 · kopi</option>
                    <option value="1801.00">1801.00 · kakao</option>
                  </select>
                </Field>
                <Field label="Jenis pernyataan">
                  <select className={inputClass}>
                    <option>Per pengiriman</option>
                    <option>Tahunan</option>
                  </select>
                </Field>
              </div>
            </div>
          </Card>

          <Card dark className="p-5">
            <p className="text-sm text-white/60">Berat bersih</p>
            <p className="mt-1 text-[40px] leading-none tracking-tight">{formatKg(total)}</p>
            <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Setoran</span>
                <span>{terpilih.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Kebun asal</span>
                <span>{kebunIds.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Kapasitas kebun asal</span>
                <span>{formatKg(Math.round(kapasitas))}</span>
              </div>
            </div>
            <div className="mt-4">
              {total <= kapasitas ? (
                <Badge tone="lime">Volume wajar</Badge>
              ) : (
                <Badge tone="warn">Melebihi kapasitas · butuh catatan</Badge>
              )}
            </div>
            <PillLink href="/koperasi/lot/LOT-2026-014" className="mt-6 w-full justify-between">
              Bentuk lot
            </PillLink>
          </Card>
        </div>
      </div>
    </>
  );
}
