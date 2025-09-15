import { ThemeProvider } from "next-themes";
import Navbar from "@/components/utils/navbar";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar tampil di semua halaman */}
          <Navbar />

          {/* Konten utama */}
          <main className="max-w-7xl mx-auto p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
