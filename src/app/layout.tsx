import type { Metadata } from "next";
import { Playfair_Display, Nunito_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets:  ["latin", "cyrillic"],
  weight:   ["400", "500", "700"],
  style:    ["normal", "italic"],
  variable: "--font-serif",
  display:  "swap",
});

const nunito = Nunito_Sans({
  subsets:  ["latin", "cyrillic"],
  weight:   ["300", "400", "600", "700"],
  variable: "--font-sans",
  display:  "swap",
});

export const metadata: Metadata = {
  title: "Той · Дидар & Маржан",
  description: "Сіздерді 28 маусым 2026 жылғы тойымызға шақырамыз",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
