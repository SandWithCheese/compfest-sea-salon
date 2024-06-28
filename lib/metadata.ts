import { type Metadata } from "next";

export const openGraphTemplate: Metadata["openGraph"] = {
  description:
    "Discover SEA Salon, the premier destination for all your beauty needs, known for outstanding services and excellent reviews. With a rapidly growing clientele, SEA Salon introduces the SEA Salon Application, allowing users to browse services, select preferred stylists, and book appointments easily through a user-friendly interface and seamless booking integration.",
  url: "https://compfest-sea-salon.vercel.app/",
  siteName: "SEA Salon",
  locale: "en-US",
  type: "website",
  images: {
    url: "https://compfest-sea-salon.vercel.app/logo/link-preview.png",
    width: "1200",
    height: "630",
    alt: "SEA Salon Logo",
  },
};

export const twitterTemplate: Metadata["twitter"] = {
  card: "summary_large_image",
  description:
    "Discover SEA Salon, the premier destination for all your beauty needs, known for outstanding services and excellent reviews. With a rapidly growing clientele, SEA Salon introduces the SEA Salon Application, allowing users to browse services, select preferred stylists, and book appointments easily through a user-friendly interface and seamless booking integration.",
  images: {
    url: "https://compfest-sea-salon.vercel.app/logo/link-preview.png",
    alt: "SEA Salon Logo",
  },
};
