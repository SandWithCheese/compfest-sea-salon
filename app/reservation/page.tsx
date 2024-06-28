import React from "react";
import ReservationForm from "./reservation-form";
import { getBranches } from "@/lib/query";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Reservation | SEA Salon",
  openGraph: {
    ...openGraphTemplate,
    title: "Reservation | SEA Salon",
  },
  twitter: {
    ...twitterTemplate,
    title: "Reservation | SEA Salon",
  },
};

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  if (session.role === "admin") {
    redirect("/dashboard");
  }

  const branches = await getBranches();

  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col items-center justify-center px-6 py-12">
      <ReservationForm branches={branches} session={session} />
    </main>
  );
}

export default Page;
