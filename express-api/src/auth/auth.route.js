import { Router } from "express";
import { login } from "./auth.controller.js"; // ✅ Fix import
import { body } from "express-validator";

export const auth_router = Router();

auth_router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required') // ✅ Fix validation
], login);
