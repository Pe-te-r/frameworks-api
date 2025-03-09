import { Router } from "express";
import { login, register } from "./auth.controller.js"; // ✅ Fix import
import { body } from "express-validator";

export const auth_router = Router();

auth_router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required') // ✅ Fix validation
], login);

auth_router.post('/register',
    [
        body('firstName').notEmpty().withMessage('FirstName is required'),
        body('lastName').notEmpty().withMessage('LastName is required'),
        body('email').isEmail().notEmpty().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('password is required'),
        body('role').optional(),
    ],
    register   
)