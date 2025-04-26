/**
 * Authentication Service
 * 
 * This service provides methods for user authentication using Firebase Authentication.
 * It includes methods for sign in, sign up, sign out, password reset, and email verification.
 */

import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { User, UserInfo } from '../types/user';

/**
 * Sign in with email and password
 * @param email User email
 * @param password User password
 * @returns Promise resolving to UserCredential
 */
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign up with email and password
 * @param email User email
 * @param password User password
 * @param userInfo Additional user information
 * @returns Promise resolving to UserCredential
 */
export const signUp = async (
  email: string, 
  password: string, 
  userInfo: UserInfo
): Promise<UserCredential> => {
  const auth = getAuth();
  const db = getFirestore();
  
  // Create user in Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;
  
  // Update user profile with display name
  await updateProfile(user, {
    displayName: userInfo.displayName
  });
  
  // Create user document in Firestore
  const userDocRef = doc(db, 'users', user.uid);
  await setDoc(userDocRef, {
    email: user.email,
    emailVerified: user.emailVerified,
    info: userInfo,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  
  // Send email verification
  await sendEmailVerification(user);
  
  return userCredential;
};

/**
 * Sign out the current user
 * @returns Promise resolving when sign out is complete
 */
export const signOut = async (): Promise<void> => {
  const auth = getAuth();
  return firebaseSignOut(auth);
};

/**
 * Send password reset email
 * @param email User email
 * @returns Promise resolving when email is sent
 */
export const resetPassword = async (email: string): Promise<void> => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

/**
 * Send email verification to current user
 * @param user Firebase user
 * @returns Promise resolving when email is sent
 */
export const verifyEmail = async (user: FirebaseUser): Promise<void> => {
  return sendEmailVerification(user);
};

/**
 * Update user profile
 * @param user Firebase user
 * @param userInfo User information to update
 * @returns Promise resolving when profile is updated
 */
export const updateUserProfile = async (
  user: FirebaseUser, 
  userInfo: Partial<UserInfo>
): Promise<void> => {
  const db = getFirestore();
  const userDocRef = doc(db, 'users', user.uid);
  
  // Update display name in Firebase Authentication if provided
  if (userInfo.displayName) {
    await updateProfile(user, {
      displayName: userInfo.displayName
    });
  }
  
  // Update user document in Firestore
  await updateDoc(userDocRef, {
    'info': userInfo,
    'updatedAt': serverTimestamp()
  });
};

/**
 * Get user data from Firestore
 * @param userId User ID
 * @returns Promise resolving to user data
 */
export const getUserData = async (userId: string): Promise<User | null> => {
  const db = getFirestore();
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);
  
  if (userDoc.exists()) {
    return userDoc.data() as User;
  }
  
  return null;
};

/**
 * Subscribe to auth state changes
 * @param callback Callback function to handle auth state changes
 * @returns Unsubscribe function
 */
export const subscribeToAuthChanges = (
  callback: (user: FirebaseUser | null) => void
): (() => void) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, callback);
};

/**
 * Check if user is authenticated
 * @returns Current user or null
 */
export const getCurrentUser = (): FirebaseUser | null => {
  const auth = getAuth();
  return auth.currentUser;
};

/**
 * Check if email is verified
 * @param user Firebase user
 * @returns True if email is verified
 */
export const isEmailVerified = (user: FirebaseUser | null): boolean => {
  return user?.emailVerified || false;
};

/**
 * Format user data for application use
 * @param firebaseUser Firebase user
 * @param userData Additional user data from Firestore
 * @returns Formatted user object
 */
export const formatUserData = (
  firebaseUser: FirebaseUser, 
  userData: any
): User => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    info: userData?.info || {},
    metadata: {
      createdAt: userData?.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
      updatedAt: userData?.updatedAt?.toDate?.().toISOString() || new Date().toISOString(),
      lastLoginAt: firebaseUser.metadata.lastSignInTime
    }
  };
};
