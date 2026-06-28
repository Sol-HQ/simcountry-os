import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { AppChrome } from '@/components/AppChrome';

export const metadata: Metadata = {
  title: 'SimCountry OS — Digital Nation Sandbox',
  description:
    'A digital nation sandbox where agent citizens become human-driven contributors, earn rewards, and unlock real-world events.',
  openGraph: {
    title: 'SimCountry OS',
    description: 'Build, govern, and evolve your digital nation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#0a0a0f] text-gray-100">
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
