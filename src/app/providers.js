// src/app/providers.jsx
"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import React, { useState } from "react";

export default function QueryProvider({ children }) {
  const [queryclient] = useState(() => new QueryClient)
  return (
    <QueryClientProvider client={queryclient}>
      {children}
    </QueryClientProvider>
  );
}