import { Camera } from "lucide-react";
import { cx } from "./ui";

/** Tempat foto yang nanti diunggah pengguna (foto lapangan, citra satelit). Bukan aset statis. */
export function PhotoPlaceholder({ label, sub, className }: { label: string; sub?: string; className?: string }) {
  return (
    <div className={cx("image-slot flex flex-col items-center justify-center gap-1 rounded-2xl p-3 text-center", className)}>
      <Camera className="size-5 text-forest-700/60" />
      <span className="text-xs font-medium text-forest-800">{label}</span>
      {sub && <span className="font-mono text-[10.5px] text-forest-800/60">{sub}</span>}
    </div>
  );
}
