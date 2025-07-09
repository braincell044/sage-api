// middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id); // use _id instead of id (based on your login token)

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    req.user = user; // attaches full user document
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.', error: error.message });
  }
};

export default authMiddleware;
