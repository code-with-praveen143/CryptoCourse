const User = require("../models/user.model");
const Logs = require("../models/logs.model");
const exchange = require("../controllers/exchangeController");
const Activity = require('../models/activity.model');
const PointsLedger = require('../models/points.model');
// Utility function to create logs
const createLog = async (username, action, status, email = "not provided") => {
  await Logs.create({
    username,
    email,
    time: new Date(),
    action,
    status,
  });
};

exports.completeActivity = async (req, res) => {
  try {
    const { user_id, type, reference_id, points } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      await createLog('unknown', 'Complete Activity', 'User not found');
      return res.status(404).send({ message: 'User not found.' });
    }

    // Log the activity
    const activity = await Activity.create({
      user_id,
      type,
      reference_id,
      points,
    });

    // Update user's total points
    await User.findByIdAndUpdate(user_id, { $inc: { balance: points } });

    // Add to points ledger
    await PointsLedger.create({
      user_id,
      activity_id: activity._id,
      points,
    });

    await createLog(user.username, 'Complete Activity', 'Successful', `Type: ${type}, Points: ${points}`);

    res.status(200).send({ message: 'Activity completed and points awarded!' });
  } catch (error) {
    await createLog('unknown', 'Complete Activity', 'Failed', error.message);
    res.status(500).send({ message: error.message });
  }
}

exports.getUserPoints = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Fetch the user's points
    const user = await User.findById(user_id).select('balance username');
    if (!user) {
      await createLog('unknown', 'Get User Points', 'User not found');
      return res.status(404).send({ message: 'User not found.' });
    }

    await createLog(user.username, 'Get User Points', 'Successful');
    res.status(200).send({ username: user.username, balance: user.balance });
  } catch (error) {
    await createLog('unknown', 'Get User Points', 'Failed', error.message);
    res.status(500).send({ message: error.message });
  }
};
// Receives username from frontend and returns complete portfolio
exports.getUserBalance = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (!user) {
      await createLog(req.body.username, "Get user balance", "User not found");
      return res.status(404).send({ message: "User Not found." });
    }

    return res.status(200).send({
      username: user.username,
      balance: user.balance,
      bitcoin: user.bitcoin,
      dash: user.dash,
      monero: user.monero,
      ethereum: user.ethereum,
      xrp: user.xrp,
      tether: user.tether,
      bitcoinCash: user.bitcoinCash,
      bitcoinSV: user.bitcoinSV,
      litecoin: user.litecoin,
      eos: user.eos,
      binancecoin: user.binancecoin,
      tezos: user.tezos,
    });
  } catch (err) {
    await createLog(req.body.username, "Get user balance", err.message);
    return res.status(500).send({ message: err.message });
  }
};

// Get Active Users from the database
exports.getActiveUsers = async (req, res) => {
  try {
    const now = new Date();
    const dailyCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const monthlyCutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const dailyActiveUsers = await User.countDocuments({ last_login_date: { $gte: dailyCutoff } });
    const monthlyActiveUsers = await User.countDocuments({ last_login_date: { $gte: monthlyCutoff } });

    res.status(200).send({ dailyActiveUsers, monthlyActiveUsers });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


// Verifies if user has sufficient balance
exports.verifyBalance = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (!user) {
      await createLog(req.body.username, "Verify balance", "User not found");
      return res.status(404).send({ message: "User Not found." });
    }

    if (req.body.value > user.balance) {
      await createLog(
        req.body.username,
        "Verify balance",
        "Insufficient funds"
      );
      return res.status(404).send({ message: "Insufficient funds." });
    }

    if (req.body.value <= 0) {
      await createLog(req.body.username, "Verify balance", "Negative value");
      return res.status(404).send({ message: "Nice try :)" });
    }

    await createLog(req.body.username, "Verify balance", "Successful");
    next();
  } catch (err) {
    await createLog(req.body.username, "Verify balance", err.message);
    return res.status(500).send({ message: err.message });
  }
};

