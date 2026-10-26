import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, CardHeader, PageHeader, SkriningBadge, Stat, TableWrap, Td, Th } from "@/components/ui";
import { formatTanggal, getKebun, getPetani, kebun, keberatan } from "@/lib/data";

export const metadata: Metadata = { title: "Antrean tinjauan QC" };

// Hari kerja tersisa dari 10, dihitung dari tanggal skrining terakhir (data contoh)
const sisaHari: Record<string, number> = { "KBN-0003": 3, "KBN-0008": 8 };

export default function QcPage() {
  const kuning = kebun.filter((k) => k.status === "kuning");
  return (
    <>
      <PageHeader
        eyebrow="F5a"
        title="Antrean tinjauan"
        desc="Kebun kuning dan keberatan petani. Putusan menjadi hijau atau merah dalam 10 hari kerja, dengan alasan tertulis."
      />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Stat tone="dark" label="Menunggu putusan" value={kuning.length + keberatan.length} hint="Kuning dan keberatan" />
        <Stat label="Diputus tepat waktu" value="94%" hint="Target pilot ≥ 90%" />
        <Stat tone="lime" label="Positif palsu agroforestri" value="62%" hint="Kuning yang akhirnya hijau · Fase 0" />
      </div>

      <Card>
        <CardHeader title="Kebun kuning" />
        <TableWrap>
          <thead className="border-b border-line">
            <tr>
              <Th>Kebun</Th>
              <Th>Koperasi</Th>
              <Th>Temuan</Th>
              <Th>Skrining</Th>
              <Th>Batas putusan</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {kuning.map((k) => (
              <tr key={k.id} className="hover:bg-cream/60">
                <Td>
                  <Link href={`/qc/${k.id}`} className="block">
                    <span className="font-medium">{k.nama}</span>
                    <span className="block text-xs text-muted">
                      {k.id} · {k.luasHa} ha · {getPetani(k.petaniId)?.nama}
                    </span>
                  </Link>
                </Td>
                <Td className="text-muted">KP Lestari Gayo</Td>
                <Td className="max-w-sm text-muted">
                  <span className="line-clamp-2">{k.skrining.at(-1)?.catatan}</span>
                </Td>
                <Td>
                  <SkriningBadge status="kuning" />
                </Td>
                <Td>
                  <Badge tone={sisaHari[k.id] <= 3 ? "bad" : "warn"}>{sisaHari[k.id]} hari kerja lagi</Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>

      <Card className="mt-4">
        <CardHeader title="Keberatan petani" desc="Masuk antrean yang sama dengan kebun kuning." />
        <ul className="divide-y divide-line">
          {keberatan.map((b) => {
            const k = getKebun(b.kebunId)!;
            return (
              <li key={b.id}>
                <Link href={`/qc/${k.id}`} className="flex flex-wrap items-start justify-between gap-3 px-5 py-4 hover:bg-cream/60">
                  <div className="max-w-2xl">
                    <p className="text-sm font-medium">
                      {k.nama} · {getPetani(b.petaniId)?.nama}
                    </p>
                    <p className="mt-1 text-sm text-muted">{b.alasan}</p>
                  </div>
                  <span className="flex items-center gap-2">
                    <SkriningBadge status="merah" />
                    <Badge>Diajukan {formatTanggal(b.diajukan)}</Badge>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
}
