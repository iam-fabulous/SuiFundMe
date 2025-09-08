"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useConnectWallet, useDisconnectWallet, useWallets, useCurrentAccount } from "@mysten/dapp-kit";

export default function Navbar() {
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const wallets = useWallets();
  const currentAccount = useCurrentAccount();

  const handleClick = () => {
    if (currentAccount) {
      disconnect();
      return;
    }

    const slush = wallets.find((w) =>
      w.name.toLowerCase().includes("slush")
    );

    if (slush) {
      connect(
        { wallet: slush },
        {
          onSuccess: () => console.log("✅ Connected to Slush"),
          onError: (err) => console.error("❌ Connection failed:", err),
        }
      );
    } else {
      console.warn("Slush wallet not found. Please install it.");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-7 bg-gray-900">
      <Link href="/" className="text-3xl font-bold text-white">
        SuiFundMe
      </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/marketplace" className="text-gray-400 hover:text-white transition-colors text-sm font-medium leading-normal">Explore</Link>
          <Link href="/createProject" className="text-gray-400 hover:text-white transition-colors text-sm font-medium leading-normal">Start a project</Link>
        </nav>

      <Button
        onClick={handleClick}
        className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-bold"
      >
        {currentAccount
          ? `${currentAccount.address.slice(0, 6)}...${currentAccount.address.slice(-4)}`
          : "Connect Wallet"}
      </Button>
    </header>
  );
}
