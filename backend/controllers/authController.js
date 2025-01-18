const fs = require('fs');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Logs = require('../models/logs.model');

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extName) {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
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
    upload.single('profile_picture'), // Middleware to handle file upload
    async (req, res) => {
        try {
            const { username, email, password, role } = req.body;

            // Validate request
            if (!username || !email || !password) {
                return res.status(400).send({ message: "All fields are required!" });
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
                role: role || 'student',
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
            await logAction(req.body.username, req.body.email, "Register", err.message);
            res.status(500).send({ message: "An error occurred during registration." });
        }
    },
];

// Log in an existing user (unchanged)
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            await logAction(username, null, "Login", "User not found");
            return res.status(404).send({ message: "User not found." });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password_hash);

        if (!passwordIsValid) {
            await logAction(username, user.email, "Login", "Invalid password");
            return res.status(401).send({ message: "Invalid password!" });
        }

        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        await logAction(username, user.email, "Login", "Successful");

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            profile_picture: user.profile_picture,
            accessToken: token,
        });
    } catch (err) {
        console.error("Error logging in user:", err.message);
        await logAction(req.body.username, req.body.email, "Login", err.message);
        res.status(500).send({ message: "An error occurred during login." });
    }
};
