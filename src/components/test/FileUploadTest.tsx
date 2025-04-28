/**
 * FileUploadTest Component
 * 
 * A test component to demonstrate the file upload functionality using the hybrid approach.
 */

import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Divider, Grid } from '@mui/material';
import FileUpload from '../common/FileUpload';
import FileDisplay from '../common/FileDisplay';

const FileUploadTest: React.FC = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [courseMaterialUrl, setCourseMaterialUrl] = useState<string | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState<string | null>(null);
  
  const handleProfileImageUpload = (url: string) => {
    console.log('Profile image uploaded:', url);
    setProfileImageUrl(url);
  };
  
  const handleCourseMaterialUpload = (url: string) => {
    console.log('Course material uploaded:', url);
    setCourseMaterialUrl(url);
  };
  
  const handleSubmissionUpload = (url: string) => {
    console.log('Submission uploaded:', url);
    setSubmissionUrl(url);
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hybrid Firebase/Supabase File Upload Test
      </Typography>
      
      <Typography variant="body1" paragraph>
        This page demonstrates the file upload functionality using the hybrid approach,
        where Firebase handles authentication and Supabase handles file storage.
      </Typography>
      
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Current Implementation Status
        </Typography>
        <Paper sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
          <Typography variant="body1">
            Using mock Supabase storage service for demonstration purposes.
            To use the real Supabase service, update the .env.local file with your Supabase credentials.
          </Typography>
        </Paper>
      </Box>
      
      <Grid container spacing={4}>
        {/* Profile Image Upload */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Profile Image Upload
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <FileUpload
              onUploadComplete={handleProfileImageUpload}
              uploadType="profile"
              acceptedFileTypes="image/*"
              maxSizeMB={2}
              buttonText="Upload Profile Image"
            />
            
            {profileImageUrl && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Uploaded Image:
                </Typography>
                <FileDisplay
                  url={profileImageUrl}
                  fileName="Profile Image"
                  fileType="image"
                  showPreview={true}
                  width="100%"
                  height={150}
                />
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Course Material Upload */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Course Material Upload
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <FileUpload
              onUploadComplete={handleCourseMaterialUpload}
              uploadType="course"
              courseId="course-123"
              acceptedFileTypes=".pdf,.doc,.docx,.ppt,.pptx"
              maxSizeMB={10}
              buttonText="Upload Course Material"
            />
            
            {courseMaterialUrl && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Uploaded Material:
                </Typography>
                <FileDisplay
                  url={courseMaterialUrl}
                  fileName="Course Material"
                  showPreview={true}
                />
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Assignment Submission Upload */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Assignment Submission
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <FileUpload
              onUploadComplete={handleSubmissionUpload}
              uploadType="submission"
              assignmentId="assignment-456"
              acceptedFileTypes=".pdf,.doc,.docx,.zip"
              maxSizeMB={20}
              buttonText="Submit Assignment"
            />
            
            {submissionUrl && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Uploaded Submission:
                </Typography>
                <FileDisplay
                  url={submissionUrl}
                  fileName="Assignment Submission"
                  showPreview={true}
                />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          How It Works
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            This demo uses the hybrid Firebase/Supabase approach:
          </Typography>
          
          <Typography variant="body2" component="ol" sx={{ pl: 2 }}>
            <li>Firebase handles authentication and checks if the user is logged in</li>
            <li>The FileUpload component captures the file and validates it</li>
            <li>The fileService gets the current user ID from Firebase</li>
            <li>The file is uploaded to Supabase Storage (mock implementation in this demo)</li>
            <li>The FileDisplay component renders the uploaded file</li>
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 2 }}>
            In a production environment, you would:
          </Typography>
          
          <Typography variant="body2" component="ol" sx={{ pl: 2 }}>
            <li>Create a Supabase project and get your API credentials</li>
            <li>Create storage buckets in Supabase: profile-images, course-materials, submissions</li>
            <li>Update the .env.local file with your Supabase credentials</li>
            <li>Use the real Supabase storage service instead of the mock implementation</li>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default FileUploadTest;
