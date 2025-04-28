/**
 * HybridInitializer Component
 *
 * This component initializes both Firebase and Supabase services.
 * It implements the hybrid approach where Firebase is used for authentication and database,
 * while Supabase is used for file storage.
 */

import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import supabase, { isSupabaseAvailable } from '../../services/supabaseClient';
import * as supabaseStorage from '../../services/supabaseStorageService';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

// Supabase client is imported from supabaseClient.ts

interface HybridInitializerProps {
  children: React.ReactNode;
}

const HybridInitializer: React.FC<HybridInitializerProps> = ({ children }) => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [supabaseInitialized, setSupabaseInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Firebase
    try {
      console.log('Initializing Firebase...');
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app);
      const functions = getFunctions(app);
      const database = getDatabase(app);

      // Connect to emulators in development mode
      if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true') {
        try {
          console.log('Connecting to Firebase emulators...');

          // Connect to emulators without checking if they're running
          // This will fail gracefully if the emulators aren't running
          connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
          connectFirestoreEmulator(db, 'localhost', 8080);
          connectFunctionsEmulator(functions, 'localhost', 5001);
          connectDatabaseEmulator(database, 'localhost', 9000);

          console.log('Connected to Firebase emulators');
        } catch (error) {
          console.error('Error connecting to Firebase emulators:', error);
          console.warn('Using production Firebase services');
        }
      } else if (import.meta.env.DEV) {
        console.log('Emulators disabled. Using production Firebase services.');
      }

      // Export Firebase services to window for debugging in development
      if (import.meta.env.DEV) {
        (window as any).firebase = {
          app,
          auth,
          db,
          functions,
          database
        };
      }

      setFirebaseInitialized(true);
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      setError('Failed to initialize Firebase. Please check your configuration.');
    }

    // Initialize Supabase or use mock
    try {
      console.log('Initializing Supabase...');

      if (!isSupabaseAvailable()) {
        console.warn('Using mock Supabase storage service because credentials are missing or invalid');
        console.log('To use the real Supabase service, update the .env.local file with your Supabase credentials');

        // Set as initialized since we'll use the mock service
        setSupabaseInitialized(true);
      } else {
        // Check if Supabase is connected and create buckets if needed
        const initializeSupabase = async () => {
          try {
            // Check connection
            console.log('Checking Supabase connection...');
            const { error } = await supabase!.storage.listBuckets();

            if (error) {
              console.error('Error connecting to Supabase:', error);
              console.warn('Using mock Supabase storage service due to connection error');
              setSupabaseInitialized(true);
              return;
            }

            console.log('Connected to Supabase successfully');

            // Export Supabase to window for debugging in development
            if (import.meta.env.DEV) {
              (window as any).supabase = supabase;
            }

            // Create required buckets if they don't exist
            try {
              console.log('Ensuring required buckets exist...');
              await supabaseStorage.ensureBucketsExist();
              console.log('All required buckets are ready');
            } catch (bucketError) {
              console.error('Error creating buckets:', bucketError);
              console.warn('Some buckets may not be available');
            }

            setSupabaseInitialized(true);
          } catch (error) {
            console.error('Error initializing Supabase:', error);
            console.warn('Using mock Supabase storage service due to initialization error');
            setSupabaseInitialized(true);
          }
        };

        initializeSupabase();
      }
    } catch (error) {
      console.error('Error initializing Supabase:', error);
      console.warn('Using mock Supabase storage service due to error');
      setSupabaseInitialized(true);
    }
  }, []);

  // Show loading state while initializing
  if (!firebaseInitialized || !supabaseInitialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Initializing services...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {firebaseInitialized ? '✓' : '⋯'} Firebase
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {supabaseInitialized ? '✓' : '⋯'} Supabase
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    );
  }

  // Render children once both services are initialized
  return <>{children}</>;
};

export default HybridInitializer;
