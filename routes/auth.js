import express from 'express';
import { User } from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log('📥 Login attempt:', email);
    console.log('🔐 JWT_SECRET loaded:', !!process.env.JWT_SECRET);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.warn(`❌ User not found: ${email}`);
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        console.log('✅ User found:', user.email);

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.warn(`❌ Invalid password for: ${email}`);
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        console.log('🔓 Password validated for:', email);

        const jwtPrivateKey = process.env.JWT_SECRET;
        if (!jwtPrivateKey) {
            console.error('❌ JWT_SECRET is not defined');
            return res.status(500).json({ error: 'JWT_SECRET is missing' });
        }

        console.log('🛠 Generating token...');

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

        console.log(`✅ Token generated for: ${email}`);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isAdmin: user.isAdmin || false,
            },
        });
    } catch (error) {
        console.error('❌ Login error:', error.message);
        res.status(500).json({ error: 'Server error during login', reason: error.message });
    }
});

// ✅ Token verification route
router.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ user: decoded });
    } catch (err) {
        console.warn('❌ Invalid token');
        res.status(401).json({ error: 'Invalid token' });
    }
});

export default router;
