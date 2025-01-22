const mongoose = require("mongoose");

// Database format for each new log
const LogsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  time: { type: Date, required: true },
  action: { type: String, required: true },
  status: { type: String, required: true },
  details: { type: String }, // Optional details for debugging
});

module.exports = mongoose.model("Logs", LogsSchema);
