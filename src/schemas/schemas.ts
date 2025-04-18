import { z } from "zod";

// Define allowed MIME types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

const MAX_FILE_SIZE = 2 * 1024 * 1024;

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
const fileSchema = z.object({
  name: z.string(),
  size: z
    .number()
    .max(MAX_FILE_SIZE, { message: "File size must be less than 2MB" }),
  type: z.string().refine((type) => ALLOWED_FILE_TYPES.includes(type), {
    message:
      "File must be a valid image (JPEG, PNG, WebP, GIF) or video (MP4, WebM, OGG)",
  }),
});
export const postSchema = z.object({
  caption: z
    .string()
    .min(0)
    .max(2200, { message: "You've exceeded maximum post length limit." }),
  files: z
    .array(fileSchema)
    .nonempty({ message: "Please upload at least one file." })
    .max(3, { message: "You can only upload up to 3 files" }),
});
