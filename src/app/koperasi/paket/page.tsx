import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, Mono, PageHeader, PillLink, TableWrap, Td, Th } from "@/components/ui";
import { formatTanggal, getLot, paket } from "@/lib/data";

export const metadata: Metadata = { title: "Paket data" };

const statusTone = { draf: "neutral", siap: "ok", terkirim: "info", diterima: "lime" } as const;
const statusLabel = { draf: "Draf", siap: "Siap kirim", terkirim: "Terkirim", diterima: "Diterima pembeli" } as const;

export default function PaketPage() {
  return (
    <>
      <PageHeader
        eyebrow="F9"
        title="Paket data lot"
        desc="Paket hanya berisi kebun hijau dengan legalitas lengkap. Diarsipkan 5 tahun sejak dikirim."
        actions={<PillLink href="/koperasi/lot">Pilih lot</PillLink>}
      />
      <Card>
        <TableWrap>
          <thead className="border-b border-line">
            <tr>
              <Th>Paket</Th>
              <Th>Lot</Th>
              <Th>Pembeli</Th>
              <Th>Jenis</Th>
              <Th>Dikirim</Th>
              <Th>No. referensi DDS</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {paket.map((p) => (
              <tr key={p.id} className="hover:bg-cream/60">
                <Td>
                  <Link href={`/koperasi/paket/${p.id}`} className="font-mono text-xs font-medium hover:underline">
                    {p.id}
                  </Link>
                </Td>
                <Td>{getLot(p.lotId)?.kode}</Td>
                <Td>
                  {p.pembeli}
                  <span className="block text-xs text-muted">{p.negaraPembeli}</span>
                </Td>
                <Td className="text-muted">{p.jenis}</Td>
                <Td className="text-muted">{p.tanggalKirim ? formatTanggal(p.tanggalKirim) : "—"}</Td>
                <Td>{p.nomorDDS ? <Mono>{p.nomorDDS}</Mono> : <span className="text-muted">—</span>}</Td>
                <Td>
                  <Badge tone={statusTone[p.status]}>{statusLabel[p.status]}</Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </>
  );
}
