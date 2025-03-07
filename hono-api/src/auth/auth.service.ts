import { number } from "zod"
import { db } from "../db/db.js"
import { auth, users } from "../db/schema.js"

type TRIUser = Array<{ id: number }>;

export  const createUser=async(user: typeof users.$inferInsert):Promise<TRIUser | undefined>=>{
        return db.insert(users).values(user).returning({'id':users.id}).execute()
}
export const savePass=async(password:string,id:number)=>{
    return db.insert(auth).values({'password':password,'id':id})
}
