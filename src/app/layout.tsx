import type { Metadata } from "next";
import { Dancing_Script, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalHeader } from "@/components/GlobalHeader";

const helloScript = Dancing_Script({
  variable: "--font-hello",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Motion designer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${dmSans.variable} ${geistMono.variable} ${helloScript.variable} antialiased`}
      >
      <body className="min-h-screen bg-black font-sans">
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
