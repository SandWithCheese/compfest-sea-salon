import React from "react";
import ReservationForm from "./reservation-form";
import { getBranches } from "@/lib/query";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(authOptions);
  const branches = await getBranches();

  if (!branches) {
    return <div>Error!</div>;
  }

  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col items-center justify-center px-6 py-12">
      <ReservationForm branches={branches} session={session} />
    </main>
  );
}

export default Page;
