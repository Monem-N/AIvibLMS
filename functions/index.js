/**
 * Firebase Cloud Functions
 * 
 * This is the main entry point for all Firebase Cloud Functions.
 */

const admin = require('firebase-admin');
const functions = require('firebase-functions');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Import auth functions
const { setUserClaims } = require('./src/auth/setUserClaims');

// Export all functions
exports.setUserClaims = setUserClaims;
