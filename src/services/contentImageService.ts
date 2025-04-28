import { uploadContentImage } from './contentService';

/**
 * Service for handling content image uploads
 */
export const contentImageService = {
  /**
   * Upload an image for content
   * @param file The file to upload
   * @param contentType The type of content (page or announcement)
   * @param contentId The ID of the content (if editing)
   * @param onSuccess Callback for successful upload
   * @param onError Callback for upload error
   * @param onStart Callback for upload start
   * @param onComplete Callback for upload completion (success or error)
   */
  uploadImage: async (
    file: File,
    contentType: 'page' | 'announcement',
    contentId: string | undefined,
    onSuccess: (imageUrl: string) => void,
    onError: (error: Error) => void,
    onStart?: () => void,
    onComplete?: () => void
  ) => {
    if (!file) return;
    
    try {
      if (onStart) onStart();
      
      const imageUrl = await uploadContentImage(
        file,
        contentType,
        contentId
      );
      
      onSuccess(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      onError(error instanceof Error ? error : new Error('Unknown error during image upload'));
    } finally {
      if (onComplete) onComplete();
    }
  }
};
