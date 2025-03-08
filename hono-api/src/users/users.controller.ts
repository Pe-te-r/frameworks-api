import type { Context } from "hono";
import { getAllUsersService, getOneUser } from "./users.service.js";


export const getAllUsers = async(c:Context)=>{
    try{
        const users= await getAllUsersService()
        if(users.length < 1){
            return c.json({'error':'no user found'},404)
        }
        return c.json({'message':users})
    }catch(error){

    }
}
export const getOneUserControl=async(c:Context)=>{
    const id:number = Number(c.req.param('id'))
    const user = await getOneUser(id)

    if(!user){
        return c.json({'error':'user not found'},404)
    }
    const storedUserObject = c.get('user')
   if(storedUserObject.email!== user.email && storedUserObject.role !== 'user'){
        return c.json({'error':'action not authorized'},403)
    }
    return c.json({'message':user},200)
}

export const updateUser=async(c:Context)=>{
    const id:number = Number(c.req.param('id'))
    const user = await getOneUser(id)

    if(!user){
        return c.json({'error':'user not found'},404)
    }
    const storedUserObject = c.get('user')
   if(storedUserObject.email!== user.email && storedUserObject.role !== 'user'){
        return c.json({'error':'action not authorized'},403)
    }
    // update user
}