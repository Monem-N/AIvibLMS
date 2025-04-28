/**
 * SimpleStorageTest Component
 *
 * A simplified test component to directly test Supabase storage.
 */

import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper, CircularProgress, Alert } from '@mui/material';
import { createClient } from '@supabase/supabase-js';

const SimpleStorageTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get Supabase credentials from environment variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const testConnection = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      console.log('Testing Supabase connection...');
      console.log('URL:', supabaseUrl);
      console.log('Anon Key:', supabaseAnonKey ? 'Provided (not shown for security)' : 'Not provided');

      // Initialize Supabase client
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Skip health check and go directly to listing buckets
      console.log('Skipping health check and proceeding to list buckets...');

      // Try to list buckets
      console.log('Listing buckets...');
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

      if (bucketsError) {
        console.error('Error listing buckets:', bucketsError);
        setError(`Error listing buckets: ${bucketsError.message}`);
        return;
      }

      console.log('Buckets:', buckets);

      if (buckets && buckets.length > 0) {
        const bucketNames = buckets.map(b => b.name).join(', ');
        setResult(`Found ${buckets.length} bucket(s): ${bucketNames}`);

        // Try to access each bucket
        for (const bucket of buckets) {
          console.log(`Testing access to bucket: ${bucket.name}`);
          try {
            const { data: files, error: filesError } = await supabase.storage.from(bucket.name).list();

            if (filesError) {
              console.error(`Error accessing bucket ${bucket.name}:`, filesError);
            } else {
              console.log(`Successfully accessed bucket ${bucket.name}, found ${files?.length || 0} files`);
            }
          } catch (bucketError) {
            console.error(`Error with bucket ${bucket.name}:`, bucketError);
          }
        }
      } else {
        setResult('No buckets found');
      }
    } catch (error: any) {
      console.error('Error testing connection:', error);
      setError(`Error testing connection: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Simple Supabase Storage Test
      </Typography>

      <Typography variant="body1" paragraph>
        This is a simplified test to directly check the Supabase storage connection.
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Supabase Configuration
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>URL:</strong> {supabaseUrl || 'Not set'}
          </Typography>
          <Typography variant="body2">
            <strong>Anon Key:</strong> {supabaseAnonKey ? 'Provided (not shown for security)' : 'Not set'}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={testConnection}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </Button>
      </Paper>

      {result && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {result}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Troubleshooting Steps
        </Typography>

        <Typography variant="body2" component="ol" sx={{ pl: 2 }}>
          <li>Verify that your Supabase URL and Anon Key are correct in the .env.local file</li>
          <li>Make sure you've created the required buckets in the Supabase Dashboard</li>
          <li>Add RLS policies to allow bucket access (see instructions below)</li>
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          SQL for RLS Policies:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5', mb: 2 }}>
          <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
{`-- Allow public access to list all buckets
CREATE POLICY "Allow public access to list buckets" ON storage.buckets
    FOR SELECT
    USING (true);

-- Allow anonymous access to list buckets
CREATE POLICY "Allow anonymous access to list buckets" ON storage.buckets
    FOR SELECT TO anon
    USING (true);

-- Allow anonymous access to read objects in public buckets
CREATE POLICY "Allow anonymous access to objects in public buckets" ON storage.objects
    FOR SELECT TO anon
    USING (bucket_id IN (
        SELECT id FROM storage.buckets WHERE public = true
    ));`}
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

export default SimpleStorageTest;
