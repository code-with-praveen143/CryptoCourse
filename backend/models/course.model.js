const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  video_url: { type: String },
  duration_minutes: { type: Number, required: true }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correct_answer: { type: String, required: true }
    }
  ]
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  category: { type: String, required: true },
  duration_minutes: { type: Number, required: true },
  lessons: [LessonSchema],
  quizzes: [QuizSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
