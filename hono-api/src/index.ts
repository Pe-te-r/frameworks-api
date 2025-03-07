import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { user_router } from './users/users.route.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/',user_router)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
