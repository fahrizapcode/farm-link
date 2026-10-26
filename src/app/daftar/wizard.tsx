"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { Field, Logo, PillButton, PillLink, Tag, cx, inputClass } from "@/components/ui";

const steps = ["Profil koperasi", "Komoditas & hasil", "Undang tim", "Selesai"];

export function RegisterWizard() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[1080px] items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/">
          <Logo />
        </Link>
        <Link href="/masuk" className="text-sm text-muted hover:text-ink">
          Sudah punya akun? <span className="font-medium text-forest-700">Masuk</span>
        </Link>
      </header>

      <div className="mx-auto max-w-[1080px] px-5 pb-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside>
            <Tag>Registrasi koperasi · F1</Tag>
            <ol className="mt-6 space-y-1">
              {steps.map((s, i) => (
                <li key={s}>
                  <button
                    onClick={() => setStep(i)}
                    className={cx(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-left text-sm",
                      i === step ? "bg-forest-900 text-white" : "text-muted hover:bg-paper",
                    )}
                  >
                    <span
                      className={cx(
                        "grid size-6 place-items-center rounded-full text-xs",
                        i < step ? "bg-lime text-forest-900" : i === step ? "bg-lime text-forest-900" : "bg-ink/[0.07]",
                      )}
                    >
                      {i < step ? <Check className="size-3.5" /> : i + 1}
                    </span>
                    {s}
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:p-8">
            {step === 0 && (
              <>
                <h1 className="text-[28px] tracking-tight">Profil koperasi atau eksportir</h1>
                <p className="mt-1 text-sm text-muted">
                  Nama, alamat, dan email ini muncul di ringkasan DDS sebagai data pemasok.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Nama koperasi / perusahaan">
                    <input className={inputClass} defaultValue="Koperasi Produsen Kopi Lestari Gayo" />
                  </Field>
                  <Field label="Jenis">
                    <select className={inputClass} defaultValue="Koperasi">
                      <option>Koperasi</option>
                      <option>Pokmas</option>
                      <option>Eksportir</option>
                    </select>
                  </Field>
                  <Field label="NIB">
                    <input className={inputClass} defaultValue="9120001234567" />
                  </Field>
                  <Field label="Email kontak ekspor">
                    <input className={inputClass} defaultValue="ekspor@lestarigayo.coop.id" />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Alamat lengkap" hint="Dipakai di kolom alamat pemasok pada ringkasan DDS.">
                      <textarea
                        className={inputClass}
                        rows={2}
                        defaultValue="Jl. Lintas Takengon–Bireuen Km 12, Bebesen, Aceh Tengah, Aceh 24552"
                      />
                    </Field>
                  </div>
                  <Field label="Nama admin">
                    <input className={inputClass} defaultValue="Teuku Ramli" />
                  </Field>
                  <Field label="Nomor HP admin">
                    <input className={inputClass} defaultValue="+62 812 6000 1122" />
                  </Field>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="text-[28px] tracking-tight">Komoditas dan asumsi hasil</h1>
                <p className="mt-1 text-sm text-muted">
                  Asumsi hasil per hektar dipakai untuk cek kewajaran volume lot terhadap kapasitas kebun asal.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { k: "Kopi", hs: "0901", hasil: 900, on: true },
                    { k: "Kakao", hs: "1801", hasil: 700, on: false },
                  ].map((c) => (
                    <label key={c.k} className="block rounded-2xl border border-line p-5 has-[:checked]:border-forest-700 has-[:checked]:bg-lime/15">
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{c.k}</span>
                        <input type="checkbox" defaultChecked={c.on} className="size-4 accent-forest-700" />
                      </div>
                      <p className="mt-1 text-xs text-muted">Kode HS {c.hs}</p>
                      <div className="mt-4">
                        <Field label="Hasil per hektar per tahun (kg)">
                          <input className={inputClass} defaultValue={c.hasil} />
                        </Field>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label="Perkiraan jumlah kebun pemasok">
                    <input className={inputClass} defaultValue="480" />
                  </Field>
                  <Field label="Musim panen utama">
                    <input className={inputClass} defaultValue="Sep–Des, Mar–Mei" />
                  </Field>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-[28px] tracking-tight">Undang tim</h1>
                <p className="mt-1 text-sm text-muted">
                  Setiap peran hanya melihat menu dan data sesuai perannya. Bisa dilewati dan ditambah nanti.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    { n: "Cut Nyak Aisyah", e: "aisyah@lestarigayo.coop.id", r: "Staf ekspor" },
                    { n: "Dinda Pratiwi", e: "dinda.p@kampus.example", r: "Enumerator" },
                    { n: "Ridwan Abdullah", e: "0812-6655-0091", r: "Pengepul" },
                  ].map((m) => (
                    <div key={m.n} className="grid gap-3 rounded-2xl border border-line p-3 sm:grid-cols-[1fr_1fr_160px]">
                      <input className={inputClass} defaultValue={m.n} />
                      <input className={inputClass} defaultValue={m.e} />
                      <select className={inputClass} defaultValue={m.r}>
                        <option>Staf ekspor</option>
                        <option>Enumerator</option>
                        <option>Pengepul</option>
                        <option>Admin koperasi</option>
                      </select>
                    </div>
                  ))}
                  <button className="inline-flex items-center gap-2 rounded-full border border-dashed border-ink/25 px-4 py-2 text-sm text-muted hover:text-ink">
                    <Plus className="size-4" /> Tambah anggota
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="py-6 text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime">
                  <Check className="size-7 text-forest-900" />
                </span>
                <h1 className="mt-6 text-[28px] tracking-tight">Koperasi terdaftar</h1>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                  Undangan dikirim ke 3 anggota tim. Langkah berikutnya: tambahkan petani dan catat persetujuan mereka
                  sebelum pemetaan dimulai.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <PillLink href="/koperasi">Buka dasbor</PillLink>
                  <PillLink href="/koperasi/petani/baru" variant="outline" arrow={false}>
                    Tambah petani pertama
                  </PillLink>
                </div>
              </div>
            )}

            {step < 3 && (
              <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
                <PillButton variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                  Kembali
                </PillButton>
                <PillButton arrow onClick={() => setStep((s) => s + 1)}>
                  {step === 2 ? "Selesaikan registrasi" : "Lanjut"}
                </PillButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
