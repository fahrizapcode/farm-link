"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { LangSwitch } from "@/components/lang-switch";
import { Field, Logo, PillButton, PillLink, Tag, cx, inputClass } from "@/components/ui";
import { useLang } from "@/lib/i18n";

export function RegisterWizard() {
  const [step, setStep] = useState(0);
  const { t } = useLang();
  const r = t.register;

  const members = [
    { n: "Cut Nyak Aisyah", e: "aisyah@lestarigayo.coop.id", r: 0 },
    { n: "Dinda Pratiwi", e: "dinda.p@kampus.example", r: 1 },
    { n: "Ridwan Abdullah", e: "0812-6655-0091", r: 2 },
  ];

  return (
    <div className="page-enter min-h-screen">
      <header className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/masuk" className="hidden text-sm text-muted hover:text-ink sm:inline">
            {r.haveAccount} <span className="font-medium text-forest-700">{r.login}</span>
          </Link>
          <LangSwitch />
        </div>
      </header>

      <div className="mx-auto max-w-[1080px] px-5 pb-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside>
            <Tag>{r.tag}</Tag>
            <ol className="mt-6 space-y-1">
              {r.steps.map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => setStep(i)}
                    className={cx(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-left text-sm transition-colors",
                      i === step ? "bg-forest-900 text-white" : "text-muted hover:bg-paper",
                    )}
                  >
                    <span
                      className={cx(
                        "grid size-6 place-items-center rounded-full text-xs",
                        i <= step ? "bg-lime text-forest-900" : "bg-ink/[0.07]",
                      )}
                    >
                      {i < step ? <Check className="size-3.5" /> : i + 1}
                    </span>
                    {s}
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <div key={step} className="page-enter rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:p-8">
            {step === 0 && (
              <>
                <h1 className="text-[28px] tracking-tight">{r.profile.title}</h1>
                <p className="mt-1 text-sm text-muted">{r.profile.desc}</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label={r.profile.name}>
                    <input className={inputClass} defaultValue="Koperasi Produsen Kopi Lestari Gayo" />
                  </Field>
                  <Field label={r.profile.type}>
                    <select className={inputClass}>
                      {r.profile.types.map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label={r.profile.nib}>
                    <input className={inputClass} defaultValue="9120001234567" />
                  </Field>
                  <Field label={r.profile.email}>
                    <input className={inputClass} defaultValue="ekspor@lestarigayo.coop.id" />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label={r.profile.address} hint={r.profile.addressHint}>
                      <textarea
                        className={inputClass}
                        rows={2}
                        defaultValue="Jl. Lintas Takengon–Bireuen Km 12, Bebesen, Aceh Tengah, Aceh 24552"
                      />
                    </Field>
                  </div>
                  <Field label={r.profile.admin}>
                    <input className={inputClass} defaultValue="Teuku Ramli" />
                  </Field>
                  <Field label={r.profile.phone}>
                    <input className={inputClass} defaultValue="+62 812 6000 1122" />
                  </Field>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="text-[28px] tracking-tight">{r.commodity.title}</h1>
                <p className="mt-1 text-sm text-muted">{r.commodity.desc}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { k: r.commodity.coffee, hs: "0901", hasil: 900, on: true },
                    { k: r.commodity.cocoa, hs: "1801", hasil: 700, on: false },
                  ].map((c) => (
                    <label
                      key={c.hs}
                      className="block rounded-2xl border border-line p-5 has-[:checked]:border-forest-700 has-[:checked]:bg-lime/15"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{c.k}</span>
                        <input type="checkbox" defaultChecked={c.on} className="size-4 accent-forest-700" />
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {r.commodity.hs} {c.hs}
                      </p>
                      <div className="mt-4">
                        <Field label={r.commodity.yield}>
                          <input className={inputClass} defaultValue={c.hasil} />
                        </Field>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label={r.commodity.farms}>
                    <input className={inputClass} defaultValue="480" />
                  </Field>
                  <Field label={r.commodity.season}>
                    <input className={inputClass} defaultValue={r.commodity.seasonValue} />
                  </Field>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-[28px] tracking-tight">{r.team.title}</h1>
                <p className="mt-1 text-sm text-muted">{r.team.desc}</p>
                <div className="mt-8 space-y-3">
                  {members.map((m) => (
                    <div key={m.n} className="grid gap-3 rounded-2xl border border-line p-3 sm:grid-cols-[1fr_1fr_170px]">
                      <input className={inputClass} defaultValue={m.n} />
                      <input className={inputClass} defaultValue={m.e} />
                      <select className={inputClass} defaultValue={r.team.roles[m.r]}>
                        {r.team.roles.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                  <button className="inline-flex items-center gap-2 rounded-full border border-dashed border-ink/25 px-4 py-2 text-sm text-muted hover:text-ink">
                    <Plus className="size-4" /> {r.team.add}
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="py-6 text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime">
                  <Check className="size-7 text-forest-900" />
                </span>
                <h1 className="mt-6 text-[28px] tracking-tight">{r.done.title}</h1>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">{r.done.desc}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <PillLink href="/koperasi">{r.done.dashboard}</PillLink>
                  <PillLink href="/koperasi/petani/baru" variant="outline" arrow={false}>
                    {r.done.addFarmer}
                  </PillLink>
                </div>
              </div>
            )}

            {step < 3 && (
              <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
                <PillButton variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                  {r.back}
                </PillButton>
                <PillButton arrow onClick={() => setStep((s) => s + 1)}>
                  {step === 2 ? r.finish : r.next}
                </PillButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
