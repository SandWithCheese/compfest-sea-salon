import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  integer,
  pgEnum,
  uuid,
  time,
  primaryKey,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "member"]);

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull(),
});

export const reviews = pgTable("review", {
  id: uuid("id").defaultRandom().primaryKey(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
});

export const branches = pgTable("branch", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  openingTime: time("opening_time").notNull(),
  closingTime: time("closing_time").notNull(),
});

export const services = pgTable("service", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  duration: integer("duration").notNull(),
});

export const branchservices = pgTable(
  "branch_service",
  {
    branchId: uuid("branch_id")
      .notNull()
      .references(() => branches.id, { onDelete: "cascade" }),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.branchId, table.serviceId] }),
  }),
);

export const reservations = pgTable("reservation", {
  id: uuid("id").defaultRandom().primaryKey(),
  datetime: timestamp("datetime").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  branchId: uuid("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  reviews: one(reviews, {
    fields: [users.id],
    references: [reviews.userId],
  }),
  reservations: many(reservations),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const branchesRelations = relations(branches, ({ many }) => ({
  reservations: many(reservations),
  services: many(branchservices),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  reservations: many(reservations),
  branches: many(branchservices),
}));

export const branchservicesRelations = relations(branchservices, ({ one }) => ({
  branch: one(branches, {
    fields: [branchservices.branchId],
    references: [branches.id],
  }),
  service: one(services, {
    fields: [branchservices.serviceId],
    references: [services.id],
  }),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  users: one(users, {
    fields: [reservations.userId],
    references: [users.id],
  }),
  branches: one(branches, {
    fields: [reservations.branchId],
    references: [branches.id],
  }),
  services: one(services, {
    fields: [reservations.serviceId],
    references: [services.id],
  }),
}));
