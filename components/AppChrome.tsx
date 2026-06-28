'use client';

import { usePathname } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import { ActivityTicker } from '@/components/ActivityTicker';

interface AppChromeProps {
  children: React.ReactNode;
}

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isDashboard = pathname === '/';

  return (
    <>
      {!isDashboard && <NavBar />}
      <main className={isDashboard ? 'flex-1' : 'flex-1 pt-16 pb-12'}>
        {children}
      </main>
      {!isDashboard && <ActivityTicker />}
    </>
  );
}
