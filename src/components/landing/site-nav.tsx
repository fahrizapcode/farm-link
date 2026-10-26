"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { LangSwitch } from "../lang-switch";
import { ArrowDot, Logo, cx } from "../ui";

export function SiteNav({ active = "/" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/#cara-kerja", label: t.nav.how },
    { href: "/#fitur", label: t.nav.features },
    { href: "/#harga", label: t.nav.pricing },
    { href: "/verifikasi", label: t.nav.verify },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <Link href="/">
          <Logo light />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-forest-950/55 p-1 backdrop-blur-md md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cx(
                "rounded-full px-4 py-1.5 text-[13px] transition-colors",
                l.href === active ? "bg-lime font-medium text-forest-900" : "text-white/85 hover:text-white",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LangSwitch light />
          <Link
            href="/masuk"
            className="group inline-flex items-center gap-3 rounded-full bg-lime py-1 pl-4 pr-1 text-[13px] font-medium text-forest-900"
          >
            {t.nav.login}
            <ArrowDot size="sm" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitch light />
          <button className="text-white" onClick={() => setOpen(true)} aria-label={t.nav.openMenu}>
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-forest-950/95 p-6 text-white backdrop-blur md:hidden">
          <div className="flex items-center justify-between">
            <Logo light />
            <button onClick={() => setOpen(false)} aria-label={t.nav.closeMenu}>
              <X className="size-6" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-2xl">
                {l.label}
              </Link>
            ))}
            <Link
              href="/masuk"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-lime py-1.5 pl-5 pr-1.5 font-medium text-forest-900"
            >
              {t.nav.login}
              <ArrowDot />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
