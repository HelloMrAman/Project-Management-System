import dotenv from 'dotenv';

dotenv.config(); 

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


// Centralized error handling utility
const handleControllerError = (res, error, statusCode = 500) => {
  console.error('Authentication Error:', error);
  res.status(statusCode).json({
    message: error.message || 'An unexpected error occurred',
    success: false
  });
};

// Helper function to validate input errors
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      success: false
    });
  }
};

// Helper function to generate JWT token
const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;
  // const secretKey = "mySuperSecretKey12345";

  if (!secretKey) {
    throw new Error('secretOrPrivateKey must have a value');
  }
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

// Register User
export const register = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const { name, email, password } = req.body;

    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({
        message: 'User  already exists',
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
      success: true
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

// Login User
export const login = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'Invalid email or password',
        success: false
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
        success: false
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
      success: true
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

// Other functions remain unchanged...

// Request Password Reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'No account associated with this email',
        success: false
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      // Configure email service
    });

    await transporter.sendMail({
      to: email,
      from: 'noreply@yourapp.com',
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset</p>
        <p>Click <a href="/reset-password/${resetToken}">here</a> to reset your password</p>
        <p>This link will expire in 1 hour</p>
      `
    });

    res.status(200).json({
      message: 'Password reset link sent',
      success: true
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const { resetToken, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired reset token',
        success: false
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      message: 'Password reset successful',
      success: true
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};
