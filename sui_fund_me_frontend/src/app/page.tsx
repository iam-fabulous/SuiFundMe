'use client';

import Link from 'next/link';

export default function ConnectWalletPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden">
       {/* Background Image Layer */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="bg-[url('/images/image-1.jpg')] bg-cover bg-center bg-no-repeat absolute inset-0 size-full"
        ></div>
        {/* Semi-transparent Overlay for Readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
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
            {/* The `Link` component replaces the `Button` */}
            <Link
              href="/marketplace" // <-- New route for the campaign marketplace
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-lg text-lg transform transition-transform hover:scale-105 active:scale-95 duration-200"
            >
              Get Started
            </Link>
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