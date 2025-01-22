const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['quiz', 'login', 'course'], required: true },
  reference_id: { type: String, required: true }, // ID of quiz/login/course
  points: { type: Number, required: true }, // Points awarded for the activity
  completed_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', ActivitySchema);
