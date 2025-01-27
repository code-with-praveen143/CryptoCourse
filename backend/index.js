const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const exchangeRoutes = require('./routes/exchangeRoutes')
const quizRoutes = require('./routes/quizRoutes');
const logsRoutes = require('./controllers/logsController');
const connectDB = require('./config/db');
 // Initialize dotenv
dotenv.config();
const PORT = process.env.PORT || 5000;


// Initialize app
const app = express();

// Middleware
// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Localhost frontend
      "https://crypto-course-one.vercel.app", // Vercel deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/exchange', exchangeRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api', logsRoutes);

// MongoDB Connection
connectDB()
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));