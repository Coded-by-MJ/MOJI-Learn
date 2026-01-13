import { z } from "zod";
import { validateImageFile } from "@/types/global-zod-schemas";

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const signInSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
});







export const profileFormSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
  img: validateImageFile().optional(),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ProfileFormSchemaType = z.infer<typeof profileFormSchema>;