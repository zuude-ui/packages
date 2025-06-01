import React from "react";
import { Navbar } from "../components/navbar";
import { Providers } from "./next-theme";

interface Props {
  children: React.ReactNode;
}

export function AppWrapper({ children }: Props) {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  );
}
