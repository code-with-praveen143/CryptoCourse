const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  reward_type: { type: String, enum: ['crypto', 'points'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  availability: { type: String, enum: ['limited', 'unlimited'], default: 'unlimited' }
}, { timestamps: true });

module.exports = mongoose.model('Reward', RewardSchema);
