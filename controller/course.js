import Course from "../model/course.js";

export const createCourse = async (req, res) => {
    const { title, description, videos, materials } = req.body;

    try {
        const course = new Course({
            title,
            description,
            videos,
            materials,
            instructor: req.user?._id || null // temporary fallback if no auth
        });

        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: "Failed to create course", error: error.message });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'name email');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve courses", error: error.message });
    }
};

export const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id).populate('instructor', 'name email');
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve course", error: error.message });
    }
};

export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, videos, materials } = req.body;

    try {
        const course = await Course.findByIdAndUpdate(id, {
            title,
            description,
            videos,
            materials
        }, { new: true });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Failed to update course", error: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete course", error: error.message });
    }
};

export default createCourse