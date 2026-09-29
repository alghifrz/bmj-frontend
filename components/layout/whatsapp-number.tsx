"use client";

import { createContext, useContext, type ReactNode } from "react";

const WhatsAppNumberContext = createContext<string | null>(null);

export function WhatsAppNumberProvider({
  number,
  children,
}: {
  number: string | null;
  children: ReactNode;
}) {
  return <WhatsAppNumberContext.Provider value={number}>{children}</WhatsAppNumberContext.Provider>;
}

export function useWhatsAppNumber() {
  return useContext(WhatsAppNumberContext);
}
