const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String },
  submitted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
