import { Router } from "express";
import {body} from 'express-validator'
import { adminRole, authenticate, validateRequest } from "../middleware/token.js";
import { createNote, getAllNotes, getOneNote, getOneUserNote } from "./notes.controller.js";


const noteValidate=[
    body('note').isString().withMessage('note is a string'),
    body('userId').isNumeric().withMessage('user id is an int'),
]

export const notes_route=Router()

// protect route
notes_route.use(authenticate)

notes_route.get('/',adminRole,getAllNotes)
notes_route.get('/:id',getOneNote)
notes_route.get('/:id/user',getOneUserNote)
notes_route.post('/',noteValidate,validateRequest,createNote)