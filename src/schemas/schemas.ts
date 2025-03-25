import { z } from "zod";
export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});
export const registerSchema = z.object({
  email: z.string().trim().min(1, {message:"Email field is required"}).email({ message:"Please enter valid email"}),
  username: z.string().min(1, { message: "Username field is required" }).min(3, { message: "Username is too short" }).max(32, {message:"Username is too long"}),
  password: z.string().min(1,{message:"Password field is required"}).min(8, { message: "Password must contain at least 8 characters" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  repeatPassword: z.string().trim().min(1, {message:"Repeat password field is required"}),
  terms: z.boolean({message:"Please accept terms of service and privacy policy."})

}).refine((data) =>  data.password === data.repeatPassword, {
  message:"Passwords don't match",
  path:["repeatPassword"]

});
