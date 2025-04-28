/**
 * Supabase Client Singleton
 * 
 * This file exports a singleton instance of the Supabase client.
 * Use this instance throughout the application to avoid creating multiple clients.
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials
const hasValidCredentials = 
  supabaseUrl && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey && 
  supabaseAnonKey !== 'your-supabase-anon-key';

// Create a single instance of the Supabase client
const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Export the singleton instance
export default supabase;

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => !!supabase;

// Helper function to get the Supabase client (with error handling)
export const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error('Supabase client is not available. Check your environment variables.');
  }
  return supabase;
};
