/**
 * SettingsModern Component
 * 
 * User settings page with account, notification, and privacy settings.
 */

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import { useAuthContext } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';

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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
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

const SettingsModern: React.FC = () => {
  // State
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    assignmentReminders: true,
    discussionReplies: true,
    gradeReleases: true,
    systemAnnouncements: true,
    marketingEmails: false
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    showProfileToPublic: true,
    showEnrolledCourses: true,
    showActivityHistory: false,
    allowDataCollection: true,
    allowThirdPartySharing: false
  });
  
  // Hooks
  const { user, updatePassword, updateEmail, deleteAccount } = useAuthContext();
  const { showSuccess, showError } = useNotification();
  
  // Effect to fetch user settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // In a real implementation, this would fetch from Firestore
        // For now, we'll use mock data with the user's email
        setAccountSettings(prev => ({
          ...prev,
          email: user.email || ''
        }));
        
        setError(null);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setError('Failed to load settings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, [user]);
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle account settings change
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle notification settings change
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle privacy settings change
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle account settings save
  const handleSaveAccount = async () => {
    // Validate passwords
    if (accountSettings.newPassword && accountSettings.newPassword !== accountSettings.confirmPassword) {
      showError('New passwords do not match');
      return;
    }
    
    if (accountSettings.newPassword && accountSettings.newPassword.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setSaving(true);
      
      // Update email if changed
      if (user?.email !== accountSettings.email) {
        await updateEmail(accountSettings.email);
      }
      
      // Update password if provided
      if (accountSettings.newPassword) {
        await updatePassword(accountSettings.currentPassword, accountSettings.newPassword);
        
        // Clear password fields
        setAccountSettings(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
      
      showSuccess('Account settings updated successfully');
    } catch (error) {
      console.error('Error updating account settings:', error);
      showError('Failed to update account settings. Please check your current password and try again.');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle notification settings save
  const handleSaveNotifications = async () => {
    try {
      setSaving(true);
      
      // In a real implementation, this would update Firestore
      // For now, we'll just show a success message
      
      showSuccess('Notification settings updated successfully');
    } catch (error) {
      console.error('Error updating notification settings:', error);
      showError('Failed to update notification settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle privacy settings save
  const handleSavePrivacy = async () => {
    try {
      setSaving(true);
      
      // In a real implementation, this would update Firestore
      // For now, we'll just show a success message
      
      showSuccess('Privacy settings updated successfully');
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      showError('Failed to update privacy settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle delete account dialog open
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };
  
  // Handle delete account dialog close
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteConfirmText('');
  };
  
  // Handle delete account
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      showError('Please type DELETE to confirm account deletion');
      return;
    }
    
    try {
      setSaving(true);
      
      await deleteAccount();
      
      showSuccess('Account deleted successfully');
      handleDeleteDialogClose();
    } catch (error) {
      console.error('Error deleting account:', error);
      showError('Failed to delete account. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  // If loading, show loading state
  if (loading) {
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
      <Typography variant="h4" component="h1" gutterBottom>
        Account Settings
      </Typography>
      
      <Typography variant="body1" paragraph>
        Manage your account settings, notification preferences, and privacy options.
      </Typography>
      
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<AccountCircleIcon />} label="Account" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<SecurityIcon />} label="Privacy & Security" />
        </Tabs>
        
        {/* Account Settings Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Account Settings
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={accountSettings.email}
                onChange={handleAccountChange}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Change Password
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={accountSettings.currentPassword}
                onChange={handleAccountChange}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={accountSettings.newPassword}
                onChange={handleAccountChange}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={accountSettings.confirmPassword}
                onChange={handleAccountChange}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteDialogOpen}
                >
                  Delete Account
                </Button>
                
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveAccount}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Notification Settings Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText
                primary="Email Notifications"
                secondary="Receive notifications via email"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Course Updates"
                secondary="Notifications about course content updates"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="courseUpdates"
                  checked={notificationSettings.courseUpdates}
                  onChange={handleNotificationChange}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Assignment Reminders"
                secondary="Reminders about upcoming assignments and deadlines"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="assignmentReminders"
                  checked={notificationSettings.assignmentReminders}
                  onChange={handleNotificationChange}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Discussion Replies"
                secondary="Notifications when someone replies to your discussion posts"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="discussionReplies"
                  checked={notificationSettings.discussionReplies}
                  onChange={handleNotificationChange}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Grade Releases"
                secondary="Notifications when grades are released"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="gradeReleases"
                  checked={notificationSettings.gradeReleases}
                  onChange={handleNotificationChange}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="System Announcements"
                secondary="Important announcements about the platform"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="systemAnnouncements"
                  checked={notificationSettings.systemAnnouncements}
                  onChange={handleNotificationChange}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Marketing Emails"
                secondary="Promotional emails about new courses and features"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onChange={handleNotificationChange}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveNotifications}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </TabPanel>
        
        {/* Privacy Settings Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Privacy & Security Settings
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
            Profile Visibility
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="showProfileToPublic"
                    checked={privacySettings.showProfileToPublic}
                    onChange={handlePrivacyChange}
                  />
                }
                label="Show my profile to the public"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="showEnrolledCourses"
                    checked={privacySettings.showEnrolledCourses}
                    onChange={handlePrivacyChange}
                  />
                }
                label="Show my enrolled courses to other users"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="showActivityHistory"
                    checked={privacySettings.showActivityHistory}
                    onChange={handlePrivacyChange}
                  />
                }
                label="Show my activity history to other users"
              />
            </Grid>
          </Grid>
          
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
            Data & Privacy
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="allowDataCollection"
                    checked={privacySettings.allowDataCollection}
                    onChange={handlePrivacyChange}
                  />
                }
                label="Allow data collection for platform improvement"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="allowThirdPartySharing"
                    checked={privacySettings.allowThirdPartySharing}
                    onChange={handlePrivacyChange}
                  />
                }
                label="Allow sharing data with third parties"
              />
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSavePrivacy}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </TabPanel>
      </Paper>
      
      {/* Delete Account Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2, color: 'error.main' }}>
            To confirm, please type "DELETE" in the field below:
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAccount} 
            color="error" 
            disabled={deleteConfirmText !== 'DELETE' || saving}
          >
            {saving ? 'Deleting...' : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SettingsModern;
