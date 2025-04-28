# hybridService

## Description

The `hybridService` is a core service that initializes and exports both Firebase and Supabase services for use throughout the AIvibLMS application. It implements the hybrid approach where Firebase is used for authentication and database operations, while Supabase is used for file storage.

## Usage

```tsx
import { firebase, supabase } from 'services/hybridService';

// Use Firebase services
const { auth, firestore, functions, database } = firebase;

// Use Supabase services
const { storage } = supabase;
```

## API

### Firebase Services

| Service | Description |
|---------|-------------|
| firebase.app | The initialized Firebase app instance |
| firebase.auth | Firebase Authentication service |
| firebase.firestore | Firestore database service |
| firebase.functions | Firebase Cloud Functions service |
| firebase.database | Firebase Realtime Database service |

### Supabase Services

| Service | Description |
|---------|-------------|
| supabase | The initialized Supabase client |

## Examples

### Using Firebase Authentication

```tsx
import { firebase } from 'services/hybridService';

const { auth } = firebase;

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};
```

### Using Firestore Database

```tsx
import { firebase } from 'services/hybridService';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const { firestore } = firebase;

const createCourse = async (courseData) => {
  try {
    const docRef = await addDoc(collection(firestore, 'courses'), {
      ...courseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};
```

### Using Supabase Storage

```tsx
import { supabase } from 'services/hybridService';

const uploadFile = async (bucket, path, file) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true,
        contentType: file.type
      });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
```

## Implementation Details

The `hybridService` initializes both Firebase and Supabase services using configuration values from environment variables:

```tsx
// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);
const database = getDatabase(firebaseApp);

// Initialize Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export Firebase services
export const firebase = {
  app: firebaseApp,
  auth,
  firestore,
  functions,
  database
};

// Export Supabase client
export { supabase };
```

## Edge Cases

- **Missing Environment Variables**: The service will throw an error if required environment variables are missing.
- **Initialization Errors**: The service handles initialization errors gracefully and provides meaningful error messages.
- **Multiple Initializations**: The service is designed to be imported and used throughout the application without causing multiple initializations.

## Related Services

- [fileService](./fileService.md): Service that uses Supabase Storage for file operations
- [authService](./authService.md): Service that uses Firebase Authentication for user management
- [databaseService](./databaseService.md): Service that uses Firestore for database operations

## Related Components

- [HybridInitializer](../components/core/HybridInitializer.md): Component that initializes both Firebase and Supabase services
- [FileUpload](../components/ui/FileUpload.md): Component that uses Supabase Storage for file uploads
- [FileDisplay](../components/ui/FileDisplay.md): Component that uses Supabase Storage for file display
