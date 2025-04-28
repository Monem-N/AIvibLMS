/**
 * useHybridAuth Hook
 *
 * Custom hook for authentication using Firebase Auth in the hybrid approach.
 * This hook provides authentication state and methods to components.
 */

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { firebase } from '../services/hybridService';
import { User, UserInfo, UserRole } from '../types/user';
import { setUser, clearUser } from '../actions/userActions';
import { useNotification } from './useNotification';

export function useHybridAuth() {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const { auth, firestore } = firebase;

  // Subscribe to user on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));

          // Get user role from Firestore
          let userRole: UserRole = 'student';

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === 'admin' ||
                userData.role === 'instructor' ||
                userData.role === 'assistant' ||
                userData.role === 'student' ||
                userData.role === 'guest') {
              userRole = userData.role;
            }
          } else {
            // Create user document if it doesn't exist
            await setDoc(doc(firestore, 'users', firebaseUser.uid), {
              firstName: '',
              lastName1: '',
              displayName: firebaseUser.displayName || '',
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
              role: 'student',
              level: 1,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          }

          // Create user object with Firebase user and profile data
          const userWithProfile: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: userRole,
            metadata: {
              createdAt: firebaseUser.metadata.creationTime || '',
              lastLoginAt: firebaseUser.metadata.lastSignInTime || '',
              updatedAt: ''
            }
          };

          setUserState(userWithProfile);
          dispatch(setUser(userWithProfile));
        } catch (error) {
          console.error('Error getting user profile:', error);
          setUserState(null);
          dispatch(clearUser());
        }
      } else {
        setUserState(null);
        dispatch(clearUser());
      }

      setLoading(false);
      setInitialized(true);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, firestore, dispatch]);

  /**
   * Sign in with email and password
   * @param email User email
   * @param password User password
   * @returns Promise resolving to the user
   */
  const signIn = async (email: string, password: string): Promise<FirebaseUser> => {
    try {
      // Check if we're in development mode and using emulators
      const isUsingEmulators = import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true';

      // If we're using emulators but they're not running, show a helpful message
      if (isUsingEmulators) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);

          showNotification({
            message: 'Signed in successfully',
            type: 'success'
          });

          return userCredential.user;
        } catch (emulatorError: any) {
          // Check if it's a network error, which likely means the emulator isn't running
          if (emulatorError.code === 'auth/network-request-failed') {
            console.error('Firebase Auth emulator not running:', emulatorError);
            showNotification({
              message: 'Firebase Auth emulator is not running. Please start the emulator or disable emulator mode.',
              type: 'error'
            });
            throw new Error('Firebase Auth emulator is not running. Please start the emulator or disable emulator mode.');
          }

          // If it's not a network error, rethrow
          throw emulatorError;
        }
      } else {
        // Normal sign in (not using emulators)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        showNotification({
          message: 'Signed in successfully',
          type: 'success'
        });

        return userCredential.user;
      }
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to sign in',
        type: 'error'
      });
      throw error;
    }
  };

  /**
   * Sign up with email and password
   * @param email User email
   * @param password User password
   * @param userInfo User information
   * @returns Promise resolving to the user
   */
  const signUp = async (
    email: string,
    password: string,
    userInfo: UserInfo
  ): Promise<FirebaseUser> => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update user profile
      await updateProfile(firebaseUser, {
        displayName: `${userInfo.firstName} ${userInfo.lastName1}`
      });

      // Send email verification
      await sendEmailVerification(firebaseUser);

      // Create user document in Firestore
      await setDoc(doc(firestore, 'users', firebaseUser.uid), {
        firstName: userInfo.firstName,
        lastName1: userInfo.lastName1,
        displayName: `${userInfo.firstName} ${userInfo.lastName1}`,
        email: email,
        photoURL: firebaseUser.photoURL,
        role: 'student',
        level: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      showNotification({
        message: 'Account created successfully. Please check your email for verification.',
        type: 'success'
      });

      return firebaseUser;
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to create account',
        type: 'error'
      });
      throw error;
    }
  };

  /**
   * Sign out the current user
   * @returns Promise resolving when sign out is complete
   */
  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);

      showNotification({
        message: 'Signed out successfully',
        type: 'success'
      });
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to sign out',
        type: 'error'
      });
      throw error;
    }
  };

  /**
   * Send password reset email
   * @param email User email
   * @returns Promise resolving when email is sent
   */
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);

      showNotification({
        message: 'Password reset email sent. Please check your inbox.',
        type: 'success'
      });
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to send password reset email',
        type: 'error'
      });
      throw error;
    }
  };

  /**
   * Send email verification
   * @returns Promise resolving when email is sent
   */
  const sendVerificationEmail = async (): Promise<void> => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);

        showNotification({
          message: 'Verification email sent. Please check your inbox.',
          type: 'success'
        });
      } else {
        throw new Error('No user is currently signed in');
      }
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to send verification email',
        type: 'error'
      });
      throw error;
    }
  };

  /**
   * Update user profile
   * @param userInfo User information to update
   * @returns Promise resolving when profile is updated
   */
  const updateUserProfile = async (userInfo: Partial<UserInfo>): Promise<void> => {
    try {
      if (!auth.currentUser) {
        throw new Error('No user is currently signed in');
      }

      const uid = auth.currentUser.uid;
      const userRef = doc(firestore, 'users', uid);

      // Update display name if provided
      if (userInfo.firstName && userInfo.lastName1) {
        const displayName = `${userInfo.firstName} ${userInfo.lastName1}`;
        await updateProfile(auth.currentUser, {
          displayName
        });
        userInfo.displayName = displayName;
      }

      // Update photo URL if Firebase user has one
      if (auth.currentUser.photoURL) {
        await updateProfile(auth.currentUser, {
          photoURL: auth.currentUser.photoURL
        });
      }

      // Update user document in Firestore
      await updateDoc(userRef, {
        ...userInfo,
        updatedAt: serverTimestamp()
      });

      // Update local user state
      if (user) {
        const updatedUser: User = {
          ...user,
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL
        };
        setUserState(updatedUser);
        dispatch(setUser(updatedUser));
      }

      showNotification({
        message: 'Profile updated successfully',
        type: 'success'
      });
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to update profile',
        type: 'error'
      });
      throw error;
    }
  };

  /**
   * Check if user is authenticated
   * @returns Boolean indicating if user is authenticated
   */
  const isAuthenticated = (): boolean => {
    return !!user;
  };

  /**
   * Check if user's email is verified
   * @returns Boolean indicating if user's email is verified
   */
  const isVerified = (): boolean => {
    return !!user?.emailVerified;
  };

  return {
    user,
    loading,
    initialized,
    signIn,
    signUp,
    signOut,
    resetPassword,
    sendVerificationEmail,
    updateProfile: updateUserProfile,
    isAuthenticated,
    isVerified
  };
}
