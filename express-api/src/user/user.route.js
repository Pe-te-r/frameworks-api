import { Router } from "express";
import { getAllUsers, getOneUser, deleteUser, updateUser } from "./user.controller.js";
import { adminRole, authenticate, validateRequest } from "../middleware/token.js";

import { body } from "express-validator";

export const updateUserValidator = [
    body("firstName") // Specifically validates req.body
        .optional()
        .isString().withMessage("First name must be a string")
        .isLength({ min: 2 }).withMessage("First name must be at least 2 characters"),

    body("lastName")
        .optional()
        .isString().withMessage("Last name must be a string")
        .isLength({ min: 2 }).withMessage("Last name must be at least 2 characters"),

    body("role")
        .optional()
        .isIn(["admin", "user", "moderator"]).withMessage("Invalid role type"),
];


export const user_route=Router()
user_route.use(authenticate)
user_route.get('/',adminRole,getAllUsers)
user_route.get('/:id',getOneUser)
user_route.delete('/:id',deleteUser)
user_route.patch('/:id',updateUserValidator,validateRequest,updateUser)