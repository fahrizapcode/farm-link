import { Logo, PillLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <Logo />
        <p className="mt-10 text-[96px] leading-none tracking-tighter text-forest-900">404</p>
        <p className="mt-3 text-muted">Halaman tidak ditemukan.</p>
        <PillLink href="/" className="mt-8">
          Kembali ke beranda
        </PillLink>
      </div>
    </div>
  );
}
