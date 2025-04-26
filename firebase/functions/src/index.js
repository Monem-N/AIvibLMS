const admin = require('firebase-admin');
const functions = require('firebase-functions');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Import auth functions
const { setUserClaims } = require('./auth/setUserClaims');

// Export all functions
exports.setUserClaims = setUserClaims;
