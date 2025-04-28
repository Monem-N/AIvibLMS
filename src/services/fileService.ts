/**
 * File Service
 *
 * This service provides methods for file operations using Supabase Storage,
 * while integrating with Firebase for authentication and user management.
 */

// Import the hybrid service to ensure Firebase is initialized
import { firebase } from './hybridService';
// Import the real Supabase storage service
import * as supabaseStorage from './supabaseStorageService';

// Get the current user ID from Firebase
const getCurrentUserId = (): string => {
  // Use the auth instance from the hybridService
  const { auth } = firebase;
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  return user.uid;
};

/**
 * Upload a profile image
 * @param file Image file to upload
 * @returns Promise resolving to the public URL
 */
export const uploadProfileImage = async (file: File): Promise<string> => {
  try {
    const userId = getCurrentUserId();
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase
    await supabaseStorage.uploadFile(
      supabaseStorage.BUCKETS.PROFILE_IMAGES,
      filePath,
      file,
      { userId }
    );

    // Get the public URL
    const publicUrl = supabaseStorage.getPublicUrl(
      supabaseStorage.BUCKETS.PROFILE_IMAGES,
      filePath
    );

    return publicUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

/**
 * Upload a course material
 * @param courseId Course ID
 * @param file File to upload
 * @param fileName Optional custom file name
 * @returns Promise resolving to the public URL
 */
export const uploadCourseMaterial = async (
  courseId: string,
  file: File,
  fileName?: string
): Promise<string> => {
  try {
    const userId = getCurrentUserId();
    const actualFileName = fileName || file.name;
    const filePath = `${courseId}/${actualFileName}`;

    // Upload to Supabase
    await supabaseStorage.uploadFile(
      supabaseStorage.BUCKETS.COURSE_MATERIALS,
      filePath,
      file,
      { userId, courseId }
    );

    // Get the public URL
    const publicUrl = supabaseStorage.getPublicUrl(
      supabaseStorage.BUCKETS.COURSE_MATERIALS,
      filePath
    );

    return publicUrl;
  } catch (error) {
    console.error('Error uploading course material:', error);
    throw error;
  }
};

/**
 * Upload an assignment submission
 * @param assignmentId Assignment ID
 * @param file File to upload
 * @returns Promise resolving to the public URL
 */
export const uploadSubmission = async (
  assignmentId: string,
  file: File
): Promise<string> => {
  try {
    const userId = getCurrentUserId();
    const fileExt = file.name.split('.').pop();
    const fileName = `${assignmentId}_${userId}_${Date.now()}.${fileExt}`;
    const filePath = `${assignmentId}/${fileName}`;

    // Upload to Supabase
    await supabaseStorage.uploadFile(
      supabaseStorage.BUCKETS.SUBMISSIONS,
      filePath,
      file,
      { userId, assignmentId, submitted: false }
    );

    // Get the public URL
    const publicUrl = supabaseStorage.getPublicUrl(
      supabaseStorage.BUCKETS.SUBMISSIONS,
      filePath
    );

    return publicUrl;
  } catch (error) {
    console.error('Error uploading submission:', error);
    throw error;
  }
};

/**
 * List course materials
 * @param courseId Course ID
 * @returns Promise resolving to the list of files
 */
export const listCourseMaterials = async (courseId: string) => {
  try {
    return await supabaseStorage.listFiles(
      supabaseStorage.BUCKETS.COURSE_MATERIALS,
      courseId
    );
  } catch (error) {
    console.error('Error listing course materials:', error);
    throw error;
  }
};

/**
 * Delete a file
 * @param bucket Bucket name
 * @param path File path
 * @returns Promise resolving when the file is deleted
 */
export const deleteFile = async (bucket: string, path: string) => {
  try {
    return await supabaseStorage.deleteFiles(bucket, [path]);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
