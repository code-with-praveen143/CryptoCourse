const User = require("../models/user.model");
const Logs = require("../models/logs.model");
const exchange = require("../controllers/exchangeController");
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

// Verifies if user has sufficient balance
exports.verifyBalance = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (!user) {
      await createLog(req.body.username, "Verify balance", "User not found");
      return res.status(404).send({ message: "User Not found." });
    }

    if (req.body.value > user.balance) {
      await createLog(req.body.username, "Verify balance", "Insufficient funds");
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
      await createLog(req.body.username, "Verify coin balance", "User not found");
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
    const coinsSold = parseFloat(req.body.value) / parseFloat(response.data[0].price_usd);
    const coinBalance = userCoins[req.body.coin];

    if (coinsSold > coinBalance) {
      await createLog(req.body.username, "Verify coin balance", "Insufficient funds");
      return res.status(404).send({ message: "Insufficient funds." });
    }

    if (req.body.value <= 0) {
      await createLog(req.body.username, "Verify coin balance", "Negative value");
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
    const response = await exchange.getCurrentPrice(coin);
    const coinsBought = parseFloat(req.body.value) / parseFloat(response.data[0].price_usd);

    let updateQuery = { balance: -req.body.value };
    updateQuery[coin] = coinsBought;

    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $inc: updateQuery },
      { new: true }
    ).exec();

    if (!user) {
      await createLog(req.body.username, "Buy", "User not found");
      return res.status(404).send({ message: "User Not found." });
    }

    await createLog(req.body.username, "Buy", `Successful. Bought: ${coinsBought} of ${coin}`);
    res.status(200).send({
      balance: user.balance,
      coinsBought: coinsBought,
    });
  } catch (err) {
    await createLog(req.body.username, "Buy", err.message);
    return res.status(500).send({ message: err.message });
  }
};

// Updates database after selling coins and returns new balance and coin balance
exports.sell = async (req, res) => {
  try {
    const coinsSold = req.coinsSold;
    let updateQuery = { balance: req.body.value };
    updateQuery[req.body.coin] = -coinsSold;

    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $inc: updateQuery },
      { new: true }
    ).exec();

    if (!user) {
      await createLog(req.body.username, "Sell", "User not found");
      return res.status(404).send({ message: "User Not found." });
    }

    await createLog(req.body.username, "Sell", `Successful. Sold ${coinsSold} of ${req.body.coin}`);
    res.status(200).send({
      balance: user.balance,
      newCoinBalance: req.coinBalance - coinsSold,
      coinsSold: coinsSold,
    });
  } catch (err) {
    await createLog(req.body.username, "Sell", err.message);
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

    await createLog(req.body.username, "Get user value", `Successful. User value: ${userValue}`);
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
