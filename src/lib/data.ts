// Data contoh untuk tahap UI. Nanti diganti dengan data dari backend.
// Semua nama orang, koperasi, dan pembeli di sini fiktif.

export type StatusSkrining = "hijau" | "kuning" | "merah";

export type StatusKebun =
  | "belum-dipetakan"
  | "terpetakan"
  | "tervalidasi"
  | "hijau"
  | "kuning"
  | "merah"
  | "siap-ekspor"
  | "dipisahkan"
  | "skrining-ulang";

export type Komoditas = "Kopi" | "Kakao";

export type CakupanPersetujuan =
  | "pemetaan"
  | "berbagi-pembeli"
  | "berbagi-koperasi"
  | "transfer-luar-negeri"
  | "estdb";

export const cakupanLabel: Record<CakupanPersetujuan, string> = {
  pemetaan: "Pemetaan kebun",
  "berbagi-pembeli": "Berbagi ke pembeli",
  "berbagi-koperasi": "Berbagi ke koperasi lain",
  "transfer-luar-negeri": "Transfer ke luar negeri (UE)",
  estdb: "Pendaftaran e-STDB",
};

export type Petani = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  hp: string;
  nikMasked: string;
  persetujuan: Record<CakupanPersetujuan, "aktif" | "belum" | "ditarik">;
  tanggalPersetujuan: string;
  buktiPersetujuan: "Tanda tangan" | "Rekaman suara";
  legalitas: {
    estdb: "ada" | "tidak-ada" | "kedaluwarsa";
    suratLahan: "ada" | "tidak-ada" | "kedaluwarsa";
    tenagaKerja: "ada" | "tidak-ada";
    kawasanHutan: "di-luar" | "di-tepi" | "di-dalam" | "belum-dicek";
  };
};

export type Geometri = {
  versi: number;
  jenis: "titik" | "poligon";
  // koordinat [lon, lat] WGS-84, 6 desimal
  koordinat: [number, number][];
  akurasiM: number;
  enumerator: string;
  tanggalUkur: string;
  catatan?: string;
};

export type Skrining = {
  tanggal: string;
  versiGeometri: number;
  sumber: string;
  status: StatusSkrining;
  catatan: string;
  putusanQC?: { oleh: string; tanggal: string; alasan: string };
};

export type Kebun = {
  id: string;
  idPublik: string;
  petaniId: string;
  nama: string;
  komoditas: Komoditas;
  luasHa: number;
  status: StatusKebun;
  skriningTerakhir: StatusSkrining | null;
  jatuhTempoSkrining: string;
  umurTanamanTahun: number;
  naungan: string;
  geometri: Geometri[];
  skrining: Skrining[];
};

export type Setoran = {
  id: string;
  petaniId: string;
  kebunId: string;
  beratKg: number;
  tanggalSetor: string;
  periodePanen: string;
  penerima: string;
  jenisPenerima: "Pengepul" | "Koperasi";
  lotId?: string;
  hash: string;
};

export type StatusLot = "draf" | "perlu-catatan" | "siap-paket" | "terkirim";

export type Lot = {
  id: string;
  kode: string;
  komoditas: Komoditas;
  kodeHS: string;
  deskripsi: string;
  setoranIds: string[];
  beratBersihKg: number;
  kapasitasKg: number;
  status: StatusLot;
  dibuat: string;
  catatanPengelola?: string;
  merkleRoot?: string;
};

export type Paket = {
  id: string;
  lotId: string;
  jenis: "Per pengiriman" | "Tahunan";
  pembeli: string;
  negaraPembeli: string;
  emailPembeli: string;
  tanggalKirim: string | null;
  hash: string;
  nomorDDS?: string;
  stellarTx?: string;
  status: "draf" | "siap" | "terkirim" | "diterima";
};

