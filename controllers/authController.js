// controllers/authController.js
const { firebase } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/environment');

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, password, displayName } = req.body;
  
  try {
    const userRecord = await firebase.auth().createUser({
      email,
      password,
      displayName,
    });
    
    res.status(201).json({
      message: 'User created successfully',
      user: userRecord,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// User login (Generate JWT token)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Generate JWT token
    const token = jwt.sign({ uid: user.uid }, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// User logout (revoke Firebase token)
exports.logoutUser = async (req, res) => {
  try {
    await firebase.auth().signOut();
    res.status(200).json({
      message: 'User logged out successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
