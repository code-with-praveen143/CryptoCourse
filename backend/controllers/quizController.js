const Activity = require('../models/activity.model');
const PointsLedger = require('../models/points.model');
const User = require('../models/user.model');
const { createLog } = require('../utils/logger');

exports.completeQuiz = async (req, res) => {
  try {
    const { user_id, course_id, lesson_id, score, total_questions } = req.body;

    // Calculate points earned (10 points per correct answer)
    const pointsEarned = score * 10;

    // Log activity
    const activity = await Activity.create({
      user_id,
      type: 'quiz',
      reference_id: lesson_id,
      points: pointsEarned,
      completed_at: new Date(),
    });

    // Update user's total points
    const user = await User.findByIdAndUpdate(
      user_id,
      { $inc: { balance: pointsEarned } },
      { new: true }
    );

    if (!user) {
      await createLog('unknown', 'Complete Quiz', 'User not found');
      return res.status(404).send({ message: 'User not found.' });
    }

    // Add to points ledger
    await PointsLedger.create({
      user_id,
      activity_id: activity._id,
      points: pointsEarned,
    });

    await createLog(user.username, user.email, 'Complete Quiz', 'Successful', `Lesson ID: ${lesson_id}, Points: ${pointsEarned}`);
    res.status(200).send({ message: 'Quiz completed successfully!', pointsEarned });
  } catch (error) {
    await createLog('unknown', 'Complete Quiz', 'Failed', error.message);
    res.status(500).send({ message: error.message });
  }
};


exports.logLoginActivity = async (req, res) => {
  try {
    const { user_id } = req.body;

    const pointsEarned = 5; // Points for login

    // Log activity
    const activity = await Activity.create({
      user_id,
      type: 'login',
      reference_id: user_id, // Reference ID for login activity
      points: pointsEarned,
      completed_at: new Date(),
    });

    // Update user's total points
    const user = await User.findByIdAndUpdate(
      user_id,
      { last_login_date: new Date() },
      { $inc: { balance: pointsEarned } },
      { new: true }
    );

    if (!user) {
      await createLog('unknown', 'Log Login Activity', 'User not found');
      return res.status(404).send({ message: 'User not found.' });
    }

    // Add to points ledger
    await PointsLedger.create({
      user_id,
      activity_id: activity._id,
      points: pointsEarned,
    });

    await createLog(user.username, user.email, 'Log Login Activity', 'Successful', `Points: ${pointsEarned}`);
    res.status(200).send({ message: 'Login activity logged successfully!', pointsEarned });
  } catch (error) {
    await createLog('unknown', 'Log Login Activity', 'Failed', error.message);
    res.status(500).send({ message: error.message });
  }
};
