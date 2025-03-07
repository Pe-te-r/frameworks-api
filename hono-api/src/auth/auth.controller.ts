import type { Context } from "hono";
import { generateToken } from "../middlewares/middleware.js";
import { registerSchema } from "./schema.js";
import { createUser, savePass } from "./auth.service.js";
import { json } from "stream/consumers";
const users=[
    {'id':1,'name':'peter','email':'peter@gmail.com'},
    {'id':3,'name':'shakirah','email':'shakirah@gmail.com'},
    {'id':2,'name':'joy','email':'joy@gmail.com'},
]

export const register_user = async(c:Context)=>{
    try{
        const user=await c.req.json()
        const validateData = registerSchema.safeParse(user)

        if(!validateData.success){
            return c.json({'error':'invalid data',},400)
        }

        const password:string = String(user['password'])
        delete user['password']

        const savedUserId =await createUser(user)
        if(savedUserId){
            const passwordSavedId = await savePass(password,savedUserId[0].id)
            if(savedUserId){
                return c.json({'message':'user was created success'},201)
            }
        }
        return c.json({'message':user})
    }catch(error){
        return c.json({'error':error},500)
    }
}

export const login_user = async(c:Context)=>{
    try{
        const user = await c.req.json()
        console.log(user)
        const token = generateToken(user.email,user.role)
        return c.json({'user':user,'token':token})
    }catch(error){
        console.log(error)
        return c.json({'message':'an error occured here'})
    }
}