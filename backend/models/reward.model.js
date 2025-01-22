const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Associated course
    reward_type: { type: String, enum: ['crypto', 'points'], required: true }, // Crypto or platform points
    amount: { type: Number, required: true }, // Amount of reward
    currency: { type: String, default: 'USD' }, // Currency for crypto rewards
    availability: { type: String, enum: ['limited', 'unlimited'], default: 'unlimited' }, // Availability status
    stock: { type: Number, default: null }, // For 'limited' rewards, tracks remaining stock
    eligibility: { 
      type: Map, 
      of: String, 
      default: {} 
    }, // Custom criteria (e.g., minimum score, course progress, etc.)
    expiration_date: { type: Date }, // Optional expiration for rewards
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reward', RewardSchema);
