import { users } from "@/db/schema";

export type UserPrivate = typeof users.$inferSelect;

export type UserPublic = Omit<UserPrivate, "password">;
