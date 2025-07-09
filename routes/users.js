import express from 'express';
import { User, validateUser } from '../model/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// ✅ Registration route (fixed)
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'student', // fallback to default
        });

        await newUser.save();
        console.log('New user registered:', email, 'with role:', newUser.role);

        res.status(201).json({ message: 'User registered successfully', role: newUser.role });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

export default router;
