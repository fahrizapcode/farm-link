import type { Metadata } from "next";
import { RegisterWizard } from "./wizard";

export const metadata: Metadata = { title: "Daftarkan koperasi" };

export default function DaftarPage() {
  return <RegisterWizard />;
}
