const mongoose = require('mongoose');

const PointsLedgerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }, // For earned points
    reward_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }, // For spent points
    points: { type: Number, required: true }, // Positive for earning, negative for spending
    created_at: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('PointsLedger', PointsLedgerSchema);
  