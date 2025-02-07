"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState } from "react";


export default function QueryProvider({childern}) {
  const [queryclient] = useState(() => new QueryClient)
  return (
    <QueryClientProvider client={queryclient}>
      {childern}
    </QueryClientProvider>
  );
}