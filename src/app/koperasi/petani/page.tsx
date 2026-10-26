import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge, Card, PageHeader, PillLink, TableWrap, Td, Th, inputClass } from "@/components/ui";
import { kebunPetani, legalitasLengkap, petani } from "@/lib/data";

export const metadata: Metadata = { title: "Petani & persetujuan" };

export default function PetaniPage() {
  return (
    <>
      <PageHeader
        eyebrow="F2 · F6"
        title="Petani dan persetujuan"
        desc="Pemetaan tidak bisa dimulai sebelum persetujuan tersimpan. Status legalitas per petani terlihat di sini."
        actions={<PillLink href="/koperasi/petani/baru">Tambah petani</PillLink>}
      />

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-line p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input className={`${inputClass} pl-10`} placeholder="Cari nama, desa, atau ID petani" />
          </div>
          <select className={`${inputClass} w-auto`}>
            <option>Semua legalitas</option>
            <option>Lengkap</option>
            <option>Belum lengkap</option>
          </select>
          <select className={`${inputClass} w-auto`}>
            <option>Semua persetujuan</option>
            <option>Aktif</option>
            <option>Ada yang ditarik</option>
            <option>Belum ada</option>
          </select>
        </div>
        <TableWrap>
          <thead className="border-b border-line">
            <tr>
              <Th>Petani</Th>
              <Th>Desa</Th>
              <Th>Kebun</Th>
              <Th>Persetujuan</Th>
              <Th>Legalitas</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {petani.map((p) => {
              const kb = kebunPetani(p.id);
              const vals = Object.values(p.persetujuan);
              const consent = vals.includes("ditarik")
                ? <Badge tone="bad">Sebagian ditarik</Badge>
                : p.persetujuan.pemetaan === "aktif"
                  ? <Badge tone="ok">{vals.filter((v) => v === "aktif").length}/5 cakupan aktif</Badge>
                  : <Badge tone="neutral">Belum ada</Badge>;
              return (
                <tr key={p.id} className="hover:bg-cream/60">
                  <Td>
                    <Link href={`/koperasi/petani/${p.id}`} className="block">
                      <span className="font-medium">{p.nama}</span>
                      <span className="block font-mono text-xs text-muted">{p.id}</span>
                    </Link>
                  </Td>
                  <Td className="text-muted">
                    {p.desa}, {p.kecamatan}
                  </Td>
                  <Td>{kb.length}</Td>
                  <Td>{consent}</Td>
                  <Td>
                    {legalitasLengkap(p) ? (
                      <Badge tone="lime">Lengkap</Badge>
                    ) : p.legalitas.estdb === "kedaluwarsa" ? (
                      <Badge tone="warn">Dokumen kedaluwarsa</Badge>
                    ) : (
                      <Badge tone="warn">Belum lengkap</Badge>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      </Card>
    </>
  );
}