export const koperasi = {
  nama: "Koperasi Produsen Kopi Lestari Gayo",
  singkat: "KP Lestari Gayo",
  alamat: "Jl. Lintas Takengon–Bireuen Km 12, Bebesen, Aceh Tengah, Aceh 24552",
  nib: "9120001234567",
  email: "ekspor@lestarigayo.coop.id",
  kontak: "+62 812 6000 1122",
  hasilPerHaKg: { Kopi: 900, Kakao: 700 } as Record<Komoditas, number>,
};

export const petani: Petani[] = [
  {
    id: "PTN-0001",
    nama: "Sulaiman Aman Ratna",
    desa: "Kute Lot",
    kecamatan: "Kebayakan",
    hp: "0812-6611-2041",
    nikMasked: "1104••••••••0012",
    persetujuan: {
      pemetaan: "aktif",
      "berbagi-pembeli": "aktif",
      "berbagi-koperasi": "belum",
      "transfer-luar-negeri": "aktif",
      estdb: "aktif",
    },
    tanggalPersetujuan: "2026-09-02",
    buktiPersetujuan: "Tanda tangan",
    legalitas: { estdb: "ada", suratLahan: "ada", tenagaKerja: "ada", kawasanHutan: "di-luar" },
  },
  {
    id: "PTN-0002",
    nama: "Rahmah Inen Dewi",
    desa: "Bale Atu",
    kecamatan: "Bukit",
    hp: "0813-7720-1180",
    nikMasked: "1104••••••••4471",
    persetujuan: {
      pemetaan: "aktif",
      "berbagi-pembeli": "aktif",
      "berbagi-koperasi": "aktif",
      "transfer-luar-negeri": "aktif",
      estdb: "aktif",
    },
    tanggalPersetujuan: "2026-09-02",
    buktiPersetujuan: "Rekaman suara",
    legalitas: { estdb: "ada", suratLahan: "ada", tenagaKerja: "ada", kawasanHutan: "di-luar" },
  },
  {
    id: "PTN-0003",
    nama: "Hasanuddin Aman Fitri",
    desa: "Pantan Musara",
    kecamatan: "Ketol",
    hp: "0852-6012-3398",
    nikMasked: "1104••••••••2209",
    persetujuan: {
      pemetaan: "aktif",
      "berbagi-pembeli": "aktif",
      "berbagi-koperasi": "belum",
      "transfer-luar-negeri": "aktif",
      estdb: "belum",
    },
    tanggalPersetujuan: "2026-09-05",
    buktiPersetujuan: "Tanda tangan",
    legalitas: { estdb: "tidak-ada", suratLahan: "ada", tenagaKerja: "ada", kawasanHutan: "di-tepi" },
  },
  {
    id: "PTN-0004",
    nama: "Nurlela Inen Saputra",
    desa: "Wih Porak",
    kecamatan: "Silih Nara",
    hp: "0821-6644-9021",
    nikMasked: "1104••••••••7754",
    persetujuan: {
      pemetaan: "aktif",
      "berbagi-pembeli": "aktif",
      "berbagi-koperasi": "belum",
      "transfer-luar-negeri": "aktif",
      estdb: "aktif",
    },
    tanggalPersetujuan: "2026-09-06",
    buktiPersetujuan: "Tanda tangan",
    legalitas: { estdb: "kedaluwarsa", suratLahan: "ada", tenagaKerja: "ada", kawasanHutan: "di-luar" },
  },
  {
    id: "PTN-0005",
    nama: "Iskandar Aman Rizki",
    desa: "Atang Jungket",
    kecamatan: "Bies",
    hp: "0811-6890-5532",
    nikMasked: "1104••••••••3108",
    persetujuan: {
      pemetaan: "aktif",
      "berbagi-pembeli": "aktif",
      "berbagi-koperasi": "belum",
      "transfer-luar-negeri": "aktif",
      estdb: "aktif",
    },
    tanggalPersetujuan: "2026-09-08",
    buktiPersetujuan: "Rekaman suara",
    legalitas: { estdb: "ada", suratLahan: "tidak-ada", tenagaKerja: "ada", kawasanHutan: "di-luar" },
  },
  {
    id: "PTN-0006",
    nama: "Maryam Inen Hakim",
    desa: "Jamat",
    kecamatan: "Linge",
    hp: "0853-6100-7765",
    nikMasked: "1104••••••••6650",
    persetujuan: {
      pemetaan: "aktif",
      "berbagi-pembeli": "aktif",
      "berbagi-koperasi": "belum",
      "transfer-luar-negeri": "aktif",
      estdb: "aktif",
    },
    tanggalPersetujuan: "2026-09-10",
    buktiPersetujuan: "Tanda tangan",
    legalitas: { estdb: "ada", suratLahan: "ada", tenagaKerja: "ada", kawasanHutan: "di-dalam" },
  },
  {
    id: "PTN-0007",
    nama: "Zulkifli Aman Nisa",
    desa: "Kute Lot",
    kecamatan: "Kebayakan",
    hp: "0812-6923-4410",
    nikMasked: "1104••••••••9031",
    persetujuan: {
      pemetaan: "aktif",
      "berbagi-pembeli": "ditarik",
      "berbagi-koperasi": "belum",
      "transfer-luar-negeri": "ditarik",
      estdb: "belum",
    },
    tanggalPersetujuan: "2026-09-11",
    buktiPersetujuan: "Tanda tangan",
    legalitas: { estdb: "tidak-ada", suratLahan: "ada", tenagaKerja: "tidak-ada", kawasanHutan: "di-luar" },
  },
  {
    id: "PTN-0008",
    nama: "Fatimah Inen Arif",
    desa: "Bale Atu",
    kecamatan: "Bukit",
    hp: "0813-6230-8876",
    nikMasked: "1104••••••••1182",
    persetujuan: {
      pemetaan: "belum",
      "berbagi-pembeli": "belum",
      "berbagi-koperasi": "belum",
      "transfer-luar-negeri": "belum",
      estdb: "belum",
    },
    tanggalPersetujuan: "-",
    buktiPersetujuan: "Tanda tangan",
    legalitas: { estdb: "tidak-ada", suratLahan: "tidak-ada", tenagaKerja: "tidak-ada", kawasanHutan: "belum-dicek" },
  },
];

