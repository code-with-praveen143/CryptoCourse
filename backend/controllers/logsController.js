const express = require('express');
const router = express.Router();
const Log = require('../models/logs.model'); // Assuming you have a Log model

// Method to get all logs data
const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint to get all logs
router.get('/logs', getAllLogs);

module.exports = router;