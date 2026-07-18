import { z } from "zod";

export const emailSchema = z
    .string()
    .email("Invalid email address");

export const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters");

export const usernameSchema = z
    .string()
    .min(3)
    .max(30);

export const requiredString = z
    .string()
    .min(1, "Required");