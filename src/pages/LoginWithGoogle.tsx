/**
 * Login Page with Google Authentication
 *
 * A modern login page that includes Google authentication.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebase } from '../services/hybridService';

const LoginWithGoogle: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const auth = getAuth();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if we're in development mode and using emulators
      const isUsingEmulators = import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true';

      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      } catch (authError: any) {
        // Check if it's a network error, which likely means the emulator isn't running
        if (isUsingEmulators && authError.code === 'auth/network-request-failed') {
          console.error('Firebase Auth emulator not running:', authError);
          setError('Firebase Auth emulator is not running. Please start the emulator or disable emulator mode in .env.local file.');
        } else {
          throw authError;
        }
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if we're in development mode and using emulators
      const isUsingEmulators = import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true';

      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        navigate('/dashboard');
      } catch (authError: any) {
        // Check if it's a network error, which likely means the emulator isn't running
        if (isUsingEmulators && authError.code === 'auth/network-request-failed') {
          console.error('Firebase Auth emulator not running:', authError);
          setError('Firebase Auth emulator is not running. Please start the emulator or disable emulator mode in .env.local file.');
        } else {
          throw authError;
        }
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          AIvibLMS
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" variant="h5">
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleEmailSignIn} sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading}
              sx={{ mb: 2 }}
            >
              Sign in with Google
            </Button>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Forgot password?
                </Typography>
              </Link>

              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} AIvibLMS. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginWithGoogle;
