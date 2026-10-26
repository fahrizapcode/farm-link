import Link from "next/link";
import { CloudUpload, Hexagon, MapPin, Plus, RefreshCw } from "lucide-react";
import { PhoneStatusBar } from "@/components/phone-frame";
import { ArrowDot, Badge } from "@/components/ui";

const tugas = [
  { nama: "Fatimah Inen Arif", desa: "Bale Atu", kebun: "Kebun Bale Atu Barat", luas: "± 1 ha", jenis: "titik", status: "Perlu persetujuan" },
  { nama: "Hasanuddin Aman Fitri", desa: "Pantan Musara", kebun: "Kebun Pantan Musara", luas: "5,6 ha", jenis: "poligon", status: "Ukur ulang" },
  { nama: "Ibrahim Aman Zahra", desa: "Wih Porak", kebun: "Kebun Wih Porak Atas", luas: "± 2 ha", jenis: "titik", status: "Baru" },
];

export default function LapanganHome() {
  return (
    <div className="min-h-full bg-cream">
      <div className="rounded-b-[28px] bg-forest-900 pb-6 text-white">
        <PhoneStatusBar dark />
        <div className="px-5 pt-2">
          <p className="text-xs text-white/60">Halo, Dinda</p>
          <h1 className="mt-1 text-2xl tracking-tight">Tugas hari ini</h1>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[
              ["3", "Tugas"],
              ["2", "Belum sinkron"],
              ["46", "Kebun total"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white/[0.07] px-2 py-3">
                <p className="text-xl">{n}</p>
                <p className="text-[11px] text-white/55">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 px-4 py-5">
        <Link
          href="/lapangan/sinkron"
          className="flex items-center gap-3 rounded-2xl border border-warn/30 bg-warn-soft/60 p-3.5"
        >
          <CloudUpload className="size-5 text-warn" />
          <span className="flex-1 text-sm">
            <span className="block font-medium">2 kebun menunggu sinkron</span>
            <span className="block text-xs text-muted">Terakhir sinkron kemarin, 19.40</span>
          </span>
          <RefreshCw className="size-4 text-muted" />
        </Link>

        <p className="px-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted">Daftar kebun</p>
        {tugas.map((t) => (
          <Link key={t.kebun} href="/lapangan/petakan" className="group block rounded-2xl bg-paper p-4 ring-1 ring-line">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{t.nama}</p>
                <p className="text-xs text-muted">
                  {t.kebun} · {t.desa}
                </p>
              </div>
              <ArrowDot size="sm" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-[11px]">
                {t.jenis === "poligon" ? <Hexagon className="size-3" /> : <MapPin className="size-3" />}
                {t.jenis} · {t.luas}
              </span>
              <Badge tone={t.status === "Ukur ulang" ? "warn" : t.status === "Baru" ? "info" : "neutral"}>{t.status}</Badge>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/lapangan/petakan"
        className="sticky bottom-5 mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-medium text-forest-900 shadow-lg shadow-forest-900/20"
      >
        <Plus className="size-4" /> Petani & kebun baru
      </Link>
    </div>
  );
}
