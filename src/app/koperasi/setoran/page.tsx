import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, Mono, PageHeader, PillLink, Stat, TableWrap, Td, Th } from "@/components/ui";
import { formatKg, formatTanggal, getKebun, getPetani, setoran } from "@/lib/data";

export const metadata: Metadata = { title: "Setoran" };

export default function SetoranPage() {
  const total = setoran.reduce((a, s) => a + s.beratKg, 0);
  const belumLot = setoran.filter((s) => !s.lotId);

  return (
    <>
      <PageHeader
        eyebrow="F7"
        title="Setoran"
        desc="Setiap setoran tercatat per kebun asal dan periode panen. Setoran tidak bisa ditautkan ke kebun merah atau yang belum tervalidasi."
        actions={
          <>
            <PillLink href="/pengepul/setoran" variant="outline" arrow={false}>
              Catat setoran
            </PillLink>
            <PillLink href="/koperasi/lot/baru">Bentuk lot</PillLink>
          </>
        }
      />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Stat label="Total setoran musim ini" value={formatKg(total)} hint={`${setoran.length} setoran`} />
        <Stat label="Belum masuk lot" value={formatKg(belumLot.reduce((a, s) => a + s.beratKg, 0))} hint={`${belumLot.length} setoran`} />
        <Stat tone="dark" label="Hash tercatat on-chain" value={`${setoran.length}/${setoran.length}`} hint="Batch per jam ke Stellar" />
      </div>
      <Card>
        <TableWrap>
          <thead className="border-b border-line">
            <tr>
              <Th>Setoran</Th>
              <Th>Petani · kebun</Th>
              <Th className="text-right">Berat</Th>
              <Th>Periode panen</Th>
              <Th>Penerima</Th>
              <Th>Lot</Th>
              <Th>Hash</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {setoran.map((s) => (
              <tr key={s.id} className="hover:bg-cream/60">
                <Td>
                  <span className="font-mono text-xs">{s.id}</span>
                  <span className="block text-xs text-muted">{formatTanggal(s.tanggalSetor)}</span>
                </Td>
                <Td>
                  <Link href={`/koperasi/kebun/${s.kebunId}`} className="hover:underline">
                    {getPetani(s.petaniId)?.nama}
                  </Link>
                  <span className="block text-xs text-muted">{getKebun(s.kebunId)?.nama}</span>
                </Td>
                <Td className="text-right">{formatKg(s.beratKg)}</Td>
                <Td className="text-muted">{s.periodePanen}</Td>
                <Td className="text-muted">{s.penerima}</Td>
                <Td>
                  {s.lotId ? (
                    <Link href={`/koperasi/lot/${s.lotId}`}>
                      <Badge tone="info">{s.lotId}</Badge>
                    </Link>
                  ) : (
                    <Badge>Belum</Badge>
                  )}
                </Td>
                <Td>
                  <Mono className="text-muted">{s.hash}</Mono>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </>
  );
}
