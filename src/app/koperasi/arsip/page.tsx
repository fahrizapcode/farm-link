import type { Metadata } from "next";
import { Archive, FileJson, FileSpreadsheet, FileText, Folder } from "lucide-react";
import { Card, CardHeader, PageHeader, PillButton, Stat } from "@/components/ui";

export const metadata: Metadata = { title: "Ekspor arsip" };

const isi = [
  { icon: FileSpreadsheet, t: "Petani dan persetujuan", f: "CSV", n: "8 baris" },
  { icon: FileJson, t: "Kebun dan semua versi geometri", f: "GeoJSON", n: "10 kebun · 11 versi" },
  { icon: FileSpreadsheet, t: "Riwayat skrining dan putusan QC", f: "CSV", n: "11 baris" },
  { icon: Folder, t: "Dokumen legalitas asli", f: "PDF / JPG", n: "19 berkas" },
  { icon: FileSpreadsheet, t: "Setoran dan lot", f: "CSV", n: "11 setoran · 3 lot" },
  { icon: FileText, t: "Paket data yang pernah dikirim", f: "PDF · JSON · GeoJSON", n: "1 paket" },
];

export default function ArsipPage() {
  return (
    <>
      <PageHeader
        eyebrow="F9a"
        title="Ekspor arsip koperasi"
        desc="Unduh seluruh data koperasi kapan saja, dalam format yang bisa dibuka tanpa Farmlink."
      />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Stat label="Masa simpan bukti" value="5 tahun" hint="Sejak paket dikirim" />
        <Stat label="Ekspor terakhir" value="1 Okt" hint="Oleh Teuku Ramli" />
        <Stat tone="lime" label="Ukuran perkiraan" value="48 MB" hint="Termasuk foto lapangan" />
      </div>
      <Card>
        <CardHeader
          title="Isi arsip"
          action={
            <PillButton arrow>
              <Archive className="size-4" /> Buat arsip .zip
            </PillButton>
          }
        />
        <ul className="divide-y divide-line">
          {isi.map((x) => (
            <li key={x.t} className="flex items-center justify-between gap-3 px-5 py-4">
              <span className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-cream text-forest-700">
                  <x.icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{x.t}</span>
                  <span className="block text-xs text-muted">{x.n}</span>
                </span>
              </span>
              <span className="font-mono text-xs text-muted">{x.f}</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
