import bcrypt from 'bcrypt'
import { db } from "../db/db.js"
import { auth, users, } from "../db/schema.js"
export const registerUserService=async(user)=>{
    return await db.insert(users).values(user).returning().execute()
}

export const savePassword = async(password_,id)=>{
    const hashed_password=await bcrypt.hash(password_,10)
    console.log(hashed_password)
    try {
        await db.insert(auth).values({password:hashed_password,id:id})
        return true
    } catch {
        return false
    }
}