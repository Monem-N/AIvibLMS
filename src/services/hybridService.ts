/**
 * Hybrid Service
 *
 * This service initializes and exports both Firebase and Supabase services.
 * It implements the hybrid approach where Firebase is used for authentication and database,
 * while Supabase is used for file storage.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getDatabase } from 'firebase/database';
import supabase, { isSupabaseAvailable } from './supabaseClient';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

// Supabase client is imported from supabaseClient.ts

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);
const database = getDatabase(firebaseApp);

// Supabase client is already initialized in supabaseClient.ts

// Export Firebase services
export const firebase = {
  app: firebaseApp,
  auth,
  firestore,
  functions,
  database
};

// Export Supabase client
export { supabase };

// Export a default object with all services
export default {
  firebase,
  supabase
};
