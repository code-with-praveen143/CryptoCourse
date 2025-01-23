const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require("../middleware/authmiddleware");
const checkBlacklist = require("../middleware/checkBlacklist");

const router = express.Router();

// Register user
router.post('/signup', authController.register);

// Log in user
router.post('/login', authController.login);

// Log out user
router.post("/logout", authController.logout); // Add logout route

// Get logged-in user
router.get("/me", checkBlacklist, authMiddleware, authController.getLoggedInUser);

module.exports = router;
