const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  icon_url: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
