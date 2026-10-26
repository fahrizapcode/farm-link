import Link from "next/link";
import { AlertCircle, CheckCircle2, ChevronLeft } from "lucide-react";
import { PhoneStatusBar } from "@/components/phone-frame";

const hasil = [
  { kebun: "Kebun Pantan Musara", petani: "Hasanuddin Aman Fitri", ok: true, pesan: "Lolos validasi. Skrining dalam 24 jam." },
  {
    kebun: "Kebun Ketol Hilir",
    petani: "Ibrahim Aman Zahra",
    ok: false,
    pesan: "Poligon menyilang sendiri di sudut 3 dan 4.",
    aksi: "Ukur ulang sisi timur, rekam sudut searah jarum jam.",
  },
  {
    kebun: "Kebun Wih Porak Atas",
    petani: "Ibrahim Aman Zahra",
    ok: false,
    pesan: "Tumpang tindih 0,2 ha dengan KBN-0004 milik petani lain.",
    aksi: "Pastikan batas bersama dengan kedua petani, lalu ukur ulang.",
  },
];

export default function SinkronPage() {
  return (
    <div className="min-h-full bg-cream">
      <div className="bg-paper">
        <PhoneStatusBar offline={false} />
        <div className="flex items-center gap-3 px-4 pb-4">
          <Link href="/lapangan" className="grid size-9 place-items-center rounded-full bg-cream" aria-label="Kembali">
            <ChevronLeft className="size-4" />
          </Link>
          <div>
            <p className="text-sm font-medium">Hasil sinkron</p>
            <p className="text-[11px] text-muted">Hari ini, 09.41 · 3 kebun dikirim</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-4 py-5">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-ok-soft p-4">
            <p className="text-2xl text-ok">1</p>
            <p className="text-xs text-ok">Lolos validasi</p>
          </div>
          <div className="rounded-2xl bg-bad-soft p-4">
            <p className="text-2xl text-bad">2</p>
            <p className="text-xs text-bad">Perlu perbaikan</p>
          </div>
        </div>

        {hasil.map((h) => (
          <div key={h.kebun} className="rounded-2xl bg-paper p-4 ring-1 ring-line">
            <div className="flex items-start gap-3">
              {h.ok ? (
                <CheckCircle2 className="mt-0.5 size-5 text-ok" />
              ) : (
                <AlertCircle className="mt-0.5 size-5 text-bad" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{h.kebun}</p>
                <p className="text-xs text-muted">{h.petani}</p>
                <p className="mt-2 text-sm">{h.pesan}</p>
                {h.aksi && <p className="mt-1 text-xs text-muted">{h.aksi}</p>}
              </div>
            </div>
            {!h.ok && (
              <Link
                href="/lapangan/petakan"
                className="mt-3 block rounded-full bg-forest-900 py-2.5 text-center text-sm text-white"
              >
                Ukur ulang
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
