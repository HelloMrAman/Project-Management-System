import express from 'express';
import connectDB from './src/config/database.js'; 
import authRoutes from './src/routes/authRoutes.js';
import cors from 'cors';

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

export default app;
