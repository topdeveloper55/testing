import { z } from "zod";
export const PROFILE_SCHEMA = z.object({
  name: z.string().min(8).max(24),
  description: z.string().min(5).max(256),
  pfp: z.string(),
  imageFile:z.custom(),
});

export const UPDATE_PROFILE_FORM_SCHEMA = PROFILE_SCHEMA.omit({
  pfp: true,
})
  .extend({
    name: z
      .string()
      .min(8, "Name must be at least 8 characters long")
      .max(24, "Name cannot exceed 24 characters"),
    description: z
      .string()
      .min(5, "Description must be at least 5 characters long")
      .max(256, "Description cannot exceed 256 characters"),
    imageFile: z
      .custom((value) => {
        if (!(value instanceof File)) {
          throw "Invalid file type";
        }
        if (value.size > 1 * 1024 * 1024) {
          throw "File size should be less than 1MB";
        }
        return value;
      })
      .nullable(),
  })
  .partial();

export const UPDATE_PROFILE_TRPC_SCHEMA = PROFILE_SCHEMA.partial();
