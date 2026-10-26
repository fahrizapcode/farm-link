import type { Metadata } from "next";
import { LotBuilder } from "./builder";

export const metadata: Metadata = { title: "Bentuk lot" };

export default function Page() {
  return <LotBuilder />;
}
