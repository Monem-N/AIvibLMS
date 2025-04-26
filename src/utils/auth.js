/**
 * Utility functions for authentication and authorization
 */

/**
 * Check if the current user has the required permission
 * @param {Object} user - The current user object from Firebase Auth
 * @param {string} permission - The permission to check
 * @returns {boolean} - Whether the user has the permission
 */
export const hasPermission = (user, permission) => {
  if (!user) return false;
  
  // Get custom claims from the user token
  const customClaims = user.getIdTokenResult()?.claims;
  
  if (!customClaims) return false;
  
  // Admin role has all permissions
  if (customClaims.role === 'admin') return true;
  
  // Check if the user has the specific permission
  return customClaims.permissions?.includes(permission) || false;
};

/**
 * Check if the current user has the required role
 * @param {Object} user - The current user object from Firebase Auth
 * @param {string|string[]} roles - The role(s) to check
 * @returns {boolean} - Whether the user has one of the roles
 */
export const hasRole = (user, roles) => {
  if (!user) return false;
  
  // Get custom claims from the user token
  const customClaims = user.getIdTokenResult()?.claims;
  
  if (!customClaims) return false;
  
  // Convert single role to array
  const rolesToCheck = Array.isArray(roles) ? roles : [roles];
  
  // Check if the user has one of the roles
  return rolesToCheck.includes(customClaims.role);
};

/**
 * Check if the current user has the required level
 * @param {Object} user - The current user object from Firebase Auth
 * @param {number} level - The minimum level required
 * @returns {boolean} - Whether the user has the required level
 */
export const hasLevel = (user, level) => {
  if (!user) return false;
  
  // Get custom claims from the user token
  const customClaims = user.getIdTokenResult()?.claims;
  
  if (!customClaims) return false;
  
  // Check if the user has the required level
  return (customClaims.level || 0) >= level;
};

/**
 * Check if the current user is the owner of the resource
 * @param {Object} user - The current user object from Firebase Auth
 * @param {string} resourceUserId - The user ID of the resource owner
 * @returns {boolean} - Whether the user is the owner
 */
export const isOwner = (user, resourceUserId) => {
  if (!user || !resourceUserId) return false;
  
  return user.uid === resourceUserId;
};

/**
 * Check if the current user can access a resource
 * @param {Object} user - The current user object from Firebase Auth
 * @param {string} resourceUserId - The user ID of the resource owner
 * @param {string} permission - The permission required to access the resource
 * @returns {boolean} - Whether the user can access the resource
 */
export const canAccess = (user, resourceUserId, permission) => {
  if (!user) return false;
  
  // User is the owner of the resource
  if (isOwner(user, resourceUserId)) return true;
  
  // User has the required permission
  return hasPermission(user, permission);
};
