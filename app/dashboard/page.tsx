import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  getAllBranchesWithServices,
  getServices,
  getUserCurrentReservations,
  getUserPastReservations,
} from "@/lib/query";
import MemberDashboard from "./member-dashboard";
import AdminDashboard from "./admin-dashboard";
import { Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Dashboard | SEA Salon",
  openGraph: {
    ...openGraphTemplate,
    title: "Dashboard | SEA Salon",
  },
  twitter: {
    ...twitterTemplate,
    title: "Dashboard | SEA Salon",
  },
};

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

  const [branchServices, services] = await Promise.all([
    getAllBranchesWithServices(),
    getServices(),
  ]);

  return <AdminDashboard branchServices={branchServices} services={services} />;
}

export default Page;
