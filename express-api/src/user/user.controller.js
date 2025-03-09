import { getAllUserService } from "./user.service.js"

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