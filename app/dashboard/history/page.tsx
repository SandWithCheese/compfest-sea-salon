import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import PaginationPage from "./pagination-page";
import { getUserPastReservations } from "@/lib/query";
import { Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "History | SEA Salon",
  openGraph: {
    ...openGraphTemplate,
    title: "History | SEA Salon",
  },
  twitter: {
    ...twitterTemplate,
    title: "History | SEA Salon",
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

  const pastReservations = await getUserPastReservations(session.id);

  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col gap-8 px-6 py-12 sm:px-16">
      <h1 className="font-belleza text-3xl sm:text-5xl">Your History</h1>

      <PaginationPage reservations={pastReservations} />
    </main>
  );
}

export default Page;
