const User = require('../models/user.model');

const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust the path to your User model
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Configure Multer for file uploads
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = new User({
      username,
      email,
      password_hash: passwordHash,
      profile_picture: profilePicture,
    });

    await newUser.save();

    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during signup." });
  }
};

module.exports = { signup, upload };
