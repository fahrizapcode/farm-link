import type { Metadata } from "next";
import { PhoneFrame } from "@/components/phone-frame";

export const metadata: Metadata = { title: "Aplikasi setoran" };

export default function PengepulLayout({ children }: LayoutProps<"/pengepul">) {
  return (
    <PhoneFrame
      title="Aplikasi pengepul"
      points={[
        "Pindai kartu QR petani, pilih kebun asal, timbang, simpan. Target di bawah 30 detik.",
        "Bekerja tanpa sinyal; setoran dikirim saat ada jaringan.",
        "Setoran tidak bisa ditautkan ke kebun merah atau yang belum tervalidasi.",
        "Hash setiap setoran dicatat on-chain dalam batch per jam.",
      ]}
    >
      {children}
    </PhoneFrame>
  );
}
