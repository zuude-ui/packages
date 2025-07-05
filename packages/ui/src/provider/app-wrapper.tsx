import React from "react";
import { Navbar } from "../components/navbar";
import { Providers } from "./next-theme";
import { Toaster } from "../components/sonner";
import { ReactScan } from "../components/react-scan";
import QueryClientProviders from "./query-client";

interface Props {
  children: React.ReactNode;
}

export function AppWrapper({ children }: Props) {
  return (
    <QueryClientProviders>
      <Providers>
        <Navbar />
        {children}
        <Toaster />
        <ReactScan />
      </Providers>
    </QueryClientProviders>
  );
}
