import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, ChevronLeft, Download, ExternalLink, XCircle } from "lucide-react";
import { Logo, Mono, PillLink, Tag } from "@/components/ui";
import { formatKg, getKebun, getLot, koperasi, paket, setoranLot } from "@/lib/data";

export function generateStaticParams() {
  return paket.filter((p) => p.status === "diterima").map((p) => ({ hash: p.hash }));
}

export default function Page({ params }: PageProps<"/verifikasi/[hash]">) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between px-4 py-4 sm:px-8">
          <Link href="/">
            <Logo />
          </Link>
          <span className="text-xs text-muted">Lot verification · public</span>
        </div>
      </header>
      <main className="mx-auto max-w-[1080px] px-4 py-10 sm:px-8">
        <Link href="/verifikasi" className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <ChevronLeft className="size-4" /> Verify another
        </Link>
        <Suspense>
          <Result params={params} />
        </Suspense>
      </main>
    </div>
  );
}

const plotStatus = { hijau: "Compliant (green)", kuning: "Under review", merah: "Excluded" } as const;

async function Result({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;
  const p = paket.find((x) => x.hash === decodeURIComponent(hash));

  if (!p) {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-paper p-8 text-center">
        <XCircle className="mx-auto size-10 text-bad" />
        <h1 className="mt-4 text-2xl tracking-tight">No matching record</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          This hash was not found among anchored packages. Check that you copied the full 64-character hash, or contact the
          supplier.
        </p>
        <p className="mt-4 break-all font-mono text-xs text-muted">{decodeURIComponent(hash)}</p>
      </div>
    );
  }

  const l = getLot(p.lotId)!;
  const st = setoranLot(l);
  const plots = [...new Set(st.map((s) => s.kebunId))].map((id) => getKebun(id)!);

  const events = [
    ...st.map((s) => ({ t: s.tanggalSetor, label: `Deposit ${s.beratKg} kg recorded`, hash: s.hash })),
    { t: l.dibuat, label: `Lot ${l.kode} formed from ${st.length} deposits`, hash: l.merkleRoot ?? "" },
    { t: p.tanggalKirim ?? "", label: "Data package sent to buyer", hash: `${p.hash.slice(0, 4)}…${p.hash.slice(-4)}` },
  ];

  return (
    <>
      <div className="relative overflow-hidden rounded-[28px] bg-forest-900 p-6 text-white sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rotate-45 rounded-[50px] bg-forest-800/70" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1.5 text-sm font-medium text-forest-900">
            <CheckCircle2 className="size-4" /> Hash matches the on-chain record
          </span>
          <h1 className="mt-6 text-[34px] leading-tight tracking-tight sm:text-[44px]">Lot {l.kode}</h1>
          <p className="mt-2 text-sm text-white/70">
            Green coffee, Arabica · HS {l.kodeHS} · {formatKg(l.beratBersihKg).replace(" kg", " kg net")} · Indonesia
          </p>
          <div className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <p className="text-white/50">Supplier</p>
              <p className="mt-1">{koperasi.nama}</p>
            </div>
            <div>
              <p className="text-white/50">Buyer</p>
              <p className="mt-1">{p.pembeli}</p>
            </div>
            <div>
              <p className="text-white/50">DDS reference</p>
              <p className="mt-1 font-mono text-xs">{p.nomorDDS ?? "—"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[var(--radius-card)] border border-line bg-paper">
          <div className="border-b border-line px-5 py-4">
            <h2 className="font-semibold">Chain of custody</h2>
            <p className="text-sm text-muted">Each event is hashed and anchored hourly on Stellar.</p>
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
            <h2 className="font-semibold">Anchor</h2>
            <div className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted">Network</span>
                <span>Stellar public</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted">Transaction</span>
                <Mono>{p.stellarTx}</Mono>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted">Merkle root</span>
                <Mono>{l.merkleRoot}</Mono>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted">Anchored</span>
                <span>{p.tanggalKirim}</span>
              </div>
            </div>
            <Link href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm text-forest-700 hover:underline">
              View on Stellar explorer <ExternalLink className="size-3.5" />
            </Link>
          </div>

          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
            <h2 className="font-semibold">Plots of origin</h2>
            <p className="text-xs text-muted">Pseudonymous IDs. Geometry is in the GeoJSON file of the package.</p>
            <ul className="mt-3 divide-y divide-line">
              {plots.map((k) => (
                <li key={k.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <Mono>{k.idPublik}</Mono>
                  <span className="text-xs text-ok">
                    {k.skriningTerakhir ? plotStatus[k.skriningTerakhir] : "—"} · {k.luasHa} ha
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-card)] bg-lime p-5 text-forest-900">
            <Tag>Package files</Tag>
            <p className="mt-3 text-sm">DDS summary, GeoJSON, screening, legality, risk sheet, deposit chain.</p>
            <PillLink href="#" variant="dark" className="mt-4">
              <Download className="size-4" /> Download package
            </PillLink>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted">
        Screening results are indications based on public satellite data (JRC GFC 2020, Hansen GFC) and are not a legal
        determination. Farmlink provides data and process, not a certificate. Risk assessment and the DDS remain the
        operator&apos;s responsibility.
      </p>
    </>
  );
}
