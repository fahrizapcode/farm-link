import type { Metadata } from "next";
import { PhoneFrame } from "@/components/phone-frame";

export const metadata: Metadata = { title: "Aplikasi lapangan" };

export default function LapanganLayout({ children }: LayoutProps<"/lapangan">) {
  return (
    <PhoneFrame
      title="Aplikasi enumerator"
      points={[
        "Seluruh alur berjalan dalam mode pesawat; data tersimpan di perangkat sampai 14 hari.",
        "Pemetaan tidak bisa dimulai sebelum persetujuan petani tersimpan.",
        "Titik ditolak bila akurasi GPS lebih buruk dari 10 m; kebun di atas 4 ha wajib poligon.",
        "Kesalahan geometri dikabarkan saat sinkron berikutnya, lengkap dengan cara memperbaikinya.",
      ]}
    >
      {children}
    </PhoneFrame>
  );
}
