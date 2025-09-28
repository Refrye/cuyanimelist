import Navbar from "@/components/utils/navbar";
import { Providers } from "@/components/providers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cuy My Anime List",
  description: "Website Anime Indonesia Project belajar Next.js + Jikan API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* Navbar tampil di semua halaman */}
          <Navbar />

          {/* Konten utama */}
          <main className="p-4 mx-auto max-w-7xl">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
