/**
 * FirebaseAuthTest Component
 *
 * A test component to verify Firebase authentication functionality.
 */

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid
} from '@mui/material';
import { firebase } from '../../services/hybridService';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

const FirebaseAuthTest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      setCurrentUser(user);
      console.log('Auth state changed:', user);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const userCredential = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      console.log('User signed up:', userCredential.user);
      setSuccess(`User created successfully: ${userCredential.user.email}`);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const userCredential = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      console.log('User signed in:', userCredential.user);
      setSuccess(`User signed in successfully: ${userCredential.user.email}`);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await signOut(firebase.auth);

      console.log('User signed out');
      setSuccess('User signed out successfully');
    } catch (error: any) {
      console.error('Sign out error:', error);
      setError(error.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Firebase Authentication Test
      </Typography>

      <Typography variant="body1" paragraph>
        This page tests Firebase authentication functionality.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Authentication Status
          </Typography>

          {currentUser ? (
            <Box>
              <Alert severity="success" sx={{ mb: 2 }}>
                User is signed in
              </Alert>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={currentUser.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="User ID"
                    secondary={currentUser.uid}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email Verified"
                    secondary={currentUser.emailVerified ? 'Yes' : 'No'}
                  />
                </ListItem>
              </List>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleSignOut}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Signing Out...' : 'Sign Out'}
              </Button>
            </Box>
          ) : (
            <Alert severity="info">
              No user is currently signed in
            </Alert>
          )}
        </Paper>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sign Up
            </Typography>

            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sign In
            </Typography>

            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Firebase Configuration
        </Typography>

        <Typography variant="body2" paragraph>
          Make sure your Firebase configuration is correctly set up in your .env.local file:
        </Typography>

        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
          <pre style={{ margin: 0, overflow: 'auto' }}>
{`VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com`}
          </pre>
        </Box>
      </Paper>
    </Container>
  );
};

export default FirebaseAuthTest;