const poly = (lon: number, lat: number, pts: [number, number][]): [number, number][] =>
  pts.map(([dx, dy]) => [+(lon + dx).toFixed(6), +(lat + dy).toFixed(6)]);

export const kebun: Kebun[] = [
  {
    id: "KBN-0001",
    idPublik: "fl_7c1e9a42b0",
    petaniId: "PTN-0001",
    nama: "Kebun Atas Kute Lot",
    komoditas: "Kopi",
    luasHa: 1.2,
    status: "siap-ekspor",
    skriningTerakhir: "hijau",
    jatuhTempoSkrining: "2027-09-14",
    umurTanamanTahun: 14,
    naungan: "Lamtoro, jeruk",
    geometri: [
      {
        versi: 1,
        jenis: "titik",
        koordinat: [[96.812431, 4.628915]],
        akurasiM: 4.2,
        enumerator: "Dinda Pratiwi",
        tanggalUkur: "2026-09-12",
      },
    ],
    skrining: [
      {
        tanggal: "2026-09-14",
        versiGeometri: 1,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.12 · Kawasan Hutan KLHK 2024",
        status: "hijau",
        catatan: "Tidak ada perubahan tutupan hutan 2020; di luar kawasan hutan negara.",
      },
    ],
  },
  {
    id: "KBN-0002",
    idPublik: "fl_3fa08d61ce",
    petaniId: "PTN-0002",
    nama: "Kebun Bale Atu",
    komoditas: "Kopi",
    luasHa: 0.8,
    status: "siap-ekspor",
    skriningTerakhir: "hijau",
    jatuhTempoSkrining: "2027-09-15",
    umurTanamanTahun: 9,
    naungan: "Lamtoro",
    geometri: [
      {
        versi: 1,
        jenis: "titik",
        koordinat: [[96.851022, 4.651347]],
        akurasiM: 3.8,
        enumerator: "Dinda Pratiwi",
        tanggalUkur: "2026-09-12",
      },
    ],
    skrining: [
      {
        tanggal: "2026-09-15",
        versiGeometri: 1,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.12 · Kawasan Hutan KLHK 2024",
        status: "hijau",
        catatan: "Tidak ada perubahan tutupan hutan 2020; di luar kawasan hutan negara.",
      },
    ],
  },
  {
    id: "KBN-0003",
    idPublik: "fl_9b44e217aa",
    petaniId: "PTN-0003",
    nama: "Kebun Pantan Musara",
    komoditas: "Kopi",
    luasHa: 5.6,
    status: "kuning",
    skriningTerakhir: "kuning",
    jatuhTempoSkrining: "2027-09-18",
    umurTanamanTahun: 18,
    naungan: "Agroforestri rapat: petai, durian, lamtoro",
    geometri: [
      {
        versi: 1,
        jenis: "poligon",
        koordinat: poly(96.701204, 4.712088, [
          [0, 0],
          [0.0021, 0.0004],
          [0.0026, -0.0013],
          [0.0016, -0.0024],
          [-0.0003, -0.0019],
          [0, 0],
        ]),
        akurasiM: 6.9,
        enumerator: "Raka Mahendra",
        tanggalUkur: "2026-09-16",
      },
    ],
    skrining: [
      {
        tanggal: "2026-09-18",
        versiGeometri: 1,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.12 · Kawasan Hutan KLHK 2024",
        status: "kuning",
        catatan:
          "Geometri menyentuh 0,7 ha piksel hutan 2020 di sisi utara dan berada 120 m dari batas kawasan hutan lindung. Kemungkinan kanopi agroforestri terbaca sebagai hutan.",
      },
    ],
  },
  {
    id: "KBN-0004",
    idPublik: "fl_51d7c0e3f9",
    petaniId: "PTN-0004",
    nama: "Kebun Wih Porak",
    komoditas: "Kopi",
    luasHa: 2.1,
    status: "hijau",
    skriningTerakhir: "hijau",
    jatuhTempoSkrining: "2027-09-19",
    umurTanamanTahun: 11,
    naungan: "Lamtoro, alpukat",
    geometri: [
      {
        versi: 1,
        jenis: "titik",
        koordinat: [[96.774512, 4.583301]],
        akurasiM: 5.1,
        enumerator: "Raka Mahendra",
        tanggalUkur: "2026-09-17",
      },
    ],
    skrining: [
      {
        tanggal: "2026-09-19",
        versiGeometri: 1,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.12 · Kawasan Hutan KLHK 2024",
        status: "hijau",
        catatan: "Tidak ada perubahan tutupan hutan 2020; di luar kawasan hutan negara.",
      },
    ],
  },
  {
    id: "KBN-0005",
    idPublik: "fl_c20e55b81d",
    petaniId: "PTN-0005",
    nama: "Kebun Atang Jungket",
    komoditas: "Kopi",
    luasHa: 4.6,
    status: "hijau",
    skriningTerakhir: "hijau",
    jatuhTempoSkrining: "2027-09-20",
    umurTanamanTahun: 7,
    naungan: "Lamtoro",
    geometri: [
      {
        versi: 1,
        jenis: "poligon",
        koordinat: poly(96.792771, 4.601455, [
          [0, 0],
          [0.0018, 0.0002],
          [0.0019, -0.0021],
          [0.0001, -0.0023],
          [0, 0],
        ]),
        akurasiM: 5.8,
        enumerator: "Dinda Pratiwi",
        tanggalUkur: "2026-09-19",
      },
    ],
    skrining: [
      {
        tanggal: "2026-09-20",
        versiGeometri: 1,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.12 · Kawasan Hutan KLHK 2024",
        status: "hijau",
        catatan: "Tidak ada perubahan tutupan hutan 2020; di luar kawasan hutan negara.",
      },
    ],
  },
  {
    id: "KBN-0006",
    idPublik: "fl_e81f02a6b7",
    petaniId: "PTN-0006",
    nama: "Kebun Jamat Hulu",
    komoditas: "Kopi",
    luasHa: 3.2,
    status: "dipisahkan",
    skriningTerakhir: "merah",
    jatuhTempoSkrining: "2027-09-21",
    umurTanamanTahun: 3,
    naungan: "Tanpa naungan",
    geometri: [
      {
        versi: 1,
        jenis: "titik",
        koordinat: [[96.921903, 4.402771]],
        akurasiM: 7.4,
        enumerator: "Raka Mahendra",
        tanggalUkur: "2026-09-20",
      },
    ],
    skrining: [
      {
        tanggal: "2026-09-21",
        versiGeometri: 1,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.12 · Kawasan Hutan KLHK 2024",
        status: "merah",
        catatan:
          "Indikasi kehilangan tutupan pohon pada 2022 dan titik berada di dalam kawasan hutan produksi tanpa izin tercatat.",
      },
    ],
  },
  {
    id: "KBN-0007",
    idPublik: "fl_0d6ab93e15",
    petaniId: "PTN-0007",
    nama: "Kebun Kute Lot Bawah",
    komoditas: "Kopi",
    luasHa: 1.5,
    status: "hijau",
    skriningTerakhir: "hijau",
    jatuhTempoSkrining: "2027-09-22",
    umurTanamanTahun: 12,
    naungan: "Lamtoro",
    geometri: [
      {
        versi: 1,
        jenis: "titik",
        koordinat: [[96.815877, 4.624102]],
        akurasiM: 4.9,
        enumerator: "Dinda Pratiwi",
        tanggalUkur: "2026-09-21",
      },
    ],
    skrining: [
      {
        tanggal: "2026-09-22",
        versiGeometri: 1,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.12 · Kawasan Hutan KLHK 2024",
        status: "hijau",
        catatan: "Tidak ada perubahan tutupan hutan 2020; di luar kawasan hutan negara.",
      },
    ],
  },
  {
    id: "KBN-0008",
    idPublik: "fl_77b2f4c90a",
    petaniId: "PTN-0001",
    nama: "Kebun Lembah Kute Lot",
    komoditas: "Kopi",
    luasHa: 6.3,
    status: "kuning",
    skriningTerakhir: "kuning",
    jatuhTempoSkrining: "2027-10-02",
    umurTanamanTahun: 22,
    naungan: "Agroforestri: kemiri, lamtoro, pisang",
    geometri: [
      {
        versi: 1,
        jenis: "poligon",
        koordinat: poly(96.808112, 4.632551, [
          [0, 0],
          [0.0024, 0.0006],
          [0.003, -0.0012],
          [0.0019, -0.0027],
          [0.0001, -0.0022],
          [0, 0],
        ]),
        akurasiM: 8.8,
        enumerator: "Dinda Pratiwi",
        tanggalUkur: "2026-09-12",
      },
      {
        versi: 2,
        jenis: "poligon",
        koordinat: poly(96.808112, 4.632551, [
          [0, 0],
          [0.0022, 0.0005],
          [0.0028, -0.0012],
          [0.0019, -0.0025],
          [0.0001, -0.0021],
          [0, 0],
        ]),
        akurasiM: 5.2,
        enumerator: "Raka Mahendra",
        tanggalUkur: "2026-09-30",
        catatan: "Ukur ulang atas permintaan supervisor: batas utara dikoreksi.",
      },
    ],
    skrining: [
      {
        tanggal: "2026-09-14",
        versiGeometri: 1,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.12 · Kawasan Hutan KLHK 2024",
        status: "kuning",
        catatan: "Geometri menyentuh piksel hutan 2020 di sisi utara.",
      },
      {
        tanggal: "2026-10-02",
        versiGeometri: 2,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.12 · Kawasan Hutan KLHK 2024",
        status: "kuning",
        catatan:
          "Setelah ukur ulang, 0,3 ha masih bersinggungan dengan piksel hutan 2020. Kanopi kemiri tua kemungkinan terbaca sebagai hutan.",
      },
    ],
  },
  {
    id: "KBN-0009",
    idPublik: "fl_a4c3910e2d",
    petaniId: "PTN-0002",
    nama: "Kebun Bale Atu Timur",
    komoditas: "Kopi",
    luasHa: 0.6,
    status: "siap-ekspor",
    skriningTerakhir: "hijau",
    jatuhTempoSkrining: "2026-11-08",
    umurTanamanTahun: 6,
    naungan: "Lamtoro",
    geometri: [
      {
        versi: 1,
        jenis: "titik",
        koordinat: [[96.855391, 4.649022]],
        akurasiM: 3.5,
        enumerator: "Dinda Pratiwi",
        tanggalUkur: "2025-11-06",
      },
    ],
    skrining: [
      {
        tanggal: "2025-11-08",
        versiGeometri: 1,
        sumber: "JRC GFC 2020 v2 · Hansen GFC v1.11 · Kawasan Hutan KLHK 2024",
        status: "hijau",
        catatan: "Tidak ada perubahan tutupan hutan 2020; di luar kawasan hutan negara.",
      },
    ],
  },
  {
    id: "KBN-0010",
    idPublik: "fl_—",
    petaniId: "PTN-0008",
    nama: "Kebun Bale Atu Barat",
    komoditas: "Kopi",
    luasHa: 1.0,
    status: "belum-dipetakan",
    skriningTerakhir: null,
    jatuhTempoSkrining: "-",
    umurTanamanTahun: 8,
    naungan: "-",
    geometri: [],
    skrining: [],
  },
];

