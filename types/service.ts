import { services } from "@/db/schema";

export type Service = typeof services.$inferSelect;

export type Services = Service[];
