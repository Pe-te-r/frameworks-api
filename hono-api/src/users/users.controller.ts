import type { Context } from "hono";
const users=[
    {'id':1,'name':'peter','email':'peter@gmail.com'},
    {'id':2,'name':'joy','email':'joy@gmail.com'},
    {'id':3,'name':'shakirah','email':'shakirah@gmail.com'},
]

export const getAllUsers = async(c:Context)=>{
    return c.json({'message':users})
}