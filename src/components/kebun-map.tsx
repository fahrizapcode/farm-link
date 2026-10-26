import type { Geometri, StatusSkrining } from "@/lib/data";
import { cx } from "./ui";

const statusColor: Record<StatusSkrining, string> = {
  hijau: "#1f9d55",
  kuning: "#c98a00",
  merah: "#cf3f37",
};

/**
 * Peta skematis kebun: titik atau poligon di atas grid, plus arsiran
 * "piksel hutan 2020" bila skrining kuning/merah. Nanti diganti peta sungguhan
 * (MapLibre + citra satelit) saat backend GIS tersambung.
 */
export function KebunMap({
  geometri,
  status,
  className,
  showForest = true,
  compareWith,
}: {
  geometri?: Geometri;
  status: StatusSkrining | null;
  className?: string;
  showForest?: boolean;
  compareWith?: Geometri;
}) {
  const W = 400;
  const H = 260;
  const color = status ? statusColor[status] : "#2c5e34";

  if (!geometri) {
    return (
      <div className={cx("map-grid grid place-items-center rounded-2xl text-sm text-muted", className)}>
        Belum ada geometri
      </div>
    );
  }

  const all = [...geometri.koordinat, ...(compareWith?.koordinat ?? [])];
  const lons = all.map((c) => c[0]);
  const lats = all.map((c) => c[1]);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const span = Math.max(maxLon - minLon, maxLat - minLat, 0.002);
  const scale = (Math.min(W, H) * 0.62) / span;
  const cxLon = (minLon + maxLon) / 2;
  const cyLat = (minLat + maxLat) / 2;
  const project = ([lon, lat]: [number, number]) =>
    [W / 2 + (lon - cxLon) * scale, H / 2 - (lat - cyLat) * scale] as const;

  const toPath = (g: Geometri) => g.koordinat.map((c) => project(c).join(",")).join(" ");
  const forestOn = showForest && (status === "kuning" || status === "merah");

  return (
    <div className={cx("map-grid relative overflow-hidden rounded-2xl", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="size-full" role="img" aria-label="Sketsa geometri kebun">
        <defs>
          <pattern id="forest" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="#1f4a27" fillOpacity="0.18" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="#1f4a27" strokeOpacity="0.45" strokeWidth="3" />
          </pattern>
        </defs>

        {/* kontur dekoratif */}
        <path d="M-20 200 C 80 150, 160 230, 260 180 S 420 120, 440 150" fill="none" stroke="#0f2a14" strokeOpacity="0.08" strokeWidth="1.5" />
        <path d="M-20 90 C 70 60, 170 120, 250 70 S 400 40, 440 60" fill="none" stroke="#0f2a14" strokeOpacity="0.08" strokeWidth="1.5" />

        {forestOn && (
          <path
            d={status === "merah" ? "M150 40 L330 20 L380 150 L260 210 L170 160 Z" : "M200 -10 L420 -10 L420 70 L300 95 L230 60 Z"}
            fill="url(#forest)"
          />
        )}

        {compareWith && compareWith.jenis === "poligon" && (
          <polygon points={toPath(compareWith)} fill="none" stroke="#0f1a12" strokeOpacity="0.35" strokeDasharray="5 4" strokeWidth="1.5" />
        )}

        {geometri.jenis === "poligon" ? (
          <>
            <polygon points={toPath(geometri)} fill={color} fillOpacity="0.22" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
            {geometri.koordinat.slice(0, -1).map((c, i) => {
              const [x, y] = project(c);
              return <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke={color} strokeWidth="2" />;
            })}
          </>
        ) : (
          (() => {
            const [x, y] = project(geometri.koordinat[0]);
            return (
              <>
                <circle cx={x} cy={y} r={Math.max(18, geometri.akurasiM * 5)} fill={color} fillOpacity="0.12" stroke={color} strokeOpacity="0.4" strokeDasharray="4 3" />
                <circle cx={x} cy={y} r="9" fill={color} stroke="#fff" strokeWidth="3" />
              </>
            );
          })()
        )}
      </svg>

      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 text-[11px]">
        <span className="rounded-full bg-paper/90 px-2.5 py-1 font-mono">
          {geometri.koordinat[0][1].toFixed(6)}, {geometri.koordinat[0][0].toFixed(6)}
        </span>
        <span className="rounded-full bg-paper/90 px-2.5 py-1">±{geometri.akurasiM} m</span>
      </div>
      {forestOn && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-2.5 py-1 text-[11px]">
          <span className="size-2.5 rounded-sm bg-forest-700/60" />
          Piksel hutan 2020 (JRC)
        </span>
      )}
    </div>
  );
}
