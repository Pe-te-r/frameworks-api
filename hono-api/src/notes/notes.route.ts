import { Hono } from "hono";

export const notes_route = new Hono().basePath('/notes')

notes_route.post('/')
notes_route.get('/')
notes_route.get('/:id')
notes_route.put('/:id')
notes_route.delete('/:id')