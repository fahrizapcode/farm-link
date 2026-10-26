"use client";

import { FileCheck2, Link2, Map, Satellite, ShieldCheck, WifiOff } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { ImageSlot } from "../image-slot";
import { PillLink, Tag } from "../ui";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { Steps } from "./steps";
import { Voices } from "./voices";

const featureIcons = [WifiOff, Satellite, FileCheck2, Link2];

function Lines({ lines }: { lines: string[] }) {
  return lines.map((l, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {l}
    </span>
  ));
}

export function Home() {
  const { t } = useLang();

  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-svh overflow-hidden bg-forest-900">
        <ImageSlot name="hero-kebun-kopi.jpg" alt={t.hero.imgAlt} rounded="" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/80 via-forest-950/15 to-forest-950/40" />
        <SiteNav active="/" />
        <div className="mx-auto flex min-h-svh max-w-[1280px] flex-col justify-end gap-10 px-4 pb-14 pt-32 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="max-w-3xl text-[44px] leading-[1.02] tracking-[-0.03em] text-white sm:text-[68px] lg:text-[80px]">
            <Lines lines={t.hero.title} />
          </h1>
          <div className="max-w-xs text-white">
            <p className="text-sm leading-relaxed text-white/80">{t.hero.body}</p>
            <PillLink href="/daftar" className="mt-5">
              {t.hero.cta}
            </PillLink>
          </div>
        </div>
      </section>

      {/* MISI + ANGKA */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-24">
        <Tag>{t.mission.tag}</Tag>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <h2 className="text-[38px] leading-[1.05] tracking-[-0.02em] sm:text-[52px]">{t.mission.title}</h2>
          <div>
            <p className="text-lg leading-relaxed sm:text-[22px]">{t.mission.body}</p>
            <PillLink href="#cara-kerja" className="mt-6">
              {t.mission.cta}
            </PillLink>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <ImageSlot name="petani-memetik-kopi.jpg" alt={t.mission.img1Alt} className="aspect-[4/3.4]" />
          <div className="flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-5">
            <p className="text-[44px] leading-none tracking-tight sm:text-[52px]">
              &lt;1<span className="align-top text-2xl">%</span>
            </p>
            <div>
              <p className="text-[15px] font-medium">{t.mission.stat1Title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{t.mission.stat1Body}</p>
            </div>
          </div>
          <ImageSlot name="biji-kopi-kakao.jpg" alt={t.mission.img2Alt} className="aspect-[4/3.4]" />
          <div className="flex flex-col justify-between rounded-[var(--radius-card)] bg-lime p-5 text-forest-900">
            <p className="text-[44px] leading-none tracking-tight sm:text-[52px]">
              90<span className="align-top text-2xl">%+</span>
            </p>
            <div>
              <p className="text-[15px] font-medium">{t.mission.stat2Title}</p>
              <p className="mt-1 text-xs leading-relaxed text-forest-900/70">{t.mission.stat2Body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FITUR (gelap) */}
      <section id="fitur" className="scroll-mt-4 px-3 sm:px-6">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] bg-forest-900 px-5 py-14 text-white sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute -left-24 top-10 size-[420px] rotate-45 rounded-[60px] bg-forest-800/60" />
          <div className="relative">
            <Tag light>{t.features.tag}</Tag>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <h2 className="text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
                <Lines lines={t.features.title} />
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/70 lg:justify-self-end">{t.features.body}</p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
              <ImageSlot name="enumerator-memetakan-kebun.jpg" alt={t.features.imgAlt} className="min-h-[280px] lg:min-h-full" />
              <div className="grid gap-4 sm:grid-cols-2">
                {t.features.items.map((f, i) => {
                  const Icon = featureIcons[i];
                  return (
                    <div
                      key={i}
                      className={
                        i === 0
                          ? "rounded-[var(--radius-card)] bg-lime p-5 text-forest-900"
                          : "rounded-[var(--radius-card)] bg-white/[0.06] p-5 ring-1 ring-white/10"
                      }
                    >
                      <span
                        className={
                          i === 0
                            ? "grid size-9 place-items-center rounded-full bg-forest-900 text-lime"
                            : "grid size-9 place-items-center rounded-full bg-lime text-forest-900"
                        }
                      >
                        <Icon className="size-4" />
                      </span>
                      <p className="mt-10 text-[15px] font-medium">{f.title}</p>
                      <p className={i === 0 ? "mt-1.5 text-xs leading-relaxed text-forest-900/70" : "mt-1.5 text-xs leading-relaxed text-white/60"}>
                        {f.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section id="cara-kerja" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28">
        <Tag>{t.how.tag}</Tag>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <h2 className="text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            <Lines lines={t.how.title} />
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:justify-self-end">{t.how.body}</p>
        </div>

        {/* Kedua kolom setinggi sama: kolase mengisi grid, daftar langkah meregang mengikuti */}
        <div className="mt-12 grid gap-10 lg:h-[500px] lg:grid-cols-2 lg:gap-14">
          <div className="grid h-[420px] grid-cols-[1.15fr_1fr] grid-rows-[1fr_1fr_0.85fr] gap-3 lg:h-full">
            <ImageSlot name="langkah-pemetaan.jpg" alt={t.how.imgAlts[0]} className="row-span-2" />
            <ImageSlot name="langkah-skrining.jpg" alt={t.how.imgAlts[1]} />
            <ImageSlot name="langkah-setoran.jpg" alt={t.how.imgAlts[2]} />
            <ImageSlot name="langkah-ekspor.jpg" alt={t.how.imgAlts[3]} className="col-span-2" />
          </div>
          <Steps />
        </div>
      </section>

      {/* UNTUK SIAPA (gelap) */}
      <section className="px-3 sm:px-6">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] bg-forest-900 px-5 py-12 text-white sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -left-10 top-0 size-[360px] rotate-45 rounded-[60px] bg-forest-800/60" />
          <div className="relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <Tag light>{t.voices.tag}</Tag>
                <h2 className="mt-5 text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
                  <Lines lines={t.voices.title} />
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-white/70 lg:justify-self-end">{t.voices.body}</p>
            </div>
            <div className="mt-10 border-t border-white/10 pt-10">
              <Voices />
            </div>
          </div>
        </div>
      </section>

      {/* HARGA */}
      <section id="harga" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28">
        <Tag>{t.pricing.tag}</Tag>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <h2 className="text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            <Lines lines={t.pricing.title} />
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:justify-self-end">{t.pricing.body}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6">
            <Map className="size-5 text-forest-700" />
            <p className="mt-8 text-sm text-muted">{t.pricing.mapping.label}</p>
            <p className="mt-1 text-[40px] leading-none tracking-tight">Rp40.000</p>
            <p className="mt-1 text-sm text-muted">{t.pricing.mapping.unit}</p>
            <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
              {t.pricing.mapping.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] bg-lime p-6 text-forest-900">
            <ShieldCheck className="size-5" />
            <p className="mt-8 text-sm text-forest-900/70">{t.pricing.platform.label}</p>
            <p className="mt-1 text-[40px] leading-none tracking-tight">Rp30.000</p>
            <p className="mt-1 text-sm text-forest-900/70">{t.pricing.platform.unit}</p>
            <ul className="mt-6 space-y-2 border-t border-forest-900/15 pt-5 text-sm">
              {t.pricing.platform.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] bg-forest-900 p-6 text-white">
            <p className="text-sm text-white/60">{t.pricing.example.label}</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/70">{t.pricing.example.year1}</span>
                <span>{t.pricing.example.year1Value}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/70">{t.pricing.example.year2}</span>
                <span>{t.pricing.example.year2Value}</span>
              </div>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/55">{t.pricing.example.note}</p>
            <PillLink href="/daftar" className="mt-6">
              {t.pricing.example.cta}
            </PillLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-forest-900">
        <ImageSlot name="cta-kebun-kakao.jpg" alt={t.cta.imgAlt} rounded="" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/85 via-forest-950/30 to-transparent" />
        <div className="mx-auto flex min-h-[520px] max-w-[1280px] flex-col justify-end gap-8 px-4 pb-14 pt-40 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Tag light>{t.cta.tag}</Tag>
            <h2 className="mt-4 text-[40px] leading-[1.04] tracking-[-0.02em] text-white sm:text-[56px]">
              <Lines lines={t.cta.title} />
            </h2>
          </div>
          <div className="max-w-sm text-white">
            <p className="text-sm leading-relaxed text-white/80">{t.cta.body}</p>
            <PillLink href="/daftar" className="mt-5">
              {t.cta.button}
            </PillLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
