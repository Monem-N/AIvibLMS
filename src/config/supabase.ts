/**
 * Supabase Configuration
 * 
 * This file contains the Supabase configuration for the AIvibLMS application.
 * The configuration values are loaded from environment variables.
 */

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};
