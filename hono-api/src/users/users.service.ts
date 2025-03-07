import { eq } from "drizzle-orm"
import { db } from "../db/db.js"
import { users } from "../db/schema.js"
import type {  UserTypeT } from "./user.type.js";

type userType =typeof users.$inferSelect


export const getOneUser = async (id: number): Promise<userType | null> => {
    
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1); 
    if (result.length === 0) {
        return null;
    }
    return result[0];
};

export const getOneUserEmail = async (email: string,password_=false): Promise<userType | UserTypeT | null | undefined> => {
    if(password_){
       const user= await db.query.users.findFirst({
            with:{
                auth:{
                    columns:{
                        password:true
                    }
                }
            }
        })
        return user
    }

    const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1); 
    if (result.length === 0) {
        return null;
    }
    return result[0];
};

export const deleteUser=async(id:number): Promise<string | undefined>=>{
    const deletedUserIds: { deletedId: number }[] = await db.delete(users)
    .where(eq(users.id, id))
    .returning({ deletedId: users.id }).execute();
    return String(deletedUserIds)
}