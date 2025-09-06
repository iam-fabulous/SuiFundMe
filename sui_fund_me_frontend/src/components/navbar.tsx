"use client";

import {
  useConnectWallet,
  useDisconnectWallet,
  useWallets,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import Link from "next/link";

export default function Navbar() {
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const wallets = useWallets();
  const currentAccount = useCurrentAccount();

  const handleClick = () => {
    if (currentAccount) {
      // Already connected → disconnect
      disconnect();
      return;
    }

    // Try to connect to Slush wallet
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
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900">
      <Link href="/" className="text-xl font-bold text-white">
        SuiFundMe
      </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a className="text-gray-400 hover:text-white transition-colors text-sm font-medium leading-normal" href="#">Explore</a>
          <a className="text-gray-400 hover:text-white transition-colors text-sm font-medium leading-normal" href="#">Start a project</a>
        </nav>

      <button
        onClick={handleClick}
        className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
      >
        {currentAccount
          ? `${currentAccount.address.slice(0, 6)}...${currentAccount.address.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </header>
  );
}
