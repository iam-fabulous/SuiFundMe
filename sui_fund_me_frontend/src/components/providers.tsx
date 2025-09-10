"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { ReactNode, useState } from "react";
import { ProjectProvider } from "./contexts/project-contexts";

export default function Providers({ children }: { children: ReactNode }) {
  // Ensure only 1 QueryClient exists
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={{
            testnet: { url: "https://fullnode.testnet.sui.io" }
        }}
        defaultNetwork="testnet"
      >
        <WalletProvider>
          <ProjectProvider>
            {children}
          </ProjectProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
