"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cx } from "../ui";

const steps = [
  {
    title: "Petakan kebun, sekali saja",
    body: "Enumerator datang ke kebun dengan aplikasi yang jalan tanpa sinyal. Kebun sampai 4 ha cukup satu titik; di atasnya, poligon jalan-keliling. Persetujuan petani dicatat lebih dulu.",
  },
  {
    title: "Skrining dan tinjauan",
    body: "Setiap kebun dicocokkan dengan peta tutupan hutan 2020 dan kawasan hutan negara. Hasilnya hijau, kuning, atau merah; yang kuning ditinjau analis dalam 10 hari kerja.",
  },
  {
    title: "Catat setoran, bentuk lot",
    body: "Pengepul memindai kartu QR petani saat menerima kopi. Lot dibentuk dari setoran, dan volumenya dicek terhadap kapasitas kebun asal.",
  },
  {
    title: "Kirim paket, pembeli verifikasi",
    body: "Ringkasan DDS, GeoJSON, hasil skrining, legalitas, lembar risiko, dan rantai setoran dalam satu paket. Hash-nya tercatat di Stellar dan bisa dicek pembeli sendiri.",
  },
];

export function Steps() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line">
      {steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <button key={s.title} onClick={() => setOpen(i)} className="block w-full py-5 text-left">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <span className="text-[17px]">{s.title}</span>
              </span>
              <span
                className={cx(
                  "grid size-7 shrink-0 place-items-center rounded-full bg-lime text-forest-900 transition-transform",
                  isOpen ? "rotate-0" : "rotate-45",
                )}
              >
                <ArrowUpRight className="size-4" strokeWidth={2.4} />
              </span>
            </div>
            <div className={cx("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <p className="overflow-hidden pl-9 pr-10 pt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
