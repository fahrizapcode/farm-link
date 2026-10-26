import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AlertTriangle, CheckCircle2, ChevronLeft, Link2 } from "lucide-react";
import {
  Badge,
  Card,
  CardHeader,
  KeyVal,
  LotStatus,
  Mono,
  PageHeader,
  PillLink,
  TableWrap,
  Td,
  Th,
  inputClass,
} from "@/components/ui";
import {
  formatKg,
  formatTanggal,
  getKebun,
  getLot,
  getPetani,
  koperasi,
  lot,
  paket,
  setoranLot,
} from "@/lib/data";

export function generateStaticParams() {
  return lot.map((l) => ({ id: l.id }));
}

export default function Page({ params }: PageProps<"/koperasi/lot/[id]">) {
  return (
    <Suspense>
      <LotDetail params={params} />
    </Suspense>
  );
}

async function LotDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const l = getLot(id);
  if (!l) notFound();
  const st = setoranLot(l);
  const pk = paket.find((p) => p.lotId === l.id);

  // Cek kewajaran volume per kebun asal
  const perKebun = Object.values(
    st.reduce<Record<string, { kebunId: string; kg: number }>>((acc, s) => {
      acc[s.kebunId] ??= { kebunId: s.kebunId, kg: 0 };
      acc[s.kebunId].kg += s.beratKg;
      return acc;
    }, {}),
  ).map((r) => {
    const k = getKebun(r.kebunId)!;
    const kapasitas = Math.round(k.luasHa * koperasi.hasilPerHaKg[k.komoditas]);
    return { ...r, k, kapasitas, lebih: r.kg > kapasitas };
  });
  const adaLebih = perKebun.some((r) => r.lebih);

  return (
    <>
      <Link href="/koperasi/lot" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Semua lot
      </Link>
      <PageHeader
        eyebrow={l.id}
        title={`Lot ${l.kode}`}
        desc={l.deskripsi}
        actions={
          <>
            <LotStatus status={l.status} />
            {pk ? (
              <PillLink href={`/koperasi/paket/${pk.id}`}>Buka paket data</PillLink>
            ) : (
              <PillLink href="/koperasi/paket/PKT-2026-010">Buat paket data</PillLink>
            )}
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1.5fr]">
        <Card>
          <CardHeader title="Ringkasan lot" />
          <div className="divide-y divide-line px-5">
            <KeyVal k="Komoditas" v={l.komoditas} />
            <KeyVal k="Kode HS" v={<Mono>{l.kodeHS}</Mono>} />
            <KeyVal k="Berat bersih" v={formatKg(l.beratBersihKg)} />
            <KeyVal k="Jumlah setoran" v={st.length} />
            <KeyVal k="Kebun asal" v={perKebun.length} />
            <KeyVal k="Perantara dalam rantai" v="Maks. 1 pengepul" />
            <KeyVal k="Negara produksi" v="Indonesia" />
            <KeyVal
              k="Merkle root"
              v={l.merkleRoot ? <Mono>{l.merkleRoot}</Mono> : <span className="text-muted">Menunggu batch berikutnya</span>}
            />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Cek kewajaran volume"
            desc={`Asumsi hasil koperasi: ${koperasi.hasilPerHaKg[l.komoditas]} kg/ha/tahun. Ini bukan model mass balance; pasokan tetap dipisahkan.`}
          />
          <ul className="divide-y divide-line">
            {perKebun.map((r) => {
              const pct = Math.min(100, (r.kg / r.kapasitas) * 100);
              return (
                <li key={r.kebunId} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <Link href={`/koperasi/kebun/${r.kebunId}`} className="font-medium hover:underline">
                      {r.k.nama}
                    </Link>
                    <span className={r.lebih ? "text-bad" : "text-muted"}>
                      {formatKg(r.kg)} / {formatKg(r.kapasitas)}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                    <div className={r.lebih ? "h-full bg-bad" : "h-full bg-ok"} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-1.5 text-xs text-muted">
                    {r.k.luasHa} ha · {getPetani(r.k.petaniId)?.nama}
                    {r.lebih && ` · melebihi kapasitas ${formatKg(r.kg - r.kapasitas)}`}
                  </p>
                </li>
              );
            })}
          </ul>
          {adaLebih ? (
            <div className="border-t border-line bg-warn-soft/50 p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-warn">
                <AlertTriangle className="size-4" /> Volume melebihi kapasitas kebun asal
              </p>
              <p className="mt-1 text-xs text-muted">Paket baru bisa dibuat setelah pengelola menambahkan catatan.</p>
              <textarea
                className={`${inputClass} mt-3`}
                rows={2}
                defaultValue={l.catatanPengelola}
                placeholder="Contoh: kebun baru diukur ulang, luas sebenarnya 5,8 ha; menunggu versi geometri baru."
              />
              <div className="mt-3 flex justify-end">
                <PillLink href="/koperasi/paket/PKT-2026-010" variant="dark">
                  Simpan catatan
                </PillLink>
              </div>
            </div>
          ) : (
            <p className="flex items-center gap-2 border-t border-line px-5 py-4 text-sm text-ok">
              <CheckCircle2 className="size-4" /> Semua kebun asal dalam batas kapasitas.
            </p>
          )}
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Rantai setoran" desc="Setiap setoran menunjuk ke versi geometri yang berlaku saat panen." />
        <TableWrap>
          <thead className="border-b border-line">
            <tr>
              <Th>Setoran</Th>
              <Th>Petani · kebun</Th>
              <Th className="text-right">Berat</Th>
              <Th>Periode panen</Th>
              <Th>Penerima</Th>
              <Th>Hash on-chain</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {st.map((s) => (
              <tr key={s.id}>
                <Td>
                  <span className="font-mono text-xs">{s.id}</span>
                  <span className="block text-xs text-muted">{formatTanggal(s.tanggalSetor)}</span>
                </Td>
                <Td>
                  {getPetani(s.petaniId)?.nama}
                  <span className="block text-xs text-muted">
                    {s.kebunId} · geometri v{getKebun(s.kebunId)?.geometri.at(-1)?.versi}
                  </span>
                </Td>
                <Td className="text-right">{formatKg(s.beratKg)}</Td>
                <Td className="text-muted">{s.periodePanen}</Td>
                <Td className="text-muted">{s.penerima}</Td>
                <Td>
                  <span className="inline-flex items-center gap-1.5">
                    <Link2 className="size-3.5 text-ok" />
                    <Mono>{s.hash}</Mono>
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <div className="flex items-center justify-between border-t border-line px-5 py-3 text-sm">
          <span className="text-muted">Total</span>
          <Badge tone="dark">{formatKg(st.reduce((a, s) => a + s.beratKg, 0))}</Badge>
        </div>
      </Card>
    </>
  );
}
