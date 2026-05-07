import type { Metadata } from "next";
import { Geist, Noto_Sans_KR } from "next/font/google";

import "./globals.css";

const sansFont = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const koreanFont = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-korean",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Jaewoo Ann | Frontend Portfolio",
  description:
    "A bilingual product-minded frontend portfolio with an Open Design inspired interface system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sansFont.variable} ${koreanFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
