import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { getPublicStore } from "@/lib/api/store";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();
const fallbackTitle = "Mengenal Buana Medika Jaya";

export async function generateMetadata(): Promise<Metadata> {
  const store = await getPublicStore();
  const title = store?.aboutTitle || "Tentang Kami";

  return {
    title,
    description: store?.aboutSummary ?? undefined,
    ...(siteUrl ? { alternates: { canonical: "/tentang-kami" } } : {}),
  };
}

export default async function TentangKamiPage() {
  const store = await getPublicStore();
  const title = store?.aboutTitle || fallbackTitle;
  const hasCopy = Boolean(store?.aboutSummary || store?.aboutBody);

  return (
    <>
      <header className="border-b border-border">
        <Container className="py-12 sm:py-16">
          <div className="h-px w-8 bg-primary" />
          <p className="mt-5 text-sm text-muted">Tentang Kami</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">{title}</h1>
        </Container>
      </header>
      <Container className="max-w-3xl py-12 sm:py-16">
        {store === null ? (
          <p className="text-base leading-7 text-muted">Informasi belum dapat dimuat.</p>
        ) : hasCopy ? (
          <article>
            {store.aboutSummary ? <p className="text-lg leading-8 text-ink">{store.aboutSummary}</p> : null}
            {store.aboutBody ? (
              <div className="mt-6 text-base leading-7 whitespace-pre-line text-foreground">{store.aboutBody}</div>
            ) : null}
          </article>
        ) : (
          <p className="text-base leading-7 text-muted">Informasi tentang Buana Medika Jaya belum tersedia.</p>
        )}
      </Container>
    </>
  );
}
