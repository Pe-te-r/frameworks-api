import type { Context } from "hono";

export const allNotes=async(c:Context)=>{
    return c.json({'message':'notes array'})
}

export const oneNote=async(c:Context)=>{
    return c.json({'message':'one note result'})
}