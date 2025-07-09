import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // You may want to remove 'user' or 'student' depending on your schema
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0 }
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export { Enrollment };