export const setoran: Setoran[] = [
  { id: "STR-1041", petaniId: "PTN-0001", kebunId: "KBN-0001", beratKg: 420, tanggalSetor: "2026-10-03", periodePanen: "Sep–Okt 2026", penerima: "Pak Ridwan (Pengepul)", jenisPenerima: "Pengepul", lotId: "LOT-2026-014", hash: "9f2c…a71e" },
  { id: "STR-1042", petaniId: "PTN-0002", kebunId: "KBN-0002", beratKg: 310, tanggalSetor: "2026-10-03", periodePanen: "Sep–Okt 2026", penerima: "Pak Ridwan (Pengepul)", jenisPenerima: "Pengepul", lotId: "LOT-2026-014", hash: "41bd…0c93" },
  { id: "STR-1043", petaniId: "PTN-0002", kebunId: "KBN-0009", beratKg: 260, tanggalSetor: "2026-10-04", periodePanen: "Sep–Okt 2026", penerima: "Gudang Koperasi", jenisPenerima: "Koperasi", lotId: "LOT-2026-014", hash: "c07e…5d12" },
  { id: "STR-1044", petaniId: "PTN-0004", kebunId: "KBN-0004", beratKg: 980, tanggalSetor: "2026-10-06", periodePanen: "Sep–Okt 2026", penerima: "Gudang Koperasi", jenisPenerima: "Koperasi", lotId: "LOT-2026-015", hash: "77a1…e4f0" },
  { id: "STR-1045", petaniId: "PTN-0005", kebunId: "KBN-0005", beratKg: 2900, tanggalSetor: "2026-10-07", periodePanen: "Sep–Okt 2026", penerima: "Bu Salmah (Pengepul)", jenisPenerima: "Pengepul", lotId: "LOT-2026-015", hash: "3e98…b2a6" },
  { id: "STR-1046", petaniId: "PTN-0005", kebunId: "KBN-0005", beratKg: 2100, tanggalSetor: "2026-10-12", periodePanen: "Sep–Okt 2026", penerima: "Bu Salmah (Pengepul)", jenisPenerima: "Pengepul", lotId: "LOT-2026-015", hash: "d5c4…19fe" },
  { id: "STR-1047", petaniId: "PTN-0007", kebunId: "KBN-0007", beratKg: 540, tanggalSetor: "2026-10-14", periodePanen: "Sep–Okt 2026", penerima: "Pak Ridwan (Pengepul)", jenisPenerima: "Pengepul", hash: "8a0f…6c37" },
  { id: "STR-1048", petaniId: "PTN-0001", kebunId: "KBN-0001", beratKg: 380, tanggalSetor: "2026-10-18", periodePanen: "Okt 2026", penerima: "Gudang Koperasi", jenisPenerima: "Koperasi", hash: "b61d…02ea" },
  { id: "STR-1049", petaniId: "PTN-0002", kebunId: "KBN-0002", beratKg: 290, tanggalSetor: "2026-10-20", periodePanen: "Okt 2026", penerima: "Pak Ridwan (Pengepul)", jenisPenerima: "Pengepul", hash: "e3a7…7b51" },
  { id: "STR-1050", petaniId: "PTN-0004", kebunId: "KBN-0004", beratKg: 610, tanggalSetor: "2026-10-22", periodePanen: "Okt 2026", penerima: "Bu Salmah (Pengepul)", jenisPenerima: "Pengepul", hash: "0b5e…c8d4" },
  { id: "STR-1051", petaniId: "PTN-0002", kebunId: "KBN-0009", beratKg: 180, tanggalSetor: "2026-10-24", periodePanen: "Okt 2026", penerima: "Gudang Koperasi", jenisPenerima: "Koperasi", hash: "5f19…ad20" },
];

