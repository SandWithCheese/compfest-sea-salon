"use server";

import { db } from "@/db/drizzle";
import { getServerSession } from "next-auth";
import {
  branches,
  services,
  branchservices,
  reviews,
  users,
  reservations,
} from "@/db/schema";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { and, asc, eq, gte, lt, ne } from "drizzle-orm";
import { Branch, Branches } from "@/types/branch";
import { Services } from "@/types/service";
import { Reviews, ReviewsWithUser, ReviewWithUser } from "@/types/reviews";
import { ReservationDetails } from "@/types/reservation";
import { BranchServices } from "@/types/branchservice";

// Branches
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

// Services
export async function getServices(): Promise<Services | null> {
  // Validate user session
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  // Get all services
  const servicesQuery = await db.select().from(services);

  return servicesQuery;
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

export async function getAllBranchesWithServices(): Promise<BranchServices | null> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  // Get all branches with services
  const branchesQuery = await db.query.branches.findMany({
    columns: {
      id: true,
      name: true,
      location: true,
      openingTime: true,
      closingTime: true,
    },
    with: {
      services: {
        columns: {
          serviceId: true,
        },
        with: {
          service: {
            columns: {
              id: true,
              name: true,
              duration: true,
            },
          },
        },
      },
    },
  });

  return branchesQuery;
}

// Reviews
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

// Reservations
export async function getUserCurrentReservations(
  id: string,
): Promise<ReservationDetails | null> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  // Get all reservations that greater than current date
  const reservationsFullDetailsQuery = await db.query.reservations.findMany({
    columns: {
      id: true,
      datetime: true,
      branchId: true,
      serviceId: true,
      userId: true,
    },
    with: {
      branches: {
        columns: {
          id: true,
          name: true,
          location: true,
        },
      },
      services: {
        columns: {
          id: true,
          name: true,
          duration: true,
        },
      },
    },
    where: and(
      eq(reservations.userId, id),
      gte(reservations.datetime, new Date()),
    ),
    orderBy: asc(reservations.datetime),
  });

  return reservationsFullDetailsQuery;
}

export async function getUserPastReservations(
  id: string,
): Promise<ReservationDetails | null> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  // Get all reservations that greater than current date
  const reservationsFullDetailsQuery = await db.query.reservations.findMany({
    columns: {
      id: true,
      datetime: true,
      branchId: true,
      serviceId: true,
      userId: true,
    },
    with: {
      branches: {
        columns: {
          id: true,
          name: true,
          location: true,
        },
      },
      services: {
        columns: {
          id: true,
          name: true,
          duration: true,
        },
      },
    },
    where: and(
      eq(reservations.userId, id),
      and(eq(reservations.userId, id), lt(reservations.datetime, new Date())),
    ),
    orderBy: asc(reservations.datetime),
  });

  return reservationsFullDetailsQuery;
}
