import express from 'express';
import { User } from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// 🔐 Login route
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('user not found:', email);
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('invalid password for:', email);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const jwtPrivateKey = process.env.JWT_SECRET;
        if (!jwtPrivateKey) {
            console.error('JWT_SECRET not defined');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const token = jwt.sign(
            {
              _id: user._id,
              role: user.role,
              email: user.email,
              name: user.name,
            },
            jwtPrivateKey,
            { expiresIn: '24h' }
          );

        console.log('Generated token for:', email, { isAdmin: user.isAdmin });
        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// ✅ Token verify route
router.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Fix here: split by space

    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ user: decoded });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

export default router;
