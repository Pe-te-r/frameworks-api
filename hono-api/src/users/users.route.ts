import { Hono } from "hono";
import { getAllUsers } from "./users.controller.js";

export const user_router = new Hono().basePath("/users");

user_router.get('/',getAllUsers)