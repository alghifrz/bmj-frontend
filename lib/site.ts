export const siteConfig = {
  name: "Buana Medika Jaya",
  tagline: "Solusi Kebutuhan Alat Kesehatan Anda",
  description:
    "Buana Medika Jaya menyediakan kebutuhan alat kesehatan untuk individu, tenaga kesehatan, klinik, fasilitas kesehatan, dan kebutuhan profesional.",
  floatingWhatsAppLabel: "Ada yang bisa kami bantu?",
  navCtaLabel: "Hubungi Kami",
} as const;

export const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/produk", label: "Produk" },
  { href: "/kategori", label: "Kategori" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/layanan", label: "Layanan" },
  { href: "/#kontak", label: "Kontak" },
] as const;

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) {
    return null;
  }

  try {
    return new URL(value);
  } catch {
    return null;
  }
}
