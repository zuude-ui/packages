import React from "react";
import { Navbar } from "../components/navbar";
import { Providers } from "./next-theme";
import { Toaster } from "../components/sonner";
import { ReactScan } from "../components/react-scan";
import QueryClientProviders from "./query-client";
import { Geist_Mono, Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface Props {
  children: React.ReactNode;
}

export function AppWrapper({ children }: Props) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.className} ${geistMono.variable} antialiased`}
    >
      <body>
        <QueryClientProviders>
          <Providers>
            <div className="max-w-3xl mx-auto py-24">
              <Navbar />
              {children}
            </div>
            <Toaster />
            <ReactScan />
          </Providers>
        </QueryClientProviders>
      </body>
    </html>
  );
}
