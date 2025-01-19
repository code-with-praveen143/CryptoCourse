const fs = require("fs");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Logs = require("../models/logs.model");

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// Helper function to log actions
const logAction = async (username, email, action, status) => {
  try {
    await Logs.create({
      username,
      email,
      time: new Date(),
      action,
      status,
    });
  } catch (err) {
    console.error("Error logging action:", err.message);
  }
};

// Register a new user with profile picture upload
exports.register = [
  upload.single("profile_picture"), // Middleware to handle file upload
  async (req, res) => {
    try {
      const { username, email, password, role } = req.body;

      // Validate request
      if (!username || !email || !password) {
        return res.status(400).send({ message: "All fields are required!" });
      }
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        await logAction(
          req.body.username,
          req.body.email,
          "Register",
          "Email already exists"
        );
        return res.status(409).send({ message: "Email already exists." });
      }
      const hashedPassword = bcrypt.hashSync(password, 8);

      let profilePicture = null;
      if (req.file) {
        profilePicture = req.file.filename; // Save the filename
      }

      const newUser = new User({
        username,
        email,
        password_hash: hashedPassword,
        balance: 10000,
        bitcoin: 0,
        dash: 0,
        monero: 0,
        ethereum: 0,
        xrp: 0,
        tether: 0,
        bitcoinCash: 0,
        bitcoinSV: 0,
        litecoin: 0,
        eos: 0,
        binancecoin: 0,
        tezos: 0,
        role: role || "student",
        profile_picture: profilePicture,
        preferences: {
          notifications: true,
          dark_mode: false,
        },
      });

      await newUser.save();
      await logAction(username, email, "Register", "Successful");

      res.status(201).send({ message: "User registered successfully!" });
    } catch (err) {
      console.error("Error registering user:", err.message);
      await logAction(
        req.body.username,
        req.body.email,
        "Register",
        err.message
      );
      res
        .status(500)
        .send({ message: "An error occurred during registration." });
    }
  },
];

// Log in an existing user (unchanged)
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Ensure username and password are provided
    if (!username || !password) {
      await Logs.create({
        username: username || "N/A",
        email: req.body.email || "N/A",
        time: new Date(),
        action: "Login",
        status: "Missing username or password",
      });
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Find the user in the database
    const user = await User.findOne({ username }).exec();
    if (!user) {
      await Logs.create({
        username,
        email: req.body.email || "N/A",
        time: new Date(),
        action: "Login",
        status: "User not found",
      });
      return res.status(404).json({ message: "User not found." });
    }

    // Ensure user has a password
    if (!user.password_hash) {
      await Logs.create({
        username,
        email: user.email || "N/A",
        time: new Date(),
        action: "Login",
        status: "User password is missing in the database",
      });
      return res
        .status(500)
        .json({ message: "User password is missing in the database." });
    }

    // Validate the password
    const passwordIsValid = await bcrypt.compare(password, user.password_hash);

    if (!passwordIsValid) {
      await Logs.create({
        username,
        email: user.email || "N/A",
        time: new Date(),
        action: "Login",
        status: "Invalid password",
      });
      return res.status(401).json({
        accessToken: null,
        message: "Invalid password.",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "24h", // 24 hours
    });

    // Log successful login
    await Logs.create({
      username,
      email: user.email || "N/A",
      time: new Date(),
      action: "Login",
      status: "Successful",
    });

    // Send response
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    await Logs.create({
      username: req.body.username || "N/A",
      email: req.body.email || "N/A",
      time: new Date(),
      action: "Login",
      status: `Error occurred: ${error.message}`,
    });

    return res.status(500).json({ message: "An error occurred during login." });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    // Retrieve the user ID from the middleware
    const userId = req.user.id;

    // Fetch the user from the database (excluding sensitive data)
    const user = await User.findById(userId).select("-password_hash");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return user details
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching logged-in user:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user data." });
  }
};
