import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import { KebunMap } from "@/components/kebun-map";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Card, CardHeader, KeyVal, PageHeader, SkriningBadge } from "@/components/ui";
import { formatTanggal, getKebun, getPetani, kebun, keberatan } from "@/lib/data";
import { Decision } from "./decision";

export function generateStaticParams() {
  return kebun.filter((k) => k.skriningTerakhir === "kuning" || k.skriningTerakhir === "merah").map((k) => ({ id: k.id }));
}

export default function Page({ params }: PageProps<"/qc/[id]">) {
  return (
    <Suspense>
      <Review params={params} />
    </Suspense>
  );
}

async function Review({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const k = getKebun(id);
  if (!k) notFound();
  const p = getPetani(k.petaniId)!;
  const s = k.skrining.at(-1);
  const kbr = keberatan.find((b) => b.kebunId === k.id);

  return (
    <>
      <Link href="/qc" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Antrean
      </Link>
      <PageHeader
        eyebrow={kbr ? `Keberatan ${kbr.id}` : `Tinjauan ${k.id}`}
        title={k.nama}
        desc={`${p.nama} · ${p.desa} · ${k.luasHa} ha · KP Lestari Gayo`}
        actions={<SkriningBadge status={k.skriningTerakhir} />}
      />

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="grid content-start gap-4">
          <Card className="overflow-hidden">
            <KebunMap geometri={k.geometri.at(-1)} status={k.skriningTerakhir} className="aspect-[16/9] rounded-none" />
            <div className="px-5 py-4">
              <p className="text-sm leading-relaxed">{s?.catatan}</p>
              <p className="mt-1 text-xs text-muted">
                {s && formatTanggal(s.tanggal)} · {s?.sumber}
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Citra historis seri waktu" desc="Bandingkan tutupan sebelum dan sesudah 31 Desember 2020." />
            <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
              {["Jul 2019", "Des 2020", "Agu 2022", "Sep 2026"].map((t) => (
                <div key={t}>
                  <PhotoPlaceholder label="Citra satelit" sub={t} className="aspect-square" />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Bukti lapangan" />
            <div className="grid grid-cols-3 gap-2 p-4">
              <PhotoPlaceholder label="Foto sisi utara" sub="geotag ±5 m" className="aspect-[4/3]" />
              <PhotoPlaceholder label="Tengah kebun" sub="geotag ±5 m" className="aspect-[4/3]" />
              <PhotoPlaceholder label="Batang tanaman" sub="umur" className="aspect-[4/3]" />
            </div>
            {kbr && (
              <div className="border-t border-line px-5 py-4 text-sm">
                <p className="font-medium">Keberatan petani</p>
                <p className="mt-1 text-muted">{kbr.alasan}</p>
              </div>
            )}
          </Card>
        </div>

        <div className="grid content-start gap-4">
          <Card>
            <CardHeader title="Konteks kebun" />
            <div className="divide-y divide-line px-5">
              <KeyVal k="Umur tanaman" v={`${k.umurTanamanTahun} tahun`} />
              <KeyVal k="Naungan" v={k.naungan} />
              <KeyVal k="Geometri" v={`${k.geometri.at(-1)?.jenis} v${k.geometri.at(-1)?.versi}`} />
              <KeyVal k="Akurasi" v={`±${k.geometri.at(-1)?.akurasiM} m`} />
              <KeyVal k="Enumerator" v={k.geometri.at(-1)?.enumerator} />
            </div>
          </Card>
          <Decision />
        </div>
      </div>
    </>
  );
}
