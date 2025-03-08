import { eq } from "drizzle-orm"
import { db } from "../db/db.js"
import { notes } from "../db/schema.js"

export const getAllNotes=async()=>{
    return await db.query.notes.findMany({
        columns:{
            id:true,
            note:true
        },with:{
            user:{
                columns:{
                    email:true,
                    id:true,
                }
            }
        }
    })
}

export const getOnseUserNote=async(id:number)=>{
    const notes_array  = await db.select().from(notes).where(eq(notes.userId,id))
    return notes_array
}

export const createNoteService=async(note:any)=>{
    return await db.insert(notes).values(note).returning().execute()
}