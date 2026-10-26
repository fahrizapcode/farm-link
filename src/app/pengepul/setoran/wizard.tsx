"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronLeft, Lock, ScanLine } from "lucide-react";
import { PhoneStatusBar } from "@/components/phone-frame";
import { cx } from "@/components/ui";
import { getPetani, kebunPetani } from "@/lib/data";

const PETANI = "PTN-0001";

export function SetoranWizard() {
  const [step, setStep] = useState(0);
  const p = getPetani(PETANI)!;
  const kb = kebunPetani(PETANI);
  const [kebunId, setKebunId] = useState(kb.find((k) => k.status === "siap-ekspor")?.id);
  const [berat, setBerat] = useState("420");

  return (
    <div className="flex min-h-full flex-col bg-cream">
      <div className="bg-paper">
        <PhoneStatusBar />
        <div className="flex items-center gap-3 px-4 pb-4">
          {step === 0 ? (
            <Link href="/pengepul" className="grid size-9 place-items-center rounded-full bg-cream" aria-label="Kembali">
              <ChevronLeft className="size-4" />
            </Link>
          ) : (
            <button onClick={() => setStep((s) => s - 1)} className="grid size-9 place-items-center rounded-full bg-cream" aria-label="Kembali">
              <ChevronLeft className="size-4" />
            </button>
          )}
          <p className="text-sm font-medium">{["Pindai kartu", "Pilih kebun & timbang", "Tersimpan"][step]}</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-5">
        {step === 0 && (
          <button onClick={() => setStep(1)} className="block w-full text-left">
            <div className="relative mx-auto aspect-square overflow-hidden rounded-3xl bg-forest-950">
              <div className="absolute inset-10 rounded-2xl border-2 border-lime/80" />
              <div className="absolute inset-x-10 top-1/2 h-0.5 bg-lime shadow-[0_0_20px_4px_rgba(212,242,106,0.6)]" />
              <ScanLine className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-white/15" />
            </div>
            <p className="mt-5 text-center text-sm text-muted">Arahkan kamera ke kartu QR petani</p>
            <p className="mt-1 text-center text-xs text-muted">(ketuk untuk simulasi pindai)</p>
          </button>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-forest-900 p-4 text-white">
              <p className="text-xs text-white/60">Petani</p>
              <p className="text-lg">{p.nama}</p>
              <p className="text-xs text-white/60">
                {p.id} · {p.desa}
              </p>
            </div>

            <div>
              <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-muted">Kebun asal</p>
              <div className="space-y-2">
                {kb.map((k) => {
                  const ok = !["merah", "dipisahkan", "belum-dipetakan", "terpetakan"].includes(k.status);
                  const ket =
                    k.status === "siap-ekspor"
                      ? "boleh masuk lot Eropa"
                      : k.status === "kuning"
                        ? "kuning · ditahan dari lot Eropa sampai putusan QC"
                        : ok
                          ? "tercatat, belum siap ekspor"
                          : "merah atau belum tervalidasi · tidak bisa ditautkan";
                  return (
                    <button
                      key={k.id}
                      disabled={!ok}
                      onClick={() => setKebunId(k.id)}
                      className={cx(
                        "flex w-full items-center gap-3 rounded-2xl p-4 text-left ring-1",
                        kebunId === k.id ? "bg-lime ring-lime" : "bg-paper ring-line",
                        !ok && "opacity-55",
                      )}
                    >
                      <span className="flex-1">
                        <span className="block text-sm font-medium">{k.nama}</span>
                        <span className="block text-xs text-muted">
                          {k.luasHa} ha · {ket}
                        </span>
                      </span>
                      {!ok ? <Lock className="size-4" /> : kebunId === k.id ? <Check className="size-4" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block">
              <span className="px-1 text-xs font-medium uppercase tracking-wide text-muted">Berat (kg)</span>
              <input
                inputMode="decimal"
                value={berat}
                onChange={(e) => setBerat(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-4 text-3xl tracking-tight outline-none focus:border-forest-700"
              />
            </label>

            <label className="block">
              <span className="px-1 text-xs font-medium uppercase tracking-wide text-muted">Periode panen</span>
              <select className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-sm outline-none">
                <option>Okt 2026</option>
                <option>Sep–Okt 2026</option>
                <option>Nov 2026</option>
              </select>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="pt-8 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime">
              <Check className="size-7 text-forest-900" />
            </span>
            <h2 className="mt-5 text-xl tracking-tight">Setoran tersimpan</h2>
            <p className="mt-1 text-3xl tracking-tight">{Number(berat || 0).toLocaleString("id-ID")} kg</p>
            <p className="mx-auto mt-3 max-w-[260px] text-sm text-muted">
              {p.nama} · {kb.find((k) => k.id === kebunId)?.nama}. Akan dikirim dan dicatat on-chain saat ada sinyal.
            </p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-line bg-paper/95 p-4 backdrop-blur">
        {step === 1 && (
          <button onClick={() => setStep(2)} className="w-full rounded-full bg-lime py-3.5 text-sm font-medium text-forest-900">
            Simpan setoran
          </button>
        )}
        {step === 2 && (
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setStep(0)} className="rounded-full border border-line py-3.5 text-sm">
              Setoran lain
            </button>
            <Link href="/pengepul" className="rounded-full bg-lime py-3.5 text-center text-sm font-medium text-forest-900">
              Selesai
            </Link>
          </div>
        )}
        {step === 0 && (
          <button onClick={() => setStep(1)} className="w-full rounded-full border border-line py-3.5 text-sm">
            Cari petani manual
          </button>
        )}
      </div>
    </div>
  );
}
