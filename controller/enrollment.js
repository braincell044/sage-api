import { Enrollment } from "../model/enrollment.js";

// export const enrollCourse = async (req, res) => {
//     try {
//         const { courseId } = req.params;
//         const userId = req.user.id;

//         const enrollment = await Enrollment.create({
//             student: userId,
//             course: courseId
//         });

//         res.status(201).json({
//             message: "Enrolled successfully",
//             enrollment
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: "Enrollment failed",
//             error: err.message
//         });
//     }
// };

export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = "686634ce4060b25fe18d6837"; 

        const enrollment = await Enrollment.create({
            student: userId,
            course: courseId
        });

        res.status(201).json({
            message: "Enrolled successfully",
            enrollment
        });
    } catch (err) {
        res.status(500).json({
            message: "Enrollment failed",
            error: err.message
        });
    }
};
export const getEnrollments = async (req, res) => {
    try {
        const userId = req.user.id;

        const enrollments = await Enrollment.find({ student: userId })
            .populate('course', 'title description');

        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve enrollments",
            error: err.message
        });
    }
};
