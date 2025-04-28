/**
 * DirectUploadTest Component
 * 
 * A simple component that directly tests file upload to Supabase Storage.
 */

import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button, CircularProgress, Alert } from '@mui/material';
import { createClient } from '@supabase/supabase-js';

const DirectUploadTest: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Get Supabase credentials from environment variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };
  
  const uploadFile = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      console.log('Uploading file to profile-images bucket...');
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `test-user-${Date.now()}.${fileExt}`;
      
      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw uploadError;
      }
      
      console.log('Upload successful:', data);
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);
      
      console.log('Public URL:', urlData);
      setFileUrl(urlData.publicUrl);
    } catch (error: any) {
      console.error('Error in upload process:', error);
      setError(error.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Direct Supabase Upload Test
      </Typography>
      
      <Typography variant="body1" paragraph>
        This page tests direct file upload to Supabase Storage without using any abstraction layers.
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Upload to profile-images Bucket
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ marginBottom: '16px' }}
          />
          
          {file && (
            <Typography variant="body2" paragraph>
              Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Typography>
          )}
          
          <Button
            variant="contained"
            color="primary"
            onClick={uploadFile}
            disabled={!file || uploading}
            startIcon={uploading ? <CircularProgress size={20} /> : null}
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {fileUrl && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              File uploaded successfully!
            </Alert>
            
            <Typography variant="subtitle1" gutterBottom>
              Uploaded Image:
            </Typography>
            
            <Box sx={{ textAlign: 'center', my: 2 }}>
              <img 
                src={fileUrl} 
                alt={file?.name || 'Uploaded image'} 
                style={{ maxWidth: '100%', maxHeight: '300px' }} 
              />
            </Box>
            
            <Typography variant="body2" paragraph>
              File URL: {fileUrl}
            </Typography>
            
            <Button 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              variant="outlined"
            >
              Open in New Tab
            </Button>
          </Box>
        )}
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          RLS Policies for File Upload
        </Typography>
        
        <Typography variant="body2" paragraph>
          If you're encountering RLS policy errors, run the following SQL in your Supabase SQL Editor:
        </Typography>
        
        <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5', mb: 2 }}>
          <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
{`-- Allow anonymous uploads to public buckets (profile-images and resources)
CREATE POLICY "Allow anonymous uploads to public buckets" ON storage.objects
    FOR INSERT TO anon
    WITH CHECK (
        bucket_id IN (
            SELECT id FROM storage.buckets WHERE public = true
        )
    );

-- Allow anonymous uploads to private buckets (course-materials and submissions)
CREATE POLICY "Allow anonymous uploads to private buckets" ON storage.objects
    FOR INSERT TO anon
    WITH CHECK (
        bucket_id IN (
            SELECT id FROM storage.buckets WHERE public = false
        )
    );

-- Allow anonymous updates to objects
CREATE POLICY "Allow anonymous updates to objects" ON storage.objects
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

-- Allow anonymous deletes from all buckets
CREATE POLICY "Allow anonymous deletes from all buckets" ON storage.objects
    FOR DELETE TO anon
    USING (true);`}
          </Typography>
        </Paper>
        
        <Button
          variant="outlined"
          color="secondary"
          component="a"
          href="https://app.supabase.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Supabase Dashboard
        </Button>
      </Paper>
    </Container>
  );
};

export default DirectUploadTest;
