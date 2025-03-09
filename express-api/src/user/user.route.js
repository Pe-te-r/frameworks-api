import { Router } from "express";
import { getAllUsers } from "./user.controller.js";

export const user_route=Router()
user_route.get('/',getAllUsers)