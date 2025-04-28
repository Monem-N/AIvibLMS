/**
 * Storage Service using Supabase
 * 
 * This service provides methods for file storage operations using Supabase Storage.
 * It includes methods for uploading, downloading, and deleting files.
 */

import { supabase } from './supabaseService';

// Define bucket names
export const BUCKETS = {
  COURSE_MATERIALS: 'course-materials',
  PROFILE_IMAGES: 'profile-images',
  SUBMISSIONS: 'submissions',
  RESOURCES: 'resources'
};

/**
 * Upload a file to Supabase Storage
 * @param bucket Bucket name
 * @param path File path within the bucket
 * @param file File to upload
 * @param metadata Optional metadata
 * @returns Promise resolving to the file data
 */
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File,
  metadata?: Record<string, any>
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
      ...(metadata && { metadata })
    });
  
  if (error) {
    throw error;
  }
  
  return data;
};

/**
 * Get a public URL for a file
 * @param bucket Bucket name
 * @param path File path within the bucket
 * @returns Promise resolving to the public URL
 */
export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
};

/**
 * Download a file from Supabase Storage
 * @param bucket Bucket name
 * @param path File path within the bucket
 * @returns Promise resolving to the file data
 */
export const downloadFile = async (bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(path);
  
  if (error) {
    throw error;
  }
  
  return data;
};

/**
 * List files in a bucket
 * @param bucket Bucket name
 * @param path Optional path within the bucket
 * @returns Promise resolving to the list of files
 */
export const listFiles = async (bucket: string, path?: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path || '');
  
  if (error) {
    throw error;
  }
  
  return data;
};

/**
 * Delete a file from Supabase Storage
 * @param bucket Bucket name
 * @param paths File paths within the bucket
 * @returns Promise resolving when the files are deleted
 */
export const deleteFiles = async (bucket: string, paths: string[]) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove(paths);
  
  if (error) {
    throw error;
  }
  
  return data;
};

/**
 * Create a signed URL for a file (for temporary access)
 * @param bucket Bucket name
 * @param path File path within the bucket
 * @param expiresIn Expiration time in seconds (default: 60 minutes)
 * @returns Promise resolving to the signed URL
 */
export const createSignedUrl = async (
  bucket: string,
  path: string,
  expiresIn: number = 3600
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);
  
  if (error) {
    throw error;
  }
  
  return data;
};
