import { number } from "zod"
import { db } from "../db/db.js"
import { auth, users } from "../db/schema.js"
import { compare } from "bcrypt";

type TRIUser = Array<{ id: number }>;

export  const createUser=async(user: typeof users.$inferInsert):Promise<TRIUser | undefined>=>{
        return db.insert(users).values(user).returning({'id':users.id}).execute()
}
export const savePass=async(password:string,id:number)=>{
    return db.insert(auth).values({'password':password,'id':id}).execute()
}

export const verifyPassword = async(password:string,hashed_password:string)=>{
    return await compare(password,hashed_password)
}