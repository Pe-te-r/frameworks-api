import { getAllUserService, getOneUserServiceId } from "./user.service.js"

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
        const id = req.param('id')
        const user=await getOneUserServiceId(Number(id))
        if(!user){
            res.status(404).json({'error':'user not found'})
        }
        const decoded = req.user
        if(user.id !== decoded.id && decoded.role !== 'admin')return res.status(401).json({'error':'action not permited'})
        res.status(200).json({'user':user})
        
    } catch {
        return res.status(500).json({'error':'an error occured'})
    }
}