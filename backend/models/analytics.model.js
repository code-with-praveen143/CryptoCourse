const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  timestamp: { type: Date, default: Date.now },
  device_info: {
    os: { type: String },
    browser: { type: String },
    ip_address: { type: String }
  }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
