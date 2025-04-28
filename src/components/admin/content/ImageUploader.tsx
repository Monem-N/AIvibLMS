import React from 'react';
import {
  Box,
  Button,
  CircularProgress
} from '@mui/material';

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  uploading,
  currentImage
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <label htmlFor="image-upload">
          <Button
            variant="outlined"
            component="span"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </label>
        {uploading && <CircularProgress size={24} sx={{ ml: 2 }} />}
      </Box>
      
      {currentImage && (
        <Box sx={{ mt: 1 }}>
          <Box
            component="img"
            src={currentImage}
            alt="Featured"
            sx={(theme) => ({
              maxWidth: '100%',
              maxHeight: theme.spacing(25), // 200px
              borderRadius: theme.shape.borderRadius
            })}
          />
        </Box>
      )}
    </>
  );
};

export default ImageUploader;
