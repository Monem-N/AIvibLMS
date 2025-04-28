/**
 * ProfileModern Component
 * 
 * User profile page with personal information, enrolled courses, and activity history.
 */

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';
import FileUpload from '../common/FileUpload';

// Types
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ProfileModern: React.FC = () => {
  // State
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    phoneNumber: '',
    role: '',
    joinDate: '',
    profileImage: ''
  });
  const [formData, setFormData] = useState({ ...profileData });
  
  // Hooks
  const { user } = useAuthContext();
  const { showSuccess, showError } = useNotification();
  
  // Effect to fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // In a real implementation, this would fetch from Firestore
        // For now, we'll use mock data
        const mockProfileData = {
          displayName: user.displayName || 'User',
          email: user.email || 'user@example.com',
          bio: 'Frontend developer passionate about creating intuitive user experiences.',
          location: 'San Francisco, CA',
          website: 'https://example.com',
          phoneNumber: '+1 (555) 123-4567',
          role: user.role || 'student',
          joinDate: new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString(),
          profileImage: user.photoURL || 'https://source.unsplash.com/random/200x200?person'
        };
        
        setProfileData(mockProfileData);
        setFormData(mockProfileData);
        setError(null);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user]);
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setFormData({ ...profileData });
    }
    setIsEditing(!isEditing);
  };
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, this would update Firestore
      // For now, we'll just update the local state
      setProfileData({ ...formData });
      setIsEditing(false);
      showSuccess('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      showError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle profile image upload
  const handleProfileImageUpload = (url: string) => {
    setProfileData(prev => ({
      ...prev,
      profileImage: url
    }));
    showSuccess('Profile image updated successfully');
  };
  
  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: '1',
      title: 'Introduction to Web Development',
      instructor: 'John Doe',
      progress: 60,
      imageUrl: 'https://source.unsplash.com/random/300x200?web'
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      instructor: 'Jane Smith',
      progress: 30,
      imageUrl: 'https://source.unsplash.com/random/300x200?javascript'
    },
    {
      id: '3',
      title: 'React Fundamentals',
      instructor: 'Bob Johnson',
      progress: 10,
      imageUrl: 'https://source.unsplash.com/random/300x200?react'
    }
  ];
  
  // Mock data for recent activities
  const recentActivities = [
    {
      id: '1',
      type: 'assignment',
      title: 'JavaScript Project',
      course: 'Advanced JavaScript',
      date: '2023-05-15',
      status: 'completed',
      grade: 'A'
    },
    {
      id: '2',
      type: 'quiz',
      title: 'React Components Quiz',
      course: 'React Fundamentals',
      date: '2023-05-10',
      status: 'completed',
      grade: 'B+'
    },
    {
      id: '3',
      type: 'discussion',
      title: 'Web Accessibility Discussion',
      course: 'Introduction to Web Development',
      date: '2023-05-05',
      status: 'participated'
    },
    {
      id: '4',
      type: 'assignment',
      title: 'Responsive Website',
      course: 'Introduction to Web Development',
      date: '2023-05-01',
      status: 'in-progress'
    }
  ];
  
  // If loading, show loading state
  if (loading && !profileData.displayName) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  // If error, show error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={profileData.profileImage}
                alt={profileData.displayName}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              
              <FileUpload
                onUploadComplete={handleProfileImageUpload}
                uploadType="profile"
                acceptedFileTypes="image/*"
                maxSizeMB={2}
                buttonText="Update Profile Picture"
              />
              
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                {profileData.displayName}
              </Typography>
              
              <Chip
                label={profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
                color="primary"
                variant="outlined"
                sx={{ mb: 1 }}
              />
              
              <Typography variant="body2" color="text.secondary">
                Member since {profileData.joinDate}
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Email:</strong> {profileData.email}
                </Typography>
                
                {profileData.phoneNumber && (
                  <Typography variant="body2">
                    <strong>Phone:</strong> {profileData.phoneNumber}
                  </Typography>
                )}
                
                {profileData.location && (
                  <Typography variant="body2">
                    <strong>Location:</strong> {profileData.location}
                  </Typography>
                )}
                
                {profileData.website && (
                  <Typography variant="body2">
                    <strong>Website:</strong>{' '}
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                      {profileData.website}
                    </a>
                  </Typography>
                )}
              </Box>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Bio
              </Typography>
              
              <Typography variant="body2" paragraph>
                {profileData.bio || 'No bio provided.'}
              </Typography>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Button
                component={Link}
                to="/settings"
                variant="outlined"
                startIcon={<SettingsIcon />}
                fullWidth
              >
                Account Settings
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Profile Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<SchoolIcon />} label="Courses" />
              <Tab icon={<AssignmentIcon />} label="Activities" />
              <Tab icon={<EditIcon />} label="Edit Profile" />
            </Tabs>
            
            {/* Courses Tab */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Enrolled Courses
              </Typography>
              
              {enrolledCourses.length === 0 ? (
                <Alert severity="info">
                  You are not enrolled in any courses yet.
                </Alert>
              ) : (
                <Grid container spacing={3}>
                  {enrolledCourses.map(course => (
                    <Grid item key={course.id} xs={12} sm={6}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={course.imageUrl}
                          alt={course.title}
                        />
                        
                        <CardContent>
                          <Typography variant="h6" component="h2" gutterBottom>
                            {course.title}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Instructor: {course.instructor}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <LinearProgress variant="determinate" value={course.progress} />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                              <Typography variant="body2" color="text.secondary">
                                {course.progress}%
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Button
                            component={Link}
                            to={`/courses/${course.id}`}
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2 }}
                          >
                            Continue Learning
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>
            
            {/* Activities Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              
              {recentActivities.length === 0 ? (
                <Alert severity="info">
                  You don't have any recent activities.
                </Alert>
              ) : (
                <List>
                  {recentActivities.map(activity => (
                    <React.Fragment key={activity.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar>
                            {activity.type === 'assignment' ? (
                              <AssignmentIcon />
                            ) : activity.type === 'quiz' ? (
                              <SchoolIcon />
                            ) : (
                              <HistoryIcon />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        
                        <ListItemText
                          primary={activity.title}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {activity.course}
                              </Typography>
                              {` — ${new Date(activity.date).toLocaleDateString()}`}
                              <br />
                              <Chip
                                label={
                                  activity.status === 'completed'
                                    ? 'Completed'
                                    : activity.status === 'in-progress'
                                    ? 'In Progress'
                                    : 'Participated'
                                }
                                color={
                                  activity.status === 'completed'
                                    ? 'success'
                                    : activity.status === 'in-progress'
                                    ? 'warning'
                                    : 'info'
                                }
                                size="small"
                                sx={{ mt: 1 }}
                              />
                              {activity.grade && (
                                <Chip
                                  label={`Grade: ${activity.grade}`}
                                  color="primary"
                                  size="small"
                                  sx={{ ml: 1, mt: 1 }}
                                />
                              )}
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </TabPanel>
            
            {/* Edit Profile Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Edit Profile Information
                </Typography>
                
                <Box>
                  {isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<CancelIcon />}
                        onClick={handleEditToggle}
                        sx={{ mr: 1 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleProfileUpdate}
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={handleEditToggle}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Display Name"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    disabled={true} // Email should not be editable
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    multiline
                    rows={4}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// Add missing LinearProgress component
const LinearProgress: React.FC<{ variant: string; value: number }> = ({ variant, value }) => {
  return (
    <Box sx={{ width: '100%', bgcolor: '#e0e0e0', borderRadius: 1, height: 10 }}>
      <Box
        sx={{
          width: `${value}%`,
          bgcolor: 'primary.main',
          borderRadius: 1,
          height: '100%',
          transition: 'width 0.4s ease-in-out',
        }}
      />
    </Box>
  );
};

export default ProfileModern;
