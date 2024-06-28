"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function BodyLayout({ children }: { children: React.ReactNode }) {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      delay: 50,
      duration: 500,
      once: true,
      easing: "ease-out",
      anchorPlacement: "top-bottom",
      mirror: false,
    });
  }, []);

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
