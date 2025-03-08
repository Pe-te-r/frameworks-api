import { z } from "zod";


export const updateUserData = z.object({
    'firstName':z.string().optional(),
    'lastName':z.string().optional(),
})