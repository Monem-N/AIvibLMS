const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * Cloud Function that sets custom claims on user creation/update
 * This function is triggered when a user's info is created or updated in the database
 * It sets custom claims based on the user's level, which is used for RBAC
 */
exports.setUserClaims = functions.database
  .ref('/users/{userId}/info')
  .onWrite(async (change, context) => {
    const userInfo = change.after.val();
    const uid = context.params.userId;
    
    if (!userInfo) {
      console.log(`No user info found for user ${uid}`);
      return null;
    }
    
    if (userInfo && userInfo.level) {
      let role = 'student';
      let permissions = ['read:own'];
      
      // Set role and permissions based on user level
      if (userInfo.level >= 5) {
        role = 'admin';
        permissions = [
          'read:all', 
          'write:all', 
          'manage:users',
          'manage:courses',
          'manage:content',
          'manage:system'
        ];
      } else if (userInfo.level >= 4) {
        role = 'instructor';
        permissions = [
          'read:all', 
          'write:courses', 
          'manage:content',
          'grade:assignments',
          'create:courses'
        ];
      } else if (userInfo.level >= 3) {
        role = 'assistant';
        permissions = [
          'read:all', 
          'write:content',
          'grade:assignments'
        ];
      } else if (userInfo.level >= 2) {
        role = 'moderator';
        permissions = [
          'read:all',
          'moderate:content'
        ];
      }
      
      console.log(`Setting custom claims for user ${uid}: role=${role}, level=${userInfo.level}`);
      
      try {
        // Set custom claims
        await admin.auth().setCustomUserClaims(uid, {
          role,
          level: userInfo.level,
          permissions
        });
        
        // Update user metadata to indicate claims have been set
        const userRef = admin.database().ref(`/users/${uid}/metadata`);
        await userRef.update({
          claimsUpdated: true,
          claimsUpdatedAt: admin.database.ServerValue.TIMESTAMP
        });
        
        console.log(`Successfully set custom claims for user ${uid}`);
        return null;
      } catch (error) {
        console.error(`Error setting custom claims for user ${uid}:`, error);
        return null;
      }
    }
    
    console.log(`No level found for user ${uid}`);
    return null;
  });
