"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import I18nProvider from "./i18nProvider";
import { Toaster } from "react-hot-toast";
export function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <Toaster />
        <I18nProvider>{children}</I18nProvider>
      </SessionProvider>
    </>
  );
}
