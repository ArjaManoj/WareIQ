import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/authContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'WareIQ Fulfillment & Modern Logistics Platform | Interactive Demo',
  description:
    'Amazon-grade Same-Day & Next-Day fulfillment platform for D2C brands, Marketplaces, and Quick Commerce in India. Interactive operational demonstration by Manoj Arja.',
  keywords: [
    'WareIQ',
    'eCommerce fulfillment',
    '3PL logistics India',
    'Same day delivery',
    'D2C fulfillment',
    'Blinkit dark store fulfillment',
    'Amazon Seller Flex',
    'Smart inventory placement',
  ],
  authors: [{ name: 'Manoj Arja' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
