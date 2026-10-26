import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Boxes, ClipboardCheck, FileWarning, Link2, RefreshCw, Scale } from "lucide-react";
import {
  Badge,
  Card,
  CardHeader,
  KebunStatusBadge,
  PageHeader,
  PillLink,
  LotStatus,
  Stat,
} from "@/components/ui";
import { aktivitas, formatKg, getPetani, kebun, koperasi, legalitasLengkap, lot, petani } from "@/lib/data";

export const metadata: Metadata = { title: "Dasbor kesiapan" };

const icons = { sinkron: RefreshCw, qc: ClipboardCheck, setoran: Scale, chain: Link2, lot: Boxes };

export default function DasborPage() {
  const total = kebun.length;
  const count = (s: string) => kebun.filter((k) => k.status === s).length;
  const siap = count("siap-ekspor");
  const kuning = count("kuning");
  const merah = kebun.filter((k) => k.skriningTerakhir === "merah").length;
  const belum = count("belum-dipetakan");
  const hijauKurang = count("hijau");
  const pctSiap = Math.round((siap / total) * 100);
  const docKurang = petani.filter((p) => !legalitasLengkap(p));
  const jatuhTempo = kebun.filter((k) => k.jatuhTempoSkrining !== "-" && k.jatuhTempoSkrining < "2026-12-31");

  const segments = [
    { label: "Siap ekspor", n: siap, cls: "bg-lime" },
    { label: "Hijau, legalitas kurang", n: hijauKurang, cls: "bg-ok" },
    { label: "Kuning, ditinjau", n: kuning, cls: "bg-warn" },
    { label: "Merah / dipisahkan", n: merah, cls: "bg-bad" },
    { label: "Belum dipetakan", n: belum, cls: "bg-ink/15" },
  ];

  return (
    <>
      <PageHeader
        eyebrow={koperasi.singkat}
        title="Dasbor kesiapan ekspor"
        desc="Ringkasan kebun pemasok, dokumen yang kurang, dan lot yang siap dibuatkan paket data."
        actions={
          <>
            <PillLink href="/koperasi/lot/baru" variant="outline" arrow={false}>
              Bentuk lot
            </PillLink>
            <PillLink href="/koperasi/petani/baru">Tambah petani</PillLink>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat tone="dark" label="Kebun siap ekspor" value={`${pctSiap}%`} hint={`${siap} dari ${total} kebun · hijau dan legalitas lengkap`} />
        <Stat label="Kebun terpetakan" value={total - belum} hint={`${belum} kebun belum dipetakan`} />
        <Stat label="Menunggu tinjauan QC" value={kuning} hint="Batas putusan 10 hari kerja" />
        <Stat tone="lime" label="Tenggat EUDR operator besar" value="65 hari" hint="30 Desember 2026" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader title="Status kebun" desc="Siklus: terpetakan → tervalidasi → skrining → siap ekspor atau dipisahkan." />
          <div className="p-5">
            <div className="flex h-4 overflow-hidden rounded-full bg-ink/[0.05]">
              {segments.map((s) =>
                s.n ? <div key={s.label} className={s.cls} style={{ width: `${(s.n / total) * 100}%` }} title={s.label} /> : null,
              )}
            </div>
            <div className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {segments.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted">
                    <span className={`size-2.5 rounded-full ${s.cls}`} />
                    {s.label}
                  </span>
                  <span className="font-medium">{s.n}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-line">
            <p className="px-5 pt-4 text-xs font-medium uppercase tracking-wide text-muted">Kebun bermasalah</p>
            <ul className="divide-y divide-line">
              {kebun
                .filter((k) => ["kuning", "dipisahkan", "merah", "hijau"].includes(k.status))
                .map((k) => (
                  <li key={k.id}>
                    <Link href={`/koperasi/kebun/${k.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-cream/60">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{k.nama}</p>
                        <p className="truncate text-xs text-muted">
                          {k.id} · {getPetani(k.petaniId)?.nama} · {k.luasHa} ha
                        </p>
                      </div>
                      <KebunStatusBadge status={k.status} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader
              title="Dokumen legalitas kurang"
              desc={`${docKurang.length} petani belum lengkap`}
              action={
                <Link href="/koperasi/petani" className="text-xs text-forest-700 hover:underline">
                  Lihat semua
                </Link>
              }
            />
            <ul className="divide-y divide-line">
              {docKurang.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link href={`/koperasi/petani/${p.id}`} className="flex items-center justify-between gap-3 px-5 py-3 text-sm hover:bg-cream/60">
                    <span className="flex items-center gap-2.5">
                      <FileWarning className="size-4 text-warn" />
                      {p.nama}
                    </span>
                    <span className="text-xs text-muted">
                      {[
                        p.legalitas.estdb !== "ada" && (p.legalitas.estdb === "kedaluwarsa" ? "e-STDB kedaluwarsa" : "e-STDB"),
                        p.legalitas.suratLahan !== "ada" && "Surat lahan",
                        p.legalitas.tenagaKerja !== "ada" && "Pernyataan TK",
                        p.legalitas.kawasanHutan === "di-dalam" && "Kawasan hutan",
                      ]
                        .filter(Boolean)
                        .join(" · ") || "Cek kawasan"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Jatuh tempo skrining ulang" desc="Setiap 12 bulan atau saat geometri berubah" />
            <ul className="divide-y divide-line">
              {jatuhTempo.map((k) => (
                <li key={k.id} className="flex items-center justify-between px-5 py-3 text-sm">
                  <span className="flex items-center gap-2.5">
                    <AlertTriangle className="size-4 text-warn" />
                    {k.nama}
                  </span>
                  <Badge tone="warn">{k.jatuhTempoSkrining}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader
            title="Lot terbaru"
            action={
              <Link href="/koperasi/lot" className="text-xs text-forest-700 hover:underline">
                Semua lot
              </Link>
            }
          />
          <ul className="divide-y divide-line">
            {lot.map((l) => (
              <li key={l.id}>
                <Link href={`/koperasi/lot/${l.id}`} className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-cream/60">
                  <div>
                    <p className="text-sm font-medium">{l.kode}</p>
                    <p className="text-xs text-muted">
                      {l.deskripsi} · {formatKg(l.beratBersihKg)}
                    </p>
                  </div>
                  <span className="flex items-center gap-3">
                    <LotStatus status={l.status} />
                    <ArrowRight className="size-4 text-muted" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Aktivitas" />
          <ul className="space-y-4 p-5">
            {aktivitas.map((a) => {
              const Icon = icons[a.jenis as keyof typeof icons];
              return (
                <li key={a.teks} className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream text-forest-700">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm">{a.teks}</p>
                    <p className="text-xs text-muted">{a.waktu}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </>
  );
}

