"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowDot } from "@/components/ui";
import { useLang } from "@/lib/i18n";

export function HashForm({ example }: { example: string }) {
  const router = useRouter();
  const { t } = useLang();
  const [hash, setHash] = useState(example);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/verifikasi/${encodeURIComponent(hash.trim() || example)}`);
      }}
    >
      <div className="flex flex-col gap-2 rounded-[28px] bg-white/[0.08] p-2 ring-1 ring-white/15 sm:flex-row sm:rounded-full">
        <input
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 font-mono text-[13px] text-white outline-none placeholder:text-white/40"
          placeholder={t.verify.placeholder}
        />
        <button
          type="submit"
          className="group inline-flex items-center justify-between gap-3 rounded-full bg-lime py-1.5 pl-5 pr-1.5 text-sm font-medium text-forest-900"
        >
          {t.verify.button}
          <ArrowDot />
        </button>
      </div>
      <p className="mt-3 px-2 text-xs text-white/50">{t.verify.example}</p>
    </form>
  );
}
