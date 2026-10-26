"use client";

import Link from "next/link";
import { Building2, ClipboardCheck, Globe2, Scale, Smartphone, Sprout } from "lucide-react";
import { ImageSlot } from "@/components/image-slot";
import { LangSwitch } from "@/components/lang-switch";
import { ArrowDot, Field, Logo, PillLink, inputClass } from "@/components/ui";
import { useLang } from "@/lib/i18n";

const roles = [
  { href: "/koperasi", icon: Building2 },
  { href: "/lapangan", icon: Smartphone },
  { href: "/pengepul", icon: Scale },
  { href: "/supervisor", icon: Sprout },
  { href: "/qc", icon: ClipboardCheck },
  { href: "/verifikasi", icon: Globe2 },
];

export function LoginView() {
  const { t } = useLang();
  const l = t.login;

  return (
    <div className="page-enter grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-5 py-6 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <LangSwitch />
        </div>
        <div className="mx-auto my-auto w-full max-w-md py-12">
          <h1 className="text-[36px] leading-tight tracking-tight">{l.title}</h1>
          <p className="mt-2 text-sm text-muted">{l.subtitle}</p>

          <div className="mt-8 space-y-4">
            <Field label={l.email}>
              <input className={inputClass} placeholder={l.emailPh} />
            </Field>
            <Field label={l.password}>
              <input className={inputClass} type="password" placeholder="••••••••" />
            </Field>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted">
                <input type="checkbox" className="accent-forest-700" /> {l.remember}
              </label>
              <Link href="#" className="text-forest-700 hover:underline">
                {l.forgot}
              </Link>
            </div>
            <PillLink href="/koperasi" className="w-full justify-between">
              {l.submit}
            </PillLink>
          </div>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{l.demo}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {roles.map((r, i) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group flex items-start gap-3 rounded-2xl border border-line bg-paper p-3 transition-colors hover:border-forest-700/40"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream text-forest-700 group-hover:bg-lime">
                    <r.icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{l.roles[i].title}</span>
                    <span className="block text-xs text-muted">{l.roles[i].desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-muted">
            {l.noAccount}{" "}
            <Link href="/daftar" className="font-medium text-forest-700 hover:underline">
              {l.register}
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden p-3 lg:block">
        <div className="relative h-full overflow-hidden rounded-[28px] bg-forest-900">
          <ImageSlot name="masuk-kebun-gayo.jpg" alt={l.imgAlt} rounded="" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent" />
          <div className="absolute inset-x-10 bottom-10 text-white">
            <p className="max-w-md text-[28px] leading-snug tracking-tight">{l.sideQuote}</p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-4 pr-1.5 text-sm backdrop-blur">
              {l.sideBadge}
              <ArrowDot size="sm" tone="lime" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
