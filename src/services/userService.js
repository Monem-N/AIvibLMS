import { getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Save user profile data
 * @param {string} userId - User ID
 * @param {Object} profileData - User profile data
 * @returns {Promise<void>}
 */
export const saveUserProfile = async (userId, profileData) => {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    
    // Add timestamps
    const dataWithTimestamps = {
      ...profileData,
      updatedAt: serverTimestamp()
    };
    
    // Check if user document exists
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      // Update existing user
      await updateDoc(userRef, dataWithTimestamps);
    } else {
      // Create new user
      await setDoc(userRef, {
        ...dataWithTimestamps,
        createdAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

/**
 * Get user profile data
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} - User profile data
 */
export const getUserProfile = async (userId) => {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

/**
 * Update user profile data
 * @param {string} userId - User ID
 * @param {Object} profileData - User profile data to update
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (userId, profileData) => {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    
    // Add timestamp
    const dataWithTimestamp = {
      ...profileData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(userRef, dataWithTimestamp);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
