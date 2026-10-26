import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { SmoothAnchors } from "@/components/smooth-anchors";
import { HtmlLang } from "@/lib/i18n";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FarmLink — Traceability EUDR Kopi dan Kakao",
    template: "%s · FarmLink",
  },
  description:
    "FarmLink membantu koperasi dan eksportir kecil menyusun paket data EUDR per lot: lokasi kebun, skrining deforestasi, legalitas, dan rantai asal yang tercatat permanen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HtmlLang />
        <SmoothAnchors />
        {children}
      </body>
    </html>
  );
}
