const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register user
router.post('/signup', authController.register);

// Log in user
router.post('/login', authController.login);

module.exports = router;
