import { Metadata } from "next";
import HeroSection from "./hero-section";
import ServicesSection from "./services-section";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "SEA Salon",
  openGraph: {
    ...openGraphTemplate,
    title: "SEA Salon",
  },
  twitter: {
    ...twitterTemplate,
    title: "SEA Salon",
  },
};

export default function Home() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* FAQ Section */}
      <section
        className="flex min-h-[calc(100vh-97px)] flex-col items-center justify-center px-6 py-12 sm:px-16"
        id="faq"
      >
        <div
          className="flex w-full max-w-[800px] flex-col items-center justify-center gap-8"
          data-aos="fade-up"
        >
          <h2 className="max-w-[500px] text-center font-belleza text-4xl lg:text-6xl">
            Frequently Asked Questions
          </h2>

          <Accordion
            type="single"
            collapsible
            className="w-full max-w-[400px] sm:max-w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm lg:text-base">
                What services does SEA Salon offer?
              </AccordionTrigger>
              <AccordionContent className="text-sm lg:text-base">
                SEA Salon offers a variety of beauty services including haircuts
                and styling, manicure and pedicure, and facial treatments
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm lg:text-base">
                How can I book an appointment at SEA Salon?
              </AccordionTrigger>
              <AccordionContent className="text-sm lg:text-base">
                You can easily book an appointment using the SEA Salon website.
                Simply browse available services, select your preferred branch,
                and schedule your appointment through the user-friendly
                interface.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm lg:text-base">
                Can I leave a review for SEA Salon?
              </AccordionTrigger>
              <AccordionContent className="text-sm lg:text-base">
                Yes, the SEA Salon website includes a feature that allows you to
                leave a review. You can rate the salon from 1 to 5 stars and
                leave a comment about your experience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm lg:text-base">
                Who can I contact for more information or support?
              </AccordionTrigger>
              <AccordionContent className="text-sm lg:text-base">
                For more information or support, you can contact: Thomas:
                08123456789 Sekar: 08164829372
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
