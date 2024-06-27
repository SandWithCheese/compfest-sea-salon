import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getUserCurrentReservations } from "@/lib/query";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import PaginationPage from "./pagination-page";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  const currentReservations = await getUserCurrentReservations(session.id);

  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col gap-8 px-6 py-12 sm:px-16">
      <h1 className="font-belleza text-5xl">Your Reservations</h1>

      <PaginationPage reservations={currentReservations} />
    </main>
  );
}

export default Page;
