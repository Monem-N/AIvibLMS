import { useState, useEffect, useContext, createContext } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';

// Create a context for authentication
const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication context
 * @param {Object} props - Component props
 * @returns {React.ReactNode} - The provider component
 */
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the authentication context
 * @returns {Object} - Authentication context
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Custom hook to provide authentication functionality
 * @returns {Object} - Authentication methods and state
 */
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const auth = getAuth();

  // Handle user sign in
  const signIn = async (email, password) => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Handle user sign up
  const signUp = async (email, password) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Handle user sign out
  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Handle password reset
  const resetPassword = async (email) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
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
        
        setUser(userWithClaims);
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
