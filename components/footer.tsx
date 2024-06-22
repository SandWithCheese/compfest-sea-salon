import React from "react";
import SEALogo from "./svg/sea-logo";
import Link from "next/link";
import InstagramLogo from "./svg/instagram-logo";
import TwitterLogo from "./svg/twitter-logo";
import TiktokLogo from "./svg/tiktok-logo";

function Footer() {
  return (
    <footer className="z-50 flex flex-col gap-12 border-t border-border bg-background px-16 py-8">
      <div className="lg:self-start">
        <div className="flex flex-col items-center">
          <SEALogo
            className="h-fit w-16 fill-foreground"
            aria-label="SEA Logo"
          />
          <p className="font-belleza text-lg">SEA SALON</p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between gap-12 lg:flex-row">
        {/* Description and copyright */}
        <div className="flex flex-col gap-8 text-center lg:text-start">
          <p>
            SEA Salon, The No.1 Beauty & Hair Salon Featuring Premium Treatments
            and Services
          </p>
          <p>@ 2024 SEA Salon. All rights reserved.</p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center gap-2">
          <p>Our Social Media</p>
          <div className="flex gap-4">
            <Link
              href="https://www.instagram.com/naufal.rmdn/"
              target="_blank"
              className="rounded-full bg-primary-foreground"
            >
              <InstagramLogo
                className="h-fit w-10 fill-primary hover:fill-primary/90"
                aria-label="Instagram Logo"
              />
            </Link>
            <Link
              href="https://www.instagram.com/naufal.rmdn/"
              target="_blank"
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              <TwitterLogo
                className="h-fit w-10 fill-primary-foreground p-2"
                aria-label="Twitter Logo"
              />
            </Link>
            <Link
              href="https://www.instagram.com/naufal.rmdn/"
              target="_blank"
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              <TiktokLogo
                className="h-fit w-10 fill-primary-foreground p-2"
                aria-label="Tiktok Logo"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
