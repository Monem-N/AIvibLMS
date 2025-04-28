/**
 * Mock File Service
 * 
 * This is a mock implementation of the file service for testing without authentication.
 * It simulates file operations without requiring a logged-in user.
 */

// Import the real Supabase storage service
import * as supabaseStorage from './supabaseStorageService';

// Mock user ID for testing
const MOCK_USER_ID = 'test-user-123';

// Get a mock user ID for testing
const getMockUserId = (): string => {
  return MOCK_USER_ID;
};

/**
 * Upload a profile image
 * @param file Image file to upload
 * @returns Promise resolving to the public URL
 */
export const uploadProfileImage = async (file: File): Promise<string> => {
  try {
    const userId = getMockUserId();
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;
    
    console.log('Mock uploadProfileImage:', { userId, fileName, filePath });
    
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
    const userId = getMockUserId();
    const actualFileName = fileName || file.name;
    const filePath = `${courseId}/${actualFileName}`;
    
    console.log('Mock uploadCourseMaterial:', { userId, courseId, fileName: actualFileName, filePath });
    
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
    const userId = getMockUserId();
    const fileExt = file.name.split('.').pop();
    const fileName = `${assignmentId}_${userId}_${Date.now()}.${fileExt}`;
    const filePath = `${assignmentId}/${fileName}`;
    
    console.log('Mock uploadSubmission:', { userId, assignmentId, fileName, filePath });
    
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
    console.log('Mock listCourseMaterials:', { courseId });
    
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
    console.log('Mock deleteFile:', { bucket, path });
    
    return await supabaseStorage.deleteFiles(bucket, [path]);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
