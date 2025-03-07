import 'dotenv/config'
import type { Context, Next } from 'hono';
// import {sign,verify} from 'jsonwebtoken'
//  import { jwt } from 'jsonwebtoken';
import jwt from 'jsonwebtoken' 
const SECRET_KEY = process.env.SECRET_KEY!;

// generate token
export const generateToken = (email:string, role:string) => {
  return jwt.sign({ email, role }, SECRET_KEY, { expiresIn: '24h' });
};
// verify token
export const verifyToken = (token:string) => {
  return jwt.verify(token, SECRET_KEY);
};


export const authRoleMiddleware = async(allowedRoles:string) => {
  return async (c:Context, next:Next) => {
    // Step 1: Verify the JWT token
    const token = c.req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return c.json({ message: 'Access denied. No token provided.' }, 401);
    }

    try {
      const decoded:any = verifyToken(token);
      c.set('user', decoded); // Attach user data to the context

      // Step 2: Check if the user's role is allowed
      if (!allowedRoles.includes(decoded.role)) {
        return c.json({ message: 'Forbidden. You do not have the required role.' }, 403);
      }

      await next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return c.json({ message: 'Invalid token.' }, 401);
    }
  };
};

export const userRoleMiddleware=async (c:Context,next:Next) => {
  const token = c.req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return c.json({ message: 'Access denied. No token provided.' }, 401);
    }

    try {
      const decoded:any = verifyToken(token);
      c.set('user', decoded); // Attach user data to the context

      // Step 2: Check if the user's role is allowed
      if ('user' !== decoded.role){
        return c.json({ message: 'Forbidden. You do not have the required role.' }, 403);
      }

      await next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return c.json({ message: 'Invalid token.' }, 401);
    }
}