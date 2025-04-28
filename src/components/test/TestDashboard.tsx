/**
 * TestDashboard Component
 * 
 * A comprehensive dashboard for testing various aspects of the application.
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const TestDashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        AIvibLMS Test Dashboard
      </Typography>
      
      <Typography variant="body1" paragraph>
        This dashboard provides access to various test components for the AIvibLMS application.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Firebase Authentication Tests */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Firebase Authentication
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Test Firebase authentication functionality including sign up, sign in, and sign out.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="User registration" />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="User authentication" />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="User session management" />
                </ListItem>
              </List>
            </CardContent>
            
            <CardActions>
              <Button 
                component={RouterLink} 
                to="/firebase-auth" 
                variant="contained" 
                startIcon={<SecurityIcon />}
              >
                Test Firebase Auth
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        {/* Supabase Storage Tests */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Supabase Storage
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Test Supabase storage functionality including bucket management and file operations.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Bucket management" />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="File uploads" />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Public URL generation" />
                </ListItem>
              </List>
            </CardContent>
            
            <CardActions>
              <Button 
                component={RouterLink} 
                to="/real-storage" 
                variant="contained" 
                startIcon={<StorageIcon />}
              >
                Test Supabase Storage
              </Button>
              
              <Button 
                component={RouterLink} 
                to="/direct-upload" 
                variant="outlined" 
                startIcon={<CloudUploadIcon />}
              >
                Test Direct Upload
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        {/* Hybrid Integration Tests */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hybrid Integration
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Test the integration between Firebase and Supabase for a complete solution.
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Firebase Components
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Authentication" />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Firestore Database" />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Realtime Database" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Supabase Components
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Storage" />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <ErrorIcon color="disabled" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Database (Not Used)" />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <ErrorIcon color="disabled" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Authentication (Not Used)" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
            
            <CardActions>
              <Button 
                component={RouterLink} 
                to="/hybrid" 
                variant="contained" 
                startIcon={<CodeIcon />}
              >
                Test Hybrid Integration
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        {/* Simple Tests */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Additional Test Components
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  component={RouterLink}
                  to="/simple-storage"
                  variant="outlined"
                  fullWidth
                >
                  Simple Storage Test
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  component={RouterLink}
                  to="/test/file-upload"
                  variant="outlined"
                  fullWidth
                >
                  File Upload Test
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TestDashboard;
