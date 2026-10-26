"use client";

import { FileCheck2, Link2, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { Tag } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { HashForm } from "./hash-form";

const icons = [FileCheck2, Link2, ShieldCheck];

export function VerifyView({ example }: { example: string }) {
  const { t } = useLang();
  const v = t.verify;
  return (
    <>
      <section className="relative overflow-hidden bg-forest-900 text-white">
        <div className="pointer-events-none absolute -right-24 top-24 size-[460px] rotate-45 rounded-[70px] bg-forest-800/70" />
        <SiteNav active="/verifikasi" />
        <div className="page-enter relative mx-auto max-w-[1280px] px-4 pb-20 pt-36 sm:px-8 sm:pt-44">
          <Tag light>{v.tag}</Tag>
          <h1 className="mt-5 max-w-3xl text-[42px] leading-[1.04] tracking-[-0.03em] sm:text-[64px]">{v.title}</h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">{v.body}</p>
          <div className="mt-8 max-w-2xl">
            <HashForm example={example} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-4 px-4 py-16 sm:px-8 md:grid-cols-3">
        {v.points.map((x, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="rounded-[var(--radius-card)] border border-line bg-paper p-6">
              <span className="grid size-10 place-items-center rounded-full bg-lime text-forest-900">
                <Icon className="size-5" />
              </span>
              <p className="mt-8 font-medium">{x.t}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.d}</p>
            </div>
          );
        })}
      </section>
      <SiteFooter />
    </>
  );
}
