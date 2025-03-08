import type { Context } from "hono";
import { createNoteService, getAllNotes, getOnseUserNote } from "./notes.service.js";
import { getOneUser } from "../users/users.service.js";
import { noteSchemaData } from "./note.schema.js";

export const allNotes=async(c:Context)=>{
    const decoded = c.get('user')
    console.log(decoded)
    if(decoded.role !== 'admin'){
        return c.json({'error':'action not authorized'},401)
    }
    const all_notes = await getAllNotes()
    if(all_notes.length<1){
        return c.json({'error':'notes not found'},404)
    }
    return c.json({'message':all_notes},200)
}

export const oneUserNotes=async(c:Context)=>{
    const id = c.req.param('id')
    const userExits = await getOneUser(Number(id))
    if(!userExits){
        return c.json({'error':'user not found'},404)
    }
    const decoded = c.get('user')
    if(decoded.role !== 'admin' && userExits.email !== decoded.email ){
        return c.json({'error':'action not authorized'},401)
    }
    const all_notes = await getOnseUserNote(Number(id))
    if(all_notes.length<1){
        return c.json({'error':'notes not found'},404)
    }
    return c.json({'message':all_notes},200)
}

export const createNote=async(c:Context)=>{
    try {
       const note = await c.req.json() 
       const validNote = noteSchemaData.safeParse(note)
       if(!validNote.success){
        return c.json({'error':'invalid data'},422)
       }
      const create_result = await createNoteService(note) 
      if(!create_result){
        return c.json({'error':'note note created'})
      }
      return c.json({'message':create_result},201)

    } catch {
        return c.json({'error':'an error occured'},500)
    }
}