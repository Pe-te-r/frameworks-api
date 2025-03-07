import type { Context } from "hono";
import { generateToken } from "../middlewares/middleware.js";
const users=[
    {'id':1,'name':'peter','email':'peter@gmail.com'},
    {'id':2,'name':'joy','email':'joy@gmail.com'},
    {'id':3,'name':'shakirah','email':'shakirah@gmail.com'},
]

export const register_user = async(c:Context)=>{
    return c.json({'message':users})
}

export const login_user = async(c:Context)=>{
    try{
        const user = await c.req.json()
        const token = generateToken(user.email,user.role)
        return c.json({'user':user,'token':token})
    }catch{
        return c.json({'message':'an error occured here'})
    }
}