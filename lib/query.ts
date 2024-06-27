"use server";

import { db } from "@/db/drizzle";
import { getServerSession } from "next-auth";
import {
  branches,
  services,
  branchservices,
  reviews,
  users,
} from "@/db/schema";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { eq, ne } from "drizzle-orm";
import { Branch, Branches } from "@/types/branch";
import { Services } from "@/types/service";
import { Reviews, ReviewsWithUser, ReviewWithUser } from "@/types/reviews";

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

export async function getReviews(): Promise<Reviews | null> {
  // Get all reviews
  const reviewsQuery = await db.select().from(reviews);

  return reviewsQuery;
}

export async function getReviewsWithUsers(): Promise<ReviewsWithUser | null> {
  // Get all reviews with user
  const reviewsQuery = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      name: users.name,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id));

  return reviewsQuery;
}

export async function getReviewWithUser(
  id: string,
): Promise<ReviewWithUser | null> {
  // Get all reviews with user
  const reviewsQuery = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      name: users.name,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.userId, id));

  if (reviewsQuery.length === 0) {
    return null;
  }

  return reviewsQuery[0];
}

export async function getReviewsWithUserExceptCurrentUser(
  id: string,
): Promise<ReviewsWithUser | null> {
  // Get all reviews with user except current user
  const reviewsQuery = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      name: users.name,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(ne(reviews.userId, id));

  return reviewsQuery;
}

export async function getAllReviewsWithUser(
  id: string,
): Promise<[ReviewsWithUser | null, ReviewWithUser | null]> {
  const reviews = await Promise.all([
    getReviewsWithUserExceptCurrentUser(id),
    getReviewWithUser(id),
  ]);

  return reviews;
}