export const lot: Lot[] = [
  {
    id: "LOT-2026-014",
    kode: "LG-ARB-014",
    komoditas: "Kopi",
    kodeHS: "0901.11",
    deskripsi: "Green coffee Arabika Gayo, semi-washed, grade 1",
    setoranIds: ["STR-1041", "STR-1042", "STR-1043"],
    beratBersihKg: 990,
    kapasitasKg: 2340,
    status: "terkirim",
    dibuat: "2026-10-08",
    merkleRoot: "0x6b1f9e…d40a72",
  },
  {
    id: "LOT-2026-015",
    kode: "LG-ARB-015",
    komoditas: "Kopi",
    kodeHS: "0901.11",
    deskripsi: "Green coffee Arabika Gayo, full-washed, grade 1",
    setoranIds: ["STR-1044", "STR-1045", "STR-1046"],
    beratBersihKg: 5980,
    kapasitasKg: 6030,
    status: "perlu-catatan",
    dibuat: "2026-10-15",
  },
  {
    id: "LOT-2026-016",
    kode: "LG-ARB-016",
    komoditas: "Kopi",
    kodeHS: "0901.11",
    deskripsi: "Green coffee Arabika Gayo, natural",
    setoranIds: ["STR-1047"],
    beratBersihKg: 540,
    kapasitasKg: 1350,
    status: "draf",
    dibuat: "2026-10-21",
  },
];

