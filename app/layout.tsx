import type { Metadata, Viewport } from "next";
import "./globals.css";
import BodyLayout from "./body-layout";
import { Belleza, Inter, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const belleza = Belleza({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-belleza",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

// Shared viewport config
export const viewport: Viewport = {
  themeColor: "green",
  colorScheme: "dark",
};

// Shared metadata config
export const metadata: Metadata = {
  description:
    "Discover SEA Salon, the premier destination for all your beauty needs, known for outstanding services and excellent reviews. With a rapidly growing clientele, SEA Salon introduces the SEA Salon Application, allowing users to browse services, select preferred stylists, and book appointments easily through a user-friendly interface and seamless booking integration.",
  generator: "Next.js",
  applicationName: "SEA Salon",
  keywords: [
    "SEA Salon",
    "Compfest",
    "beauty",
    "salon",
    "hair",
    "nails",
    "makeup",
    "skincare",
    "spa",
    "wellness",
    "appointment",
    "booking",
  ],
  category: "beauty",
  metadataBase: new URL("https://compfest-sea-salon.vercel.app/"),
  manifest: "https://compfest-sea-salon.vercel.app/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, belleza.variable, montserrat.variable)}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <BodyLayout>{children}</BodyLayout>
      </ThemeProvider>
    </html>
  );
}
