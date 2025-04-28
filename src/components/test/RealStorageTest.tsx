/**
 * RealStorageTest Component
 *
 * A test component to demonstrate the real Supabase storage integration.
 */

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Divider, Grid, Button, CircularProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// Import the mock file service for testing without authentication
import * as fileService from '../../services/fileService.mock';
import * as supabaseStorage from '../../services/supabaseStorageService';

const RealStorageTest: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [buckets, setBuckets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Check Supabase connection and get buckets
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setLoading(true);
        setConnectionStatus('checking');
        console.log('Checking Supabase connection...');

        // First, check if we can connect to Supabase at all
        const supabase = supabaseStorage.getSupabaseClient();
        console.log('Supabase client initialized:', supabase);

        // Try to list buckets
        console.log('Attempting to list buckets...');
        const { data, error } = await supabase.storage.listBuckets();

        if (error) {
          console.error('Error connecting to Supabase:', error);
          setConnectionStatus('error');
          setError(error.message);
        } else {
          console.log('Connected to Supabase successfully');
          console.log('Buckets data:', data);
          setConnectionStatus('connected');
          setBuckets(data || []);
        }
      } catch (error: any) {
        console.error('Error checking Supabase connection:', error);
        setConnectionStatus('error');
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  // Function to manually check for buckets
  const checkForBuckets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Manually checking for buckets...');

      // Try to list buckets
      const { data, error } = await supabaseStorage.getSupabaseClient().storage.listBuckets();

      if (error) {
        console.error('Error listing buckets:', error);
        setError(error.message);
        return;
      }

      console.log('Buckets data:', data);
      setBuckets(data || []);

      // Try to check each bucket individually
      const requiredBuckets = [
        'profile-images',
        'course-materials',
        'submissions',
        'resources'
      ];

      console.log('Checking each bucket individually...');
      for (const bucketName of requiredBuckets) {
        try {
          console.log(`Checking bucket: ${bucketName}`);
          const { data: files, error: filesError } = await supabaseStorage.getSupabaseClient()
            .storage
            .from(bucketName)
            .list();

          if (filesError) {
            console.error(`Error listing files in ${bucketName}:`, filesError);
          } else {
            console.log(`Successfully accessed bucket ${bucketName}, found ${files?.length || 0} files`);
          }
        } catch (bucketError) {
          console.error(`Error checking bucket ${bucketName}:`, bucketError);
        }
      }
    } catch (error: any) {
      console.error('Error checking for buckets:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
      // Upload to profile-images bucket
      const imageUrl = await fileService.uploadProfileImage(file);
      setFileUrl(imageUrl);

      console.log('File uploaded successfully:', {
        name: file.name,
        type: file.type,
        size: file.size,
        url: imageUrl
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setError(error.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const createBuckets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting bucket creation process...');

      // Create each bucket individually with better error handling
      const bucketsToCreate = [
        { name: supabaseStorage.BUCKETS.PROFILE_IMAGES, isPublic: true },
        { name: supabaseStorage.BUCKETS.COURSE_MATERIALS, isPublic: false },
        { name: supabaseStorage.BUCKETS.SUBMISSIONS, isPublic: false },
        { name: supabaseStorage.BUCKETS.RESOURCES, isPublic: true }
      ];

      for (const { name, isPublic } of bucketsToCreate) {
        console.log(`Creating bucket ${name} (public: ${isPublic})...`);
        try {
          const { error } = await supabaseStorage.getSupabaseClient().storage.createBucket(name, {
            public: isPublic,
            fileSizeLimit: 1024 * 1024 * 50, // 50MB
          });

          if (error) {
            if (error.message.includes('already exists')) {
              console.log(`Bucket ${name} already exists`);
            } else {
              console.error(`Error creating bucket ${name}:`, error);
              throw error;
            }
          } else {
            console.log(`Bucket ${name} created successfully`);
          }
        } catch (bucketError: any) {
          console.error(`Error with bucket ${name}:`, bucketError);
          if (!bucketError.message.includes('already exists')) {
            throw bucketError;
          }
        }
      }

      // Refresh buckets list
      console.log('Refreshing buckets list...');
      const { data, error } = await supabaseStorage.getSupabaseClient().storage.listBuckets();

      if (error) {
        console.error('Error listing buckets after creation:', error);
        throw error;
      }

      setBuckets(data || []);
      console.log('Buckets created successfully:', data);
    } catch (error: any) {
      console.error('Error creating buckets:', error);
      setError(error.message || 'An error occurred while creating buckets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Real Supabase Storage Test
      </Typography>

      <Typography variant="body1" paragraph>
        This page tests the real Supabase storage integration using your Supabase credentials.
      </Typography>

      {/* Connection Status */}
      <Box sx={{ mb: 4 }}>
        {connectionStatus === 'checking' && (
          <Alert severity="info" icon={<CircularProgress size={20} />}>
            Checking connection to Supabase...
          </Alert>
        )}

        {connectionStatus === 'connected' && (
          <Alert severity="success">
            Connected to Supabase successfully!
          </Alert>
        )}

        {connectionStatus === 'error' && (
          <Alert severity="error">
            Error connecting to Supabase: {error}
          </Alert>
        )}

        {/* RLS Policy Error Message */}
        {connectionStatus === 'connected' && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Row-Level Security (RLS) Policy Error Detected
              </Typography>
              <Typography variant="body2">
                It appears you're encountering a Row-Level Security policy error when trying to create buckets.
                This is a common issue with Supabase Storage.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Solution:</strong> Create the buckets manually in the Supabase Dashboard:
              </Typography>
              <ol style={{ marginTop: '8px', paddingLeft: '24px' }}>
                <li>Go to your <a href="https://app.supabase.com/" target="_blank" rel="noopener noreferrer">Supabase Dashboard</a></li>
                <li>Select your project</li>
                <li>Click on "Storage" in the left sidebar</li>
                <li>Create the following buckets:
                  <ul>
                    <li><strong>profile-images</strong> (Public)</li>
                    <li><strong>course-materials</strong> (Private)</li>
                    <li><strong>submissions</strong> (Private)</li>
                    <li><strong>resources</strong> (Public)</li>
                  </ul>
                </li>
                <li>After creating the buckets, click the "List Buckets" button below to verify</li>
              </ol>
            </Alert>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={async () => {
                  try {
                    const { data, error } = await supabaseStorage.getSupabaseClient().storage.listBuckets();
                    if (error) throw error;

                    if (data && data.length > 0) {
                      const bucketNames = data.map(b => b.name).join(', ');
                      alert(`Found buckets: ${bucketNames}`);

                      // Refresh buckets list
                      setBuckets(data);
                    } else {
                      alert('No buckets found. Please create them in the Supabase Dashboard.');
                    }
                  } catch (err: any) {
                    alert('Error: ' + err.message);
                  }
                }}
              >
                List Buckets
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Buckets List */}
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Storage Buckets
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {buckets.length === 0 ? (
                <Box>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      No Storage Buckets Found
                    </Typography>
                    <Typography variant="body2">
                      Your Supabase project needs the following storage buckets:
                    </Typography>
                    <ul style={{ marginTop: '8px', paddingLeft: '24px' }}>
                      <li><strong>profile-images</strong> (Public): For user profile pictures</li>
                      <li><strong>course-materials</strong> (Private): For course materials</li>
                      <li><strong>submissions</strong> (Private): For assignment submissions</li>
                      <li><strong>resources</strong> (Public): For general resources</li>
                    </ul>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Please create these buckets in the Supabase Dashboard:
                    </Typography>
                    <ol style={{ marginTop: '8px', paddingLeft: '24px' }}>
                      <li>Go to your <a href="https://app.supabase.com/" target="_blank" rel="noopener noreferrer">Supabase Dashboard</a></li>
                      <li>Select your project</li>
                      <li>Click on "Storage" in the left sidebar</li>
                      <li>Click "New Bucket" and create each bucket with the appropriate privacy setting</li>
                      <li>After creating the buckets, click the "Refresh Buckets" button below</li>
                    </ol>
                  </Alert>

                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={checkForBuckets}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                      {loading ? 'Checking...' : 'Check Buckets Status'}
                    </Button>

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
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Found {buckets.length} bucket(s)
                    </Typography>
                    <Typography variant="body2">
                      Your Supabase storage buckets have been successfully detected.
                    </Typography>
                  </Alert>

                  <Grid container spacing={2}>
                    {buckets.map((bucket) => (
                      <Grid item xs={12} sm={6} key={bucket.id}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="subtitle1">
                            {bucket.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Public: {bucket.public ? 'Yes' : 'No'}
                          </Typography>
                          <Button
                            size="small"
                            variant="text"
                            color="primary"
                            sx={{ mt: 1 }}
                            onClick={async () => {
                              try {
                                const { data, error } = await supabaseStorage.getSupabaseClient()
                                  .storage
                                  .from(bucket.name)
                                  .list();

                                if (error) throw error;
                                alert(`Bucket ${bucket.name} contains ${data?.length || 0} files`);
                              } catch (err: any) {
                                alert(`Error accessing bucket: ${err.message}`);
                              }
                            }}
                          >
                            Test Access
                          </Button>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={checkForBuckets}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                      {loading ? 'Refreshing...' : 'Refresh Buckets'}
                    </Button>

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
                  </Box>
                </Box>
              )}
            </>
          )}
        </Paper>
      </Box>

      {/* File Upload Test */}
      {connectionStatus === 'connected' && (
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
                    accept="image/*"
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
                  {uploading ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      Uploading...
                    </>
                  ) : (
                    'Upload to profile-images Bucket'
                  )}
                </Button>
              </Grid>

              {fileUrl && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
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
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default RealStorageTest;
