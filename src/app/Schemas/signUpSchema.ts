import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3, "Username should be atleast 3 characters")
  .max(15, "USername shouldn't be more than 15 characters")
  .regex(/^[a-zA-Z0-9_]{3,15}$/, "Username contains invalid characters");

export const SignUpSchema = z.object({
  userName: userNameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password should be minimum 8 characters"),
});
