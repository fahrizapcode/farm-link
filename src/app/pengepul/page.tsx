import Link from "next/link";
import { CloudUpload, QrCode } from "lucide-react";
import { PhoneStatusBar } from "@/components/phone-frame";
import { formatKg, getKebun, getPetani, setoran } from "@/lib/data";

export default function PengepulHome() {
  const milik = setoran.filter((s) => s.penerima.startsWith("Pak Ridwan"));
  const total = milik.reduce((a, s) => a + s.beratKg, 0);

  return (
    <div className="min-h-full bg-cream">
      <div className="rounded-b-[28px] bg-forest-900 pb-6 text-white">
        <PhoneStatusBar dark />
        <div className="px-5 pt-2">
          <p className="text-xs text-white/60">Pak Ridwan · Pengepul KP Lestari Gayo</p>
          <h1 className="mt-1 text-2xl tracking-tight">Setoran musim ini</h1>
          <p className="mt-4 text-[40px] leading-none tracking-tight">{formatKg(total)}</p>
          <p className="mt-1 text-xs text-white/55">{milik.length} setoran · 1 menunggu sinkron</p>
        </div>
      </div>

      <div className="px-4 py-5">
        <Link
          href="/pengepul/setoran"
          className="flex items-center gap-4 rounded-3xl bg-lime p-5 text-forest-900"
        >
          <span className="grid size-14 place-items-center rounded-2xl bg-forest-900 text-lime">
            <QrCode className="size-7" />
          </span>
          <span>
            <span className="block text-lg font-medium">Pindai kartu petani</span>
            <span className="block text-xs text-forest-900/70">Catat setoran baru</span>
          </span>
        </Link>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-warn/30 bg-warn-soft/60 p-3.5 text-sm">
          <CloudUpload className="size-5 text-warn" />
          1 setoran tersimpan di perangkat
        </div>

        <p className="mt-6 px-1 text-xs font-medium uppercase tracking-wide text-muted">Riwayat</p>
        <ul className="mt-2 divide-y divide-line rounded-2xl bg-paper ring-1 ring-line">
          {milik.map((s) => (
            <li key={s.id} className="flex items-center justify-between px-4 py-3">
              <span>
                <span className="block text-sm font-medium">{getPetani(s.petaniId)?.nama}</span>
                <span className="block text-xs text-muted">
                  {getKebun(s.kebunId)?.nama} · {s.tanggalSetor}
                </span>
              </span>
              <span className="text-sm">{formatKg(s.beratKg)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
