import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, Globe2, Scale, Smartphone, Sprout, Building2 } from "lucide-react";
import { ImageSlot } from "@/components/image-slot";
import { ArrowDot, Field, Logo, PillLink, inputClass } from "@/components/ui";

export const metadata: Metadata = { title: "Masuk" };

const roles = [
  { href: "/koperasi", icon: Building2, title: "Pengelola koperasi", desc: "Peta pemasok, lot, dan paket data" },
  { href: "/lapangan", icon: Smartphone, title: "Enumerator", desc: "Aplikasi pemetaan offline" },
  { href: "/pengepul", icon: Scale, title: "Pengepul", desc: "Catat setoran dengan kartu QR" },
  { href: "/supervisor", icon: Sprout, title: "Supervisor", desc: "Kualitas kerja enumerator" },
  { href: "/qc", icon: ClipboardCheck, title: "Peninjau QC", desc: "Antrean kebun kuning" },
  { href: "/verifikasi", icon: Globe2, title: "Pembeli Eropa", desc: "Verify a lot (English)" },
];

export default function MasukPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-5 py-6 sm:px-12">
        <Link href="/">
          <Logo />
        </Link>
        <div className="mx-auto my-auto w-full max-w-md py-12">
          <h1 className="text-[36px] leading-tight tracking-tight">Selamat datang kembali</h1>
          <p className="mt-2 text-sm text-muted">Masuk dengan akun koperasi Anda.</p>

          <div className="mt-8 space-y-4">
            <Field label="Email atau nomor HP">
              <input className={inputClass} placeholder="nama@koperasi.id" />
            </Field>
            <Field label="Kata sandi">
              <input className={inputClass} type="password" placeholder="••••••••" />
            </Field>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted">
                <input type="checkbox" className="accent-forest-700" /> Ingat saya
              </label>
              <Link href="#" className="text-forest-700 hover:underline">
                Lupa kata sandi?
              </Link>
            </div>
            <PillLink href="/koperasi" className="w-full justify-between">
              Masuk
            </PillLink>
          </div>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Mode demo · masuk sebagai</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group flex items-start gap-3 rounded-2xl border border-line bg-paper p-3 transition-colors hover:border-forest-700/40"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream text-forest-700 group-hover:bg-lime">
                    <r.icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{r.title}</span>
                    <span className="block text-xs text-muted">{r.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-muted">
            Koperasi belum terdaftar?{" "}
            <Link href="/daftar" className="font-medium text-forest-700 hover:underline">
              Daftarkan koperasi
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden p-3 lg:block">
        <div className="relative h-full overflow-hidden rounded-[28px] bg-forest-900">
          <ImageSlot name="masuk-kebun-gayo.jpg" alt="Kebun kopi dataran tinggi saat pagi" rounded="" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent" />
          <div className="absolute inset-x-10 bottom-10 text-white">
            <p className="max-w-md text-[28px] leading-snug tracking-tight">
              Setiap lot membawa paket data yang bisa ditelusuri sampai ke kebun asalnya.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-4 pr-1.5 text-sm backdrop-blur">
              Hash tercatat di Stellar
              <ArrowDot size="sm" tone="lime" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
