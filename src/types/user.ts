/**
 * User types for the Hypatia LMS
 */

/**
 * User
 */
export interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName?: string | null;
  photoURL?: string | null;
  info?: UserInfo;
  metadata?: UserMetadata;
}

/**
 * User info
 */
export interface UserInfo {
  firstName: string;
  lastName1: string;
  lastName2?: string;
  displayName: string;
  level: number;
  address?: string;
  city?: string;
  country?: string;
  postcode?: string;
  language?: string;
}

/**
 * User metadata
 */
export interface UserMetadata {
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  claimsUpdated?: boolean;
  claimsUpdatedAt?: string;
}

/**
 * User role
 */
export type UserRole = 'admin' | 'instructor' | 'assistant' | 'student' | 'guest';

/**
 * User permissions
 */
export interface UserPermissions {
  role: UserRole;
  level: number;
  permissions: string[];
}

/**
 * User profile
 */
export interface UserProfile {
  id: string;
  firstName: string;
  lastName1: string;
  lastName2?: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: string;
  updatedAt: string;
}
