import type { Metadata } from "next";
import { Card, CardHeader, Badge, PageHeader, PillButton, TableWrap, Td, Th, inputClass } from "@/components/ui";
import { tim } from "@/lib/data";

export const metadata: Metadata = { title: "Tim & peran" };

const akses = [
  { peran: "Admin koperasi", menu: "Semua menu, undang anggota, langganan" },
  { peran: "Staf ekspor", menu: "Kebun, setoran, lot, paket, arsip" },
  { peran: "Enumerator", menu: "Aplikasi lapangan: petani, persetujuan, pemetaan" },
  { peran: "Pengepul", menu: "Aplikasi setoran: pindai QR, catat setoran" },
];

export default function TimPage() {
  return (
    <>
      <PageHeader
        eyebrow="F1"
        title="Tim dan peran"
        desc="Setiap peran hanya melihat menu dan data sesuai perannya."
      />
      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader title="Anggota" desc={`${tim.length} orang`} />
          <TableWrap>
            <thead className="border-b border-line">
              <tr>
                <Th>Nama</Th>
                <Th>Peran</Th>
                <Th>Kontak</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tim.map((m) => (
                <tr key={m.nama}>
                  <Td className="font-medium">{m.nama}</Td>
                  <Td>{m.peran}</Td>
                  <Td className="text-muted">{m.email}</Td>
                  <Td>
                    <Badge tone={m.status === "Aktif" ? "ok" : "warn"}>{m.status}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Card>
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader title="Undang anggota" />
            <div className="grid gap-3 p-5">
              <input className={inputClass} placeholder="Nama" />
              <input className={inputClass} placeholder="Email atau nomor HP" />
              <select className={inputClass}>
                {akses.map((a) => (
                  <option key={a.peran}>{a.peran}</option>
                ))}
              </select>
              <PillButton arrow className="justify-between">
                Kirim undangan
              </PillButton>
            </div>
          </Card>
          <Card>
            <CardHeader title="Hak akses per peran" />
            <ul className="divide-y divide-line">
              {akses.map((a) => (
                <li key={a.peran} className="px-5 py-3 text-sm">
                  <span className="font-medium">{a.peran}</span>
                  <span className="block text-xs text-muted">{a.menu}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
