"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Archive,
  Bell,
  Boxes,
  ChevronDown,
  ClipboardCheck,
  FileStack,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Scale,
  ShieldCheck,
  Sprout,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { Logo, cx } from "./ui";

type Area = "koperasi" | "qc" | "supervisor";

const nav: Record<Area, { label: string; items: { href: string; label: string; icon: typeof Map; exact?: boolean }[] }> = {
  koperasi: {
    label: "Koperasi",
    items: [
      { href: "/koperasi", label: "Dasbor kesiapan", icon: LayoutDashboard, exact: true },
      { href: "/koperasi/petani", label: "Petani & persetujuan", icon: Users },
      { href: "/koperasi/kebun", label: "Kebun", icon: Map },
      { href: "/koperasi/setoran", label: "Setoran", icon: Scale },
      { href: "/koperasi/lot", label: "Lot", icon: Boxes },
      { href: "/koperasi/paket", label: "Paket data", icon: FileStack },
      { href: "/koperasi/tim", label: "Tim & peran", icon: UserCog },
      { href: "/koperasi/arsip", label: "Ekspor arsip", icon: Archive },
    ],
  },
  qc: {
    label: "Peninjau QC",
    items: [{ href: "/qc", label: "Antrean tinjauan", icon: ClipboardCheck, exact: true }],
  },
  supervisor: {
    label: "Supervisor",
    items: [{ href: "/supervisor", label: "Kinerja enumerator", icon: Sprout, exact: true }],
  },
};

const roles = [
  { href: "/koperasi", label: "Pengelola koperasi" },
  { href: "/lapangan", label: "Enumerator (aplikasi lapangan)" },
  { href: "/pengepul", label: "Pengepul (aplikasi setoran)" },
  { href: "/supervisor", label: "Supervisor enumerator" },
  { href: "/qc", label: "Peninjau QC" },
  { href: "/verifikasi", label: "Pembeli Eropa (verifikasi)" },
];

const user: Record<Area, { nama: string; sub: string }> = {
  koperasi: { nama: "Teuku Ramli", sub: "KP Lestari Gayo" },
  qc: { nama: "Andini Larasati", sub: "Analis GIS · Farmlink" },
  supervisor: { nama: "Bayu Prasetyo", sub: "Koordinator lapangan" },
};

export function AppShell({ area, children }: { area: Area; children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const cfg = nav[area];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const sidebar = (
    <div className="flex h-full flex-col bg-forest-900 text-white">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo light />
        </Link>
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Tutup menu">
          <X className="size-5" />
        </button>
      </div>
      <p className="px-5 pb-2 text-[11px] uppercase tracking-[0.16em] text-white/40">{cfg.label}</p>
      <nav className="flex-1 space-y-1 px-3">
        {cfg.items.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cx(
                "flex items-center gap-3 rounded-full px-3.5 py-2.5 text-sm transition-colors",
                active ? "bg-lime font-medium text-forest-900" : "text-white/75 hover:bg-white/[0.07] hover:text-white",
              )}
            >
              <Icon className="size-[18px]" strokeWidth={1.8} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-2xl bg-white/[0.06] p-4">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <ShieldCheck className="size-4 text-lime" />
          Rantai lot tercatat di Stellar
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-white/45">
          Batch terakhir 26 Okt, 09.00 · 14 event · Merkle root ditulis dalam satu transaksi.
        </p>
      </div>
      <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
        <div className="grid size-9 place-items-center rounded-full bg-lime text-sm font-semibold text-forest-900">
          {user[area].nama.split(" ").map((s) => s[0]).slice(0, 2).join("")}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm">{user[area].nama}</p>
          <p className="truncate text-xs text-white/50">{user[area].sub}</p>
        </div>
        <Link href="/masuk" aria-label="Keluar" className="text-white/50 hover:text-white">
          <LogOut className="size-4" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 lg:block">{sidebar}</aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[270px]">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-cream/85 px-4 py-3 backdrop-blur sm:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Buka menu">
            <Menu className="size-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setRoleOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs"
            >
              <span className="text-muted">Lihat sebagai:</span>
              <span className="font-medium">{roles.find((r) => pathname.startsWith(r.href))?.label ?? "Pengelola koperasi"}</span>
              <ChevronDown className="size-3.5" />
            </button>
            {roleOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-line bg-paper py-1.5 shadow-xl shadow-ink/5">
                {roles.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={() => setRoleOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-cream"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-ok-soft px-3 py-1.5 text-xs text-ok sm:inline-flex">
              <span className="size-1.5 rounded-full bg-ok" />
              Tersinkron
            </span>
            <button className="relative grid size-9 place-items-center rounded-full border border-line bg-paper" aria-label="Notifikasi">
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-bad" />
            </button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1240px] flex-1 px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
