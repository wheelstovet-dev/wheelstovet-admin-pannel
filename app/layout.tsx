import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/provider/auth.provider';
import "@fontsource/playfair-display"; // Defaults to weight 400
import "@fontsource/playfair-display/400.css"; // Specify weight
import "@fontsource/playfair-display/400-italic.css"; // Specify weight and style
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next',
  description: 'Basic dashboard with Next.js'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`}>
        <AuthProvider>
          <NextTopLoader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
