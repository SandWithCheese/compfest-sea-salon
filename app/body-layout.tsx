"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function BodyLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <body className="font-montserrat bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
      </body>
    </SessionProvider>
  );
}

export default BodyLayout;
