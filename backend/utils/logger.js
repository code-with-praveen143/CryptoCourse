const Logs = require('../models/logs.model');

exports.createLog = async (username, email, action, status, details = '') => {
  await Logs.create({
    username,
    email,
    time: new Date(),
    action,
    status,
    details,
  });
};
