/**
 * RoleBasedRoute Component
 * 
 * A route wrapper that checks if the user has the required role.
 * If not, it redirects to the unauthorized page.
 */

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useAuthContext } from '../../contexts/AuthContext';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [hasRole, setHasRole] = useState(false);
  const { user } = useAuthContext();
  
  useEffect(() => {
    const checkRole = async () => {
      setLoading(true);
      
      try {
        const auth = getAuth();
        const firestore = getFirestore();
        
        if (!auth.currentUser) {
          setHasRole(false);
          setLoading(false);
          return;
        }
        
        const userDoc = await getDoc(doc(firestore, 'users', auth.currentUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setHasRole(userData.role === requiredRole);
        } else {
          setHasRole(false);
        }
      } catch (error) {
        console.error('Error checking role:', error);
        setHasRole(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkRole();
  }, [requiredRole, user]);
  
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Checking permissions...
        </Typography>
      </Box>
    );
  }
  
  if (!hasRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

export default RoleBasedRoute;
