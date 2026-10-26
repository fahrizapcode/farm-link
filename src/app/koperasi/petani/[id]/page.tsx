import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft, FileText, Mic, PenLine, QrCode, Upload } from "lucide-react";
import {
  Badge,
  Card,
  CardHeader,
  KebunStatusBadge,
  KeyVal,
  PageHeader,
  PillLink,
  SkriningBadge,
} from "@/components/ui";
import {
  cakupanLabel,
  formatKg,
  formatTanggal,
  getPetani,
  kebunPetani,
  petani,
  setoran,
  type CakupanPersetujuan,
} from "@/lib/data";

export function generateStaticParams() {
  return petani.map((p) => ({ id: p.id }));
}

export default function Page({ params }: PageProps<"/koperasi/petani/[id]">) {
  return (
    <Suspense>
      <PetaniDetail params={params} />
    </Suspense>
  );
}

const docLabel = { ada: "Ada", "tidak-ada": "Belum ada", kedaluwarsa: "Kedaluwarsa" } as const;
const docTone = { ada: "ok", "tidak-ada": "warn", kedaluwarsa: "bad" } as const;
const kawasanLabel = {
  "di-luar": ["Di luar kawasan hutan", "ok"],
  "di-tepi": ["Di tepi kawasan hutan", "warn"],
  "di-dalam": ["Di dalam kawasan hutan", "bad"],
  "belum-dicek": ["Belum dicek", "neutral"],
} as const;

async function PetaniDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getPetani(id);
  if (!p) notFound();
  const kb = kebunPetani(p.id);
  const st = setoran.filter((s) => s.petaniId === p.id);
  const docs = [
    { k: "e-STDB", v: p.legalitas.estdb, exp: p.legalitas.estdb === "kedaluwarsa" ? "Kedaluwarsa 2 Okt 2026" : "Berlaku s.d. 2029" },
    { k: "Surat lahan (SKT/SPORADIK)", v: p.legalitas.suratLahan, exp: "Terbit 2019" },
    { k: "Pernyataan tenaga kerja", v: p.legalitas.tenagaKerja, exp: "Termasuk pertanyaan pekerja anak" },
  ];

  return (
    <>
      <Link href="/koperasi/petani" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Semua petani
      </Link>
      <PageHeader
        eyebrow={p.id}
        title={p.nama}
        desc={`${p.desa}, ${p.kecamatan} · Aceh Tengah`}
        actions={
          <>
            <PillLink href="#" variant="outline" arrow={false}>
              <QrCode className="size-4" /> Cetak kartu QR
            </PillLink>
            <PillLink href="/lapangan/petakan">Tugaskan pemetaan</PillLink>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1.3fr]">
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader title="Profil" />
            <div className="divide-y divide-line px-5">
              <KeyVal k="NIK" v={<span className="font-mono text-xs">{p.nikMasked}</span>} />
              <KeyVal k="Nomor HP" v={p.hp} />
              <KeyVal k="Koperasi lain" v="Tidak ada" />
              <KeyVal k="Penyimpanan" v="Terenkripsi · server Indonesia" />
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Persetujuan per cakupan"
              desc={
                p.tanggalPersetujuan === "-"
                  ? "Belum ada persetujuan. Pemetaan belum bisa dimulai."
                  : `Dicatat ${formatTanggal(p.tanggalPersetujuan)} · ${p.buktiPersetujuan}`
              }
              action={
                p.buktiPersetujuan === "Rekaman suara" ? (
                  <Mic className="size-4 text-muted" />
                ) : (
                  <PenLine className="size-4 text-muted" />
                )
              }
            />
            <ul className="divide-y divide-line">
              {(Object.keys(cakupanLabel) as CakupanPersetujuan[]).map((c) => {
                const v = p.persetujuan[c];
                return (
                  <li key={c} className="flex items-center justify-between px-5 py-3 text-sm">
                    {cakupanLabel[c]}
                    {v === "aktif" ? (
                      <Badge tone="ok">Aktif</Badge>
                    ) : v === "ditarik" ? (
                      <Badge tone="bad">Ditarik 18 Okt 2026</Badge>
                    ) : (
                      <Badge>Belum</Badge>
                    )}
                  </li>
                );
              })}
            </ul>
            {Object.values(p.persetujuan).includes("ditarik") && (
              <p className="border-t border-line px-5 py-3 text-xs leading-relaxed text-muted">
                Data baru tidak lagi dibagikan untuk cakupan yang ditarik dan kebun keluar dari lot berikutnya. Paket
                yang sudah terkirim tetap diarsipkan sampai masa 5 tahunnya habis.
              </p>
            )}
          </Card>
        </div>

        <div className="grid content-start gap-4">
          <Card>
            <CardHeader title="Kebun" desc="Satu plot, satu geometri. Petani dengan dua kebun dipetakan dua kali." />
            <ul className="divide-y divide-line">
              {kb.map((k) => (
                <li key={k.id}>
                  <Link href={`/koperasi/kebun/${k.id}`} className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-cream/60">
                    <div>
                      <p className="text-sm font-medium">{k.nama}</p>
                      <p className="text-xs text-muted">
                        {k.id} · {k.komoditas} · {k.luasHa} ha · {k.geometri.at(-1)?.jenis ?? "belum ada geometri"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SkriningBadge status={k.skriningTerakhir} />
                      <KebunStatusBadge status={k.status} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader
              title="Dokumen legalitas"
              action={
                <button className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs hover:border-ink/40">
                  <Upload className="size-3.5" /> Unggah
                </button>
              }
            />
            <ul className="divide-y divide-line">
              {docs.map((d) => (
                <li key={d.k} className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm">
                  <span className="flex items-center gap-3">
                    <FileText className="size-4 text-muted" />
                    <span>
                      {d.k}
                      <span className="block text-xs text-muted">{d.v === "tidak-ada" ? "Belum diunggah" : d.exp}</span>
                    </span>
                  </span>
                  <Badge tone={docTone[d.v]}>{docLabel[d.v]}</Badge>
                </li>
              ))}
              <li className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm">
                <span className="flex items-center gap-3">
                  <FileText className="size-4 text-muted" />
                  <span>
                    Overlay kawasan hutan negara
                    <span className="block text-xs text-muted">Otomatis dari geometri kebun</span>
                  </span>
                </span>
                <Badge tone={kawasanLabel[p.legalitas.kawasanHutan][1]}>{kawasanLabel[p.legalitas.kawasanHutan][0]}</Badge>
              </li>
            </ul>
          </Card>

          <Card>
            <CardHeader title="Setoran terakhir" />
            {st.length === 0 ? (
              <p className="px-5 py-6 text-sm text-muted">Belum ada setoran.</p>
            ) : (
              <ul className="divide-y divide-line">
                {st.map((s) => (
                  <li key={s.id} className="flex items-center justify-between px-5 py-3 text-sm">
                    <span>
                      {formatKg(s.beratKg)}
                      <span className="block text-xs text-muted">
                        {s.id} · {formatTanggal(s.tanggalSetor)} · {s.penerima}
                      </span>
                    </span>
                    {s.lotId ? <Badge tone="info">{s.lotId}</Badge> : <Badge>Belum masuk lot</Badge>}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
