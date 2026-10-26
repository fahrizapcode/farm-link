import type { Metadata } from "next";
import { paket } from "@/lib/data";
import { VerifyView } from "./verify-view";

export const metadata: Metadata = { title: "Verifikasi lot" };

export default function VerifikasiPage() {
  const contoh = paket.find((p) => p.status === "diterima")!.hash;
  return <VerifyView example={contoh} />;
}
