import { reviews } from "@/db/schema";

export type Review = typeof reviews.$inferSelect;

export type Reviews = Review[];

export type ReviewWithUser = Omit<Review, "userId"> & { name: string };

export type ReviewsWithUser = ReviewWithUser[];
