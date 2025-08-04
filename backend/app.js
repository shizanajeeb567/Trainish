const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config();
console.log("Loaded API Key:", process.env.OPENROUTER_API_KEY);

const sequelize = require('./config/db');
const Chat = require('./models/Chat');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const workoutLogRoutes = require('./routes/logRoutes');
const planRoutes = require('./routes/planRoutes');
const profileRoutes = require('./routes/profileRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes'); 
const chatRoutes = require('./routes/chatRoutes');
const aiPlanRoutes = require('./routes/aiPlanRoutes'); 

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/workout-logs', workoutLogRoutes);
app.use('/api/workout-plans', planRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/meal-plans', mealPlanRoutes); 
app.use('/api', chatRoutes);
app.use('/api/ai', aiPlanRoutes); 

// Sync DB
sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Failed to sync DB:', err));

module.exports = app;
