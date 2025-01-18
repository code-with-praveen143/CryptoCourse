const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
 // Initialize dotenv
dotenv.config();
const PORT = process.env.PORT || 5000;


// Initialize app
const app = express();

// Middleware
app.use(cors("*"));
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
