import type { Metadata } from "next";
import Link from "next/link";
import { Hexagon, MapPin } from "lucide-react";
import { Card, KebunStatusBadge, PageHeader, PillLink, SkriningBadge, TableWrap, Td, Th, cx } from "@/components/ui";
import { formatTanggal, getPetani, kebun } from "@/lib/data";

export const metadata: Metadata = { title: "Kebun" };

const filters = ["Semua", "Siap ekspor", "Kuning", "Merah", "Belum dipetakan", "Skrining ulang"];

export default function KebunPage() {
  return (
    <>
      <PageHeader
        eyebrow="F3 · F4 · F5"
        title="Kebun pemasok"
        desc="Kebun sampai 4 ha cukup satu titik; di atas 4 ha wajib poligon. Geometri tidak pernah ditimpa, versi baru dibuat."
        actions={
          <>
            <PillLink href="#" variant="outline" arrow={false}>
              Unduh GeoJSON
            </PillLink>
            <PillLink href="/lapangan/petakan">Tugaskan pemetaan</PillLink>
          </>
        }
      />

      <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
        {filters.map((f, i) => (
          <button
            key={f}
            className={cx(
              "whitespace-nowrap rounded-full px-4 py-1.5 text-sm",
              i === 0 ? "bg-forest-900 text-white" : "border border-line bg-paper text-muted hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Card>
        <TableWrap>
          <thead className="border-b border-line">
            <tr>
              <Th>Kebun</Th>
              <Th>Petani</Th>
              <Th>Geometri</Th>
              <Th className="text-right">Luas</Th>
              <Th>Skrining</Th>
              <Th>Status</Th>
              <Th>Skrining ulang</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {kebun.map((k) => {
              const g = k.geometri.at(-1);
              return (
                <tr key={k.id} className="hover:bg-cream/60">
                  <Td>
                    <Link href={`/koperasi/kebun/${k.id}`} className="block">
                      <span className="font-medium">{k.nama}</span>
                      <span className="block font-mono text-xs text-muted">{k.id}</span>
                    </Link>
                  </Td>
                  <Td className="text-muted">{getPetani(k.petaniId)?.nama}</Td>
                  <Td>
                    {g ? (
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        {g.jenis === "poligon" ? <Hexagon className="size-4" /> : <MapPin className="size-4" />}
                        {g.jenis} · v{g.versi}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </Td>
                  <Td className="text-right">{k.luasHa.toLocaleString("id-ID")} ha</Td>
                  <Td>
                    <SkriningBadge status={k.skriningTerakhir} />
                  </Td>
                  <Td>
                    <KebunStatusBadge status={k.status} />
                  </Td>
                  <Td className="text-muted">{formatTanggal(k.jatuhTempoSkrining)}</Td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      </Card>
    </>
  );
}
