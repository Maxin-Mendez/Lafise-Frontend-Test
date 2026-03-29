import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Banca en Línea | Lafise",
  description: "Test Frontend Lafise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          <div className="flex flex-col flex-1 min-w-0">
            {/* Header */}
            <Header />

            {/* Área de contenido */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 focus:outline-none">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
