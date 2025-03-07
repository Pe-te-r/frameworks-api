import type { Context } from "hono";
const users=[
    {'id':1,'name':'peter','email':'peter@gmail.com'},
    {'id':2,'name':'joy','email':'joy@gmail.com'},
    {'id':3,'name':'shakirah','email':'shakirah@gmail.com'},
    {'id':4,'name':'admin','email':'admin@gmail.com'},
]

export const getAllUsers = async(c:Context)=>{
    try{
    }catch(error){

    }
    return c.json({'message':users})
}
export const getOneUser=async(c:Context)=>{
    const id:number = Number(c.req.param('id'))
    return c.json({'message':users[id]})
}
