"use client";

import { Button } from "@/components/ui/button";
import scrollToSection from "@/lib/scroll";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-97px)]">
      <div className="relative h-[calc(100vh-97px)] w-full">
        <Image
          src="/home/hero.jpg"
          alt="Hero"
          width={1440}
          height={958}
          className="absolute h-full w-full object-cover"
        />

        <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 bg-black/50 lg:gap-12">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="font-belleza text-6xl text-[#E5FAF2] lg:text-8xl">
              SEA SALON
            </h1>
            <p className="text-xl text-[#E5FAF2] lg:text-4xl">
              Beauty and Elegance Redefined
            </p>
          </div>

          <Button
            className="rounded-full px-8 text-xs lg:text-base"
            onClick={() => scrollToSection("services")}
          >
            Discover
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
