import { FileCheck2, Link2, Map, Satellite, ShieldCheck, WifiOff } from "lucide-react";
import { ImageSlot } from "@/components/image-slot";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { Steps } from "@/components/landing/steps";
import { Voices } from "@/components/landing/voices";
import { PillLink, Tag } from "@/components/ui";

const features = [
  {
    icon: WifiOff,
    title: "Pemetaan offline",
    body: "Titik untuk kebun sampai 4 ha, poligon jalan-keliling di atasnya. 6 desimal WGS-84, tanpa sinyal.",
  },
  {
    icon: Satellite,
    title: "Skrining deforestasi",
    body: "Dicocokkan dengan tutupan hutan 2020 dan kawasan hutan negara. Hasil hijau, kuning, atau merah.",
  },
  {
    icon: FileCheck2,
    title: "Legalitas dan persetujuan",
    body: "e-STDB, surat lahan, pernyataan tenaga kerja, dan persetujuan petani per cakupan data.",
  },
  {
    icon: Link2,
    title: "Rantai lot di Stellar",
    body: "Hash setiap setoran dan lot ditulis ke chain publik. Pembeli mengecek sendiri, tanpa harus percaya kami.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[640px] overflow-hidden bg-forest-900 sm:min-h-[720px]">
        <ImageSlot
          name="hero-kebun-kopi.jpg"
          alt="Hamparan kebun kopi berundak di dataran tinggi"
          rounded=""
          className="absolute inset-0 -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/80 via-forest-950/15 to-forest-950/40" />
        <SiteNav active="/" />
        <div className="mx-auto flex min-h-[640px] max-w-[1280px] flex-col justify-end gap-10 px-4 pb-14 pt-32 sm:min-h-[720px] sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="max-w-3xl text-[44px] leading-[1.02] tracking-[-0.03em] text-white sm:text-[68px] lg:text-[80px]">
            Data EUDR yang
            <br />
            berangkat dari
            <br />
            kebun petani
          </h1>
          <div className="max-w-xs text-white">
            <p className="text-sm leading-relaxed text-white/80">
              Petakan kebun tanpa sinyal, skrining deforestasi, lengkapi legalitas, dan kirim paket data per lot yang
              diterima pembeli Eropa tanpa revisi.
            </p>
            <PillLink href="/daftar" className="mt-5">
              Mulai sekarang
            </PillLink>
          </div>
        </div>
      </section>

      {/* MISI + ANGKA */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-24">
        <Tag>Tenggat 30 Desember 2026</Tag>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <h2 className="text-[38px] leading-[1.05] tracking-[-0.02em] sm:text-[52px]">
            Membawa ketertelusuran ke hulu
          </h2>
          <div>
            <p className="text-lg leading-relaxed sm:text-[22px]">
              Pembeli Eropa wajib membuktikan setiap biji kopi atau kakao berasal dari kebun yang tidak dideforestasi
              setelah 2020. Datanya harus datang dari hulu, dan hulunya adalah petani kecil yang belum terpetakan.
            </p>
            <PillLink href="#cara-kerja" className="mt-6">
              Lihat cara kerjanya
            </PillLink>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <ImageSlot name="petani-memetik-kopi.jpg" alt="Petani memetik buah kopi merah" className="aspect-[4/3.4]" />
          <div className="flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-5">
            <p className="text-[44px] leading-none tracking-tight sm:text-[52px]">
              &lt;1<span className="align-top text-2xl">%</span>
            </p>
            <div>
              <p className="text-[15px] font-medium">Petani swadaya siap EUDR</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Yang saat ini memenuhi syarat ketertelusuran dan legalitas.
              </p>
            </div>
          </div>
          <ImageSlot name="biji-kopi-kakao.jpg" alt="Biji kopi hijau dan biji kakao kering" className="aspect-[4/3.4]" />
          <div className="flex flex-col justify-between rounded-[var(--radius-card)] bg-lime p-5 text-forest-900">
            <p className="text-[44px] leading-none tracking-tight sm:text-[52px]">
              90<span className="align-top text-2xl">%+</span>
            </p>
            <div>
              <p className="text-[15px] font-medium">Kebun kopi dikelola rakyat</p>
              <p className="mt-1 text-xs leading-relaxed text-forest-900/70">
                Data harus dikumpulkan kebun demi kebun, langsung dari lapangan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FITUR (gelap) */}
      <section id="fitur" className="px-3 sm:px-6">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] bg-forest-900 px-5 py-14 text-white sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute -left-24 top-10 size-[420px] rotate-45 rounded-[60px] bg-forest-800/60" />
          <div className="relative">
            <Tag light>Fitur utama</Tag>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <h2 className="text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
                Satu paket data,
                <br />
                dari kebun sampai importir
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/70 lg:justify-self-end">
                Ringkasan DDS, GeoJSON tervalidasi, hasil skrining, bukti legalitas, lembar risiko, dan rantai setoran.
                Dicek dulu sebelum dikirim, supaya DDS pembeli tidak ditolak.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
              <ImageSlot
                name="enumerator-memetakan-kebun.jpg"
                alt="Enumerator memetakan batas kebun dengan ponsel"
                className="min-h-[280px] lg:min-h-full"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((f, i) => (
                  <div
                    key={f.title}
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
                      <f.icon className="size-4" />
                    </span>
                    <p className="mt-10 text-[15px] font-medium">{f.title}</p>
                    <p className={i === 0 ? "mt-1.5 text-xs leading-relaxed text-forest-900/70" : "mt-1.5 text-xs leading-relaxed text-white/60"}>
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section id="cara-kerja" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28">
        <Tag>Mulai dengan mudah</Tag>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <h2 className="text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            Petakan sekali,
            <br />
            pakai untuk banyak pembeli
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:justify-self-end">
            Setiap kebun dipetakan sekali, lalu datanya dipakai untuk banyak pembeli dan untuk pendaftaran e-STDB,
            selalu dengan izin petani.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="grid grid-cols-[1.15fr_1fr] gap-3">
            <ImageSlot name="langkah-pemetaan.jpg" alt="Kebun kopi berundak" className="row-span-2 min-h-[300px]" />
            <ImageSlot name="langkah-skrining.jpg" alt="Hamparan kebun dari ketinggian" className="aspect-[4/3]" />
            <ImageSlot name="langkah-setoran.jpg" alt="Karung kopi di gudang koperasi" className="aspect-[4/3]" />
            <ImageSlot name="langkah-ekspor.jpg" alt="Kebun kopi saat matahari terbit" className="col-span-2 aspect-[3/1]" />
          </div>
          <div className="lg:pt-2">
            <Steps />
          </div>
        </div>
      </section>

      {/* SUARA (gelap) */}
      <section className="px-3 sm:px-6">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] bg-forest-900 px-5 py-14 text-white sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute -left-10 top-0 size-[360px] rotate-45 rounded-[60px] bg-forest-800/60" />
          <div className="relative">
            <Tag light>Untuk siapa</Tag>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <h2 className="text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
                Dibangun dari
                <br />
                kebutuhan lapangan
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/70 lg:justify-self-end">
                Koperasi yang membayar, petani pemilik data, enumerator yang memetakan, dan pembeli yang menanggung
                risiko DDS. Masing-masing punya kebutuhan sendiri.
              </p>
            </div>
            <div className="mt-12">
              <Voices />
            </div>
          </div>
        </div>
      </section>

      {/* HARGA */}
      <section id="harga" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28">
        <Tag>Harga sederhana</Tag>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <h2 className="text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            Bayar per kebun,
            <br />
            mulai tanpa kontrak besar
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:justify-self-end">
            Koperasi membayar jasa pemetaan sekali di awal, lalu langganan per kebun per tahun. Petani tidak membayar.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6">
            <Map className="size-5 text-forest-700" />
            <p className="mt-8 text-sm text-muted">Jasa pemetaan lapangan</p>
            <p className="mt-1 text-[40px] leading-none tracking-tight">Rp40.000</p>
            <p className="mt-1 text-sm text-muted">per kebun, sekali</p>
            <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
              <li>Enumerator terlatih dan QC</li>
              <li>Titik atau poligon, foto bergeotag</li>
              <li>Persetujuan petani per cakupan</li>
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] bg-lime p-6 text-forest-900">
            <ShieldCheck className="size-5" />
            <p className="mt-8 text-sm text-forest-900/70">Langganan platform</p>
            <p className="mt-1 text-[40px] leading-none tracking-tight">Rp30.000</p>
            <p className="mt-1 text-sm text-forest-900/70">per kebun, per tahun</p>
            <ul className="mt-6 space-y-2 border-t border-forest-900/15 pt-5 text-sm">
              <li>Skrining dan skrining ulang tahunan</li>
              <li>Setoran, lot, dan paket data</li>
              <li>Arsip bukti 5 tahun</li>
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] bg-forest-900 p-6 text-white">
            <p className="text-sm text-white/60">Gambaran 500 kebun</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/70">Tahun 1</span>
                <span>Rp35 juta</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/70">Tahun 2 dst.</span>
                <span>± Rp15 juta</span>
              </div>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/55">
              Angka masih diuji bersama koperasi pilot. Tahun berikutnya hanya kebun baru yang perlu dipetakan.
            </p>
            <PillLink href="/daftar" className="mt-6">
              Daftarkan koperasi
            </PillLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-forest-900">
        <ImageSlot
          name="cta-kebun-kakao.jpg"
          alt="Kebun kakao di bawah naungan pohon"
          rounded=""
          className="absolute inset-0 -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/85 via-forest-950/30 to-transparent" />
        <div className="mx-auto flex min-h-[520px] max-w-[1280px] flex-col justify-end gap-8 px-4 pb-14 pt-40 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Tag light>Mari mulai</Tag>
            <h2 className="mt-4 text-[40px] leading-[1.04] tracking-[-0.02em] text-white sm:text-[56px]">
              Siap mengirim ke
              <br />
              pasar Eropa?
            </h2>
          </div>
          <div className="max-w-sm text-white">
            <p className="text-sm leading-relaxed text-white/80">
              Tenggat untuk pembeli mikro dan kecil 30 Juni 2027. Petakan pemasok Anda sekarang, sebelum pembeli
              memilih pemasok lain.
            </p>
            <PillLink href="/daftar" className="mt-5">
              Daftarkan koperasi
            </PillLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
