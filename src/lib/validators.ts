import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  listingId: z.string().optional()
});

export const newsletterSchema = z.object({
  email: z.string().email()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const cloudinaryUploadSchema = z.object({
  filename: z.string().min(1),
  contentType: z
    .string()
    .refine(
      (value) => value.startsWith("image/") || value === "application/pdf",
      \"Only images or PDFs are supported.\"
    ),
  folder: z.string().min(1),
  resourceType: z.enum(["image", "raw"]).optional()
});
