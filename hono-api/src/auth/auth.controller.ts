import type { Context } from "hono";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { createUser, savePass, verifyPassword } from "./auth.service.js";
import { deleteUser, getOneUserEmail } from "../users/users.service.js";

export const register_user = async(c:Context)=>{
    try{
        const user=await c.req.json()
        const validateData = registerSchema.safeParse(user)

        if(!validateData.success){
            return c.json({'error':'invalid data',},422)
        }
        
        const userExits = await getOneUserEmail(user.email)

        if(userExits){
            return c.json({'error':'email already exits'},409)
        }

        let password:string = String(user['password'])
        password =await bcrypt.hash(password,10)
        delete user['password']

        const savedUserId =await createUser(user)
        if(savedUserId){
            const passwordSavedId = await savePass(password,savedUserId[0].id)
            if(passwordSavedId){
                return c.json({'message':'user was created success'},201)
            }
            await deleteUser(savedUserId[0].id)
            return c.json({'error':'user not created'},400)
        }
        return c.json({'error':'user not created'},400)

    }catch(error){
        return c.json({'error':error},500)
    }
}

export const login_user = async(c:Context)=>{
    try{
        const user = await c.req.json()
        // data verification
        const dataVerified=loginSchema.safeParse(user)
        if(!dataVerified.success){
            return c.json({'error':'invalid data'},409)
        }
        // user login
        const user_exits:any = await getOneUserEmail(user.email,true)
        if(!user_exits){
            return c.json({'error':'user not found'},404)
        }

        
        if(await verifyPassword(user['password'],user_exits?.auth.password)){
            const token = generateToken(user.email,user.role)
            return c.json({'user':user,'token':token},200)
        }
        return c.json({'error':'wrong password or email'},200)
        
    }catch(error){
        console.log(error)
        return c.json({'message':'an error occured here'})
    }
}