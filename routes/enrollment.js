import express from 'express';
import { enrollCourse, getEnrollments,  } from '../controller/enrollment.js'; 


const router = express.Router();

router.post('/:courseId', enrollCourse);
router.get('/', getEnrollments);

export default router;
