import type { Metadata } from "next";
import { FileCheck2, Link2, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { Tag } from "@/components/ui";
import { paket } from "@/lib/data";
import { HashForm } from "./hash-form";

export const metadata: Metadata = { title: "Verify a lot" };

export default function VerifikasiPage() {
  const contoh = paket.find((p) => p.status === "diterima")!.hash;
  return (
    <>
      <section className="relative overflow-hidden bg-forest-900 text-white">
        <div className="pointer-events-none absolute -right-24 top-24 size-[460px] rotate-45 rounded-[70px] bg-forest-800/70" />
        <SiteNav active="/verifikasi" />
        <div className="relative mx-auto max-w-[1280px] px-4 pb-20 pt-36 sm:px-8 sm:pt-44">
          <Tag light>For EU operators and importers</Tag>
          <h1 className="mt-5 max-w-3xl text-[42px] leading-[1.04] tracking-[-0.03em] sm:text-[64px]">
            Verify a lot&apos;s origin chain
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">
            Paste the package hash printed on the DDS summary, or scan its QR code. We recompute it and check it against
            the record anchored on the Stellar public network, so you don&apos;t have to trust the cooperative or us.
          </p>
          <div className="mt-8 max-w-2xl">
            <HashForm example={contoh} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-4 px-4 py-16 sm:px-8 md:grid-cols-3">
        {[
          {
            icon: FileCheck2,
            t: "Package integrity",
            d: "The SHA-256 of the files you received must match the hash recorded when the package was sent.",
          },
          {
            icon: Link2,
            t: "Anchored on Stellar",
            d: "Deposit and lot events are batched hourly into one Merkle root, written to the public chain in a single transaction.",
          },
          {
            icon: ShieldCheck,
            t: "No personal data on-chain",
            d: "Farmer data and plot geometry stay off-chain. Public plot IDs are salted hashes that cannot be traced back.",
          },
        ].map((x) => (
          <div key={x.t} className="rounded-[var(--radius-card)] border border-line bg-paper p-6">
            <span className="grid size-10 place-items-center rounded-full bg-lime text-forest-900">
              <x.icon className="size-5" />
            </span>
            <p className="mt-8 font-medium">{x.t}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.d}</p>
          </div>
        ))}
      </section>
      <SiteFooter />
    </>
  );
}
