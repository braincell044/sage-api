import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // ✅ New fields
  category: { type: String },              // e.g., "Business"
  specialization: { type: String },        // e.g., "Marketing"
  deliveryMode: { type: String },          // "Online", "Onsite", "Hybrid"
  duration: { type: String },              // e.g., "6 weeks", "3 months"
  instructions: { type: String },          // Setup or participation instructions
  learningOutcomes: [{ type: String }],    // e.g., ["Understand fundamentals", "Apply models"]

}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
