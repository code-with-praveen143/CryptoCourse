const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  payment_method: { type: String, enum: ['Credit Card', 'PayPal', 'Crypto'], required: true },
  transaction_date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Success', 'Failed'], default: 'Success' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
