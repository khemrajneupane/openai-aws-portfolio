"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import I18nProvider from "./i18nProvider";
export function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <I18nProvider>{children}</I18nProvider>
      </SessionProvider>
    </>
  );
}
