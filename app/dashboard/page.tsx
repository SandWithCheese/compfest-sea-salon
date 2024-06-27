import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  getAllBranchesWithServices,
  getUserCurrentReservations,
  getUserPastReservations,
} from "@/lib/query";
import MemberDashboard from "./member-dashboard";
import AdminDashboard from "./admin-dashboard";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  if (session.role !== "admin") {
    const [currentReservations, pastReservations] = await Promise.all([
      getUserCurrentReservations(session.id),
      getUserPastReservations(session.id),
    ]);

    return (
      <MemberDashboard
        currentReservations={currentReservations}
        pastReservations={pastReservations}
        session={session}
      />
    );
  }

  const branchServices = await getAllBranchesWithServices();

  return <AdminDashboard branchServices={branchServices} session={session} />;
}

export default Page;
