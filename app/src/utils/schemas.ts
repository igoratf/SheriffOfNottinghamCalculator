import { z } from "zod";

const contrabandSchema = z.object({
  contrabandName: z.string().min(1, "Contraband type is required"),
  quantity: z.coerce
    .number()
    .min(1, "Quantity must be at least 1")
    .max(99, "Quantity must be at most 99"),
});

export const playerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(12, "Name must be at most 12 characters"),
  apple: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
  bread: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
  cheese: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
  chicken: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
  contrabands: z.array(contrabandSchema).default([]),
  coin: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
});
