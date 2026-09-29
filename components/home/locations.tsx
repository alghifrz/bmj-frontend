import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { getPublicStore } from "@/lib/api/store";

export async function Locations() {
  const store = await getPublicStore();

  return (
    <Section id="kontak" className="scroll-mt-20 border-t border-border">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionHeading title="Hubungi Kami" description="Lokasi toko Buana Medika Jaya." />
            {store?.operatingHours ? <p className="mt-5 text-sm text-muted">{store.operatingHours}</p> : null}
            {store?.email ? (
              <a href={`mailto:${store.email}`} className="mt-2 inline-flex text-sm text-secondary hover:underline">
                {store.email}
              </a>
            ) : null}
          </Reveal>
          <div className="lg:col-span-5 lg:justify-self-end">
            <WhatsAppButton variant="outline" />
          </div>
        </div>

        {store === null ? (
          <p className="mt-12 text-sm text-muted">Lokasi toko belum dapat dimuat.</p>
        ) : store.locations.length === 0 ? (
          <p className="mt-12 text-sm text-muted">Lokasi toko belum tersedia.</p>
        ) : (
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {store.locations.map((location, index) => (
              <li key={location.id}>
                <Reveal delay={index * 0.06}>
                  <article className="overflow-hidden border border-border bg-background">
                    <iframe
                      title={`Peta ${location.name}`}
                      src={location.embedUrl}
                      className="aspect-video w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="p-5 sm:p-6">
                      <h3 className="text-xl leading-snug">{location.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{location.address}</p>
                      <a
                        href={location.mapsUrl}
                        className="mt-4 inline-flex text-sm text-secondary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat di Google Maps
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
