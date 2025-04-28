/**
 * useSupabase Hook
 * 
 * Custom hook for Supabase operations.
 * Provides methods for authentication, database, and storage operations.
 */

import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseService';
import * as authService from '../services/authServiceSupabase';
import * as storageService from '../services/storageServiceSupabase';
import * as databaseService from '../services/databaseServiceSupabase';
import { setUser, clearUser } from '../actions/userActions';
import { useNotification } from './useNotification';

interface SupabaseState {
  session: Session | null;
  user: any | null;
  loading: boolean;
  initialized: boolean;
}

export function useSupabase() {
  const [state, setState] = useState<SupabaseState>({
    session: null,
    user: null,
    loading: true,
    initialized: false
  });
  
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  
  // Initialize auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(prevState => ({ ...prevState, loading: true }));
        
        if (session) {
          try {
            // Get user profile
            const profile = await authService.getUserProfile(session.user.id);
            
            // Format user data
            const userData = {
              id: session.user.id,
              email: session.user.email,
              emailVerified: session.user.email_confirmed_at !== null,
              firstName: profile.first_name,
              lastName: profile.last_name,
              displayName: profile.display_name,
              level: profile.level,
              role: getRoleFromLevel(profile.level),
              createdAt: profile.created_at,
              updatedAt: profile.updated_at
            };
            
            // Update state
            setState({
              session,
              user: userData,
              loading: false,
              initialized: true
            });
            
            // Update Redux state
            dispatch(setUser(userData));
          } catch (error) {
            console.error('Error getting user profile:', error);
            setState({
              session,
              user: null,
              loading: false,
              initialized: true
            });
          }
        } else {
          // No user is signed in
          setState({
            session: null,
            user: null,
            loading: false,
            initialized: true
          });
          
          // Clear Redux state
          dispatch(clearUser());
        }
      }
    );
    
    // Get initial session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        try {
          // Get user profile
          const profile = await authService.getUserProfile(session.user.id);
          
          // Format user data
          const userData = {
            id: session.user.id,
            email: session.user.email,
            emailVerified: session.user.email_confirmed_at !== null,
            firstName: profile.first_name,
            lastName: profile.last_name,
            displayName: profile.display_name,
            level: profile.level,
            role: getRoleFromLevel(profile.level),
            createdAt: profile.created_at,
            updatedAt: profile.updated_at
          };
          
          // Update state
          setState({
            session,
            user: userData,
            loading: false,
            initialized: true
          });
          
          // Update Redux state
          dispatch(setUser(userData));
        } catch (error) {
          console.error('Error getting user profile:', error);
          setState({
            session,
            user: null,
            loading: false,
            initialized: true
          });
        }
      } else {
        // No user is signed in
        setState({
          session: null,
          user: null,
          loading: false,
          initialized: true
        });
      }
    };
    
    initializeAuth();
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);
  
  /**
   * Get role from level
   * @param level User level
   * @returns User role
   */
  const getRoleFromLevel = (level: number): string => {
    switch (level) {
      case 5:
        return 'admin';
      case 4:
        return 'instructor';
      case 3:
        return 'assistant';
      case 2:
        return 'moderator';
      case 1:
      default:
        return 'student';
    }
  };
  
  /**
   * Sign in with email and password
   * @param email User email
   * @param password User password
   */
  const signIn = useCallback(async (email: string, password: string) => {
    setState(prevState => ({ ...prevState, loading: true }));
    
    try {
      await authService.signIn(email, password);
      
      showNotification({
        message: 'Signed in successfully',
        type: 'success'
      });
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to sign in',
        type: 'error'
      });
      throw error;
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  }, [showNotification]);
  
  /**
   * Sign up with email and password
   * @param email User email
   * @param password User password
   * @param userInfo User information
   */
  const signUp = useCallback(async (
    email: string,
    password: string,
    userInfo: any
  ) => {
    setState(prevState => ({ ...prevState, loading: true }));
    
    try {
      await authService.signUp(email, password, userInfo);
      
      showNotification({
        message: 'Account created successfully. Please check your email for verification.',
        type: 'success'
      });
    } catch (error: any) {
      showNotification({
        message: error.message || 'Failed to create account',
        type: 'error'
      });
      throw error;
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  }, [showNotification]);
  
  /**
   * Sign out
   */
  const signOut = useCallback(async () => {
    setState(prevState => ({ ...prevState, loading: true }));
    
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
      setState(prevState => ({ ...prevState, loading: false }));
    }
  }, [showNotification]);
  
  /**
   * Reset password
   * @param email User email
   */
  const resetPassword = useCallback(async (email: string) => {
    setState(prevState => ({ ...prevState, loading: true }));
    
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
      setState(prevState => ({ ...prevState, loading: false }));
    }
  }, [showNotification]);
  
  /**
   * Update user profile
   * @param userId User ID
   * @param userInfo User information
   */
  const updateUserProfile = useCallback(async (
    userId: string,
    userInfo: any
  ) => {
    setState(prevState => ({ ...prevState, loading: true }));
    
    try {
      await authService.updateUserProfile(userId, userInfo);
      
      // Get updated profile
      const profile = await authService.getUserProfile(userId);
      
      // Format user data
      const userData = {
        id: userId,
        email: state.user?.email,
        emailVerified: state.user?.emailVerified,
        firstName: profile.first_name,
        lastName: profile.last_name,
        displayName: profile.display_name,
        level: profile.level,
        role: getRoleFromLevel(profile.level),
        createdAt: profile.created_at,
        updatedAt: profile.updated_at
      };
      
      // Update state
      setState(prevState => ({
        ...prevState,
        user: userData,
        loading: false
      }));
      
      // Update Redux state
      dispatch(setUser(userData));
      
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
      setState(prevState => ({ ...prevState, loading: false }));
    }
  }, [state.user, dispatch, showNotification]);
  
  return {
    session: state.session,
    user: state.user,
    loading: state.loading,
    initialized: state.initialized,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUserProfile,
    
    // Export database and storage services
    db: databaseService,
    storage: storageService
  };
}
