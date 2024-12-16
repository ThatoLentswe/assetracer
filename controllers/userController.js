// controllers/userController.js
const { firebase } = require('../config/firebase');

// Get user details by UID
exports.getUserDetails = async (req, res) => {
  const { uid } = req.params;

  try {
    const userRecord = await firebase.auth().getUser(uid);
    
    res.status(200).json({
      message: 'User details fetched successfully',
      user: userRecord,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
