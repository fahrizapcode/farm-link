"use client";

import { useEffect } from "react";

const HEADER_OFFSET = 16;
const DURATION = 750;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Menganimasikan scroll untuk tautan ke anchor di halaman yang sama (#fitur, /#harga, dst).
 * Dibuat manual dengan requestAnimationFrame supaya durasinya konsisten di semua browser.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      // URL sengaja tidak diubah: router Next memperlakukan pushState sebagai navigasi dan
      // mengembalikan scroll ke atas setelah animasi.
      e.preventDefault();
      e.stopPropagation();

      const start = window.scrollY;
      const target = Math.max(0, el.getBoundingClientRect().top + start - HEADER_OFFSET);
      // "instant" per langkah, supaya tidak bertabrakan dengan scroll-behavior CSS
      const jump = (top: number) => window.scrollTo({ top, behavior: "instant" });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        jump(target);
        return;
      }
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / DURATION);
        jump(start + (target - start) * ease(p));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    // fase capture: jalan sebelum handler navigasi milik <Link>
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
