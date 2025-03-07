import { Hono } from "hono";
import { register_user,login_user } from "./auth.controller.js";

export const auth_route = new Hono().basePath("/users");

auth_route.post('/',register_user)
auth_route.post('/',login_user)