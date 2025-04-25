import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty" }),
  password: z
    .string()
    .min(1, { message: "Password cannot be empty" })
    .min(8, { message: "Password must contain at least 8 characters" })
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),
});
export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email field is required" })
      .email({ message: "Please enter valid email" }),
    username: z
      .string()
      .trim()
      .min(1, { message: "Username field is required" })
      .min(3, { message: "Username is too short" })
      .max(32, { message: "Username is too long" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Password field is required" })
      .min(8, { message: "Password must contain at least 8 characters" })
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    repeatPassword: z
      .string()
      .trim()
      .min(1, { message: "Repeat password field is required" }),
    terms: z
      .boolean()
      .refine((value) => value === true, { message: "Please accept terms" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

export const postSchema = z.object({
  caption: z
    .string()
    .min(0)
    .max(2200, { message: "You've exceeded maximum post length limit." }),
  files: z
    .instanceof(FileList)
    .refine((list) => list.length > 0, { message: "No files selected" })
    .refine((list) => list.length <= 3, { message: "Maximum 3 files allowed" })
    .transform((list) => Array.from(list))
    .refine(
      (files) => {
        const allowedTypes: { [key: string]: boolean } = {
          "image/jpeg": true,
          "image/png": true,
          "image/webp": true,
          "video/mp4": true,
          "video/webm": true,
        };
        return Array.from(files).every((file) => allowedTypes[file.type]);
      },
      { message: "Invalid file type. Allowed types: JPG, PNG, WEBM, MP4" },
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      {
        message: "File size should not exceed 10MB",
      },
    ),
});
