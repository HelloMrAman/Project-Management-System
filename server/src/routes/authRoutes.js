import express from 'express';
import { register, login, requestPasswordReset, resetPassword } from '../controllers/authController.js';
import { registerValidation, loginValidation, passwordResetValidation } from '../utils/validation.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// User Registration Route
router.post('/register', registerValidation, register);

// User Login Route
router.post('/login', loginValidation, login);

// Password Reset Request Route
router.post('/forgot-password', requestPasswordReset);

// Password Reset Confirmation Route
router.post('/reset-password', passwordResetValidation, resetPassword);

// Protected Route Example
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ 
    user: req.user, 
    message: 'Access to protected route successful' 
  });
});

export default router;
