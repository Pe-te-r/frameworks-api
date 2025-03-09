import { validationResult } from "express-validator";
import { registerUserService ,savePassword} from "./auth.service.js";
import { deleteUserById, getUserByEmail, verifyPassword } from "../user/user.service.js";
import { signJwt } from "../middleware/token.js";

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 'errors': errors.array() });
    }

    const { email, password } = req.body;
    const user_exits = await getUserByEmail(email)
    if(!user_exits){
        return res.status(404).json({'error':'user not found'})
    }

    const verified = await verifyPassword(user_exits[0].id,password)
    if(!verified){
        return res.status(401).json({'error':'invalid identity'})
    }
    const token = signJwt({id:user_exits[0].id,email:user_exits[0].email,role:user_exits[0].role})
    res.status(200).json({ message: 'User logged in successfully','user':user_exits[0],token});
};

export const register =async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 'errors': errors.array() });
    }
    const {firstName,lastName,email,password}=req.body
    const role = req.body?.role || 'user'; 
    const user = { firstName, lastName, email, role };

    const result= await registerUserService(user)
    if(!result){
        return res.status(422).json({'error':'user not created'})
    }
    const savePasswordResult=await savePassword(password,Number(result[0].id)) 
    if(!savePasswordResult){
        const delete_result=deleteUserById(Number(result[0].id))
        if(!delete_result){
            return res.status(500).json({'error':'unknow thing happened'})
        }
        return res.status(422).json({'error':'user not saved'})
    }
    // Send a success response
    res.status(201).json({ message: 'User registered successfully', result});
}