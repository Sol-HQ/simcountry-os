'use client';

import React, { ReactNode, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

const asTypedProvider = <P,>(Component: React.ComponentType<P>) =>
  Component as React.FC<React.PropsWithChildren<P>>;

const ConnectionProviderTyped = asTypedProvider(ConnectionProvider);
const WalletProviderTyped = asTypedProvider(WalletProvider);
const WalletModalProviderTyped = asTypedProvider(WalletModalProvider);

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
    <ConnectionProviderTyped endpoint={endpoint}>
      <WalletProviderTyped wallets={wallets} autoConnect>
        <WalletModalProviderTyped>{children}</WalletModalProviderTyped>
      </WalletProviderTyped>
    </ConnectionProviderTyped>
  );
}
