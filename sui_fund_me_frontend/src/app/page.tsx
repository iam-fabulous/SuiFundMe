// 'use client';

// // import { Button } from '../components/ui/button';
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden">
//       <div className="absolute inset-0 -z-10">
//         <div className="bg-[url('/images/image-1.png')] bg-cover bg-center bg-no-repeat absolute inset-0 size-full"></div>
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//       </div>

//       <div className="layout-container flex h-full grow flex-col">
//         <header className="p-6">
//           <div className="flex items-center justify-between">
//             <Link href="#" className="text-3xl text-white font-bold tracking-tighter">
//               SuiFundMe
//             </Link>
//             <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
//               <Link href="#" className="text-white transition-colors">Explore</Link>
//               <Link href="/createProject" className="text-white transition-colors">Start a Project</Link>
//               <Link href="#" className="text-white transition-colors">How It Works</Link>
//             </nav>
//             <button className="md:hidden">
//               <span className="material-symbols-outlined text-white">menu</span>
//             </button>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
//           <div className="max-w-3xl">
//             <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
//               Fund Your Dream on Sui
//             </h1>
//             <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
//               Experience a new era of crowdfunding with complete transparency and community-driven funding on the Sui blockchain.
//             </p>
//             <Link
//               href="/marketplace"
//               className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-lg text-lg transform transition-transform hover:scale-105 active:scale-95 duration-200"
//             >
//               Get Started
//             </Link>
//           </div>
//         </main>

//         <footer className="p-6 text-center text-xs text-gray-500">
//           <p>© 2025 SuiFundMe. All rights reserved.</p>
//         </footer>
//       </div>
//     </div>
//   );
// }


'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, Coins, TrendingUp, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className=" relative flex size-full min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Hero Background with Blue Streaks
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#1e293b;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="streak1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:transparent;stop-opacity:0" />
                  <stop offset="20%" style="stop-color:#3b82f6;stop-opacity:0.8" />
                  <stop offset="40%" style="stop-color:#06b6d4;stop-opacity:1" />
                  <stop offset="60%" style="stop-color:#0ea5e9;stop-opacity:1" />
                  <stop offset="80%" style="stop-color:#3b82f6;stop-opacity:0.8" />
                  <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
                </linearGradient>
                <linearGradient id="streak2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:transparent;stop-opacity:0" />
                  <stop offset="30%" style="stop-color:#06b6d4;stop-opacity:0.6" />
                  <stop offset="50%" style="stop-color:#0ea5e9;stop-opacity:0.9" />
                  <stop offset="70%" style="stop-color:#06b6d4;stop-opacity:0.6" />
                  <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
                </linearGradient>
                <linearGradient id="streak3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:transparent;stop-opacity:0" />
                  <stop offset="25%" style="stop-color:#0ea5e9;stop-opacity:0.4" />
                  <stop offset="50%" style="stop-color:#06b6d4;stop-opacity:0.7" />
                  <stop offset="75%" style="stop-color:#0ea5e9;stop-opacity:0.4" />
                  <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="url(#bg)"/>
              <g transform="skewY(-15)">
                <rect x="0" y="50" width="100%" height="3" fill="url(#streak1)" filter="url(#glow)" opacity="0.9"/>
                <rect x="0" y="120" width="100%" height="2" fill="url(#streak2)" filter="url(#glow)" opacity="0.7"/>
                <rect x="0" y="200" width="100%" height="4" fill="url(#streak1)" filter="url(#glow)" opacity="0.8"/>
                <rect x="0" y="280" width="100%" height="1" fill="url(#streak3)" filter="url(#glow)" opacity="0.5"/>
                <rect x="0" y="350" width="100%" height="3" fill="url(#streak2)" filter="url(#glow)" opacity="0.6"/>
                <rect x="0" y="420" width="100%" height="2" fill="url(#streak1)" filter="url(#glow)" opacity="0.9"/>
                <rect x="0" y="500" width="100%" height="1" fill="url(#streak3)" filter="url(#glow)" opacity="0.4"/>
                <rect x="0" y="580" width="100%" height="3" fill="url(#streak2)" filter="url(#glow)" opacity="0.7"/>
              </g>
            </svg>
          `)}`,
        }}
      />
      
      {/* Overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" /> */} 
      
      {/* Additional animated elements */}
      <div className="absolute inset-0">        
        {/* Floating Orbs with blue theme */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-sky-400/5 to-blue-400/5 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 layout-container flex h-full grow flex-col ">
        {/* Header */}
        <motion.header 
          className="p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <Link href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Coins className="w-6 h-6 text-white" />
                </motion.div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                SuiFundMe
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              {['Explore', 'Start a Project', 'How It Works'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={item === 'Explore' ? '/marketplace' : item === 'Start a Project' ? '/createProject' : '#'} 
                    className="relative text-blue-200 hover:text-white transition-colors text-sm font-medium group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.button 
              className="md:hidden relative p-2"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white rounded" />
                <div className="w-full h-0.5 bg-white rounded" />
                <div className="w-full h-0.5 bg-white rounded" />
              </div>
            </motion.button>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-20">
          <div className="max-w-5xl">
            {/* Hero Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-400/20 backdrop-blur-sm mb-8"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-blue-200">Powered by Sui Blockchain</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Fund Your
              </span>
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                  Dreams
                </span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl -z-10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Experience the future of crowdfunding with{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text font-semibold">
                complete transparency
              </span>,{' '}
              <span className="text-transparent bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text font-semibold">
                instant settlements
              </span>, and{' '}
              <span className="text-transparent bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text font-semibold">
                community-driven funding
              </span>{' '}
              on the Sui blockchain.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link href="/marketplace">
                <motion.div
                  className="group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 flex items-center gap-3">
                    Explore Projects
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>

              <Link href="/createProject">
                <motion.div
                  className="group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative bg-white/10 backdrop-blur-sm border border-blue-400/30 hover:bg-blue-500/20 hover:border-cyan-400/50 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 flex items-center gap-3">
                    Start Funding
                    <Zap className="w-5 h-5" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Feature Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto "
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { icon: Shield, title: 'Transparent', desc: 'Every transaction recorded on-chain' },
                { icon: TrendingUp, title: 'Fast Settlements', desc: 'Instant payouts with Sui speed' },
                { icon: Users, title: 'Community Driven', desc: 'Decentralized governance & voting' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-blue-950/20 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-8 group-hover:bg-blue-900/30 group-hover:border-cyan-400/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-blue-200">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer 
          className="p-6 text-center text-sm text-blue-300 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="w-4 h-4" />
            <span>Built on Sui Network</span>
          </div>
          <p>© 2025 SuiFundMe. Decentralized crowdfunding for the future.</p>
        </motion.footer>
      </div>
    </div>
  );
}
