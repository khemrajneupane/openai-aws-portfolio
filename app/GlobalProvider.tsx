"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
export function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
