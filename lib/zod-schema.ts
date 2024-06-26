import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Invalid phone number" })
    .regex(
      new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
      { message: "Invalid phone number" },
    ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const firstReservationSchema = z.object({
  userId: z.string({ required_error: "User is required" }),
  branch: z.string({ required_error: "Branch is required" }),
});

export const generateSecondReservationSchema = (
  branchOpeningTime: string,
  branchClosingTime: string,
) => {
  return z.object({
    service: z.string({ required_error: "Service is required" }),
    datetime: z.date().refine(
      (value) => {
        const date = new Date(value);

        const openingTime = new Date(date);
        openingTime.setHours(
          parseInt(branchOpeningTime.split(":")[0]),
          parseInt(branchOpeningTime.split(":")[1]),
        );

        const closingTime = new Date(date);
        closingTime.setHours(
          parseInt(branchClosingTime.split(":")[0]),
          parseInt(branchClosingTime.split(":")[1]),
        );

        return date > new Date() && date >= openingTime && date <= closingTime;
      },
      {
        message: "Invalid date",
      },
    ),
  });
};

export const reservationSchema = z.object({
  userId: z.string({ required_error: "User is required" }),
  branch: z.string({ required_error: "Branch is required" }),
  service: z.string({ required_error: "Service is required" }),
  datetime: z
    .string()
    .datetime()
    .refine((value) => new Date(value) > new Date(), {
      message: "Invalid date",
    }),
});
