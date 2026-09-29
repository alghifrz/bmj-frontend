import Link from "next/link";

import { Container } from "@/components/layout/container";
import { getPublicStore } from "@/lib/api/store";
import { navItems, siteConfig } from "@/lib/site";
import { BrandLogo } from "./brand-logo";

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M7 17 17 7M8.5 7H17v8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export async function Footer() {
  const store = await getPublicStore();
  const year = new Date().getFullYear();
  const socials = store?.socials ?? [];

  return (
    <footer className="bg-ink text-white">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Merek */}
          <div className="lg:col-span-5">
            <BrandLogo />
            <p className="mt-2.5 max-w-xs text-sm leading-6 text-white/60">{siteConfig.tagline}</p>
            {store?.footerText ? <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">{store.footerText}</p> : null}
            {store?.whatsappHref ? (
              <a
                href={store.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-4 pr-1.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white/90"
              >
                Hubungi via WhatsApp
                <span className="flex size-7 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45 motion-reduce:transform-none">
                  <ArrowUpRight className="size-4 -rotate-45" />
                </span>
              </a>
            ) : null}
          </div>

          {/* Tautan */}
          <nav aria-label="Tautan footer" className="lg:col-span-3">
            <h2 className="text-sm text-white/50">Tautan</h2>
            <ul className="mt-3.5 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.href.includes("#") ? (
                    <a href={item.href} className="text-sm text-white/75 transition-colors duration-200 hover:text-white">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-sm text-white/75 transition-colors duration-200 hover:text-white">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Sosial media */}
          <div className="lg:col-span-4">
            <h2 className="text-sm text-white/50">Sosial media</h2>
            {store === null ? (
              <p className="mt-3.5 text-sm text-white/50">Data toko belum dapat dimuat.</p>
            ) : (
              <>
                {socials.length > 0 ? (
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {socials.map((channel) => (
                      <li key={channel.label}>
                        <a
                          href={channel.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex rounded-full bg-white/[0.04] px-4 py-2 text-sm text-white/70 ring-1 ring-white/10 transition-colors duration-200 hover:text-white"
                        >
                          {channel.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3.5 text-sm text-white/50">Belum tersedia.</p>
                )}
                <p className="mt-3 text-sm text-white/50">
                  Email:{" "}
                  {store.email ? (
                    <a href={`mailto:${store.email}`} className="text-white/75 transition-colors hover:text-white">
                      {store.email}
                    </a>
                  ) : (
                    "belum tersedia."
                  )}
                </p>
                {store.operatingHours ? <p className="mt-1 text-sm text-white/50">{store.operatingHours}</p> : null}
                {store.locations.length > 0 ? (
                  <ul className="mt-5 space-y-4">
                    {store.locations.map((location) => (
                      <li key={location.id}>
                        <p className="text-sm text-white/80">{location.name}</p>
                        <p className="mt-1 text-sm leading-6 text-white/50">{location.address}</p>
                        <a
                          href={location.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex text-sm text-white/60 transition-colors hover:text-white"
                        >
                          Lihat di Google Maps
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-4 pr-16">
          <p className="text-xs text-white/50">© {year} Buana Medika Jaya. All Rights Reserved.</p>
        </Container>
      </div>
    </footer>
  );
}