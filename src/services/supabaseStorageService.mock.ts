/**
 * Mock Supabase Storage Service
 * 
 * This is a mock implementation of the Supabase Storage service for development and testing.
 * It simulates file storage operations without actually connecting to Supabase.
 */

// Define bucket names
export const BUCKETS = {
  PROFILE_IMAGES: 'profile-images',
  COURSE_MATERIALS: 'course-materials',
  SUBMISSIONS: 'submissions',
  RESOURCES: 'resources'
};

// In-memory storage for mock files
const mockStorage: Record<string, Map<string, any>> = {
  [BUCKETS.PROFILE_IMAGES]: new Map(),
  [BUCKETS.COURSE_MATERIALS]: new Map(),
  [BUCKETS.SUBMISSIONS]: new Map(),
  [BUCKETS.RESOURCES]: new Map()
};

/**
 * Upload a file to a bucket
 * @param bucket Bucket name
 * @param path File path
 * @param file File to upload
 * @param metadata Optional metadata
 * @returns Promise resolving to the file data
 */
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File,
  metadata?: Record<string, any>
): Promise<any> => {
  console.log(`[MOCK] Uploading file to ${bucket}/${path}`, { metadata });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Store file in mock storage
  if (!mockStorage[bucket]) {
    mockStorage[bucket] = new Map();
  }
  
  const fileData = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    path,
    metadata,
    url: `https://mock-supabase-storage.com/${bucket}/${path}`
  };
  
  mockStorage[bucket].set(path, fileData);
  
  return fileData;
};

/**
 * Get a public URL for a file
 * @param bucket Bucket name
 * @param path File path
 * @returns Public URL
 */
export const getPublicUrl = (bucket: string, path: string): string => {
  console.log(`[MOCK] Getting public URL for ${bucket}/${path}`);
  return `https://mock-supabase-storage.com/${bucket}/${path}`;
};

/**
 * List files in a bucket
 * @param bucket Bucket name
 * @param path Optional path prefix
 * @returns Promise resolving to the list of files
 */
export const listFiles = async (bucket: string, path?: string): Promise<any[]> => {
  console.log(`[MOCK] Listing files in ${bucket}${path ? `/${path}` : ''}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!mockStorage[bucket]) {
    return [];
  }
  
  const files = Array.from(mockStorage[bucket].values());
  
  if (path) {
    return files.filter(file => file.path.startsWith(path));
  }
  
  return files;
};

/**
 * Delete files from a bucket
 * @param bucket Bucket name
 * @param paths File paths to delete
 * @returns Promise resolving when files are deleted
 */
export const deleteFiles = async (bucket: string, paths: string[]): Promise<void> => {
  console.log(`[MOCK] Deleting files from ${bucket}`, paths);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!mockStorage[bucket]) {
    return;
  }
  
  for (const path of paths) {
    mockStorage[bucket].delete(path);
  }
};

/**
 * Create a bucket
 * @param bucket Bucket name
 * @returns Promise resolving when bucket is created
 */
export const createBucket = async (bucket: string): Promise<void> => {
  console.log(`[MOCK] Creating bucket ${bucket}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!mockStorage[bucket]) {
    mockStorage[bucket] = new Map();
  }
};

/**
 * Get a bucket
 * @param bucket Bucket name
 * @returns Promise resolving to the bucket data
 */
export const getBucket = async (bucket: string): Promise<any> => {
  console.log(`[MOCK] Getting bucket ${bucket}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!mockStorage[bucket]) {
    throw new Error(`Bucket ${bucket} not found`);
  }
  
  return {
    name: bucket,
    id: bucket,
    public: bucket === BUCKETS.PROFILE_IMAGES || bucket === BUCKETS.RESOURCES
  };
};

// Export a mock object for testing
export default {
  BUCKETS,
  uploadFile,
  getPublicUrl,
  listFiles,
  deleteFiles,
  createBucket,
  getBucket
};
