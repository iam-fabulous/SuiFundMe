// "use client";

// import Link from "next/link";
// import { Button } from "./ui/button";
// import { useConnectWallet, useDisconnectWallet, useWallets, useCurrentAccount } from "@mysten/dapp-kit";

// export default function Navbar() {
//   const { mutate: connect } = useConnectWallet();
//   const { mutate: disconnect } = useDisconnectWallet();
//   const wallets = useWallets();
//   const currentAccount = useCurrentAccount();

//   const handleClick = () => {
//     if (currentAccount) {
//       disconnect();
//       return;
//     }

//     const slush = wallets.find((w) =>
//       w.name.toLowerCase().includes("slush")
//     );

//     if (slush) {
//       connect(
//         { wallet: slush },
//         {
//           onSuccess: () => console.log("✅ Connected to Slush"),
//           onError: (err) => console.error("❌ Connection failed:", err),
//         }
//       );
//     } else {
//       console.warn("Slush wallet not found. Please install it.");
//     }
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-7 bg-gray-900">
//       <Link href="/" className="text-3xl font-bold text-white">
//         SuiFundMe
//       </Link>

//         <nav className="hidden md:flex items-center gap-8">
//           <Link href="/marketplace" className="text-gray-400 hover:text-white transition-colors text-sm font-medium leading-normal">Explore</Link>
//           <Link href="/createProject" className="text-gray-400 hover:text-white transition-colors text-sm font-medium leading-normal">Start a project</Link>
//         </nav>

//       <Button
//         onClick={handleClick}
//         className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-bold"
//       >
//         {currentAccount
//           ? `${currentAccount.address.slice(0, 6)}...${currentAccount.address.slice(-4)}`
//           : "Connect Wallet"}
//       </Button>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
// import { Button } from "./ui/button";
import { ConnectButton } from "@mysten/dapp-kit";
import { Coins } from "lucide-react";
// import { useState } from "react";

export default function Navbar() {
  // const currentAccount = useCurrentAccount();
  // const [showWalletMenu, setShowWalletMenu] = useState(false);

  // const formatAddress = (address: string) => {
  //   return `${address.slice(0, 6)}...${address.slice(-4)}`;
  // };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            className="relative"
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            SuiFundMe
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: 'Explore', href: '/marketplace' },
            { name: 'Start a Project', href: '/createProject' },
            { name: 'How It Works', href: '#' }
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
            >
              <Link 
                href={item.href}
                className="relative text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium group py-2"
              >
                {item.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Wallet Connection */}
        <div className="relative flex items-center">
          <ConnectButton
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-xl border-0 transition-all duration-300 flex items-center gap-2"
          />
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden relative p-2 text-white"
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <motion.div 
              className="w-full h-0.5 bg-white rounded"
              whileHover={{ scaleX: 1.2 }}
            />
            <motion.div 
              className="w-full h-0.5 bg-white rounded"
              whileHover={{ scaleX: 0.8 }}
            />
            <motion.div 
              className="w-full h-0.5 bg-white rounded"
              whileHover={{ scaleX: 1.2 }}
            />
          </div>
        </motion.button>
      </div>
    </motion.header>
  );
}
