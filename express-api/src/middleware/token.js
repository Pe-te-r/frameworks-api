import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Function to sign a JWT
export const signJwt = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h', 
  });
};