import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const authMiddleware = (req, res, next) => {
  // Get token from the authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied', success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to the request object
    req.user = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Check if the error is due to token expiration
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired', success: false });
    }

    // Handle other types of errors (invalid token, malformed token, etc.)
    return res.status(401).json({ message: 'Token is not valid', success: false });
  }
};

export default authMiddleware;

