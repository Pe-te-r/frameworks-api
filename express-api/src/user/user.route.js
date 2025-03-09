import { Router } from "express";
import { getAllUsers } from "./user.controller.js";
import { authenticate } from "../middleware/token.js";

export const user_route=Router()
user_route.use(authenticate)
user_route.get('/',getAllUsers)