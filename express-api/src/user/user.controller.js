import { boolean } from "drizzle-orm/gel-core"
import { deletUserService, getAllUserService, getOneUserServiceId, updateUserService } from "./user.service.js"

export const getAllUsers=async(req,res)=>{
    try{
        const users = await getAllUserService() 
        if(users.length < 1){
            return res.status(404).json({'error':'no user found'})
        }
        return res.status(200).json({'users':users})
    }catch{
        return res.status(500).json({'error':'an error occured'})
    }
}

export const getOneUser=async(req,res)=>{
    try {
        const id = req.params.id
        const notes = req.query.notes;
        const user=await getOneUserServiceId(Number(id),notes)
        if(!user){
           return res.status(404).json({'error':'user not found'})
        }
        const decoded = req.user
        if(user.id !== decoded.id && decoded.role !== 'admin')return res.status(401).json({'error':'action not permited'})
        res.status(200).json({'user':user})
        
    } catch {
        return res.status(500).json({'error':'an error occured'})
    }
}
export const deleteUser=async(req,res)=>{
    try {
        const id = req.params.id
        const user_exits = await getOneUserServiceId(Number(id))
        if(!user_exits)return res.status(404).json({'error':'user not found'})
        const user=await deletUserService(Number(id))
        if(!user){
            res.status(404).json({'error':'user not found'})
        }
        const decoded = req.user
        if(user.id !== decoded.id && decoded.role !== 'admin')return res.status(401).json({'error':'action not permited'})
        console.log(user)
        res.status(200).json({'user':user})
        
    } catch (error){
        console.log(error)
        return res.status(500).json({'error':'an error occured'})
    }
}
export const updateUser=async(req,res)=>{
    try {
       const id = req.params.id
       const user_exits = await getOneUserServiceId(Number(id))
       if(!user_exits){
           return res.status(404).json({'error':'user not found'})
        } 
        const decoded = req.user
        if(user.id !== decoded.id && decoded.role !== 'admin')return res.status(401).json({'error':'action not permited'})
        res.status(200).json({'user':user})

        const user = req.body
       const updated_User =await updateUserService(id,user)
       if(!updated_User){
        return res.json({'error':'user not update'})
       }
       res.status(200).json({'message':`user updated success `})
    } catch (error) {
        console.log(error)
        return res.status(500).json({'error':'an error occured'})
    }
}