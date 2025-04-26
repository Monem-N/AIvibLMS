/**
 * useAuth Hook
 * 
 * Custom hook for authentication functionality.
 * Provides methods for sign in, sign up, sign out, and user state management.
 */

import { useState, useEffect, useCallback } from 'react';
import { User as FirebaseUser, UserCredential } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../actions/userActions';
import { User, UserInfo } from '../types/user';
import * as authService from '../services/authService';
import { useNotification } from './useNotification';

interface AuthState {
  currentUser: User | null;
  loading: boolean;
  initialized: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    currentUser: null,
    loading: true,
    initialized: false
  });
  
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  
  // Initialize auth state
  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges(async (firebaseUser) => {
      setAuthState(prevState => ({ ...prevState, loading: true }));
      
      if (firebaseUser) {
        try {
          // Get additional user data from Firestore
          const userData = await authService.getUserData(firebaseUser.uid);
          
          // Format user data
          const formattedUser = authService.formatUserData(firebaseUser, userData);
          
          // Update auth state
          setAuthState({
            currentUser: formattedUser,
            loading: false,
            initialized: true
          });
          
          // Update Redux state
          dispatch(setUser(formattedUser));
        } catch (error) {
          console.error('Error getting user data:', error);
          setAuthState({
            currentUser: null,
            loading: false,
            initialized: true
          });
          
          // Clear Redux state
          dispatch(clearUser());
        }
      } else {
        // No user is signed in
        setAuthState({
          currentUser: null,
          loading: false,
          initialized: true
        });
        
        // Clear Redux state
        dispatch(clearUser());
      }
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]);
  
  /**
   * Sign in with email and password
   * @param email User email
   * @param password User password
   * @returns Promise resolving to UserCredential
   */
  const signIn = useCallback(async (
    email: string, 
    password: string
  ): Promise<UserCredential> => {
    setAuthState(prevState => ({ ...prevState, loading: true }));
    
    try {
      const userCredential = await authService.signIn(email, password);
      return userCredential;
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to sign in',
        type: 'error'
      });
      throw error;
    } finally {
      setAuthState(prevState => ({ ...prevState, loading: false }));
    }
  }, [showNotification]);
  
  /**
   * Sign up with email and password
   * @param email User email
   * @param password User password
   * @param userInfo Additional user information
   * @returns Promise resolving to UserCredential
   */
  const signUp = useCallback(async (
    email: string, 
    password: string, 
    userInfo: UserInfo
  ): Promise<UserCredential> => {
    setAuthState(prevState => ({ ...prevState, loading: true }));
    
    try {
      const userCredential = await authService.signUp(email, password, userInfo);
      
      showNotification({
        message: 'Account created successfully! Please check your email for verification.',
        type: 'success'
      });
      
      return userCredential;
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to create account',
        type: 'error'
      });
      throw error;
    } finally {
      setAuthState(prevState => ({ ...prevState, loading: false }));
    }
  }, [showNotification]);
  
  /**
   * Sign out the current user
   * @returns Promise resolving when sign out is complete
   */
  const signOut = useCallback(async (): Promise<void> => {
    setAuthState(prevState => ({ ...prevState, loading: true }));
    
    try {
      await authService.signOut();
      
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
    } finally {
      setAuthState(prevState => ({ ...prevState, loading: false }));
    }
  }, [showNotification]);
  
  /**
   * Send password reset email
   * @param email User email
   * @returns Promise resolving when email is sent
   */
  const resetPassword = useCallback(async (email: string): Promise<void> => {
    setAuthState(prevState => ({ ...prevState, loading: true }));
    
    try {
      await authService.resetPassword(email);
      
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
    } finally {
      setAuthState(prevState => ({ ...prevState, loading: false }));
    }
  }, [showNotification]);
  
  /**
   * Send email verification to current user
   * @returns Promise resolving when email is sent
   */
  const sendVerificationEmail = useCallback(async (): Promise<void> => {
    const currentFirebaseUser = authService.getCurrentUser();
    
    if (!currentFirebaseUser) {
      showNotification({
        message: 'No user is signed in',
        type: 'error'
      });
      return Promise.reject(new Error('No user is signed in'));
    }
    
    try {
      await authService.verifyEmail(currentFirebaseUser);
      
      showNotification({
        message: 'Verification email sent. Please check your inbox.',
        type: 'success'
      });
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to send verification email',
        type: 'error'
      });
      throw error;
    }
  }, [showNotification]);
  
  /**
   * Update user profile
   * @param userInfo User information to update
   * @returns Promise resolving when profile is updated
   */
  const updateProfile = useCallback(async (
    userInfo: Partial<UserInfo>
  ): Promise<void> => {
    const currentFirebaseUser = authService.getCurrentUser();
    
    if (!currentFirebaseUser) {
      showNotification({
        message: 'No user is signed in',
        type: 'error'
      });
      return Promise.reject(new Error('No user is signed in'));
    }
    
    setAuthState(prevState => ({ ...prevState, loading: true }));
    
    try {
      await authService.updateUserProfile(currentFirebaseUser, userInfo);
      
      // Get updated user data
      const userData = await authService.getUserData(currentFirebaseUser.uid);
      
      // Format user data
      const formattedUser = authService.formatUserData(currentFirebaseUser, userData);
      
      // Update auth state
      setAuthState({
        currentUser: formattedUser,
        loading: false,
        initialized: true
      });
      
      // Update Redux state
      dispatch(setUser(formattedUser));
      
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
    } finally {
      setAuthState(prevState => ({ ...prevState, loading: false }));
    }
  }, [dispatch, showNotification]);
  
  /**
   * Check if user is authenticated
   * @returns True if user is authenticated
   */
  const isAuthenticated = useCallback((): boolean => {
    return !!authState.currentUser;
  }, [authState.currentUser]);
  
  /**
   * Check if email is verified
   * @returns True if email is verified
   */
  const isVerified = useCallback((): boolean => {
    return authState.currentUser?.emailVerified || false;
  }, [authState.currentUser]);
  
  return {
    user: authState.currentUser,
    loading: authState.loading,
    initialized: authState.initialized,
    signIn,
    signUp,
    signOut,
    resetPassword,
    sendVerificationEmail,
    updateProfile,
    isAuthenticated,
    isVerified
  };
}
