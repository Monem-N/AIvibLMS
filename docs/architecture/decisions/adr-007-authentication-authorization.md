# ADR 007: Authentication and Authorization

## Status

Proposed

## Context

The modernization of the Hypatia LMS requires a robust authentication and authorization system to secure user access and protect sensitive data. The current implementation uses Firebase Authentication for user identity management but lacks comprehensive role-based access control and fine-grained permissions. We need to decide on an approach that provides secure, scalable, and flexible authentication and authorization while maintaining compatibility with the Firebase ecosystem.

Key considerations include:

- User authentication methods (email/password, social logins, SSO)
- Role-based access control (RBAC) implementation
- Permission management and inheritance
- Token-based authentication for API access
- Session management and security
- Integration with Firebase services
- Support for multi-tenancy (if required)
- Compliance with security best practices and regulations

## Decision

We will implement an enhanced authentication and authorization system based on Firebase Authentication with custom claims and Firestore-based role and permission management.

Specifically:

1. We will use Firebase Authentication as the primary identity provider
2. We will implement a custom role and permission system using Firestore
3. We will use Firebase Custom Claims for storing essential role information
4. We will create a service layer to abstract authentication and authorization logic
5. We will implement route-based and component-based access control in the frontend
6. We will use Firestore Security Rules for backend authorization

## Rationale

This approach was selected for the following reasons:

1. **Firebase Integration**: Firebase Authentication integrates seamlessly with other Firebase services we're using, providing a unified security model.

2. **Flexible Identity Providers**: Firebase Authentication supports multiple authentication methods (email/password, Google, Facebook, Twitter, etc.) and can be extended with custom authentication.

3. **Custom Claims for Performance**: Storing essential role information in Firebase Custom Claims allows for quick access control checks without additional database queries.

4. **Firestore for Extended Permissions**: Using Firestore for detailed role and permission management provides flexibility for complex permission structures while maintaining good performance.

5. **Scalability**: This approach scales well with user growth and can handle complex permission hierarchies.

6. **Security**: Firebase Authentication provides industry-standard security features like secure token management, password hashing, and account recovery.

7. **Developer Experience**: The Firebase SDK provides a good developer experience with well-documented APIs and client libraries.

Alternative approaches considered:

1. **Custom Authentication Server**: Building a custom authentication server would provide maximum flexibility but would require significant development effort and ongoing maintenance.

2. **Third-party Auth Provider (Auth0, Okta)**: These services offer comprehensive authentication and authorization features but would add complexity in integrating with Firebase services.

3. **Firebase Authentication Only**: Using Firebase Authentication without custom extensions would be simpler but would not provide the fine-grained permission control required for an LMS.

4. **JWT-based Custom Solution**: Implementing a custom JWT-based solution would provide flexibility but would require significant security expertise and maintenance.

## Consequences

### Positive

- Seamless integration with Firebase ecosystem
- Support for multiple authentication methods
- Flexible and extensible permission system
- Good performance for common authorization checks
- Reduced development effort compared to custom solutions
- Strong security with industry-standard practices

### Negative

- Some complexity in managing both Custom Claims and Firestore permissions
- Potential performance impact for complex permission checks
- Limited offline authorization capabilities
- Dependency on Firebase services and pricing
- Some advanced features may require custom implementation

## Implementation Strategy

1. **Authentication Configuration**:
   - Configure Firebase Authentication with required providers (email/password, Google, etc.)
   - Set up email templates for verification, password reset, etc.
   - Configure security settings (password strength, MFA requirements, etc.)

2. **Role and Permission Model**:
   - Design a hierarchical role model (Admin, Instructor, Student, etc.)
   - Define granular permissions for each resource type
   - Map roles to permissions with inheritance

3. **Custom Claims Implementation**:
   - Store essential role information in Firebase Custom Claims
   - Implement Cloud Functions to manage Custom Claims

4. **Firestore Permission Storage**:
   - Create Firestore collections for roles, permissions, and user-role assignments
   - Implement data validation and integrity checks

5. **Authentication Service Layer**:
   - Create a service to abstract Firebase Authentication operations
   - Implement user registration, login, logout, and profile management
   - Add password reset and email verification workflows

6. **Authorization Service Layer**:
   - Create a service to check user permissions
   - Implement caching for frequently checked permissions
   - Add helper methods for common authorization scenarios

7. **Frontend Access Control**:
   - Implement protected routes using React Router
   - Create higher-order components for component-level access control
   - Add UI elements that adapt to user permissions

8. **Backend Security Rules**:
   - Implement Firestore Security Rules based on roles and permissions
   - Test rules thoroughly with different user scenarios
   - Document rule patterns for future development

## Example Implementation

### Authentication Service

```typescript
// src/services/authService.ts
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export class AuthService {
  private auth = getAuth();
  private db = getFirestore();

  // Register a new user
  async registerUser(email: string, password: string, displayName: string): Promise<User> {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, { displayName });

      // Send verification email
      await sendEmailVerification(user);

      // Create user document in Firestore
      await setDoc(doc(this.db, 'users', user.uid), {
        email,
        displayName,
        role: 'student', // Default role
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  // Sign in user
  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  // Sign out user
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<any> {
    try {
      const userDoc = await getDoc(doc(this.db, 'users', userId));

      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        throw new Error('User profile not found');
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const authService = new AuthService();
```

### Authorization Service

