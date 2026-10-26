"use client";

import Link from "next/link";
import { CheckCircle2, ChevronLeft, Download, ExternalLink, XCircle } from "lucide-react";
import { LangSwitch } from "@/components/lang-switch";
import { Logo, Mono, PillLink, Tag } from "@/components/ui";
import { getKebun, getLot, koperasi, paket, setoranLot } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export function ResultView({ hash }: { hash: string }) {
  const { t, lang } = useLang();
  const r = t.verify.result;
  const p = paket.find((x) => x.hash === hash);

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-muted sm:inline">{r.header}</span>
            <LangSwitch />
          </div>
        </div>
      </header>
      <main className="page-enter mx-auto max-w-[1080px] px-4 py-10 sm:px-8">
        <Link href="/verifikasi" className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <ChevronLeft className="size-4" /> {r.another}
        </Link>
        {p ? renderFound(p) : renderNotFound()}
      </main>
    </div>
  );

  function renderNotFound() {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-paper p-8 text-center">
        <XCircle className="mx-auto size-10 text-bad" />
        <h1 className="mt-4 text-2xl tracking-tight">{r.notFound}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">{r.notFoundBody}</p>
        <p className="mt-4 break-all font-mono text-xs text-muted">{hash}</p>
      </div>
    );
  }

  function renderFound(p: (typeof paket)[number]) {
    const l = getLot(p.lotId)!;
    const st = setoranLot(l);
    const plots = [...new Set(st.map((s) => s.kebunId))].map((id) => getKebun(id)!);
    const kg = l.beratBersihKg.toLocaleString(lang === "en" ? "en-GB" : "id-ID");

    const events = [
      ...st.map((s) => ({ t: s.tanggalSetor, label: r.deposit(s.beratKg), hash: s.hash })),
      { t: l.dibuat, label: r.lotFormed(l.kode, st.length), hash: l.merkleRoot ?? "" },
      { t: p.tanggalKirim ?? "", label: r.sent, hash: `${p.hash.slice(0, 4)}…${p.hash.slice(-4)}` },
    ];

    return (
      <>
        <div className="relative overflow-hidden rounded-[28px] bg-forest-900 p-6 text-white sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rotate-45 rounded-[50px] bg-forest-800/70" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1.5 text-sm font-medium text-forest-900">
              <CheckCircle2 className="size-4" /> {r.match}
            </span>
            <h1 className="mt-6 text-[34px] leading-tight tracking-tight sm:text-[44px]">Lot {l.kode}</h1>
            <p className="mt-2 text-sm text-white/70">
              {r.product} · HS {l.kodeHS} · {kg} kg {r.net} · Indonesia
            </p>
            <div className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <p className="text-white/50">{r.supplier}</p>
                <p className="mt-1">{koperasi.nama}</p>
              </div>
              <div>
                <p className="text-white/50">{r.buyer}</p>
                <p className="mt-1">{p.pembeli}</p>
              </div>
              <div>
                <p className="text-white/50">{r.dds}</p>
                <p className="mt-1 font-mono text-xs">{p.nomorDDS ?? "—"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-[var(--radius-card)] border border-line bg-paper">
            <div className="border-b border-line px-5 py-4">
              <h2 className="font-semibold">{r.chain}</h2>
              <p className="text-sm text-muted">{r.chainDesc}</p>
            </div>
            <ol className="space-y-5 p-5">
              {events.map((e, i) => (
                <li key={i} className="relative border-l border-line pl-5">
                  <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-lime ring-2 ring-forest-900" />
                  <p className="text-sm font-medium">{e.label}</p>
                  <p className="text-xs text-muted">
                    {e.t} · <Mono>{e.hash}</Mono>
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid content-start gap-4">
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
              <h2 className="font-semibold">{r.anchor}</h2>
              <div className="mt-3 space-y-2.5 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted">{r.network}</span>
                  <span>{r.networkValue}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted">{r.tx}</span>
                  <Mono>{p.stellarTx}</Mono>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted">{r.merkle}</span>
                  <Mono>{l.merkleRoot}</Mono>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted">{r.anchored}</span>
                  <span>{p.tanggalKirim}</span>
                </div>
              </div>
              <Link href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm text-forest-700 hover:underline">
                {r.explorer} <ExternalLink className="size-3.5" />
              </Link>
            </div>

            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
              <h2 className="font-semibold">{r.plots}</h2>
              <p className="text-xs text-muted">{r.plotsDesc}</p>
              <ul className="mt-3 divide-y divide-line">
                {plots.map((k) => (
                  <li key={k.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <Mono>{k.idPublik}</Mono>
                    <span className="text-xs text-ok">
                      {k.skriningTerakhir ? r.plotStatus[k.skriningTerakhir] : "—"} · {k.luasHa} ha
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-card)] bg-lime p-5 text-forest-900">
              <Tag>{r.files}</Tag>
              <p className="mt-3 text-sm">{r.filesDesc}</p>
              <PillLink href="#" variant="dark" className="mt-4">
                <Download className="size-4" /> {r.download}
              </PillLink>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">{r.disclaimer}</p>
      </>
    );
  }
}
