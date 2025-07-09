import express from 'express';
import {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../controller/course.js';

import auth from '../middleware/auth.js';
import { isInstructorOrAdmin } from '../middleware/role.js';

const router = express.Router();

// Public route
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Protected routes
router.post('/', auth, isInstructorOrAdmin, createCourse);
router.put('/:id', auth, isInstructorOrAdmin, updateCourse);
router.delete('/:id', auth, isInstructorOrAdmin, deleteCourse);

export default router;
