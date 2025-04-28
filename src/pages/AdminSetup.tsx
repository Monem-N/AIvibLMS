/**
 * Admin Setup Page
 * 
 * This page allows setting up the first admin user in the system.
 * It should only be accessible to the first user who logs in or to existing admins.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Container, 
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firebase } from '../services/hybridService';

const AdminSetup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminExists, setAdminExists] = useState(false);
  const [admins, setAdmins] = useState<any[]>([]);
  
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();
  
  useEffect(() => {
    const checkCurrentUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check if user is logged in
        if (!auth.currentUser) {
          setError('You must be logged in to access this page');
          navigate('/signin');
          return;
        }
        
        const user = auth.currentUser;
        setCurrentUser(user);
        
        // Get user document from Firestore
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === 'admin');
        }
        
        // Check if any admin exists in the system
        const adminsQuery = query(collection(firestore, 'users'), where('role', '==', 'admin'));
        const adminSnapshot = await getDocs(adminsQuery);
        
        const adminUsers: any[] = [];
        adminSnapshot.forEach(doc => {
          adminUsers.push({ id: doc.id, ...doc.data() });
        });
        
        setAdmins(adminUsers);
        setAdminExists(adminUsers.length > 0);
        
      } catch (error: any) {
        console.error('Error checking user:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    checkCurrentUser();
  }, [auth, firestore, navigate]);
  
  const makeAdmin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (!currentUser) {
        throw new Error('No user is logged in');
      }
      
      // Update user document in Firestore
      const userRef = doc(firestore, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        // Update existing user document
        await setDoc(userRef, {
          ...userDoc.data(),
          role: 'admin',
          level: 10, // Admin level
          updatedAt: new Date()
        }, { merge: true });
      } else {
        // Create new user document
        await setDoc(userRef, {
          email: currentUser.email,
          displayName: currentUser.displayName || '',
          firstName: currentUser.displayName ? currentUser.displayName.split(' ')[0] : '',
          lastName: currentUser.displayName ? currentUser.displayName.split(' ').slice(1).join(' ') : '',
          photoURL: currentUser.photoURL || '',
          role: 'admin',
          level: 10, // Admin level
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      setIsAdmin(true);
      setSuccess('You are now an admin!');
      
      // Refresh the list of admins
      const adminsQuery = query(collection(firestore, 'users'), where('role', '==', 'admin'));
      const adminSnapshot = await getDocs(adminsQuery);
      
      const adminUsers: any[] = [];
      adminSnapshot.forEach(doc => {
        adminUsers.push({ id: doc.id, ...doc.data() });
      });
      
      setAdmins(adminUsers);
      setAdminExists(adminUsers.length > 0);
      
    } catch (error: any) {
      console.error('Error making admin:', error);
      setError(error.message || 'Failed to make admin');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh'
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Admin Setup
        </Typography>
        
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}
          
          <Typography variant="h6" gutterBottom>
            Current User
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography>
              <strong>Email:</strong> {currentUser?.email}
            </Typography>
            <Typography>
              <strong>Name:</strong> {currentUser?.displayName || 'Not set'}
            </Typography>
            <Typography>
              <strong>Role:</strong> {isAdmin ? 'Admin' : 'Regular User'}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          {!isAdmin && (
            <>
              <Typography variant="h6" gutterBottom>
                Become an Admin
              </Typography>
              
              {!adminExists ? (
                <>
                  <Typography paragraph>
                    No admin users exist in the system yet. As the first user, you can make yourself an admin.
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={makeAdmin}
                    disabled={loading}
                    sx={{ mt: 2 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Make Me Admin'}
                  </Button>
                </>
              ) : (
                <Typography paragraph>
                  Admin users already exist in the system. Please contact an existing admin to grant you admin privileges.
                </Typography>
              )}
              
              <Divider sx={{ my: 3 }} />
            </>
          )}
          
          <Typography variant="h6" gutterBottom>
            Existing Admins
          </Typography>
          
          {admins.length > 0 ? (
            <List>
              {admins.map((admin) => (
                <ListItem key={admin.id}>
                  <ListItemText
                    primary={admin.displayName || admin.email}
                    secondary={admin.email}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography paragraph>
              No admin users exist in the system yet.
            </Typography>
          )}
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
            
            {isAdmin && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/admin')}
              >
                Go to Admin Panel
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminSetup;
