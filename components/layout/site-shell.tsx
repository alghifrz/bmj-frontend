import type { ReactNode } from "react";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { VisitTracker } from "@/components/analytics/visit-tracker";
import { WhatsAppClickTracker } from "@/components/analytics/whatsapp-click-tracker";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Footer } from "@/components/layout/footer";
import { WhatsAppNumberProvider } from "@/components/layout/whatsapp-number";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Navbar } from "@/components/navigation/navbar";
import { getPublicStore } from "@/lib/api/store";

export async function SiteShell({ children }: { children: ReactNode }) {
  const store = await getPublicStore();

  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-secondary"
      >
        Loncat ke konten
      </a>
      <WhatsAppNumberProvider number={store?.whatsappNumber ?? null}>
      <WhatsAppClickTracker />
      <MotionProvider>
        <Navbar />
        <main id="konten" tabIndex={-1} className="flex-1 scroll-mt-24">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <VisitTracker />
        <GoogleAnalytics />
      </MotionProvider>
      </WhatsAppNumberProvider>
    </>
  );
}
