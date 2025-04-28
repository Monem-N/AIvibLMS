/**
 * Test script for Firebase Functions
 * 
 * This script tests the setUserClaims function by creating a user and updating their level.
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD0_YJviunO_j7oH75wNP99QtJ3xZk8lI",
  authDomain: "aivib-lms.firebaseapp.com",
  projectId: "aivib-lms",
  storageBucket: "aivib-lms.firebasestorage.app",
  messagingSenderId: "373205548481",
  appId: "1:373205548481:web:092295d57d64794b744340",
  databaseURL: "https://aivib-lms-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Test creating a user
 */
async function testCreateUser() {
  console.log('Testing user creation...');
  
  try {
    // Create a test user
    const email = `test-${Date.now()}@example.com`;
    const password = 'Test123!';
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('User created successfully with ID:', user.uid);
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      level: 1, // Student level
      displayName: 'Test User',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('User document created successfully');
    
    return { uid: user.uid, email, password };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Test updating user level to trigger setUserClaims function
 * @param {string} uid User ID to update
 */
async function testUpdateUserLevel(uid) {
  console.log('Testing user level update...');
  
  try {
    // Update user level to instructor (level 4)
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      level: 4, // Instructor level
      updatedAt: serverTimestamp()
    });
    
    console.log('User level updated successfully');
    
    // Wait for the function to execute
    console.log('Waiting for setUserClaims function to execute...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Get the updated user document
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      console.log('Updated user document:', userDoc.data());
    } else {
      console.log('User document not found');
    }
  } catch (error) {
    console.error('Error updating user level:', error);
    throw error;
  }
}

/**
 * Test signing in with the user to check custom claims
 * @param {string} email User email
 * @param {string} password User password
 */
async function testSignIn(email, password) {
  console.log('Testing sign in to check custom claims...');
  
  try {
    // Sign in with the test user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get the ID token result to check custom claims
    const idTokenResult = await user.getIdTokenResult();
    
    console.log('User signed in successfully');
    console.log('Custom claims:', idTokenResult.claims);
    
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

/**
 * Test cleaning up the test user
 * @param {Object} user Firebase user object
 */
async function testCleanup(user) {
  console.log('Cleaning up test user...');
  
  try {
    // Delete the user document
    await deleteDoc(doc(db, 'users', user.uid));
    
    // Delete the user
    await deleteUser(user);
    
    console.log('Test user cleaned up successfully');
  } catch (error) {
    console.error('Error cleaning up test user:', error);
    throw error;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  try {
    // Test create user
    const { uid, email, password } = await testCreateUser();
    
    // Test update user level
    await testUpdateUserLevel(uid);
    
    // Test sign in to check custom claims
    const user = await testSignIn(email, password);
    
    // Test cleanup
    await testCleanup(user);
    
    console.log('All tests completed successfully');
  } catch (error) {
    console.error('Tests failed:', error);
  }
}

// Run the tests
runTests();
