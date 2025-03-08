import { Hono } from "hono";
import { getAllUsers, getOneUserControl,updateUser } from "./users.controller.js";
import {  adminRoleMiddleware, allRoleMiddleware, userRoleMiddleware } from "../middlewares/middleware.js";

export const user_router = new Hono().basePath("/users");

user_router.get('/',adminRoleMiddleware,getAllUsers)
user_router.get('/:id',allRoleMiddleware,getOneUserControl)
user_router.put('/:id',allRoleMiddleware,updateUser)
user_router.delete('/:id',allRoleMiddleware,updateUser)