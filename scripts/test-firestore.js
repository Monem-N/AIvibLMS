/**
 * Test script for Firestore CRUD operations
 * 
 * This script tests creating, reading, updating, and deleting data in Firestore.
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
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
const db = getFirestore(app);

/**
 * Test creating a document in Firestore
 */
async function testCreate() {
  console.log('Testing create operation...');
  
  try {
    // Create a test document
    const testDocRef = doc(collection(db, 'test'));
    await setDoc(testDocRef, {
      name: 'Test Document',
      description: 'This is a test document',
      createdAt: serverTimestamp()
    });
    
    console.log('Document created successfully with ID:', testDocRef.id);
    return testDocRef.id;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
}

/**
 * Test reading a document from Firestore
 * @param {string} docId Document ID to read
 */
async function testRead(docId) {
  console.log('Testing read operation...');
  
  try {
    // Get the test document
    const testDocRef = doc(db, 'test', docId);
    const testDocSnap = await getDoc(testDocRef);
    
    if (testDocSnap.exists()) {
      console.log('Document data:', testDocSnap.data());
    } else {
      console.log('Document does not exist');
    }
  } catch (error) {
    console.error('Error reading document:', error);
    throw error;
  }
}

/**
 * Test updating a document in Firestore
 * @param {string} docId Document ID to update
 */
async function testUpdate(docId) {
  console.log('Testing update operation...');
  
  try {
    // Update the test document
    const testDocRef = doc(db, 'test', docId);
    await updateDoc(testDocRef, {
      description: 'This is an updated test document',
      updatedAt: serverTimestamp()
    });
    
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

/**
 * Test deleting a document from Firestore
 * @param {string} docId Document ID to delete
 */
async function testDelete(docId) {
  console.log('Testing delete operation...');
  
  try {
    // Delete the test document
    const testDocRef = doc(db, 'test', docId);
    await deleteDoc(testDocRef);
    
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  try {
    // Test create
    const docId = await testCreate();
    
    // Test read
    await testRead(docId);
    
    // Test update
    await testUpdate(docId);
    
    // Test read after update
    await testRead(docId);
    
    // Test delete
    await testDelete(docId);
    
    console.log('All tests completed successfully');
  } catch (error) {
    console.error('Tests failed:', error);
  }
}

// Run the tests
runTests();
