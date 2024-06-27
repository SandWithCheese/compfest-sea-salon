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

export const reviewsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  comment: z.string().min(1, { message: "Comment is required" }),
  rating: z
    .number()
    .int()
    .min(1, { message: "Rating must be between 1 and 5" })
    .max(5, { message: "Rating must be between 1 and 5" }),
});

export const branchSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  openingTime: z
    .string({ required_error: "Opening time is required" })
    .regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/, {
      message: "Invalid time",
    }),
  closingTime: z
    .string({ required_error: "Closing time is required" })
    .regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/, {
      message: "Invalid time",
    }),
});

export const branchServiceFormSchema = z.object({
  branchId: z.string({ required_error: "Branch is required" }),
  serviceId: z.string({ required_error: "Service is required" }),
});

export const branchServiceSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    openingTime: z
      .string({ required_error: "Opening time is required" })
      .regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/, {
        message: "Invalid time",
      }),
    closingTime: z
      .string({ required_error: "Closing time is required" })
      .regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/, {
        message: "Invalid time",
      }),
    services: z
      .array(z.string().min(1, { message: "Service is required" }))
      .min(1, { message: "At least one service is required" }),
  })
  .refine(
    (data) => {
      const openingTime = data.openingTime.split(":").map(Number);
      const closingTime = data.closingTime.split(":").map(Number);

      const openingMinutes = openingTime[0] * 60 + openingTime[1];
      const closingMinutes = closingTime[0] * 60 + closingTime[1];

      const openingSeconds = openingMinutes * 60 + openingTime[2];
      const closingSeconds = closingMinutes * 60 + closingTime[2];

      return openingSeconds < closingSeconds;
    },
    {
      message: "Closing time must be greater than opening time",
      path: ["closingTime"],
    },
  );
