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

    // Points to be added for each login
    const pointsEarned = 5;

    // Fetch the user's current balance
    const user = await User.findById(user_id);
    if (!user) {
      await createLog('unknown', 'Log Login Activity', 'User not found');
      return res.status(404).send({ message: 'User not found.' });
    }

    // Increment the user's points balance
    user.balance += pointsEarned;

    // Update the user's last login date and save the updated balance
    user.last_login_date = new Date();
    await user.save();

    // Log the login activity
    const activity = await Activity.create({
      user_id,
      type: 'login',
      reference_id: user_id, // Reference ID for login activity
      points: pointsEarned, // Points earned for this activity
      completed_at: new Date(),
    });

    // Add to points ledger
    await PointsLedger.create({
      user_id,
      activity_id: activity._id,
      points: pointsEarned,
    });

    // Log the action
    await createLog(
      user.username,
      user.email,
      'Log Login Activity',
      'Successful',
      `Points Earned: ${pointsEarned}, New Balance: ${user.balance}`
    );

    // Send response
    res.status(200).send({
      message: 'Login activity logged successfully!',
      pointsEarned,
      newBalance: user.balance,
    });
  } catch (error) {
    // Log the error
    await createLog('unknown', 'Log Login Activity', 'Failed', error.message);

    // Send error response
    res.status(500).send({ message: error.message });
  }
};
