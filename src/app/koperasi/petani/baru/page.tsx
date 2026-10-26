import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardHeader, Field, PageHeader, PillLink, inputClass } from "@/components/ui";
import { cakupanLabel, type CakupanPersetujuan } from "@/lib/data";

export const metadata: Metadata = { title: "Tambah petani" };

const cakupanDesc: Record<CakupanPersetujuan, string> = {
  pemetaan: "Mengukur titik atau batas kebun dan mengambil foto kebun.",
  "berbagi-pembeli": "Lokasi kebun dan nama petani masuk paket data untuk pembeli.",
  "berbagi-koperasi": "Koperasi lain boleh memakai peta dan hasil skrining kebun ini.",
  "transfer-luar-negeri": "Paket data dikirim ke pembeli di Uni Eropa (transfer lintas negara menurut UU PDP).",
  estdb: "Data disiapkan untuk pendaftaran e-STDB di sistem nasional.",
};

export default function TambahPetaniPage() {
  return (
    <>
      <Link href="/koperasi/petani" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Semua petani
      </Link>
      <PageHeader
        eyebrow="F2"
        title="Tambah petani"
        desc="Cukup data minimal. Persetujuan dicatat per cakupan, dengan bahasa yang dipahami petani."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Data petani" />
          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Nama lengkap">
                <input className={inputClass} placeholder="Sesuai KTP" />
              </Field>
            </div>
            <Field label="NIK" hint="Disimpan terenkripsi, tidak pernah dicatat on-chain.">
              <input className={inputClass} placeholder="16 digit" />
            </Field>
            <Field label="Nomor HP">
              <input className={inputClass} placeholder="08xx" />
            </Field>
            <Field label="Desa">
              <input className={inputClass} placeholder="Desa" />
            </Field>
            <Field label="Kecamatan">
              <input className={inputClass} placeholder="Kecamatan" />
            </Field>
            <Field label="Komoditas utama">
              <select className={inputClass}>
                <option>Kopi</option>
                <option>Kakao</option>
              </select>
            </Field>
            <Field label="Jumlah kebun">
              <input className={inputClass} type="number" defaultValue={1} min={1} />
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Persetujuan petani"
            desc="Naskah Bahasa Indonesia dibacakan atau diberikan sebelum pemetaan."
          />
          <ul className="divide-y divide-line">
            {(Object.keys(cakupanLabel) as CakupanPersetujuan[]).map((c, i) => (
              <li key={c}>
                <label className="flex cursor-pointer items-start gap-3 px-5 py-3.5">
                  <input type="checkbox" defaultChecked={i !== 2} className="mt-0.5 size-4 accent-forest-700" />
                  <span>
                    <span className="block text-sm font-medium">{cakupanLabel[c]}</span>
                    <span className="block text-xs text-muted">{cakupanDesc[c]}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 border-t border-line p-5 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-2xl border border-line p-3 text-sm has-[:checked]:border-forest-700 has-[:checked]:bg-lime/15">
              <input type="radio" name="bukti" defaultChecked className="accent-forest-700" />
              Tanda tangan di aplikasi
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-line p-3 text-sm has-[:checked]:border-forest-700 has-[:checked]:bg-lime/15">
              <input type="radio" name="bukti" className="accent-forest-700" />
              Rekaman suara (versi lisan)
            </label>
            <div className="grid h-28 place-items-center rounded-2xl border border-dashed border-ink/20 text-xs text-muted sm:col-span-2">
              Area tanda tangan petani
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <PillLink href="/koperasi/petani" variant="outline" arrow={false}>
          Batal
        </PillLink>
        <PillLink href="/koperasi/petani/PTN-0001">Simpan petani dan persetujuan</PillLink>
      </div>
    </>
  );
}
