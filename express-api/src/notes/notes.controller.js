import { getOneUserServiceId } from "../user/user.service.js"
import { createNoteService, getAllNotesService, getOneNoteService, getOneUserNoteService } from "./notes.service.js"

export const getAllNotes=async(req,res)=>{
    try {
       const notes= await getAllNotesService() 
       return res.status(200).json({'status':'success','message':'notes retrived','data':notes})
    } catch (error) {
        console.log(error)
        return res.status(500).json({'error':'an error occured'})
    }
}

export const getOneUserNote=async(req,res)=>{
    try {
        const id = req.params.id
        const user_exits = await getOneUserServiceId(id)
        if(!user_exits){
            return res.status(404).json({'status':'error','message':'user not found'})
        }
        const notes=await  getOneUserNoteService(Number(id))
        console.log(id)
       if(!notes){
            return res.status(404).json({'status':'error','message':'user not found'})
       }
       return res.status(200).json({'status':'success','message':'notes retrived','data':{'user':{'email':user_exits.email},notes}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({'error':'an error occured'})
    }
}

export const createNote=async(req,res)=>{
    try {
       const note=req.body
       const userExits= await getOneUserServiceId(Number(note.userId))
       if(!userExits)return res.status(404).json({'status':'success','message':'user not found'})
        const note_result = await createNoteService(note)
    if(note_result.length<1)return res.status(404).json({'status':'error','message':'note note saved'})
       return res.status(200).json({'status':'success','message':'note created success','data':note_result[0]})
    } catch (error) {

        return req.status(500).json({'error':'an error occured'})
    }
}

export const getOneNote=async(req,res)=>{
    try {
        const id = req.params.id
        const note= await getOneNoteService(Number(id))    
        if(!note)return res.status(404).json({'status':'error','message':'note not found'})
        res.status(200).json({'status':'success','message':'message retrived',note})
    } catch (error) {
        console.log(error)
        return req.status(500).json({'error':'an error occured'})
    }
}