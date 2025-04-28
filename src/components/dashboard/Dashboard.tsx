/**
 * Dashboard Component
 * 
 * Main dashboard page for the application.
 */

import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import FileUpload from '../common/FileUpload';
import FileDisplay from '../common/FileDisplay';

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const [profileImageUrl, setProfileImageUrl] = React.useState<string | null>(user?.photoURL || null);
  
  const handleProfileImageUpload = (url: string) => {
    setProfileImageUrl(url);
    // In a real application, you would update the user profile here
    console.log('Profile image uploaded:', url);
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="body1" paragraph>
        Welcome back, {user?.displayName || 'User'}!
      </Typography>
      
      <Grid container spacing={3}>
        {/* User Profile Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Your Profile" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                {profileImageUrl ? (
                  <Box sx={{ mb: 2 }}>
                    <img 
                      src={profileImageUrl} 
                      alt="Profile" 
                      style={{ 
                        width: '150px', 
                        height: '150px', 
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }} 
                    />
                  </Box>
                ) : (
                  <Box 
                    sx={{ 
                      width: '150px', 
                      height: '150px', 
                      borderRadius: '50%',
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    <Typography variant="h3" color="white">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </Typography>
                  </Box>
                )}
                
                <Typography variant="h6" gutterBottom>
                  {user?.displayName || 'User'}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user?.email}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Role: {user?.role || 'Student'}
                </Typography>
                
                <FileUpload
                  onUploadComplete={handleProfileImageUpload}
                  uploadType="profile"
                  acceptedFileTypes="image/*"
                  maxSizeMB={2}
                  buttonText="Update Profile Picture"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Courses Card */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader 
              title="Your Courses" 
              action={
                <Button 
                  component={RouterLink} 
                  to="/courses" 
                  color="primary"
                >
                  View All
                </Button>
              }
            />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Introduction to Web Development"
                    secondary="Instructor: John Doe • Progress: 60%"
                  />
                  <Button 
                    component={RouterLink} 
                    to="/courses/1" 
                    variant="outlined" 
                    size="small"
                  >
                    Continue
                  </Button>
                </ListItem>
                
                <Divider component="li" />
                
                <ListItem>
                  <ListItemText
                    primary="Advanced JavaScript"
                    secondary="Instructor: Jane Smith • Progress: 30%"
                  />
                  <Button 
                    component={RouterLink} 
                    to="/courses/2" 
                    variant="outlined" 
                    size="small"
                  >
                    Continue
                  </Button>
                </ListItem>
                
                <Divider component="li" />
                
                <ListItem>
                  <ListItemText
                    primary="React Fundamentals"
                    secondary="Instructor: Bob Johnson • Progress: 10%"
                  />
                  <Button 
                    component={RouterLink} 
                    to="/courses/3" 
                    variant="outlined" 
                    size="small"
                  >
                    Continue
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Assignments Card */}
        <Grid item xs={12}>
          <Card>
            <CardHeader 
              title="Upcoming Assignments" 
              action={
                <Button 
                  component={RouterLink} 
                  to="/assignments" 
                  color="primary"
                >
                  View All
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      JavaScript Project
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Course: Advanced JavaScript
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Due: May 15, 2023
                    </Typography>
                    <Button 
                      component={RouterLink} 
                      to="/assignments/1" 
                      variant="contained" 
                      size="small" 
                      sx={{ mt: 1 }}
                    >
                      View Details
                    </Button>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      React Component Library
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Course: React Fundamentals
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Due: May 20, 2023
                    </Typography>
                    <Button 
                      component={RouterLink} 
                      to="/assignments/2" 
                      variant="contained" 
                      size="small" 
                      sx={{ mt: 1 }}
                    >
                      View Details
                    </Button>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Responsive Website
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Course: Introduction to Web Development
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Due: May 25, 2023
                    </Typography>
                    <Button 
                      component={RouterLink} 
                      to="/assignments/3" 
                      variant="contained" 
                      size="small" 
                      sx={{ mt: 1 }}
                    >
                      View Details
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
