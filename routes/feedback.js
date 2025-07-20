import express from 'express';
import Feedback from '../model/feedback.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// POST /api/feedback/:courseId
router.post('/:courseId', authMiddleware, async (req, res) => {
  try {
    const feedback = new Feedback({
      userId: req.user.id,
      courseId: req.params.courseId,
      comment: req.body.comment,
      rating: req.body.rating
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (error) {
    console.error('Feedback submission failed:', error.message);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

export default router;