// Verifies if user has sufficient amount of coins to sell
exports.verifyCoins = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (!user) {
      await createLog(
        req.body.username,
        "Verify coin balance",
        "User not found"
      );
      return res.status(404).send({ message: "User Not found." });
    }

    let userCoins = {
      bitcoin: user.bitcoin,
      dash: user.dash,
      monero: user.monero,
      ethereum: user.ethereum,
      xrp: user.xrp,
      tether: user.tether,
      bitcoinCash: user.bitcoinCash,
      bitcoinSV: user.bitcoinSV,
      litecoin: user.litecoin,
      eos: user.eos,
      binancecoin: user.binancecoin,
      tezos: user.tezos,
    };

    const response = await exchange.getCurrentPrice(req.body.coin);
    const coinsSold =
      parseFloat(req.body.value) / parseFloat(response.price_usd);
    const coinBalance = userCoins[req.body.coin];

    if (coinsSold > coinBalance) {
      await createLog(
        req.body.username,
        "Verify coin balance",
        "Insufficient funds"
      );
      return res.status(404).send({ message: "Insufficient funds." });
    }

    if (req.body.value <= 0) {
      await createLog(
        req.body.username,
        "Verify coin balance",
        "Negative value"
      );
      return res.status(404).send({ message: "Ernsthaft??" });
    }

    req.coinsSold = coinsSold;
    req.coinBalance = coinBalance;
    await createLog(req.body.username, "Verify coin balance", "Successful");
    next();
  } catch (err) {
    await createLog(req.body.username, "Verify coin balance", err.message);
    return res.status(500).send({ message: err.message });
  }
};

// Receives a coin type and a USD value, updates database, and returns new balance and amount of coins bought
exports.buy = async (req, res) => {
  try {
    const coin = req.body.coin;

    // Fetch the current price of the coin
    const response = await exchange.getCurrentPrice(coin);

    // Log the raw API response for debugging
    // console.log("Raw API response:", response);

    const priceData = Array.isArray(response) ? response[0] : response;

    if (!priceData.price_usd) {
      throw new Error(`Price data missing for coin: ${coin}`);
    }

    // Calculate coins bought
    const coinsBought =
      parseFloat(req.body.value) / parseFloat(priceData.price_usd);

    // Build update query
    let updateQuery = { balance: -req.body.value };
    updateQuery[coin] = coinsBought;

    // Update the user's balance and coin holdings
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $inc: updateQuery },
      { new: true }
    ).exec();

    if (!user) {
      await createLog(req.body.username, "Buy", "User not found");
      return res.status(404).send({ message: "User Not found." });
    }

    // Log success and respond
    await createLog(
      req.body.username,
      "Buy",
      `Successful. Bought: ${coinsBought} of ${coin}`
    );
    res.status(200).send({
      balance: user.balance,
      coinsBought: coinsBought,
    });
  } catch (err) {
    // Log error and respond with the error message
    await createLog(req.body.username, "Buy", err.message);
    return res.status(500).send({ message: err.message });
  }
};

// Updates database after selling coins and returns new balance and coin balance
exports.sell = async (req, res) => {
  try {
    const { username, coin, value, coinsSold } = req.body;
    console.log(coinsSold)
    // Build update query
    const updateQuery = { balance: parseFloat(value) };
    updateQuery[coin] = -coinsSold;

    // Update user's balance and coin holdings
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $inc: updateQuery },
      { new: true }
    ).exec();

    if (!updatedUser) {
      await Logs.create({
        username,
        email: "not provided",
        time: new Date(),
        action: "Sell",
        status: "User not found after update",
      });
      return res.status(404).send({ message: "User not found after update." });
    }

    // Log success and respond
    await Logs.create({
      username,
      email: "not provided",
      time: new Date(),
      action: "Sell",
      status: `Successful. Sold ${coinsSold} of ${coin}`,
    });

    res.status(200).send({
      balance: updatedUser.balance,
      newCoinBalance: updatedUser[coin],
      coinsSold,
    });
  } catch (err) {
    await Logs.create({
      username: req.body.username,
      email: "not provided",
      time: new Date(),
      action: "Sell",
      status: err.message,
    });
    return res.status(500).send({ message: err.message });
  }
};




// Calculates the complete value of the user's portfolio
exports.getUserValue = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (!user) {
      await createLog(req.body.username, "Get user value", "User not found");
      return res.status(404).send({ message: "User Not found." });
    }

    let userCoins = {
      bitcoin: user.bitcoin,
      dash: user.dash,
      monero: user.monero,
      ethereum: user.ethereum,
      xrp: user.xrp,
      tether: user.tether,
      bitcoinCash: user.bitcoinCash,
      bitcoinSV: user.bitcoinSV,
      litecoin: user.litecoin,
      eos: user.eos,
      binancecoin: user.binancecoin,
      tezos: user.tezos,
    };

    let userValue = user.balance;

    for (const coin in userCoins) {
      const response = await exchange.getCurrentPrice(coin);
      userValue += userCoins[coin] * response.data[0].price_usd;
    }

    await createLog(
      req.body.username,
      "Get user value",
      `Successful. User value: ${userValue}`
    );
    res.status(200).send({
      username: user.username,
      balance: user.balance,
      uservalue: userValue,
    });
  } catch (err) {
    await createLog(req.body.username, "Get user value", err.message);
    return res.status(500).send({ message: err.message });
  }
};
