import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AWS Portfolio | Your Name",
  description:
    "Showcasing my expertise with AWS services and modern web development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="min-h-screen">
          <header className="bg-aws-dark text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">AWS Portfolio</h1>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a href="#aws-services" className="hover:text-aws-orange">
                      AWS Services
                    </a>
                  </li>
                  <li>
                    <a href="#chat" className="hover:text-aws-orange">
                      AI Chat
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="container mx-auto p-4">{children}</main>
          <footer className="bg-aws-dark text-white p-4 mt-8">
            <div className="container mx-auto text-center">
              <p>
                Built with Next.js, TypeScript, Tailwind CSS, and AWS Services
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
