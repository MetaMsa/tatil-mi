import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Search from "./search";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Tatil Mi?",
  description: "Kar tatili duyuruları",
  keywords:
    "istanbul kar tatiliankara kar tatili var mı, bursa kar tatili son dakika, izmir kar tatili olur mu, valilik kar tatili açıklaması bugün, okullar yarın kar tatil mi",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Analytics />
        <header>
          <nav className="navbar bg-amber-50 shadow-sm justify-between gap-3">
            <Link className="btn btn-primary text-xl" href="/">
              <i className="fa-regular fa-snowflake"></i>
              Tatil Mi?
            </Link>
            <Search></Search>
          </nav>
        </header>
        <main className="w-full m-auto">{children}</main>
        <footer className="footer flex justify-between shadow-2xl bg-amber-50 text-dark p-3">
          <aside className="flex my-auto">
            <Image
              className="mx-auto"
              src="/favicon.svg"
              width={25}
              height={25}
              alt=""
            />
            <div>
              <span className="slider me-15">
                <span className="slider__word">İstanbul</span>
                <span className="slider__word">Ankara</span>
                <span className="slider__word">İzmir</span>
                <span className="slider__word">Türkiye</span>
              </span>
              <span className="flex justify-start gap-1">
                Tatil <span className="text-indigo-500">Mi?</span>
              </span>
            </div>
          </aside>
          <nav className="my-auto grid grid-cols-2 justify-center text-xs">
            <Link
              className="link link-hover mx-auto"
              href="https://benserhat.com/"
            >
              Hakkımda
            </Link>
            <Link className="link link-hover mx-autor" href="/disclaimer">
              Sorumluluk Reddi
            </Link>
            <Link
              className="link link-hover mx-auto"
              href="https://benserhat.com/gdpr"
            >
              Gizlilik Politikası
            </Link>
            <Link className="link link-hover mx-auto" href="/methodology">
              Metodoloji
            </Link>
          </nav>
          <nav className="my-auto">
            <div className="text-xs sm:text-lg grid grid-cols-2 gap-1">
              <Link
                href={
                  "https://www.linkedin.com/in/mehmet-serhat-aslan-58272b28a/"
                }
              >
                <i className="fa-brands fa-linkedin"></i>
              </Link>
              <Link href={"https://github.com/MetaMsa"}>
                <i className="fa-brands fa-github"></i>
              </Link>
              <Link href={"https://www.youtube.com/@metamsa"}>
                <i className="fa-brands fa-youtube"></i>
              </Link>
              <Link href={"mailto:mserhataslan@hotmail.com"}>
                <i className="fa fa-envelope"></i>
              </Link>
            </div>
          </nav>
        </footer>
      </body>
    </html>
  );
}
