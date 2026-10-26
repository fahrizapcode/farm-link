import { Suspense } from "react";
import { paket } from "@/lib/data";
import { ResultView } from "./result-view";

export function generateStaticParams() {
  return paket.filter((p) => p.status === "diterima").map((p) => ({ hash: p.hash }));
}

export default function Page({ params }: PageProps<"/verifikasi/[hash]">) {
  return (
    <Suspense>
      <Result params={params} />
    </Suspense>
  );
}

async function Result({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;
  return <ResultView hash={decodeURIComponent(hash)} />;
}
