/**
 * Test script for Firebase Storage operations
 * 
 * This script tests uploading, downloading, and deleting files in Firebase Storage.
 */

import { initializeApp } from 'firebase/app';
import { 
  getStorage, 
  ref, 
  uploadString, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import fs from 'fs';

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
const storage = getStorage(app);

/**
 * Test uploading a file to Firebase Storage
 */
async function testUpload() {
  console.log('Testing upload operation...');
  
  try {
    // Create a test file path
    const testFilePath = 'test/test-file.txt';
    const storageRef = ref(storage, testFilePath);
    
    // Upload a test string
    const testContent = 'This is a test file content';
    await uploadString(storageRef, testContent);
    
    console.log('File uploaded successfully to:', testFilePath);
    return testFilePath;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Test downloading a file from Firebase Storage
 * @param {string} filePath File path to download
 */
async function testDownload(filePath) {
  console.log('Testing download operation...');
  
  try {
    // Get the download URL
    const storageRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(storageRef);
    
    console.log('File download URL:', downloadURL);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}

/**
 * Test deleting a file from Firebase Storage
 * @param {string} filePath File path to delete
 */
async function testDelete(filePath) {
  console.log('Testing delete operation...');
  
  try {
    // Delete the file
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
    
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  try {
    // Test upload
    const filePath = await testUpload();
    
    // Test download
    await testDownload(filePath);
    
    // Test delete
    await testDelete(filePath);
    
    console.log('All tests completed successfully');
  } catch (error) {
    console.error('Tests failed:', error);
  }
}

// Run the tests
runTests();
