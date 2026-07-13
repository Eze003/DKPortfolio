import type { Metadata } from "next";
import { Dancing_Script, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalHeader } from "@/components/GlobalHeader";

const helloScript = Dancing_Script({
  variable: "--font-hello",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
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
      className={`${outfit.variable} ${geistMono.variable} ${helloScript.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black font-sans">
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}

