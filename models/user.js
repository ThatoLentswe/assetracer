// models/user.js
const { db } = require('../config/db'); // Firebase Firestore instance

// User model (this is a logical model, not a strict schema like in SQL)
class User {
  constructor(uid, email, displayName, role, createdAt) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.role = role;
    this.createdAt = createdAt || new Date();
  }

  // Create a new user in Firestore
  static async createUser({ email, displayName, role }) {
    try {
      const userRef = db.collection('users').doc(); // Create a new document
      const user = new User(userRef.id, email, displayName, role);

      await userRef.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
      });

      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Get a user by UID
  static async getUserById(uid) {
    try {
      const userRef = db.collection('users').doc(uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        throw new Error('User not found');
      }
      return doc.data();
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  // Update user details
  static async updateUser(uid, updateData) {
    try {
      const userRef = db.collection('users').doc(uid);
      await userRef.update(updateData);
      return { message: 'User updated successfully' };
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }
}

module.exports = User;
