import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';

// Define the auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that provides authentication context
 * @param {Object} props - Component props
 * @returns {React.ReactNode} - The provider component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the authentication context
 * @returns {Object} - Authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Custom hook to provide authentication functionality
 * @returns {Object} - Authentication methods and state
 */
function useProvideAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const auth = getAuth();

  // Handle user sign in
  const signIn = async (email: string, password: string): Promise<User> => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Handle user sign up
  const signUp = async (email: string, password: string): Promise<User> => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Handle user sign out
  const logout = async (): Promise<void> => {
    setError(null);
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Handle password reset
  const resetPassword = async (email: string): Promise<void> => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Subscribe to user on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get the ID token with custom claims
        const idTokenResult = await user.getIdTokenResult();
        
        // Add custom claims to the user object
        const userWithClaims = {
          ...user,
          claims: idTokenResult.claims
        };
        
        setUser(userWithClaims as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Return the user object and auth methods
  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    logout,
    resetPassword
  };
}
