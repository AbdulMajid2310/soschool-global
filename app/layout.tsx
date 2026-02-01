import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "@/provider/ThemeProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "SoSchool — Revolusi Digital Management Sekolah",
    template: "%s | SoSchool"
  },
  description: "Platform All-in-One manajemen sekolah cerdas berbasis Cloud & AI. Tingkatkan efisiensi administrasi, LMS interaktif, dan transparansi pendidikan dalam satu ekosistem terpadu.",
  keywords: [
    "Manajemen Sekolah Digital", 
    "LMS Indonesia", 
    "Aplikasi Sekolah Cloud", 
    "SoSchool Digital Education", 
    "Sistem Informasi Sekolah"
  ],
  authors: [{ name: "Majid", url: "https://soschool.site" }], // Mengacu pada info user sebagai developer
  creator: "SoSchool Team",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://soschool.site",
    title: "SoSchool — Solusi Digital Seluruh Sekolah",
    description: "Belajar tanpa batas dengan ekosistem digital terpadu. Modernisasi sekolah Anda sekarang!",
    siteName: "SoSchool",
    images: [
      {
        url: "/og-image.png", // Pastikan buat file image 1200x630 di folder public
        width: 1200,
        height: 630,
        alt: "SoSchool Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoSchool — Education Revolution",
    description: "Satu platform untuk seluruh kebutuhan sekolah digital.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProviders>
          {children}
        </ThemeProviders>
      </body>
    </html>

  );
}
