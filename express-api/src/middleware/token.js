import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Function to sign a JWT
export const signJwt = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h', 
  });
};
export const authenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export const adminRole=(req,res,next)=>{
  const user=req.user
  if(user.role !== 'admin'){
    return res.status(403).json({'error':'action forbidden you are not permitted'})
  }
  next()
}