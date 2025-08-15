import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { GlobalProvider } from "./GlobalProvider";
import Script from "next/script";
import OpenAiChatWindow from "@/components/openAI/OpenAiChatWindow";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Khem Raj Neupane",
  description: "Showcasing my expertise with modern web development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={``}>
        <GlobalProvider>
          <div className="header-children-spacing">
            <Header />
            <main className="container mx-auto p-4">{children}</main>
            <OpenAiChatWindow />
            <footer className="bg-[#4e225d] text-white p-4 mt-8">
              <div className="container mx-auto text-center">
                <p>
                  Built with Next.js, TypeScript, Tailwind CSS, and AWS Services
                </p>
              </div>
            </footer>
          </div>
        </GlobalProvider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></Script>
        <Script src="https://kit.fontawesome.com/9edb65c86a.js"></Script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.min.css"
        />
      </body>
    </html>
  );
}
