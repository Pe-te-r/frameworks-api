import { eq } from "drizzle-orm"
import { db } from "../db/db.js"
import { notes } from "../db/schema.js"

export const getAllNotesService=async()=>{
    return await db.select().from(notes)
}

export const getOneUserNoteService=async(id)=>{
    return db.query.notes.findMany({
        where:eq(notes.userId,id)
    })
}

export const createNoteService=async(note)=>{
    return await db.insert(notes).values(note).returning().execute()
}

export const getOneNoteService=async(id)=>{
    return await db.query.notes.findFirst(
        {
            columns:{userId:false},
            where:eq(notes.id,id),
        }
    )
}