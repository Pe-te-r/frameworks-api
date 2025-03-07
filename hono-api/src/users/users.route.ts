import { Hono } from "hono";
import { getAllUsers } from "./users.controller.js";
import {  userRoleMiddleware } from "../middlewares/middleware.js";

export const user_router = new Hono().basePath("/users");

user_router.get('/',userRoleMiddleware,getAllUsers)
user_router.post('/',)