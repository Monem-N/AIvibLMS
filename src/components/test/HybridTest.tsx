/**
 * HybridTest Component
 * 
 * A test component to demonstrate the hybrid Firebase/Supabase approach.
 */

import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Divider, Grid, Button, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const HybridTest: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock URL
      const mockUrl = URL.createObjectURL(file);
      setFileUrl(mockUrl);
      
      console.log('File uploaded successfully:', {
        name: file.name,
        type: file.type,
        size: file.size,
        url: mockUrl
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setError(error.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hybrid Firebase/Supabase Approach Test
      </Typography>
      
      <Typography variant="body1" paragraph>
        This page demonstrates the hybrid approach, where Firebase handles authentication
        and Supabase handles file storage. Currently using a mock implementation.
      </Typography>
      
      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            File Upload Test
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Select File
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              
              {file && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </Typography>
                </Box>
              )}
              
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!file || uploading}
                fullWidth
              >
                {uploading ? 'Uploading...' : 'Upload File'}
              </Button>
            </Grid>
            
            {fileUrl && (
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Uploaded File:
                  </Typography>
                  
                  {file?.type.startsWith('image/') ? (
                    <Box sx={{ textAlign: 'center', my: 2 }}>
                      <img 
                        src={fileUrl} 
                        alt={file.name} 
                        style={{ maxWidth: '100%', maxHeight: '300px' }} 
                      />
                    </Box>
                  ) : (
                    <Box sx={{ my: 2 }}>
                      <Typography variant="body2">
                        File uploaded successfully. 
                        <Button 
                          href={fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          size="small"
                          sx={{ ml: 1 }}
                        >
                          View File
                        </Button>
                      </Typography>
                    </Box>
                  )}
                  
                  <TextField
                    label="File URL"
                    value={fileUrl}
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            How It Works
          </Typography>
          
          <Typography variant="body1" paragraph>
            In a real implementation, this would:
          </Typography>
          
          <Typography variant="body2" component="ol" sx={{ pl: 2 }}>
            <li>Use Firebase Authentication to get the current user</li>
            <li>Upload the file to Supabase Storage</li>
            <li>Store the file metadata in Firebase Firestore</li>
            <li>Return the public URL from Supabase</li>
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 2 }}>
            To implement this fully:
          </Typography>
          
          <Typography variant="body2" component="ol" sx={{ pl: 2 }}>
            <li>Create a Supabase project and get your API credentials</li>
            <li>Create storage buckets in Supabase</li>
            <li>Update the .env.local file with your Supabase credentials</li>
            <li>Use the real Supabase storage service instead of the mock implementation</li>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default HybridTest;
