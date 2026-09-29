import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowIcon } from "@/components/home/icons";
import { Container } from "@/components/layout/container";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { ProductGallery } from "@/components/products/product-gallery";
import { getPublishedProduct } from "@/lib/api/products";
import { getPublicStore } from "@/lib/api/store";
import { cn } from "@/lib/cn";
import { productWhatsAppMessage } from "@/lib/whatsapp";

const availabilityLabels: Record<string, string> = {
  Available: "Tersedia",
  "Contact Us": "Hubungi kami",
  "Out of Stock": "Habis",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProduct(slug);
  if (!product) {
    return { title: "Produk" };
  }

  return {
    title: product.name,
    description: product.shortDescription ?? product.description ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, store] = await Promise.all([getPublishedProduct(slug), getPublicStore()]);
  if (!product) {
    notFound();
  }

  const availability = product.availability ? (availabilityLabels[product.availability] ?? product.availability) : null;
  const facts = [
    ["Merek", product.brand],
    ["Model", product.model],
    ["Bahan", product.material],
    ["Ukuran", product.size],
    ["Fungsi", product.functionName],
    ["Kelengkapan", product.includedComponents],
    ["Spesifikasi", product.specifications],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));
  const hasDetail = Boolean(product.description || product.additionalInformation || facts.length > 0);

  return (
    <Container className="py-10 sm:py-14">
      <Link href="/produk" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
        <ArrowIcon className="h-4 w-4 rotate-180" />
        Kembali ke katalog
      </Link>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} />
        </div>
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <div className="border border-border bg-surface p-6 sm:p-8">
            <div className="h-px w-8 bg-primary" />
            {product.category ? (
              <p className="mt-5 text-sm text-secondary">
                {product.categorySlug ? (
                  <Link href={`/produk?category=${encodeURIComponent(product.categorySlug)}`} className="hover:underline">
                    {product.category}
                  </Link>
                ) : (
                  product.category
                )}
              </p>
            ) : null}
            <h1 className="mt-2 text-4xl leading-tight sm:text-5xl">{product.name}</h1>
            {product.shortDescription ? (
              <p className="mt-4 text-base leading-7 text-muted">{product.shortDescription}</p>
            ) : null}
            <p className="mt-6 text-xs tracking-[0.14em] text-muted uppercase">Harga</p>
            <p className="mt-1 font-heading text-3xl text-ink">{product.priceLabel}</p>
            {availability ? (
              <p className="mt-4">
                <span
                  className={cn(
                    "inline-flex px-2.5 py-1 text-xs",
                    product.availability === "Available" && "bg-primary-soft text-ink",
                    product.availability === "Out of Stock" && "bg-background text-error",
                    product.availability !== "Available" && product.availability !== "Out of Stock" && "bg-background text-foreground",
                  )}
                >
                  {availability}
                </span>
              </p>
            ) : null}
            <div className="mt-6">
              <WhatsAppButton
                className="w-full text-white"
                label="Tanya via WhatsApp"
                message={productWhatsAppMessage(store?.messageTemplate, product.name)}
                number={store?.whatsappNumber}
                track={{ source: "product_page", productSlug: product.slug }}
              >
                Tanya via WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
      {hasDetail ? (
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="text-2xl">Informasi produk</h2>
          {product.description ? <p className="mt-4 max-w-3xl text-base leading-7 text-foreground">{product.description}</p> : null}
          {facts.length > 0 ? (
            <dl className="mt-8 max-w-3xl border-t border-border">
              {facts.map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-border py-4 sm:grid-cols-3">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="text-sm whitespace-pre-line text-ink sm:col-span-2">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {product.additionalInformation ? (
            <p className="mt-6 max-w-3xl text-sm leading-6 whitespace-pre-line text-muted">{product.additionalInformation}</p>
          ) : null}
        </section>
      ) : null}
    </Container>
  );
}
