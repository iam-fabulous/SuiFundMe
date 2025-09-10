import './globals.css'
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import Providers from '../components/providers'
import '@mysten/dapp-kit/dist/index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "SUI Fund Me",
  description: "SUI Fund me is designed for fund raising",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <Navbar/> */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
