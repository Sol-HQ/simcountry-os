'use client';

import React, { ReactNode, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
  type ConnectionProviderProps,
  type WalletProviderProps,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  type WalletModalProviderProps,
} from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

// React 18 dropped implicit `children` from FC, so some third-party providers
// typed as FC<Props> reject children in JSX. Re-cast them with children added.
const ConnectionProviderFixed = ConnectionProvider as React.FC<
  ConnectionProviderProps & { children: React.ReactNode }
>;
const WalletProviderFixed = WalletProvider as React.FC<
  WalletProviderProps & { children: React.ReactNode }
>;
const WalletModalProviderFixed = WalletModalProvider as React.FC<
  WalletModalProviderProps & { children: React.ReactNode }
>;

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProviderFixed endpoint={endpoint}>
      <WalletProviderFixed wallets={wallets} autoConnect>
        <WalletModalProviderFixed>{children}</WalletModalProviderFixed>
      </WalletProviderFixed>
    </ConnectionProviderFixed>
  );
}
