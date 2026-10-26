import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import type { StatusKebun, StatusSkrining } from "@/lib/data";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/** Logo Farmlink. `light` dipakai di atas latar gelap (hijau tua diganti putih). */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Image
      src={light ? "/images/logo-nobg-light.png" : "/images/logo-nobg-trim.png"}
      alt="FarmLink"
      width={777}
      height={163}
      loading="eager"
      className={cx("h-7 w-auto", className)}
    />
  );
}

/** Lingkaran gelap berisi panah, ciri khas tombol di desain acuan. */
export function ArrowDot({ size = "md", tone = "dark" }: { size?: "sm" | "md"; tone?: "dark" | "lime" }) {
  return (
    <span
      className={cx(
        "grid place-items-center rounded-full transition-transform group-hover:rotate-45",
        size === "sm" ? "size-6" : "size-8",
        tone === "dark" ? "bg-ink text-lime" : "bg-lime text-ink",
      )}
    >
      <ArrowUpRight className={size === "sm" ? "size-3.5" : "size-4"} strokeWidth={2.4} />
    </span>
  );
}

type PillProps = {
  href: string;
  children: ReactNode;
  variant?: "lime" | "dark" | "outline" | "ghost-light";
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function PillLink({ href, children, variant = "lime", arrow = true, className, ...rest }: PillProps) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-3 rounded-full text-sm font-medium transition-colors",
        arrow ? "py-1.5 pl-5 pr-1.5" : "px-5 py-2.5",
        variant === "lime" && "bg-lime text-ink hover:bg-lime-deep",
        variant === "dark" && "bg-forest-900 text-white hover:bg-forest-800",
        variant === "outline" && "border border-line bg-paper text-ink hover:border-ink/40",
        variant === "ghost-light" && "border border-white/25 text-white hover:bg-white/10",
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && <ArrowDot tone={variant === "dark" ? "lime" : "dark"} />}
    </Link>
  );
}

export function PillButton({
  children,
  variant = "lime",
  arrow = false,
  className,
  ...rest
}: { variant?: "lime" | "dark" | "outline"; arrow?: boolean } & ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cx(
        "group inline-flex items-center justify-center gap-3 rounded-full text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        arrow ? "py-1.5 pl-5 pr-1.5" : "px-5 py-2.5",
        variant === "lime" && "bg-lime text-ink hover:bg-lime-deep",
        variant === "dark" && "bg-forest-900 text-white hover:bg-forest-800",
        variant === "outline" && "border border-line bg-paper text-ink hover:border-ink/40",
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && <ArrowDot tone={variant === "dark" ? "lime" : "dark"} />}
    </button>
  );
}

/** Label kecil miring bergaris tepi, seperti "Farming Made Smarter" di desain acuan. */
export function Tag({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex rounded-full border px-3 py-1 text-xs italic",
        light ? "border-white/30 text-white/80" : "border-ink/25 text-ink/70",
      )}
    >
      {children}
    </span>
  );
}

const skriningStyle: Record<StatusSkrining, string> = {
  hijau: "bg-ok-soft text-ok",
  kuning: "bg-warn-soft text-warn",
  merah: "bg-bad-soft text-bad",
};

export function SkriningBadge({ status }: { status: StatusSkrining | null }) {
  if (!status) return <Badge tone="neutral">Belum diskrining</Badge>;
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize", skriningStyle[status])}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

const kebunLabel: Record<StatusKebun, { label: string; tone: BadgeTone }> = {
  "belum-dipetakan": { label: "Belum dipetakan", tone: "neutral" },
  terpetakan: { label: "Terpetakan", tone: "info" },
  tervalidasi: { label: "Tervalidasi", tone: "info" },
  hijau: { label: "Hijau · legalitas kurang", tone: "ok" },
  kuning: { label: "Kuning · ditinjau", tone: "warn" },
  merah: { label: "Merah", tone: "bad" },
  "siap-ekspor": { label: "Siap ekspor", tone: "lime" },
  dipisahkan: { label: "Dipisahkan", tone: "bad" },
  "skrining-ulang": { label: "Perlu skrining ulang", tone: "warn" },
};

export function KebunStatusBadge({ status }: { status: StatusKebun }) {
  const s = kebunLabel[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

type BadgeTone = "neutral" | "ok" | "warn" | "bad" | "info" | "lime" | "dark";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: BadgeTone }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "bg-ink/[0.06] text-ink/70",
        tone === "ok" && "bg-ok-soft text-ok",
        tone === "warn" && "bg-warn-soft text-warn",
        tone === "bad" && "bg-bad-soft text-bad",
        tone === "info" && "bg-info-soft text-info",
        tone === "lime" && "bg-lime text-forest-900",
        tone === "dark" && "bg-forest-900 text-lime",
      )}
    >
      {children}
    </span>
  );
}

export function Card({ children, className, dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div
      className={cx(
        "rounded-[var(--radius-card)]",
        dark ? "bg-forest-900 text-white" : "border border-line bg-paper",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, desc, action }: { title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-4">
      <div>
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {desc && <p className="mt-0.5 text-sm text-muted">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  desc,
  actions,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <Tag>{eyebrow}</Tag>}
        <h1 className="mt-3 text-[28px] leading-tight tracking-tight sm:text-[32px]">{title}</h1>
        {desc && <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "paper",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "paper" | "lime" | "dark";
}) {
  return (
    <div
      className={cx(
        "rounded-[var(--radius-card)] p-5",
        tone === "paper" && "border border-line bg-paper",
        tone === "lime" && "bg-lime text-forest-900",
        tone === "dark" && "bg-forest-900 text-white",
      )}
    >
      <p className={cx("text-sm", tone === "dark" ? "text-white/70" : tone === "lime" ? "text-forest-900/75" : "text-muted")}>{label}</p>
      <p className="mt-3 text-[34px] leading-none tracking-tight">{value}</p>
      {hint && (
        <p className={cx("mt-3 text-xs", tone === "dark" ? "text-white/55" : tone === "lime" ? "text-forest-900/65" : "text-muted")}>{hint}</p>
      )}
    </div>
  );
}

export function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <th className={cx("whitespace-nowrap px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted", className)}>
      {children}
    </th>
  );
}

export function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cx("px-5 py-3.5 align-middle", className)}>{children}</td>;
}

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">{children}</table>
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm outline-none transition placeholder:text-ink/35 focus:border-forest-700 focus:ring-2 focus:ring-lime/60";

export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("font-mono text-[12.5px] tracking-tight", className)}>{children}</span>;
}

export function KeyVal({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <span className="text-muted">{k}</span>
      <span className="text-right font-medium">{v}</span>
    </div>
  );
}

const lotStatusMap: Record<string, { t: string; tone: BadgeTone }> = {
  draf: { t: "Draf", tone: "neutral" },
  "perlu-catatan": { t: "Volume perlu catatan", tone: "warn" },
  "siap-paket": { t: "Siap dipaketkan", tone: "ok" },
  terkirim: { t: "Paket terkirim", tone: "lime" },
};

export function LotStatus({ status }: { status: string }) {
  const s = lotStatusMap[status];
  return <Badge tone={s.tone}>{s.t}</Badge>;
}
