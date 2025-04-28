/**
 * Set User Claims Cloud Function
 * 
 * This function sets custom claims on user creation/update.
 * It is triggered when a user's info is created or updated in the database.
 * It sets custom claims based on the user's level, which is used for RBAC.
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.setUserClaims = functions.firestore
  .document('users/{userId}')
  .onWrite(async (change, context) => {
    const userData = change.after.exists ? change.after.data() : null;
    const uid = context.params.userId;
    
    if (!userData) {
      console.log(`No user data found for user ${uid}`);
      return null;
    }
    
    if (userData && userData.level) {
      let role = 'student';
      let permissions = ['read:own'];
      
      // Set role and permissions based on user level
      if (userData.level >= 5) {
        role = 'admin';
        permissions = [
          'read:all', 
          'write:all', 
          'manage:users',
          'manage:courses',
          'manage:content',
          'manage:system'
        ];
      } else if (userData.level >= 4) {
        role = 'instructor';
        permissions = [
          'read:all', 
          'write:courses', 
          'manage:content',
          'grade:assignments',
          'create:courses'
        ];
      } else if (userData.level >= 3) {
        role = 'assistant';
        permissions = [
          'read:all', 
          'write:content',
          'grade:assignments'
        ];
      } else if (userData.level >= 2) {
        role = 'moderator';
        permissions = [
          'read:all',
          'moderate:content'
        ];
      }
      
      console.log(`Setting custom claims for user ${uid}: role=${role}, level=${userData.level}`);
      
      try {
        // Set custom claims
        await admin.auth().setCustomUserClaims(uid, {
          role,
          level: userData.level,
          permissions
        });
        
        // Update user metadata to indicate claims have been set
        await change.after.ref.update({
          metadata: {
            claimsUpdated: true,
            claimsUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
          }
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
