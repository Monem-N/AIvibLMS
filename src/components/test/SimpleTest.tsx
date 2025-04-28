/**
 * SimpleTest Component
 *
 * A simple test component to demonstrate the hybrid approach.
 */

import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SimpleTest: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hybrid Firebase/Supabase Approach Test
      </Typography>

      <Typography variant="body1" paragraph>
        This is a simple test page to demonstrate that the application is running.
        The hybrid Firebase/Supabase approach has been implemented, but we need to
        fix some issues before we can fully test it.
      </Typography>

      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Next Steps
          </Typography>

          <Typography variant="body1" component="ol" sx={{ pl: 2 }}>
            <li>Fix missing dependencies and files</li>
            <li>Set up proper Redux store and actions</li>
            <li>Create a Supabase project and get API credentials</li>
            <li>Test the file upload functionality</li>
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/hybrid"
            >
              Try Hybrid File Upload Demo
            </Button>

            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/real-storage"
            >
              Test Real Supabase Storage
            </Button>

            <Button
              variant="outlined"
              color="info"
              component={Link}
              to="/simple-storage"
            >
              Simple Supabase Storage Test
            </Button>

            <Button
              variant="outlined"
              color="warning"
              component={Link}
              to="/direct-upload"
            >
              Direct Upload Test
            </Button>

            <Button
              variant="outlined"
              color="error"
              component={Link}
              to="/firebase-auth"
            >
              Firebase Auth Test
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SimpleTest;