export const paket: Paket[] = [
  {
    id: "PKT-2026-009",
    lotId: "LOT-2026-014",
    jenis: "Per pengiriman",
    pembeli: "Noordkust Coffee Importers BV",
    negaraPembeli: "Belgia",
    emailPembeli: "compliance@noordkust-coffee.example",
    tanggalKirim: "2026-10-10",
    hash: "a3f9c1e07b2d4e58916c0fd2b7e4a91c5d3086fe21b49c7a0e5d8f1236ab47ce",
    nomorDDS: "25BE1A9X7Q0042",
    stellarTx: "7e1c4a…f09b3d",
    status: "diterima",
  },
  {
    id: "PKT-2026-010",
    lotId: "LOT-2026-015",
    jenis: "Per pengiriman",
    pembeli: "Hafenrösterei Kollektiv GmbH",
    negaraPembeli: "Jerman",
    emailPembeli: "einkauf@hafenroesterei.example",
    tanggalKirim: null,
    hash: "—",
    status: "draf",
  },
];

export const tim = [
  { nama: "Teuku Ramli", peran: "Admin koperasi", email: "ramli@lestarigayo.coop.id", status: "Aktif" },
  { nama: "Cut Nyak Aisyah", peran: "Staf ekspor", email: "aisyah@lestarigayo.coop.id", status: "Aktif" },
  { nama: "Dinda Pratiwi", peran: "Enumerator", email: "dinda.p@kampus.example", status: "Aktif" },
  { nama: "Raka Mahendra", peran: "Enumerator", email: "raka.m@kampus.example", status: "Aktif" },
  { nama: "Wulan Sari", peran: "Enumerator", email: "wulan.s@kampus.example", status: "Undangan terkirim" },
  { nama: "Ridwan Abdullah", peran: "Pengepul", email: "0812-6655-0091", status: "Aktif" },
  { nama: "Salmah Yusuf", peran: "Pengepul", email: "0852-7701-3384", status: "Aktif" },
];

