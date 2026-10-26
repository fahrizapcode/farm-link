import type { Metadata } from "next";
import Link from "next/link";
import { GitCompareArrows } from "lucide-react";
import { KebunMap } from "@/components/kebun-map";
import { Badge, Card, CardHeader, PageHeader, PillButton, Stat, TableWrap, Td, Th } from "@/components/ui";
import { enumerator, getKebun } from "@/lib/data";

export const metadata: Metadata = { title: "Supervisor enumerator" };

const ukurUlang = [
  { kebun: "Kebun Ketol Hilir", alasan: "Poligon menyilang sendiri", enumerator: "Raka Mahendra" },
  { kebun: "Kebun Wih Porak Atas", alasan: "Tumpang tindih dengan KBN-0004", enumerator: "Raka Mahendra" },
  { kebun: "Kebun Jamat Tengah", alasan: "Akurasi ±12 m, di atas ambang", enumerator: "Wulan Sari" },
];

export default function SupervisorPage() {
  const total = enumerator.reduce((a, e) => a + e.kebun, 0);
  const konflik = getKebun("KBN-0008")!;

  return (
    <>
      <PageHeader
        eyebrow="Supervisor"
        title="Kinerja enumerator"
        desc="Daftar kebun per enumerator, tingkat penolakan, dan penugasan ukur ulang."
      />
      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat tone="dark" label="Kebun terpetakan" value={total} hint="Target pilot 400" />
        <Stat label="Lolos validasi pertama" value="93%" hint="Target ≥ 95%" />
        <Stat label="Rata-rata waktu per kebun" value="39 mnt" hint="Dari datang sampai tersimpan" />
        <Stat tone="lime" label="Biaya lapangan per kebun" value="Rp34rb" hint="Dibanding harga Rp40.000" />
      </div>

      <Card>
        <CardHeader title="Enumerator" />
        <TableWrap>
          <thead className="border-b border-line">
            <tr>
              <Th>Nama</Th>
              <Th className="text-right">Kebun</Th>
              <Th>Lolos pertama</Th>
              <Th className="text-right">Ditolak</Th>
              <Th className="text-right">Menit/kebun</Th>
              <Th>Sinkron terakhir</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {enumerator.map((e) => (
              <tr key={e.nama}>
                <Td>
                  <span className="font-medium">{e.nama}</span>
                  <span className="block text-xs text-muted">{e.kampus}</span>
                </Td>
                <Td className="text-right">{e.kebun}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink/[0.07]">
                      <div className={e.lolosPertama >= 0.95 ? "h-full bg-ok" : "h-full bg-warn"} style={{ width: `${e.lolosPertama * 100}%` }} />
                    </div>
                    <span className="text-xs">{Math.round(e.lolosPertama * 100)}%</span>
                  </div>
                </Td>
                <Td className="text-right">{e.ditolak}</Td>
                <Td className="text-right">{e.menitPerKebun}</Td>
                <Td className="text-muted">{e.terakhirSinkron}</Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Penugasan ukur ulang" />
          <ul className="divide-y divide-line">
            {ukurUlang.map((u) => (
              <li key={u.kebun} className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm">
                <span>
                  <span className="font-medium">{u.kebun}</span>
                  <span className="block text-xs text-muted">
                    {u.alasan} · {u.enumerator}
                  </span>
                </span>
                <select className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs">
                  <option>{u.enumerator}</option>
                  {enumerator
                    .filter((e) => e.nama !== u.enumerator)
                    .map((e) => (
                      <option key={e.nama}>{e.nama}</option>
                    ))}
                </select>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader
            title="Konflik sinkron"
            desc="Dua enumerator mengubah kebun yang sama. Tidak ada yang ditimpa."
            action={<GitCompareArrows className="size-4 text-muted" />}
          />
          <div className="p-4">
            <KebunMap geometri={konflik.geometri[1]} compareWith={konflik.geometri[0]} status={null} showForest={false} className="aspect-[16/9]" />
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-2xl border border-line p-3">
                <Badge>Versi 1</Badge>
                <p className="mt-2 text-xs text-muted">Dinda Pratiwi · ±8,8 m</p>
              </div>
              <div className="rounded-2xl border border-forest-700 bg-lime/15 p-3">
                <Badge tone="dark">Versi 2</Badge>
                <p className="mt-2 text-xs text-muted">Raka Mahendra · ±5,2 m</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <Link href={`/koperasi/kebun/${konflik.id}`} className="rounded-full border border-line px-4 py-2 text-sm">
                Lihat kebun
              </Link>
              <PillButton>Pakai versi 2</PillButton>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
