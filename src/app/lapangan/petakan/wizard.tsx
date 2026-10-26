"use client";

import Link from "next/link";
import { useState } from "react";
import { Camera, Check, ChevronLeft, Crosshair, Hexagon, MapPin, Satellite, X } from "lucide-react";
import { PhoneStatusBar } from "@/components/phone-frame";
import { cx } from "@/components/ui";
import { cakupanLabel, type CakupanPersetujuan } from "@/lib/data";

const stepNames = ["Petani", "Persetujuan", "Kebun", "Ukur", "Foto & saringan", "Simpan"];
const gpsSeq = [14.2, 8.6, 4.4];
const AMBANG = 10;

const field =
  "w-full rounded-xl border border-line bg-paper px-3.5 py-3 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-lime/60";

export function MappingWizard() {
  const [step, setStep] = useState(0);
  const [luas, setLuas] = useState(5.6);
  const [gpsIdx, setGpsIdx] = useState(0);
  const [sudut, setSudut] = useState(0);
  const [titik, setTitik] = useState(false);
  const [foto, setFoto] = useState(0);

  const poligon = luas > 4;
  const akurasi = gpsSeq[gpsIdx];
  const akurat = akurasi <= AMBANG;
  const next = () => setStep((s) => Math.min(stepNames.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  // Titik-titik sudut poligon pada sketsa
  const corners: [number, number][] = [
    [70, 70],
    [230, 50],
    [280, 150],
    [210, 230],
    [80, 200],
    [50, 130],
  ];

  return (
    <div className="flex min-h-full flex-col bg-cream">
      <div className="bg-paper">
        <PhoneStatusBar />
        <div className="flex items-center gap-3 px-4 pb-3">
          {step === 0 ? (
            <Link href="/lapangan" className="grid size-9 place-items-center rounded-full bg-cream" aria-label="Kembali">
              <ChevronLeft className="size-4" />
            </Link>
          ) : (
            <button onClick={back} className="grid size-9 place-items-center rounded-full bg-cream" aria-label="Kembali">
              <ChevronLeft className="size-4" />
            </button>
          )}
          <div className="flex-1">
            <p className="text-[11px] text-muted">
              Langkah {step + 1} dari {stepNames.length}
            </p>
            <p className="text-sm font-medium">{stepNames[step]}</p>
          </div>
          <Link href="/lapangan" className="grid size-9 place-items-center rounded-full bg-cream" aria-label="Tutup">
            <X className="size-4" />
          </Link>
        </div>
        <div className="flex gap-1 px-4 pb-3">
          {stepNames.map((s, i) => (
            <span key={s} className={cx("h-1 flex-1 rounded-full", i <= step ? "bg-forest-700" : "bg-ink/10")} />
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-4 px-4 py-5">
        {step === 0 && (
          <>
            <h2 className="text-xl tracking-tight">Siapa pemilik kebun?</h2>
            <label className="block text-sm">
              Nama petani
              <input className={`${field} mt-1.5`} defaultValue="Hasanuddin Aman Fitri" />
            </label>
            <label className="block text-sm">
              NIK
              <input className={`${field} mt-1.5`} defaultValue="1104 •••• •••• 2209" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm">
                Desa
                <input className={`${field} mt-1.5`} defaultValue="Pantan Musara" />
              </label>
              <label className="block text-sm">
                Nomor HP
                <input className={`${field} mt-1.5`} defaultValue="0852-6012-3398" />
              </label>
            </div>
            <p className="rounded-2xl bg-info-soft p-3 text-xs leading-relaxed text-info">
              Petani ini sudah terdaftar. Data disalin dari perangkat, tidak perlu sinyal.
            </p>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-xl tracking-tight">Persetujuan petani</h2>
            <p className="text-sm leading-relaxed text-muted">
              Bacakan naskah persetujuan. Petani boleh menyetujui sebagian cakupan saja, dan bisa menariknya kapan saja.
            </p>
            <div className="divide-y divide-line rounded-2xl bg-paper ring-1 ring-line">
              {(Object.keys(cakupanLabel) as CakupanPersetujuan[]).map((c, i) => (
                <label key={c} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  {cakupanLabel[c]}
                  <input type="checkbox" defaultChecked={i !== 2} className="size-5 accent-forest-700" />
                </label>
              ))}
            </div>
            <div className="grid h-32 place-items-center rounded-2xl border border-dashed border-ink/25 bg-paper text-xs text-muted">
              Tanda tangan petani di sini
            </div>
            <button className="w-full rounded-full border border-line bg-paper py-2.5 text-sm">
              Rekam persetujuan lisan
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl tracking-tight">Tentang kebun</h2>
            <label className="block text-sm">
              Nama kebun
              <input className={`${field} mt-1.5`} defaultValue="Kebun Pantan Musara" />
            </label>
            <label className="block text-sm">
              Perkiraan luas (ha)
              <input
                className={`${field} mt-1.5`}
                type="number"
                step="0.1"
                value={luas}
                onChange={(e) => setLuas(Number(e.target.value))}
              />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className={cx("rounded-2xl p-4 ring-1", !poligon ? "bg-lime ring-lime" : "bg-paper text-muted ring-line")}>
                <MapPin className="size-5" />
                <p className="mt-3 text-sm font-medium">Satu titik</p>
                <p className="text-[11px]">Kebun sampai 4 ha</p>
              </div>
              <div className={cx("rounded-2xl p-4 ring-1", poligon ? "bg-lime ring-lime" : "bg-paper text-muted ring-line")}>
                <Hexagon className="size-5" />
                <p className="mt-3 text-sm font-medium">Poligon</p>
                <p className="text-[11px]">Jalan keliling batas</p>
              </div>
            </div>
            {poligon && (
              <p className="rounded-2xl bg-warn-soft p-3 text-xs leading-relaxed text-warn">
                Kebun di atas 4 ha wajib dipetakan sebagai poligon. Satu poligon hanya untuk satu kebun.
              </p>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <div className="relative overflow-hidden rounded-3xl bg-paper ring-1 ring-line">
              <div className="map-grid relative aspect-square">
                <svg viewBox="0 0 340 300" className="absolute inset-0 size-full">
                  {poligon ? (
                    <>
                      {sudut > 1 && (
                        <polyline
                          points={corners
                            .slice(0, sudut)
                            .concat(sudut === corners.length ? [corners[0]] : [])
                            .map((c) => c.join(","))
                            .join(" ")}
                          fill={sudut === corners.length ? "rgba(31,157,85,0.18)" : "none"}
                          stroke="#1f9d55"
                          strokeWidth="3"
                          strokeLinejoin="round"
                        />
                      )}
                      {corners.slice(0, sudut).map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="6" fill="#fff" stroke="#1f9d55" strokeWidth="3" />
                      ))}
                      {sudut < corners.length && (
                        <circle cx={corners[sudut][0]} cy={corners[sudut][1]} r="10" fill="#2f6fb3" stroke="#fff" strokeWidth="3" />
                      )}
                    </>
                  ) : (
                    <>
                      <circle cx="170" cy="150" r={akurasi * 4} fill="#2f6fb3" fillOpacity="0.12" stroke="#2f6fb3" strokeOpacity="0.4" strokeDasharray="4 3" />
                      <circle cx="170" cy="150" r="10" fill={titik ? "#1f9d55" : "#2f6fb3"} stroke="#fff" strokeWidth="3" />
                    </>
                  )}
                </svg>
                <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[10.5px]">
                  4.712088, 96.701204
                </span>
              </div>
            </div>

            <div className={cx("flex items-center gap-3 rounded-2xl p-3.5", akurat ? "bg-ok-soft" : "bg-bad-soft")}>
              <Satellite className={cx("size-5", akurat ? "text-ok" : "text-bad")} />
              <div className="flex-1 text-sm">
                <p className={cx("font-medium", akurat ? "text-ok" : "text-bad")}>Akurasi GPS ±{akurasi} m</p>
                <p className="text-xs text-muted">
                  {akurat ? "Di bawah ambang 10 m. Siap direkam." : "Lebih buruk dari ambang 10 m. Pindah ke area terbuka atau tunggu."}
                </p>
              </div>
              {!akurat && (
                <button
                  onClick={() => setGpsIdx((i) => Math.min(gpsSeq.length - 1, i + 1))}
                  className="rounded-full bg-paper px-3 py-1.5 text-xs"
                >
                  Perbarui
                </button>
              )}
            </div>

            {poligon ? (
              <div className="rounded-2xl bg-paper p-4 ring-1 ring-line">
                <div className="flex items-center justify-between text-sm">
                  <span>Sudut terekam</span>
                  <span className="font-medium">
                    {sudut} / {corners.length}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span>Luas poligon</span>
                  <span className="font-medium">{sudut === corners.length ? "5,62 ha" : "—"}</span>
                </div>
                <button
                  disabled={!akurat || sudut === corners.length}
                  onClick={() => setSudut((s) => s + 1)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-forest-900 py-3 text-sm text-white disabled:opacity-40"
                >
                  <Crosshair className="size-4" />
                  {sudut === corners.length ? "Poligon tertutup" : "Rekam sudut di posisi ini"}
                </button>
              </div>
            ) : (
              <button
                disabled={!akurat}
                onClick={() => setTitik(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-900 py-3 text-sm text-white disabled:opacity-40"
              >
                <Crosshair className="size-4" />
                {titik ? "Titik terekam" : "Rekam titik tengah kebun"}
              </button>
            )}
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl tracking-tight">Foto dan pertanyaan saringan</h2>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setFoto((f) => Math.max(f, i + 1))}
                  className={cx(
                    "grid aspect-square place-items-center rounded-2xl text-xs",
                    i < foto ? "bg-forest-700 text-white" : "image-slot text-forest-800",
                  )}
                >
                  {i < foto ? <Check className="size-5" /> : <Camera className="size-5" />}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted">Foto bergeotag: sisi kebun, tengah kebun, dan tanaman (untuk tinjauan QC).</p>
            <label className="block text-sm">
              Umur tanaman (tahun)
              <input className={`${field} mt-1.5`} defaultValue="18" />
            </label>
            <label className="block text-sm">
              Pohon naungan
              <input className={`${field} mt-1.5`} defaultValue="Petai, durian, lamtoro" />
            </label>
            <div className="divide-y divide-line rounded-2xl bg-paper ring-1 ring-line">
              {[
                "Ada anak di bawah 15 tahun yang ikut bekerja di kebun saat jam sekolah?",
                "Ada pekerja yang tidak dibayar atau tidak bisa berhenti bekerja?",
                "Lahan dibuka setelah tahun 2020?",
              ].map((q) => (
                <div key={q} className="px-4 py-3">
                  <p className="text-sm">{q}</p>
                  <div className="mt-2 flex gap-2">
                    <label className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs has-[:checked]:border-forest-700 has-[:checked]:bg-lime/30">
                      <input type="radio" name={q} className="hidden" /> Ya
                    </label>
                    <label className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs has-[:checked]:border-forest-700 has-[:checked]:bg-lime/30">
                      <input type="radio" name={q} defaultChecked className="hidden" /> Tidak
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <div className="pt-6 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime">
              <Check className="size-7 text-forest-900" />
            </span>
            <h2 className="mt-5 text-xl tracking-tight">Tersimpan di perangkat</h2>
            <p className="mx-auto mt-2 max-w-[260px] text-sm text-muted">
              Data akan dikirim dan divalidasi otomatis saat ada sinyal. Kesalahan akan muncul di menu sinkron.
            </p>
            <div className="mt-6 space-y-2 rounded-2xl bg-paper p-4 text-left text-sm ring-1 ring-line">
              <div className="flex justify-between">
                <span className="text-muted">Geometri</span>
                <span>{poligon ? "Poligon · 6 sudut" : "Titik"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Luas</span>
                <span>{poligon ? "5,62 ha" : `${luas} ha`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Akurasi</span>
                <span>±{akurasi} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Format</span>
                <span>WGS-84 · 6 desimal</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-line bg-paper/95 p-4 backdrop-blur">
        {step < 5 ? (
          <button onClick={next} className="w-full rounded-full bg-lime py-3.5 text-sm font-medium text-forest-900">
            {step === 4 ? "Simpan kebun" : step === 1 ? "Simpan persetujuan" : "Lanjut"}
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link href="/lapangan/sinkron" className="rounded-full border border-line py-3.5 text-center text-sm">
              Sinkron
            </Link>
            <Link href="/lapangan" className="rounded-full bg-lime py-3.5 text-center text-sm font-medium text-forest-900">
              Selesai
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
