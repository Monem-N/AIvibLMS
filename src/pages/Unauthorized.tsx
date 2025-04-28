/**
 * Unauthorized Page
 * 
 * Page for unauthorized access attempts.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const Unauthorized: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 500,
            width: '100%',
          }}
        >
          <LockIcon sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Access Denied
          </Typography>
          
          <Typography variant="body1" paragraph>
            You don't have permission to access this page. Please sign in with an account that has the required permissions.
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/signin"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            
            <Button
              component={Link}
              to="/"
              variant="outlined"
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Unauthorized;
