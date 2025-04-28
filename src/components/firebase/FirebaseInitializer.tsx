/**
 * FirebaseInitializer Component
 * 
 * This component initializes Firebase when the application starts.
 * It also connects to the Firebase emulators in development mode.
 */

import React, { useEffect, useState } from 'react';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import { connectDatabaseEmulator } from 'firebase/database';
import { connectFunctionsEmulator } from 'firebase/functions';
import { app, auth, db, storage, database, functions } from '../../services/firebaseService';

interface FirebaseInitializerProps {
  children: React.ReactNode;
}

const FirebaseInitializer: React.FC<FirebaseInitializerProps> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // Initialize Firebase
    console.log('Initializing Firebase...');
    
    // Connect to emulators in development mode
    if (import.meta.env.DEV) {
      try {
        console.log('Connecting to Firebase emulators...');
        
        // Connect to Auth emulator
        connectAuthEmulator(auth, 'http://localhost:9099');
        
        // Connect to Firestore emulator
        connectFirestoreEmulator(db, 'localhost', 8080);
        
        // Connect to Storage emulator
        connectStorageEmulator(storage, 'localhost', 9199);
        
        // Connect to Realtime Database emulator
        connectDatabaseEmulator(database, 'localhost', 9000);
        
        // Connect to Functions emulator
        connectFunctionsEmulator(functions, 'localhost', 5001);
        
        console.log('Connected to Firebase emulators');
      } catch (error) {
        console.error('Error connecting to Firebase emulators:', error);
      }
    }
    
    setInitialized(true);
  }, []);
  
  if (!initialized) {
    return <div>Initializing Firebase...</div>;
  }
  
  return <>{children}</>;
};

export default FirebaseInitializer;
