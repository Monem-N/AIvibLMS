/**
 * Supabase Service
 * 
 * This file initializes Supabase and exports the client
 * used throughout the application.
 */

import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabase';

// Initialize Supabase
const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

export { supabase };
