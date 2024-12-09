// app/layout.tsx
import '@uploadthing/react/styles.css';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers'; // Import the Providers component
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next',
  description: 'Basic dashboard with Next.js'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Perform the redirect
  // redirect('/auth/login/'); // Redirects to /auth/login
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}