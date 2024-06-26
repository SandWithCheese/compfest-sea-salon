"use server";

import { db } from "@/db/drizzle";
import { getServerSession } from "next-auth";
import { branches, services, branchservices } from "@/db/schema";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { eq } from "drizzle-orm";
import { Branch, Branches } from "@/types/branch";
import { Services } from "@/types/service";

export async function getBranches(): Promise<Branches | null> {
  // Validate user session
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  // Get all branches
  const branchesQuery = await db.select().from(branches);

  return branchesQuery;
}

export async function getBranch(id: string): Promise<Branch | null> {
  // Validate user session
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  // Get all branches
  const branchQuery = await db
    .select()
    .from(branches)
    .where(eq(branches.id, id));

  if (branchQuery.length === 0) {
    return null;
  }

  return branchQuery[0];
}

export async function getServicesFromBranchId(
  id: string,
): Promise<Services | null> {
  // Validate user session
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  // Get all services from branch
  const branchServicesQuery = await db
    .select({
      id: services.id,
      name: services.name,
      duration: services.duration,
    })
    .from(branches)
    .innerJoin(branchservices, eq(branches.id, branchservices.branchId))
    .innerJoin(services, eq(branchservices.serviceId, services.id))
    .where(eq(branches.id, id));

  return branchServicesQuery;
}
