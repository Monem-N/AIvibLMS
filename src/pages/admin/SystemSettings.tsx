/**
 * System Settings Component
 *
 * Admin interface for managing system-wide settings like appearance, security,
 * notifications, and other configuration options.
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Switch,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  useTheme,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  ColorLens as ColorLensIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const SystemSettings: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // General Settings State
  const [siteName, setSiteName] = useState('AIvibLMS');
  const [siteDescription, setSiteDescription] = useState('A modern learning management system');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  // Appearance Settings State
  const [primaryColor, setPrimaryColor] = useState('#1976d2');
  const [secondaryColor, setSecondaryColor] = useState('#dc004e');
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [logoUrl, setLogoUrl] = useState('/logo.png');

  // Security Settings State
  const [passwordMinLength, setPasswordMinLength] = useState(8);
  const [requireSpecialChars, setRequireSpecialChars] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState('immediate');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSaveSettings = () => {
    // In a real application, this would save the settings to the backend
    console.log('Saving settings...');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: '100%' }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            System Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure system-wide settings and preferences
          </Typography>
        </Box>

        {/* Save Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
            sx={{ textTransform: 'none' }}
          >
            Save Changes
          </Button>
        </Box>

      {/* Tabs */}
      <Paper sx={{ width: '100%', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<SettingsIcon />} label="General" />
          <Tab icon={<ColorLensIcon />} label="Appearance" />
          <Tab icon={<SecurityIcon />} label="Security" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
        </Tabs>

        {/* General Settings Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Site Information" />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Site Name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Site Description"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    margin="normal"
                    multiline
                    rows={2}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="System Status" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={maintenanceMode}
                        onChange={(e) => setMaintenanceMode(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Maintenance Mode"
                  />
                  <Typography variant="caption" display="block" gutterBottom>
                    When enabled, the site will display a maintenance message to all users except administrators.
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={debugMode}
                          onChange={(e) => setDebugMode(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Debug Mode"
                    />
                    <Typography variant="caption" display="block" gutterBottom>
                      When enabled, detailed error messages will be displayed. Not recommended for production.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Appearance Settings Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Theme Colors" />
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <InputLabel htmlFor="primary-color">Primary Color</InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: primaryColor,
                          borderRadius: 1,
                          mr: 2,
                          border: '1px solid #ccc'
                        }}
                      />
                      <TextField
                        id="primary-color"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        sx={{ width: 200 }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <InputLabel htmlFor="secondary-color">Secondary Color</InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: secondaryColor,
                          borderRadius: 1,
                          mr: 2,
                          border: '1px solid #ccc'
                        }}
                      />
                      <TextField
                        id="secondary-color"
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        sx={{ width: 200 }}
                      />
                    </Box>
                  </Box>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Dark Mode"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Typography & Branding" />
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    <Typography id="font-size-slider" gutterBottom>
                      Base Font Size: {fontSize}px
                    </Typography>
                    <Slider
                      value={fontSize}
                      onChange={(e, newValue) => setFontSize(newValue as number)}
                      aria-labelledby="font-size-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={12}
                      max={20}
                    />
                  </Box>

                  <TextField
                    fullWidth
                    label="Logo URL"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    margin="normal"
                    helperText="Enter the URL for your site logo"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Security Settings Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Password Policy" />
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    <Typography id="password-length-slider" gutterBottom>
                      Minimum Password Length: {passwordMinLength} characters
                    </Typography>
                    <Slider
                      value={passwordMinLength}
                      onChange={(e, newValue) => setPasswordMinLength(newValue as number)}
                      aria-labelledby="password-length-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={6}
                      max={16}
                    />
                  </Box>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={requireSpecialChars}
                        onChange={(e) => setRequireSpecialChars(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Require Special Characters"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Authentication" />
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    <Typography id="session-timeout-slider" gutterBottom>
                      Session Timeout: {sessionTimeout} minutes
                    </Typography>
                    <Slider
                      value={sessionTimeout}
                      onChange={(e, newValue) => setSessionTimeout(newValue as number)}
                      aria-labelledby="session-timeout-slider"
                      valueLabelDisplay="auto"
                      step={5}
                      marks
                      min={5}
                      max={60}
                    />
                  </Box>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={twoFactorAuth}
                        onChange={(e) => setTwoFactorAuth(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Enable Two-Factor Authentication"
                  />
                  <Typography variant="caption" display="block" gutterBottom>
                    When enabled, users will be required to verify their identity using a second factor.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notification Settings Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Notification Channels" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Email Notifications"
                  />
                  <Typography variant="caption" display="block" gutterBottom>
                    Send notifications to users via email.
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={pushNotifications}
                          onChange={(e) => setPushNotifications(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Push Notifications"
                    />
                    <Typography variant="caption" display="block" gutterBottom>
                      Send browser push notifications to users.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Notification Settings" />
                <CardContent>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="notification-frequency-label">Notification Frequency</InputLabel>
                    <Select
                      labelId="notification-frequency-label"
                      value={notificationFrequency}
                      onChange={(e) => setNotificationFrequency(e.target.value)}
                      label="Notification Frequency"
                    >
                      <MenuItem value="immediate">Immediate</MenuItem>
                      <MenuItem value="hourly">Hourly Digest</MenuItem>
                      <MenuItem value="daily">Daily Digest</MenuItem>
                      <MenuItem value="weekly">Weekly Digest</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
      </Box>
    </>
  );
};

export default SystemSettings;
