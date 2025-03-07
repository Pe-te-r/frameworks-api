import { z } from "zod";

export const registerSchema = z.object({
    'firstName':z.string().min(3),
    'lastName':z.string().min(4),
    'email':z.string(),
    'password':z.string().min(3),
    'role':z.string().optional()
})
export const loginSchema=z.object({
    'email':z.string(),
    'password':z.string()
})