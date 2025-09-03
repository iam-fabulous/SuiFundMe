'use client';

import { Button } from '@/components/ui/button';
import { WalletIcon } from '@/components/wallet-icon';
import Link from 'next/link';

// You will need to implement the actual wallet connection logic here
const handleConnectWallet = () => {
  console.log('Connect Wallet button clicked');
};

export default function ConnectWalletPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header - A good candidate for a reusable component */}
        <header className="p-6">
          <div className="flex items-center justify-between">
            <Link href="#" className="text-2xl font-bold tracking-tighter">
              SuiFundMe
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="#" className="hover:text-sui-primary transition-colors">Explore</Link>
              <Link href="#" className="hover:text-sui-primary transition-colors">Start a Project</Link>
              <Link href="#" className="hover:text-sui-primary transition-colors">How It Works</Link>
            </nav>
            <button className="md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
              Fund Your Dream on Sui
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Experience a new era of crowdfunding with complete transparency and community-driven funding on the Sui blockchain.
            </p>
            <Button onClick={handleConnectWallet}>
              <span className="material-symbols-outlined">account_balance_wallet</span>
              <span className="truncate">Connect Wallet</span>
            </Button>
          </div>
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400 mb-4">Compatible Wallets</p>
            <div className="flex justify-center items-center gap-8">
              <WalletIcon name="Suiet" logoSrc="/images/suiet-logo.svg" />
              <WalletIcon name="Ethos" logoSrc="/images/ethos-logo.svg" />
            </div>
          </div>
        </main>

        {/* Footer - Also a good candidate for a reusable component */}
        <footer className="p-6 text-center text-xs text-gray-500">
          <p>© 2024 SuiFundMe. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}