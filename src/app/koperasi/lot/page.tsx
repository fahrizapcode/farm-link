import type { Metadata } from "next";
import Link from "next/link";
import { Card, LotStatus, PageHeader, PillLink, TableWrap, Td, Th } from "@/components/ui";
import { formatKg, formatTanggal, lot } from "@/lib/data";

export const metadata: Metadata = { title: "Lot" };

export default function LotPage() {
  return (
    <>
      <PageHeader
        eyebrow="F8"
        title="Lot"
        desc="Lot dibentuk dari setoran kebun yang patuh. Volume dibandingkan dengan kapasitas kebun asal; pasokan tidak dicampur."
        actions={<PillLink href="/koperasi/lot/baru">Bentuk lot</PillLink>}
      />
      <Card>
        <TableWrap>
          <thead className="border-b border-line">
            <tr>
              <Th>Lot</Th>
              <Th>Produk</Th>
              <Th>Kode HS</Th>
              <Th className="text-right">Berat bersih</Th>
              <Th className="text-right">Setoran</Th>
              <Th>Dibuat</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {lot.map((l) => (
              <tr key={l.id} className="hover:bg-cream/60">
                <Td>
                  <Link href={`/koperasi/lot/${l.id}`} className="block">
                    <span className="font-medium">{l.kode}</span>
                    <span className="block font-mono text-xs text-muted">{l.id}</span>
                  </Link>
                </Td>
                <Td className="text-muted">{l.deskripsi}</Td>
                <Td className="font-mono text-xs">{l.kodeHS}</Td>
                <Td className="text-right">{formatKg(l.beratBersihKg)}</Td>
                <Td className="text-right">{l.setoranIds.length}</Td>
                <Td className="text-muted">{formatTanggal(l.dibuat)}</Td>
                <Td>
                  <LotStatus status={l.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </>
  );
}
