import { eq } from "drizzle-orm"
import bcrypt from 'bcrypt'
import { db } from "../db/db.js"
import { auth, users } from "../db/schema.js"

export const getUserByEmail=async(email)=>{
    return await db.select().from(users).where(eq(users.email,email))
}

export const deleteUserById=async(id)=>{
    return await db.delete(users).where(eq(users.id,id))
}

export const verifyPassword=async(id,password)=>{
    const stored_pass=await db.select().from(auth).limit(1).where(eq(auth.id,id))
    return await bcrypt.compare(password,stored_pass[0].password)
}