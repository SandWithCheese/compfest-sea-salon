"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function BodyLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <body className="bg-background font-montserrat text-foreground">
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </SessionProvider>
  );
}

export default BodyLayout;
