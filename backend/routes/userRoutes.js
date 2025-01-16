const express = require('express');
const { signup, upload } = require('../controllers/userController');

const router = express.Router();

router.post("/signup", upload.single("profile_picture"), signup);

module.exports = router;
