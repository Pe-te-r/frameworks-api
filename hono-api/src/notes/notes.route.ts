import { Hono } from "hono";
import { allNotes, createNote, oneUserNotes } from "./notes.controller.js";
import { allRoleMiddleware } from "../middlewares/middleware.js";

export const notes_route = new Hono().basePath('/notes')

notes_route.use('/*',allRoleMiddleware)

notes_route.post('/',createNote)
notes_route.get('/',allNotes)
notes_route.get('/:id',oneUserNotes)
notes_route.get('/note:id',oneUserNotes)
notes_route.put('/:id')
notes_route.delete('/:id')