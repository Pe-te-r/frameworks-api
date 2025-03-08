import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { auth_router } from './auth/auth.route.js'; // ✅ Fix import

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use('/auth', auth_router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
