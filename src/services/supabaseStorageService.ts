/**
 * Supabase Storage Service
 *
 * This service provides methods for file storage operations using Supabase Storage.
 * It's designed to work alongside Firebase for authentication and database operations.
 *
 * This service includes methods for:
 * - Creating and managing storage buckets
 * - Uploading and downloading files
 * - Managing file permissions
 * - Getting public and signed URLs for files
 */

import supabase, { getSupabaseClient } from './supabaseClient';

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
 * @returns Public URL for the file
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

/**
 * Create a bucket in Supabase Storage
 * @param bucket Bucket name
 * @param isPublic Whether the bucket is public
 * @returns Promise resolving when the bucket is created
 */
export const createBucket = async (bucket: string, isPublic: boolean = false) => {
  console.log(`Creating bucket ${bucket} (public: ${isPublic})`);

  const { data, error } = await supabase.storage.createBucket(bucket, {
    public: isPublic,
    fileSizeLimit: 1024 * 1024 * 50, // 50MB
  });

  if (error) {
    console.error('Error creating bucket:', error);
    throw error;
  }

  return data;
};

/**
 * Get a bucket from Supabase Storage
 * @param bucket Bucket name
 * @returns Promise resolving to the bucket data
 */
export const getBucket = async (bucket: string) => {
  const { data, error } = await supabase.storage.getBucket(bucket);

  if (error && error.message !== 'The resource was not found') {
    console.error('Error getting bucket:', error);
    throw error;
  }

  return data;
};

/**
 * Check if all required buckets exist, create them if they don't
 */
export const ensureBucketsExist = async (): Promise<void> => {
  try {
    console.log('Checking if required buckets exist...');

    // Get list of existing buckets
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error('Error listing buckets:', error);
      throw error;
    }

    const existingBuckets = buckets?.map(bucket => bucket.name) || [];
    console.log('Existing buckets:', existingBuckets);

    // Create buckets if they don't exist
    const bucketsToCreate = [
      { name: BUCKETS.PROFILE_IMAGES, isPublic: true },
      { name: BUCKETS.COURSE_MATERIALS, isPublic: false },
      { name: BUCKETS.SUBMISSIONS, isPublic: false },
      { name: BUCKETS.RESOURCES, isPublic: true }
    ];

    for (const { name, isPublic } of bucketsToCreate) {
      if (!existingBuckets.includes(name)) {
        console.log(`Bucket ${name} does not exist, creating...`);
        await createBucket(name, isPublic);
        console.log(`Bucket ${name} created successfully`);
      } else {
        console.log(`Bucket ${name} already exists`);
      }
    }

    console.log('All required buckets exist');
  } catch (error) {
    console.error('Error ensuring buckets exist:', error);
    throw error;
  }
};

// Export the Supabase client from supabaseClient.ts
