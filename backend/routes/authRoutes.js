const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Register user
router.post('/signup', authController.register);

// Log in user
router.post('/login', authController.login);

router.get("/me", authMiddleware, authController.getLoggedInUser);

module.exports = router;