export const enumerator = [
  { nama: "Dinda Pratiwi", kampus: "Fakultas Pertanian · KKN 2026", kebun: 46, lolosPertama: 0.96, ditolak: 2, menitPerKebun: 34, terakhirSinkron: "2 jam lalu" },
  { nama: "Raka Mahendra", kampus: "Teknik Geodesi · KKN 2026", kebun: 38, lolosPertama: 0.89, ditolak: 4, menitPerKebun: 41, terakhirSinkron: "Kemarin, 19.40" },
  { nama: "Wulan Sari", kampus: "Fakultas Pertanian · KKN 2026", kebun: 12, lolosPertama: 0.92, ditolak: 1, menitPerKebun: 47, terakhirSinkron: "3 hari lalu" },
];

export const aktivitas = [
  { waktu: "26 Okt, 09.12", teks: "Raka Mahendra menyinkronkan 6 kebun dari Ketol", jenis: "sinkron" },
  { waktu: "25 Okt, 16.40", teks: "Peninjau QC memutus KBN-0005 menjadi hijau", jenis: "qc" },
  { waktu: "24 Okt, 11.05", teks: "Setoran STR-1051 dicatat di Gudang Koperasi (180 kg)", jenis: "setoran" },
  { waktu: "22 Okt, 08.30", teks: "Merkle root batch 08.00 ditulis ke Stellar", jenis: "chain" },
  { waktu: "21 Okt, 14.22", teks: "Lot LG-ARB-016 dibuat dari 1 setoran", jenis: "lot" },
];

export const keberatan = [
  {
    id: "KBR-003",
    kebunId: "KBN-0006",
    petaniId: "PTN-0006",
    diajukan: "2026-10-20",
    alasan:
      "Petani menyatakan lahan sudah dibuka orang tua sejak 2017 dan melampirkan foto lama serta surat keterangan desa.",
  },
];

export const getPetani = (id: string) => petani.find((p) => p.id === id);
export const getKebun = (id: string) => kebun.find((k) => k.id === id);
export const getLot = (id: string) => lot.find((l) => l.id === id);
export const getPaket = (id: string) => paket.find((p) => p.id === id);
export const kebunPetani = (petaniId: string) => kebun.filter((k) => k.petaniId === petaniId);
export const setoranLot = (l: Lot) => setoran.filter((s) => l.setoranIds.includes(s.id));

export const legalitasLengkap = (p: Petani) =>
  p.legalitas.estdb === "ada" &&
  p.legalitas.suratLahan === "ada" &&
  p.legalitas.tenagaKerja === "ada" &&
  p.legalitas.kawasanHutan === "di-luar";

export const formatKg = (n: number) => `${n.toLocaleString("id-ID")} kg`;

export const formatTanggal = (iso: string) => {
  if (!iso || iso === "-") return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
};
