const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authmiddleware");

// Routes

// Get user balance
router.post("/balance", authMiddleware, userController.getUserBalance);

// Verify user balance
router.post("/verify-balance", authMiddleware, userController.verifyBalance);

// Verify coin balance
router.post("/verify-coins", authMiddleware, userController.verifyCoins);

// Buy coins
router.post("/buy", authMiddleware, userController.verifyBalance, userController.buy);

// Sell coins
router.post("/sell", authMiddleware, userController.verifyCoins, userController.sell);

// Get user portfolio value
router.post("/portfolio-value", authMiddleware, userController.getUserValue);

module.exports = router;
