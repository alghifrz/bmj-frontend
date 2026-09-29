export type Benefit = {
  title: string;
  description: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    title: "Kualitas produk",
    description: "Peralatan dan produk kesehatan yang memperhatikan kualitas.",
  },
  {
    title: "Ragam produk",
    description: "Pilihan untuk kebutuhan pribadi, profesional, klinik, dan fasilitas kesehatan.",
  },
  {
    title: "Layanan profesional",
    description: "Pelayanan yang ramah dan profesional.",
  },
  {
    title: "Harga kompetitif",
    description: "Harga menyesuaikan produk dan kebutuhan pelanggan.",
  },
  {
    title: "Konsultasi produk",
    description: "Bantuan memilih produk melalui kontak langsung dengan BMJ.",
  },
  {
    title: "Pengiriman",
    description: "Dukungan pemesanan dan pengiriman produk.",
  },
];

export const services: ServiceItem[] = [
  {
    title: "Penyediaan alat kesehatan",
    description: "Penyediaan peralatan dan produk kesehatan.",
  },
  {
    title: "Pengadaan alat kesehatan",
    description: "Dukungan untuk kebutuhan pengadaan peralatan kesehatan.",
  },
  {
    title: "Konsultasi produk",
    description: "Diskusi kebutuhan produk bersama BMJ.",
  },
  {
    title: "Pemesanan dan pengiriman",
    description: "Dukungan pemesanan dan pengiriman produk.",
  },
];

export const audiences = [
  "Individu",
  "Tenaga kesehatan",
  "Klinik",
  "Fasilitas kesehatan",
  "Kebutuhan profesional",
] as const;

export const hero = {
  headline: "Solusi Kebutuhan Alat Kesehatan Anda",
  supporting:
    "Buana Medika Jaya menyediakan berbagai kebutuhan alat kesehatan berkualitas untuk individu, tenaga kesehatan, klinik, fasilitas kesehatan, dan kebutuhan profesional.",
  primaryCta: "Lihat Produk",
  primaryHref: "/produk",
  secondaryCta: "Hubungi Kami",
} as const;

export const homeCta = {
  headline: "Butuh Alat Kesehatan? Kami Siap Membantu.",
  description:
    "Hubungi Buana Medika Jaya untuk mendapatkan informasi produk, harga, ketersediaan, dan kebutuhan alat kesehatan Anda.",
  label: "Hubungi Kami via WhatsApp",
} as const;
