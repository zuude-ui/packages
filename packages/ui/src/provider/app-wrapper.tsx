import React from "react";
import { Navbar } from "../components/navbar";
import { Providers } from "./next-theme";
import { Toaster } from "../components/sonner";

interface Props {
  children: React.ReactNode;
}

export function AppWrapper({ children }: Props) {
  return (
    <Providers>
      <Navbar />
      {children}
      <Toaster />
    </Providers>
  );
}
