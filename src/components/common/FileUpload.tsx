/**
 * FileUpload Component
 * 
 * A reusable component for file uploads using Supabase Storage.
 * This component works with the hybrid Firebase/Supabase approach.
 */

import React, { useState, useRef } from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as fileService from '../../services/fileService';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  uploadType: 'profile' | 'course' | 'submission';
  courseId?: string;
  assignmentId?: string;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  buttonText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  uploadType,
  courseId,
  assignmentId,
  acceptedFileTypes = '*',
  maxSizeMB = 10,
  buttonText = 'Upload File'
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds the maximum allowed size (${maxSizeMB}MB)`);
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      // Simulate progress (since Supabase doesn't provide upload progress)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);
      
      let url = '';
      
      // Upload based on type
      switch (uploadType) {
        case 'profile':
          url = await fileService.uploadProfileImage(file);
          break;
        case 'course':
          if (!courseId) throw new Error('Course ID is required for course uploads');
          url = await fileService.uploadCourseMaterial(courseId, file);
          break;
        case 'submission':
          if (!assignmentId) throw new Error('Assignment ID is required for submission uploads');
          url = await fileService.uploadSubmission(assignmentId, file);
          break;
      }
      
      clearInterval(progressInterval);
      setProgress(100);
      onUploadComplete(url);
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Box sx={{ my: 2 }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        style={{ display: 'none' }}
      />
      
      <Button
        variant="contained"
        startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
        onClick={handleButtonClick}
        disabled={uploading}
        fullWidth
      >
        {uploading ? `Uploading... ${progress}%` : buttonText}
      </Button>
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
