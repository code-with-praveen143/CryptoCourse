const Reward = require('../models/reward.model');
const User = require('../models/user.model');
const PointsLedger = require('../models/pointsLedger.model');
const { createLog } = require('../utils/logger');

exports.redeemReward = async (req, res) => {
  try {
    const { user_id, reward_id } = req.body;

    // Fetch user details
    const user = await User.findById(user_id);
    if (!user) {
      await createLog('unknown', 'Redeem Reward', 'User not found');
      return res.status(404).send({ message: 'User not found.' });
    }

    // Fetch reward details
    const reward = await Reward.findById(reward_id);
    if (!reward) {
      await createLog(user.username, 'Redeem Reward', 'Reward not found', `Reward ID: ${reward_id}`);
      return res.status(404).send({ message: 'Reward not found.' });
    }

    // Check reward availability
    if (reward.availability === 'limited' && reward.stock <= 0) {
      await createLog(user.username, 'Redeem Reward', 'Reward out of stock', `Reward ID: ${reward_id}`);
      return res.status(400).send({ message: 'Reward is out of stock.' });
    }

    // Check if user has enough points
    if (user.balance < reward.amount) {
      await createLog(user.username, 'Redeem Reward', 'Insufficient points', `Points Required: ${reward.amount}, Current Points: ${user.balance}`);
      return res.status(400).send({ message: 'Insufficient points.' });
    }

    // Check reward eligibility criteria
    if (reward.eligibility) {
      const { minimum_score, course_progress } = reward.eligibility;

      // Example criteria checks
      if (minimum_score && user.minimum_score < parseInt(minimum_score)) {
        await createLog(user.username, 'Redeem Reward', 'Eligibility Failed', `Minimum Score: ${minimum_score}`);
        return res.status(400).send({ message: 'You do not meet the minimum score requirement.' });
      }

      if (course_progress && user.course_progress < parseInt(course_progress)) {
        await createLog(user.username, 'Redeem Reward', 'Eligibility Failed', `Course Progress: ${course_progress}`);
        return res.status(400).send({ message: 'You do not meet the course progress requirement.' });
      }
    }

    // Deduct points and update reward stock
    await User.findByIdAndUpdate(user_id, { $inc: { balance: -reward.amount } });
    if (reward.availability === 'limited') {
      await Reward.findByIdAndUpdate(reward_id, { $inc: { stock: -1 } });
    }

    // Add transaction to points ledger
    await PointsLedger.create({
      user_id,
      reward_id,
      points: -reward.amount,
    });

    // Log success
    await createLog(user.username, 'Redeem Reward', 'Successful', `Reward ID: ${reward_id}, Points Deducted: ${reward.amount}`);
    res.status(200).send({ message: 'Reward redeemed successfully!' });
  } catch (error) {
    // Log error
    await createLog('unknown', 'Redeem Reward', 'Failed', error.message);
    res.status(500).send({ message: error.message });
  }
};
