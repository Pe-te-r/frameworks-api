import { Router } from "express";
import { getAllUsers, getOneUser, deleteUser } from "./user.controller.js";
import { adminRole, authenticate } from "../middleware/token.js";

export const user_route=Router()
user_route.use(authenticate)
user_route.get('/',adminRole,getAllUsers)
user_route.get('/:id',getOneUser)
user_route.delete('/:id',deleteUser)

