"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const query = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

export default function QueryClientProviders({ children }: Props) {
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
