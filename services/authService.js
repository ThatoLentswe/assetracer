// services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('../config/db'); // Firebase Firestore instance
const User = require('../models/user');  // User model

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Hash the user's password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare hashed password
const comparePassword = async (enteredPassword, storedPassword) => {
  return bcrypt.compare(enteredPassword, storedPassword);
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Authenticate user and return JWT token
const authenticateUser = async (email, password) => {
  const user = await User.getUserByEmail(email);
  if (!user) throw new Error('User not found');
  
  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');
  
  const token = generateToken(user.uid);
  return { user, token };
};

module.exports = { hashPassword, comparePassword, generateToken, authenticateUser };
