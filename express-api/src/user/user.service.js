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
export const getAllUserService=async()=>{
    return await db.select().from(users)
}
export const getOneUserServiceId=async(id,notes)=>{
    if(notes=='true'){
    return await db.query.users.findFirst({
        where:eq(users.id,id),
        with:{
            notes:{
                columns:{
                    note:true,
                    id:true
                }
            }
        }

    })
    }
    return await db.query.users.findFirst({
        where:eq(users.id,id)
    })
}
export const deletUserService=async(id)=>{
    try {
        await db.delete(users).where(eq(users.id,id))
        return true
        
    } catch (error) {
        return false
    }
}

export const updateUserService=async(id,user)=>{
    try {
        await db.update(users).set(user).where(eq(users.id,id))
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}