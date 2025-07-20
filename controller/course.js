import Course from "../model/course.js";

// ✅ Create Course with new fields
export const createCourse = async (req, res) => {
  const {
    title,
    description,
    videos,
    materials,
    category,
    specialization,
    deliveryMode,
    duration,
    learningOutcomes,
    instructions
  } = req.body;

  try {
    const course = new Course({
      title,
      description,
      videos,
      materials,
      category,
      specialization,
      deliveryMode,
      duration,
      learningOutcomes,
      instructions,
      instructor: req.user?._id || null
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
};

// ✅ Get Courses with filtering
export const getCourses = async (req, res) => {
  try {
    const {
      keyword,
      category,
      specialization,
      deliveryMode
    } = req.query;

    const query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }
    if (category) query.category = category;
    if (specialization) query.specialization = specialization;
    if (deliveryMode) query.deliveryMode = deliveryMode;

    const courses = await Course.find(query).populate("instructor", "name email");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve courses", error: error.message });
  }
};

// ✅ Get course by ID
export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate("instructor", "name email");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve course", error: error.message });
  }
};

// ✅ Update course with new fields
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    videos,
    materials,
    category,
    specialization,
    deliveryMode,
    duration,
    learningOutcomes,
    instructions
  } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(
      id,
      {
        title,
        description,
        videos,
        materials,
        category,
        specialization,
        deliveryMode,
        duration,
        learningOutcomes,
        instructions
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to update course", error: error.message });
  }
};

// ✅ Delete course
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
