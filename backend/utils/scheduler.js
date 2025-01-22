const cron = require('node-cron');
const User = require('../models/user.model');

cron.schedule('0 0 * * *', async () => { // Runs daily at midnight
  try {
    const now = new Date();
    const dailyCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const monthlyCutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const dailyActiveUsers = await User.countDocuments({ last_login_date: { $gte: dailyCutoff } });
    const monthlyActiveUsers = await User.countDocuments({ last_login_date: { $gte: monthlyCutoff } });

    console.log(`DAU: ${dailyActiveUsers}, MAU: ${monthlyActiveUsers}`);
    // Optionally save these stats to a database or analytics service
  } catch (error) {
    console.error('Error calculating active users:', error);
  }
});
