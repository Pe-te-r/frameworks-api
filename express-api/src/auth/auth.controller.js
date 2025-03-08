import { validationResult } from "express-validator";

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 'errors': errors.array() });
    }

    const { email, password } = req.body;
    const user = { email, password };
    console.log('User logged in:', user);

    res.status(200).json({ message: 'User logged in successfully', user });
};
