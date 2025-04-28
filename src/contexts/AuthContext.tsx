/**
 * AuthContext
 *
 * Context for authentication functionality.
 * Provides authentication state and methods to components.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useHybridAuth } from '../hooks/useHybridAuth';
import { User, UserInfo } from '../types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userInfo: UserInfo) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  updateProfile: (userInfo: Partial<UserInfo>) => Promise<void>;
  isAuthenticated: () => boolean;
  isVerified: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useHybridAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
