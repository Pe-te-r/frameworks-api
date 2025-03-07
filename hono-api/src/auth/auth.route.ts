import { Hono } from "hono";
import { register_user,login_user } from "./auth.controller.js";

export const auth_route = new Hono().basePath("/auth");

auth_route.post('/register',register_user)
auth_route.post('/login',login_user)