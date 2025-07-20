// routes/admin.js
import express from 'express';
import adminMiddleware from '../middleware/adminMiddleware.js';
import Course from '../model/course.js';
import { User } from '../model/user.js';

const router = express.Router();

// ✅ GET all users (admin only)
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ UPDATE course (admin only)
router.put('/courses/:id', adminMiddleware, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// ✅ DELETE course (admin only)
router.delete('/courses/:id', adminMiddleware, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

export default router;
