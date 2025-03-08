import type { Context } from "hono";
import { deleteUserService, getAllUsersService, getOneUser, updateUserService } from "./users.service.js";
import { updateUserData } from "./users.schema.js";


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
    try{

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
        const updateData = await c.req.json()
        const validate_data = updateUserData.safeParse(updateData)
        if(!validate_data.success){
            return c.json({'error':'invalid data'},422)
        }
        const updateResult =await updateUserService(id,updateData)
        return c.json({'message':'user update successfull','user':updateResult},200)
    }catch{
        return c.json({'error':'unknown error occurred'},500)
    }
}

export const deleteUser=async(c:Context)=>{
    try {
        const id:number = Number(c.req.param('id'))
        const user = await getOneUser(id)
        
        if(!user){
            return c.json({'error':'user not found'},404)
        }
        const storedUserObject = c.get('user')
        if(storedUserObject.email!== user.email && storedUserObject.role !== 'user'){
            return c.json({'error':'action not authorized'},403)
        }
        // delete user
        const deleteResult= await deleteUserService(id)
     
        return c.json({'message':'user deleted success'},200)
    } catch (error){
        console.log(error)
        return c.json({'error':'an error occured'},500)
    }
}