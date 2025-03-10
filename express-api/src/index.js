import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { auth_router } from './auth/auth.route.js'; // ✅ Fix import
import { user_route } from './user/user.route.js';
import { notes_route } from './notes/notes.route.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use('/auth', auth_router);
app.use('/users', user_route);
app.use('/notes', notes_route);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
