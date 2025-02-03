const fs = require("fs");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Logs = require("../models/logs.model");
const Admin = require("../models/admin.model");

 const TokenBlacklist = require("../models/tokenBlacklist.model");

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

 

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username,password)
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

    // === Step 1: Check in Admin Model ===
    const admin = await Admin.findOne({ username }).exec();
    let userType = "admin"; // Default role

    if (admin) {
      // Validate password
      const passwordIsValid = await bcrypt.compare(password, admin.password);
      if (!passwordIsValid) {
        await Logs.create({
          username,
          email: admin.email || "N/A",
          time: new Date(),
          action: "Login",
          status: "Invalid password",
        });
        return res.status(401).json({ message: "Invalid password." });
      }

      // Generate token for admin
      const token = jwt.sign(
        { id: admin._id, role: userType, email: admin.email },
        process.env.SECRET,
        { expiresIn: "24h" }
      );

      // Log successful admin login
      await Logs.create({
        username,
        email: admin.email || "N/A",
        time: new Date(),
        action: "Login",
        status: "Successful (Admin)",
      });

      return res.status(200).json({
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: userType,
        accessToken: token,
      });
    }

    // === Step 2: Check in User Model ===
    const user = await User.findOne({ username }).exec();
    userType = "user"; // Update role

    if (user) {
      // Validate password
      const passwordIsValid = await bcrypt.compare(password, user.password_hash);
      if (!passwordIsValid) {
        await Logs.create({
          username,
          email: user.email || "N/A",
          time: new Date(),
          action: "Login",
          status: "Invalid password",
        });
        return res.status(401).json({ message: "Invalid password." });
      }

      // Generate token for user
      const token = jwt.sign(
        { id: user._id, role: userType, email: user.email },
        process.env.SECRET,
        { expiresIn: "24h" }
      );

      // Log successful user login
      await Logs.create({
        username,
        email: user.email || "N/A",
        time: new Date(),
        action: "Login",
        status: "Successful (User)",
      });

      return res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: userType,
        accessToken: token,
      });
    }

    // If neither admin nor user is found
    await Logs.create({
      username,
      email: req.body.email || "N/A",
      time: new Date(),
      action: "Login",
      status: "User not found",
    });
    return res.status(404).json({ message: "User not found." });

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
    const userId = req.user.id;
    const userRole = req.user.role;

    let user;

    if (userRole === "admin") {
      user = await Admin.findById(userId).select("-password");
    } else {
      user = await User.findById(userId).select("-password_hash");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching logged-in user:", error.message);
    res.status(500).json({ message: "An error occurred while fetching user data." });
  }
};


exports.logout = async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token is required." });
    }

    if (!token?.trim()) {
      throw new Error("Valid token is required for logout.");
    }

    // Check if token is already blacklisted
    const existingBlacklist = await TokenBlacklist.findOne({
      where: { token }
    });

    if (existingBlacklist) {
      throw new Error("Token is already invalidated.");
    }

    await TokenBlacklist.create({
      token,
      blacklisted_at: new Date()
    });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "An error occurred during logout." });
  }
};