"use client";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

function BodyLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <body className={inter.className}>{children}</body>
    </SessionProvider>
  );
}

export default BodyLayout;