```typescript
// src/services/authorizationService.ts
import { getAuth, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export class AuthorizationService {
  private auth = getAuth();
  private db = getFirestore();
  private permissionCache: Map<string, boolean> = new Map();

  // Check if user has a specific role
  async hasRole(user: User | null, role: string): Promise<boolean> {
    if (!user) return false;

    try {
      // First check custom claims (faster)
      const idTokenResult = await user.getIdTokenResult();
      const claims = idTokenResult.claims;

      if (claims.role === role) {
        return true;
      }

      // If not in claims, check Firestore
      const userDoc = await getDoc(doc(this.db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.role === role;
      }

      return false;
    } catch (error) {
      console.error('Error checking role:', error);
      return false;
    }
  }

  // Check if user has a specific permission
  async hasPermission(user: User | null, permission: string, resourceId?: string): Promise<boolean> {
    if (!user) return false;

    // Create cache key
    const cacheKey = `${user.uid}:${permission}:${resourceId || 'global'}`;

    // Check cache first
    if (this.permissionCache.has(cacheKey)) {
      return this.permissionCache.get(cacheKey) || false;
    }

    try {
      // First check if user is admin (has all permissions)
      const isAdmin = await this.hasRole(user, 'admin');

      if (isAdmin) {
        this.permissionCache.set(cacheKey, true);
        return true;
      }

      // Get user's role
      const userDoc = await getDoc(doc(this.db, 'users', user.uid));

      if (!userDoc.exists()) {
        this.permissionCache.set(cacheKey, false);
        return false;
      }

      const userData = userDoc.data();
      const userRole = userData.role;

      // Check role permissions
      const rolePermissionsQuery = query(
        collection(this.db, 'rolePermissions'),
        where('role', '==', userRole),
        where('permission', '==', permission)
      );

      const rolePermissionsSnapshot = await getDocs(rolePermissionsQuery);

      if (!rolePermissionsSnapshot.empty) {
        this.permissionCache.set(cacheKey, true);
        return true;
      }

      // Check resource-specific permissions if resourceId is provided
      if (resourceId) {
        const userPermissionsQuery = query(
          collection(this.db, 'userPermissions'),
          where('userId', '==', user.uid),
          where('resourceId', '==', resourceId),
          where('permission', '==', permission)
        );

        const userPermissionsSnapshot = await getDocs(userPermissionsQuery);

        if (!userPermissionsSnapshot.empty) {
          this.permissionCache.set(cacheKey, true);
          return true;
        }
      }

      // No permission found
      this.permissionCache.set(cacheKey, false);
      return false;
    } catch (error) {
      console.error('Error checking permission:', error);
      this.permissionCache.set(cacheKey, false);
      return false;
    }
  }

  // Clear permission cache for a user
  clearCache(userId?: string): void {
    if (userId) {
      // Clear cache for specific user
      for (const key of this.permissionCache.keys()) {
        if (key.startsWith(`${userId}:`)) {
          this.permissionCache.delete(key);
        }
      }
    } else {
      // Clear entire cache
      this.permissionCache.clear();
    }
  }
}

// Create a singleton instance
export const authorizationService = new AuthorizationService();
```

### Protected Route Component

```typescript
// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAuthorization } from '../../hooks/useAuthorization';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: string;
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredRole,
  redirectPath = '/login'
}) => {
  const location = useLocation();
  const { currentUser, isLoading } = useSelector((state: RootState) => state.auth);
  const { hasPermission, hasRole, isChecking } = useAuthorization();

  // Show loading spinner while checking authentication
  if (isLoading || isChecking) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check role if required
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children if all checks pass
  return <>{children}</>;
};
```

### Firestore Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() &&
        (request.auth.token.role == 'admin' ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    function hasRole(role) {
      return isAuthenticated() &&
        (request.auth.token.role == role ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role);
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function hasPermission(permission) {
      return isAdmin() ||
        exists(/databases/$(database)/documents/rolePermissions/$(request.auth.token.role + '_' + permission)) ||
        exists(/databases/$(database)/documents/userPermissions/$(request.auth.uid + '_' + permission));
    }

    // User rules
    match /users/{userId} {
      allow read: if isAuthenticated() && (isAdmin() || isOwner(userId));
      allow create: if isAdmin();
      allow update: if isAdmin() || isOwner(userId);
      allow delete: if isAdmin();
    }

    // Role rules
    match /roles/{roleId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // Permission rules
    match /permissions/{permissionId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // Role-Permission mapping rules
    match /rolePermissions/{mappingId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // User-Permission mapping rules
    match /userPermissions/{mappingId} {
      allow read: if isAuthenticated() && (isAdmin() || isOwner(mappingId.split('_')[0]));
      allow write: if isAdmin();
    }

    // Course rules
    match /courses/{courseId} {
      allow read: if isAuthenticated();
      allow create: if hasPermission('course.create');
      allow update: if hasPermission('course.update');
      allow delete: if hasPermission('course.delete');
    }

    // Subject rules
    match /subjects/{subjectId} {
      allow read: if isAuthenticated();
      allow create: if hasPermission('subject.create');
      allow update: if hasPermission('subject.update');
      allow delete: if hasPermission('subject.delete');
    }

    // Activity rules
    match /activities/{activityId} {
      allow read: if isAuthenticated();
      allow create: if hasPermission('activity.create');
      allow update: if hasPermission('activity.update');
      allow delete: if hasPermission('activity.delete');
    }

    // Submission rules
    match /submissions/{submissionId} {
      allow read: if isAuthenticated() && (isAdmin() ||
                                          isOwner(resource.data.userId) ||
                                          hasRole('instructor'));
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
      allow update: if isAuthenticated() && (isAdmin() ||
                                           hasRole('instructor') ||
                                           (isOwner(resource.data.userId) && resource.data.status != 'submitted'));
      allow delete: if isAdmin();
    }
  }
}
```

## Related Decisions

- ADR 001: Frontend Framework Selection
- ADR 005: API Layer Design
- ADR 006: Data Storage Strategy
- ADR 008: Deployment and DevOps (Upcoming)
