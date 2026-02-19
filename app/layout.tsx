import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import Header from '@/components/Header/Header';
import "./globals.css";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  style: ['normal'],
  variable: '--font-family',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Petlove',
  description: 'Pet search platform',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <Header />
        <main>
          {children}
          {modal}
        </main>
      </body>
    </html>
  );
}
