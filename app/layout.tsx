import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { cookies } from 'next/headers';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
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

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get('accessToken');
  
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <TanStackProvider>
          <AuthProvider hasToken={hasToken}>
            <Header />
            <main>
              {children}
              {modal}
            </main>
          </AuthProvider>
        </TanStackProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
