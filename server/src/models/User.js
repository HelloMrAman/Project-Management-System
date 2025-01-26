import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    }
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

// Method to compare entered password with hashed password
userSchema.methods.isValidPassword = async function (password) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(password, this.password);
};

// Create a mongoose model for the User
const User = mongoose.model('User', userSchema);

export default User;
