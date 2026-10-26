import Link from "next/link";
import { Logo } from "../ui";

const cols = [
  {
    title: "Produk",
    links: [
      { href: "/#fitur", label: "Fitur" },
      { href: "/#cara-kerja", label: "Cara kerja" },
      { href: "/#harga", label: "Harga" },
      { href: "/verifikasi", label: "Verifikasi lot" },
    ],
  },
  {
    title: "Masuk sebagai",
    links: [
      { href: "/koperasi", label: "Koperasi" },
      { href: "/lapangan", label: "Enumerator" },
      { href: "/pengepul", label: "Pengepul" },
      { href: "/qc", label: "Peninjau QC" },
    ],
  },
  {
    title: "Rujukan",
    links: [
      { href: "#", label: "Regulasi (EU) 2023/1115" },
      { href: "#", label: "Spesifikasi GeoJSON TRACES" },
      { href: "#", label: "Kebijakan data pribadi" },
      { href: "#", label: "Syarat layanan" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 pt-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Paket data EUDR untuk koperasi dan eksportir kopi dan kakao skala kecil, dari kebun sampai importir.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-medium">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-[1280px] flex-wrap justify-between gap-3 border-t border-line px-4 pt-5 text-xs text-muted sm:px-8">
        <span>© 2026 Farmlink. Farmlink menyediakan data dan proses, bukan sertifikat bebas deforestasi.</span>
        <span>Data petani disimpan di Indonesia · tunduk UU PDP</span>
      </div>
      <p
        aria-hidden
        className="mx-auto -mb-[0.2em] mt-4 max-w-[1280px] select-none px-2 text-center text-[21vw] font-semibold leading-none tracking-[-0.06em] text-forest-900 xl:text-[270px]"
      >
        FARMLINK
      </p>
    </footer>
  );
}
