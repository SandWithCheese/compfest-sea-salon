"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import scrollToSection from "@/lib/scroll";

function ServicesSection() {
  return (
    <section
      className="flex min-h-[calc(100vh-97px)] flex-col items-center justify-center px-6 py-12 lg:px-16"
      id="services"
    >
      <div
        className="flex h-full w-full flex-col items-center justify-between gap-12 lg:flex-row lg:pr-12"
        data-aos="fade-up"
      >
        <div className="flex max-w-[400px] flex-col gap-8 text-center lg:text-start xl:max-w-[600px]">
          <h2 className="font-belleza text-4xl lg:text-6xl">Our Services</h2>
          <p className="text-sm lg:text-base">
            We offer expert haircuts and styling, luxurious manicures and
            pedicures, and rejuvenating facial treatments to leave you looking
            and feeling your best.
          </p>
          <div className="grid grid-cols-none grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-none sm:gap-12">
            <Button className="rounded-full text-xs lg:text-base">
              <Link href="/reservation">Make a Reservation</Link>
            </Button>
            <Button
              variant={"outline"}
              className="rounded-full border-secondary text-xs lg:text-base"
              onClick={() => scrollToSection("faq")}
            >
              More Information
            </Button>
          </div>
        </div>
        <div className="px-8">
          <Carousel className="w-full max-w-[640px]">
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/home/haircut.jpg"
                  alt="Haircut"
                  width={720}
                  height={480}
                  className="rounded-3xl"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/home/manicure.jpg"
                  alt="Manicure"
                  width={720}
                  height={480}
                  className="rounded-3xl"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/home/facial.jpg"
                  alt="Facial"
                  width={720}
                  height={480}
                  className="rounded-3xl"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
