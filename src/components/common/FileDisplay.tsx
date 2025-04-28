/**
 * FileDisplay Component
 * 
 * A component for displaying files from Supabase Storage.
 * Supports different file types including images, audio, video, and documents.
 */

import React from 'react';
import { Box, Typography, Link, Paper } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface FileDisplayProps {
  url: string;
  fileName?: string;
  fileType?: string;
  showPreview?: boolean;
  width?: string | number;
  height?: string | number;
}

const FileDisplay: React.FC<FileDisplayProps> = ({
  url,
  fileName,
  fileType,
  showPreview = true,
  width = '100%',
  height = 'auto'
}) => {
  // Determine file type if not provided
  const getFileType = (): string => {
    if (fileType) return fileType;
    
    const extension = url.split('.').pop()?.toLowerCase() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return 'image';
    } else if (['mp3', 'wav', 'ogg', 'aac'].includes(extension)) {
      return 'audio';
    } else if (['mp4', 'webm', 'ogv', 'mov'].includes(extension)) {
      return 'video';
    } else if (extension === 'pdf') {
      return 'pdf';
    } else {
      return 'other';
    }
  };
  
  const type = getFileType();
  const displayName = fileName || url.split('/').pop() || 'File';
  
  const renderFilePreview = () => {
    if (!showPreview) {
      return null;
    }
    
    switch (type) {
      case 'image':
        return (
          <Box sx={{ mb: 1, textAlign: 'center' }}>
            <img 
              src={url} 
              alt={displayName} 
              style={{ 
                maxWidth: width, 
                maxHeight: typeof height === 'number' ? `${height}px` : height,
                objectFit: 'contain' 
              }} 
            />
          </Box>
        );
      
      case 'audio':
        return (
          <Box sx={{ mb: 1 }}>
            <audio controls style={{ width: '100%' }}>
              <source src={url} />
              Your browser does not support the audio element.
            </audio>
          </Box>
        );
      
      case 'video':
        return (
          <Box sx={{ mb: 1 }}>
            <video 
              controls 
              style={{ 
                maxWidth: width, 
                maxHeight: typeof height === 'number' ? `${height}px` : height 
              }}
            >
              <source src={url} />
              Your browser does not support the video element.
            </video>
          </Box>
        );
      
      case 'pdf':
        return (
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
            <PictureAsPdfIcon sx={{ fontSize: 48, color: '#f44336' }} />
          </Box>
        );
      
      default:
        return (
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
            <InsertDriveFileIcon sx={{ fontSize: 48, color: '#2196f3' }} />
          </Box>
        );
    }
  };
  
  const getFileIcon = () => {
    switch (type) {
      case 'image':
        return <ImageIcon />;
      case 'audio':
        return <AudioFileIcon />;
      case 'video':
        return <VideoFileIcon />;
      case 'pdf':
        return <PictureAsPdfIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };
  
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      {renderFilePreview()}
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {getFileIcon()}
        <Typography variant="body1" component="div" sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {displayName}
        </Typography>
      </Box>
      
      <Box sx={{ mt: 1 }}>
        <Link href={url} target="_blank" rel="noopener noreferrer">
          Download / View
        </Link>
      </Box>
    </Paper>
  );
};

export default FileDisplay;
