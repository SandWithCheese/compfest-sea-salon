import { branches } from "@/db/schema";

export type Branch = typeof branches.$inferSelect;

export type Branches = Branch[];
