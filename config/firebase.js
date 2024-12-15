// config/firebase.js
const admin = require('firebase-admin');
const { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } = require('./environment');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require('./serviceAccountKey.json')), // Use service account key for Firebase Admin SDK
    databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`, // Realtime Database URL
  });
} else {
  admin.app(); // Use the default app if it's already initialized
}

// Firebase client SDK initialization
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Firebase client SDK - Initialize Firebase (for frontend or authentication)
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

module.exports = { admin, firebase };
