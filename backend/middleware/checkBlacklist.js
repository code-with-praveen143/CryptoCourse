// middleware/checkBlacklist.js
const TokenBlacklist = require("../models/tokenBlacklist.model");

const checkBlacklist = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    // Check if the token is blacklisted
    const blacklistedToken = await TokenBlacklist.findOne({ token });

    if (blacklistedToken) {
      return res.status(401).json({ message: "Unauthorized: Token is blacklisted." });
    }

    next();
  } catch (error) {
    console.error("Blacklist check error:", error.message);
    res.status(500).json({ message: "An error occurred during token validation." });
  }
};

module.exports = checkBlacklist;