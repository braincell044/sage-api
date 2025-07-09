import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  videos: [
    {
      title: String,
      url: String
    }
  ],
  materials: [
    {
      title: String,
      url: String
    }
  ]
});


const Course = mongoose.model('Course', courseSchema);
export default Course;
