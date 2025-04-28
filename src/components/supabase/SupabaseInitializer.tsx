/**
 * SupabaseInitializer Component
 * 
 * This component initializes Supabase when the application starts.
 */

import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseService';

interface SupabaseInitializerProps {
  children: React.ReactNode;
}

const SupabaseInitializer: React.FC<SupabaseInitializerProps> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // Initialize Supabase
    console.log('Initializing Supabase...');
    
    // Check if Supabase is connected
    const checkConnection = async () => {
      try {
        // Simple query to check connection
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        
        if (error) {
          console.error('Error connecting to Supabase:', error);
        } else {
          console.log('Connected to Supabase successfully');
        }
        
        setInitialized(true);
      } catch (error) {
        console.error('Error initializing Supabase:', error);
        setInitialized(true); // Still set to initialized to avoid blocking the app
      }
    };
    
    checkConnection();
  }, []);
  
  if (!initialized) {
    return <div>Initializing Supabase...</div>;
  }
  
  return <>{children}</>;
};

export default SupabaseInitializer;
