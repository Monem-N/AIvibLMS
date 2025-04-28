/**
 * Authentication Service using Supabase
 * 
 * This service provides methods for user authentication using Supabase Auth.
 * It includes methods for sign in, sign up, sign out, password reset, and email verification.
 */

import { supabase } from './supabaseService';
import { UserInfo } from '../types/user';

/**
 * Sign in with email and password
 * @param email User email
 * @param password User password
 * @returns Promise resolving to the session
 */
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

/**
 * Sign up with email and password
 * @param email User email
 * @param password User password
 * @param userInfo Additional user information
 * @returns Promise resolving to the session
 */
export const signUp = async (
  email: string, 
  password: string, 
  userInfo: UserInfo
) => {
  // Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: userInfo.firstName,
        last_name: userInfo.lastName1,
        display_name: userInfo.displayName,
        level: userInfo.level || 1 // Default to student level
      }
    }
  });
  
  if (authError) {
    throw authError;
  }
  
  // Create user profile in the profiles table
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: email,
        first_name: userInfo.firstName,
        last_name: userInfo.lastName1,
        display_name: userInfo.displayName,
        level: userInfo.level || 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (profileError) {
      console.error('Error creating user profile:', profileError);
      // Consider whether to throw here or just log the error
    }
  }
  
  return authData;
};

/**
 * Sign out the current user
 * @returns Promise resolving when sign out is complete
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
};

/**
 * Send password reset email
 * @param email User email
 * @returns Promise resolving when email is sent
 */
export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
  
  if (error) {
    throw error;
  }
};

/**
 * Update user profile
 * @param userId User ID
 * @param userInfo User information to update
 * @returns Promise resolving when profile is updated
 */
export const updateUserProfile = async (
  userId: string, 
  userInfo: Partial<UserInfo>
) => {
  // Update user metadata
  if (Object.keys(userInfo).length > 0) {
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        first_name: userInfo.firstName,
        last_name: userInfo.lastName1,
        display_name: userInfo.displayName,
        level: userInfo.level
      }
    });
    
    if (authError) {
      throw authError;
    }
  }
  
  // Update profile in the profiles table
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      first_name: userInfo.firstName,
      last_name: userInfo.lastName1,
      display_name: userInfo.displayName,
      level: userInfo.level,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);
  
  if (profileError) {
    throw profileError;
  }
};

/**
 * Get user profile
 * @param userId User ID
 * @returns Promise resolving to user profile
 */
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

/**
 * Subscribe to auth state changes
 * @param callback Callback function to handle auth state changes
 * @returns Unsubscribe function
 */
export const subscribeToAuthChanges = (callback: (session: any) => void) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session);
  });
  
  return () => {
    data.subscription.unsubscribe();
  };
};
