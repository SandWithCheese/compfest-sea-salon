import { MetadataRoute } from "next";

const urls = [
  {
    url: "https://compfest-sea-salon.vercel.app/",
    lastModified: new Date(),
    priority: 1,
  },
  {
    url: "https://compfest-sea-salon.vercel.app/reviews",
    lastModified: new Date(),
    priority: 0.8,
  },
  {
    url: "https://compfest-sea-salon.vercel.app/reservation",
    lastModified: new Date(),
    priority: 0.8,
  },
  {
    url: "https://compfest-sea-salon.vercel.app/dashboard",
    lastModified: new Date(),
    priority: 0.8,
  },
  {
    url: "https://compfest-sea-salon.vercel.app/dashboard/history",
    lastModified: new Date(),
    priority: 0.8,
  },
  {
    url: "https://compfest-sea-salon.vercel.app/dashboard/reservations",
    lastModified: new Date(),
    priority: 0.8,
  },
  {
    url: "https://compfest-sea-salon.vercel.app/auth/sign-in",
    lastModified: new Date(),
    priority: 0.8,
  },
  {
    url: "https://compfest-sea-salon.vercel.app/auth/sign-up",
    lastModified: new Date(),
    priority: 0.8,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return urls;
}
