import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Satoshi from "next/font/local";
import "./globals.css";

const satoshi = Satoshi({ src: "../public/fonts/Satoshi-Regular.otf" });

export const metadata: Metadata = {
  title: "LadX beta",
  description: "Logistics strategy with a difference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>{children}</body>
    </html>
  );
}
