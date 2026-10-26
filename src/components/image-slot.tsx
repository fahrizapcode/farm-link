"use client";

import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cx } from "./ui";

/**
 * Slot gambar. Selama file di /public/images belum ada, yang tampil hanya
 * kotak netral berisi nama file yang dibutuhkan.
 */
export function ImageSlot({
  name,
  alt,
  className,
  rounded = "rounded-[var(--radius-card)]",
  hideLabel = false,
}: {
  name: string;
  alt: string;
  className?: string;
  rounded?: string;
  hideLabel?: boolean;
}) {
  const [missing, setMissing] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const src = `/images/${name}`;

  // Gambar bisa gagal dimuat sebelum hydration, saat onError belum terpasang.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  // Jangan tambahkan `relative` bila pemanggil sudah memposisikan slot secara absolut.
  const positioned = /(^|\s)(absolute|fixed)(\s|$)/.test(className ?? "");

  return (
    <div className={cx("image-slot overflow-hidden", !positioned && "relative", rounded, className)}>
      {!missing && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={alt}
          className="absolute inset-0 size-full object-cover"
          onError={() => setMissing(true)}
        />
      )}
      {missing && !hideLabel && (
        <div className="absolute inset-0 grid place-items-center p-3 text-center">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-paper/80 px-3 py-1 font-mono text-[11px] text-forest-800 backdrop-blur">
            <ImageIcon className="size-3.5 shrink-0" />
            <span className="truncate">{src}</span>
          </span>
        </div>
      )}
    </div>
  );
}
