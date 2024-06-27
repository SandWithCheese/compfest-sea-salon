import { reservations } from "@/db/schema";
import { Branch } from "./branch";
import { Service } from "./service";

export type Reservation = typeof reservations.$inferSelect;

export type ReservationDetail = Reservation & {
  branches: Pick<Branch, "id" | "name" | "location">;
  services: Service;
};

export type Reservations = Reservation[];

export type ReservationDetails = ReservationDetail[];
