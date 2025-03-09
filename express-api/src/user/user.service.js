import { eq } from "drizzle-orm"
import { db } from "../db/db.js"
import { auth, users } from "../db/schema.js"

export const getUserByEmail=async(email)=>{
    return await db.select().from(users).where(eq(users.email,email))
}

export const deleteUserById=async(id)=>{
    return await db.delete(users).where(eq(users.id,id))
}