import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft, History } from "lucide-react";
import { KebunMap } from "@/components/kebun-map";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import {
  Badge,
  Card,
  CardHeader,
  KebunStatusBadge,
  KeyVal,
  Mono,
  PageHeader,
  PillLink,
  SkriningBadge,
} from "@/components/ui";
import { formatTanggal, getKebun, getPetani, kebun, setoran } from "@/lib/data";

export function generateStaticParams() {
  return kebun.map((k) => ({ id: k.id }));
}

export default function Page({ params }: PageProps<"/koperasi/kebun/[id]">) {
  return (
    <Suspense>
      <KebunDetail params={params} />
    </Suspense>
  );
}

async function KebunDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const k = getKebun(id);
  if (!k) notFound();
  const p = getPetani(k.petaniId)!;
  const g = k.geometri.at(-1);
  const prev = k.geometri.length > 1 ? k.geometri.at(-2) : undefined;
  const st = setoran.filter((s) => s.kebunId === k.id);

  return (
    <>
      <Link href="/koperasi/kebun" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Semua kebun
      </Link>
      <PageHeader
        eyebrow={k.id}
        title={k.nama}
        desc={`${p.nama} · ${p.desa}, ${p.kecamatan} · ${k.komoditas}`}
        actions={
          <>
            <KebunStatusBadge status={k.status} />
            {k.status === "kuning" && <PillLink href={`/qc/${k.id}`}>Buka di antrean QC</PillLink>}
            {k.status === "belum-dipetakan" && <PillLink href="/lapangan/petakan">Tugaskan pemetaan</PillLink>}
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden">
          <KebunMap geometri={g} status={k.skriningTerakhir} compareWith={prev} className="aspect-[16/10] rounded-none" />
          <div className="grid gap-x-8 px-5 py-2 sm:grid-cols-2">
            <div className="divide-y divide-line">
              <KeyVal k="Luas" v={`${k.luasHa} ha`} />
              <KeyVal k="Jenis geometri" v={g ? `${g.jenis} · versi ${g.versi}` : "—"} />
              <KeyVal k="Akurasi GPS" v={g ? `±${g.akurasiM} m` : "—"} />
            </div>
            <div className="divide-y divide-line">
              <KeyVal k="ID publik" v={<Mono>{k.idPublik}</Mono>} />
              <KeyVal k="Umur tanaman" v={`${k.umurTanamanTahun} tahun`} />
              <KeyVal k="Naungan" v={k.naungan} />
            </div>
          </div>
          {prev && (
            <p className="border-t border-line px-5 py-3 text-xs text-muted">
              Garis putus-putus: geometri versi {prev.versi}. Versi lama tidak dihapus; setoran menunjuk ke versi yang
              berlaku saat panen.
            </p>
          )}
        </Card>

        <div className="grid content-start gap-4">
          <Card>
            <CardHeader title="Riwayat skrining" desc="Diskrining ulang minimal setahun sekali dan setiap geometri berubah." />
            {k.skrining.length === 0 ? (
              <p className="px-5 py-6 text-sm text-muted">Belum ada skrining. Kebun harus dipetakan dan tervalidasi dulu.</p>
            ) : (
              <ol className="space-y-5 p-5">
                {[...k.skrining].reverse().map((s) => (
                  <li key={s.tanggal} className="relative border-l border-line pl-5">
                    <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-forest-700" />
                    <div className="flex flex-wrap items-center gap-2">
                      <SkriningBadge status={s.status} />
                      <span className="text-xs text-muted">
                        {formatTanggal(s.tanggal)} · geometri v{s.versiGeometri}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{s.catatan}</p>
                    <p className="mt-1 text-xs text-muted">Sumber: {s.sumber}</p>
                  </li>
                ))}
              </ol>
            )}
            <p className="border-t border-line px-5 py-3 text-xs leading-relaxed text-muted">
              Hasil skrining adalah indikasi, bukan putusan hukum. Peta JRC tidak mengikat secara hukum; sumber dan
              versinya dicatat di paket.
            </p>
          </Card>

          <Card>
            <CardHeader title="Foto lapangan bergeotag" />
            <div className="grid grid-cols-3 gap-2 p-4">
              <PhotoPlaceholder label="Utara" className="aspect-square" />
              <PhotoPlaceholder label="Tengah" className="aspect-square" />
              <PhotoPlaceholder label="Tanaman" className="aspect-square" />
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Versi geometri" />
          <ul className="divide-y divide-line">
            {k.geometri.length === 0 && <li className="px-5 py-6 text-sm text-muted">Belum ada geometri.</li>}
            {[...k.geometri].reverse().map((v) => (
              <li key={v.versi} className="flex items-start justify-between gap-3 px-5 py-3.5 text-sm">
                <span className="flex gap-3">
                  <History className="mt-0.5 size-4 text-muted" />
                  <span>
                    Versi {v.versi} · {v.jenis} · ±{v.akurasiM} m
                    <span className="block text-xs text-muted">
                      {v.enumerator} · {formatTanggal(v.tanggalUkur)}
                      {v.catatan ? ` · ${v.catatan}` : ""}
                    </span>
                  </span>
                </span>
                {v.versi === g?.versi ? <Badge tone="dark">Berlaku</Badge> : <Badge>Arsip</Badge>}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Setoran dari kebun ini" />
          {st.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted">
              {k.status === "dipisahkan"
                ? "Setoran tidak bisa ditautkan ke kebun merah. Pasokan dipisahkan dari lot Eropa."
                : "Belum ada setoran."}
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {st.map((s) => (
                <li key={s.id} className="flex items-center justify-between px-5 py-3 text-sm">
                  <span>
                    {s.beratKg.toLocaleString("id-ID")} kg
                    <span className="block text-xs text-muted">
                      {s.id} · {formatTanggal(s.tanggalSetor)} · panen {s.periodePanen}
                    </span>
                  </span>
                  <Mono className="text-muted">{s.hash}</Mono>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
