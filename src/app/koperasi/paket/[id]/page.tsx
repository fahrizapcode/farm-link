import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, ChevronLeft, Download, FileJson, FileSpreadsheet, FileText, QrCode, XCircle } from "lucide-react";
import {
  Badge,
  Card,
  CardHeader,
  Field,
  KeyVal,
  Mono,
  PageHeader,
  PillButton,
  PillLink,
  inputClass,
} from "@/components/ui";
import { formatKg, formatTanggal, getKebun, getLot, getPaket, koperasi, paket, setoranLot } from "@/lib/data";

export function generateStaticParams() {
  return paket.map((p) => ({ id: p.id }));
}

export default function Page({ params }: PageProps<"/koperasi/paket/[id]">) {
  return (
    <Suspense>
      <PaketDetail params={params} />
    </Suspense>
  );
}

const komponen = [
  { nama: "Ringkasan DDS", format: "PDF · JSON siap salin ke TRACES", icon: FileText },
  { nama: "Geolokasi kebun asal", format: "GeoJSON · 6 desimal WGS-84", icon: FileJson },
  { nama: "Hasil skrining", format: "PDF · CSV", icon: FileSpreadsheet },
  { nama: "Bukti legalitas", format: "Berkas terlampir · CSV status", icon: FileText },
  { nama: "Lembar risiko", format: "PDF", icon: FileText },
  { nama: "Rantai setoran", format: "CSV", icon: FileSpreadsheet },
  { nama: "Bukti integritas", format: "Hash · tautan verifikasi · QR", icon: QrCode },
];

async function PaketDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getPaket(id);
  if (!p) notFound();
  const l = getLot(p.lotId)!;
  const st = setoranLot(l);
  const kebunIds = [...new Set(st.map((s) => s.kebunId))];
  const draf = p.status === "draf";

  const cek = [
    { t: "Semua kebun asal berstatus hijau", ok: true },
    { t: "Legalitas lengkap untuk semua petani", ok: !draf },
    { t: "GeoJSON lolos validasi spesifikasi TRACES", ok: true },
    { t: "Kolom wajib ringkasan DDS terisi", ok: true },
    { t: "Cek kewajaran volume tanpa catatan tertunda", ok: !draf },
    { t: "Persetujuan transfer ke luar negeri aktif", ok: true },
  ];

  return (
    <>
      <Link href="/koperasi/paket" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Semua paket
      </Link>
      <PageHeader
        eyebrow={p.id}
        title={`Paket data ${l.kode}`}
        desc={`${p.jenis} · untuk ${p.pembeli}, ${p.negaraPembeli}`}
        actions={
          draf ? (
            <PillButton arrow disabled>
              Kirim ke pembeli
            </PillButton>
          ) : (
            <>
              <PillLink href={`/verifikasi/${p.hash}`} variant="outline" arrow={false}>
                Halaman verifikasi
              </PillLink>
              <PillLink href="#">
                <Download className="size-4" /> Unduh paket
              </PillLink>
            </>
          )
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader title="Ringkasan DDS" desc="Dalam Bahasa Inggris untuk pembeli. Pembeli tetap yang mengisi DDS di TRACES." />
          <div className="grid gap-x-8 px-5 py-2 sm:grid-cols-2">
            <div className="divide-y divide-line">
              <KeyVal k="Product" v={l.deskripsi} />
              <KeyVal k="HS code" v={<Mono>{l.kodeHS}</Mono>} />
              <KeyVal k="Net mass" v={formatKg(l.beratBersihKg)} />
              <KeyVal k="Country of production" v="Indonesia" />
              <KeyVal k="Production period" v="Sep–Oct 2026" />
            </div>
            <div className="divide-y divide-line">
              <KeyVal k="Plots" v={`${kebunIds.length} (geolocated)`} />
              <KeyVal k="Supplier" v={koperasi.nama} />
              <KeyVal k="Supplier email" v={koperasi.email} />
              <KeyVal k="Buyer" v={p.pembeli} />
              <KeyVal k="Buyer email" v={p.emailPembeli} />
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Validasi sebelum kirim" desc="Agar DDS pembeli tidak ditolak karena data hulu." />
          <ul className="space-y-3 p-5">
            {cek.map((c) => (
              <li key={c.t} className="flex items-start gap-2.5 text-sm">
                {c.ok ? <CheckCircle2 className="mt-0.5 size-4 text-ok" /> : <XCircle className="mt-0.5 size-4 text-bad" />}
                <span className={c.ok ? "" : "text-bad"}>{c.t}</span>
              </li>
            ))}
          </ul>
          {draf && (
            <div className="border-t border-line px-5 py-4 text-sm">
              <p className="text-muted">Selesaikan dulu:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <PillLink href="/koperasi/petani/PTN-0004" variant="outline" arrow={false}>
                  Perbarui e-STDB Nurlela
                </PillLink>
                <PillLink href={`/koperasi/lot/${l.id}`} variant="outline" arrow={false}>
                  Tambah catatan volume
                </PillLink>
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader title="Isi paket" />
          <ul className="divide-y divide-line">
            {komponen.map((k) => (
              <li key={k.nama} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <span className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-cream text-forest-700">
                    <k.icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{k.nama}</span>
                    <span className="block text-xs text-muted">{k.format}</span>
                  </span>
                </span>
                <button className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-ink/40" disabled={draf}>
                  {draf ? "Pratinjau" : "Unduh"}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-5 py-3 text-xs text-muted">
            Kebun asal:{" "}
            {kebunIds.map((k, i) => (
              <span key={k}>
                {i > 0 && ", "}
                <Link href={`/koperasi/kebun/${k}`} className="hover:underline">
                  {getKebun(k)?.nama}
                </Link>
              </span>
            ))}
          </div>
        </Card>

        <div className="grid content-start gap-4">
          <Card dark className="p-5">
            <p className="text-sm text-white/60">Bukti integritas</p>
            <div className="mt-4 flex gap-4">
              <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-white text-forest-900">
                <QrCode className="size-12" strokeWidth={1.2} />
              </div>
              <div className="min-w-0 text-sm">
                <p className="text-white/60">SHA-256 paket</p>
                <p className="mt-1 break-all font-mono text-[11px] leading-relaxed text-lime">{p.hash}</p>
              </div>
            </div>
            <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-white/60">Transaksi Stellar</span>
                <span className="font-mono text-xs">{p.stellarTx ?? "—"}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-white/60">Merkle root lot</span>
                <span className="font-mono text-xs">{l.merkleRoot ?? "—"}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-white/60">Dikirim</span>
                <span>{p.tanggalKirim ? formatTanggal(p.tanggalKirim) : "Belum"}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <Field label="Nomor referensi DDS dari pembeli" hint="Diisi bila pembeli memberikannya setelah DDS terkirim di TRACES.">
              <input className={inputClass} defaultValue={p.nomorDDS} placeholder="Contoh: 25BE1A9X7Q0042" />
            </Field>
            <div className="mt-3 flex items-center justify-between">
              {p.status === "diterima" ? <Badge tone="lime">Diterima tanpa revisi</Badge> : <Badge>Menunggu pembeli</Badge>}
              <PillButton variant="outline">Simpan</PillButton>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
