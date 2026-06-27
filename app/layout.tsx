import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { NavBar } from '@/components/NavBar';
import { ActivityTicker } from '@/components/ActivityTicker';

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
          <NavBar />
          <main className="flex-1 pt-16 pb-12">{children}</main>
          <ActivityTicker />
        </Providers>
      </body>
    </html>
  );
}
