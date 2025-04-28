/**
 * System Overview Widget
 * 
 * Displays a summary of key system metrics and status information.
 */

import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Divider,
  LinearProgress,
  Chip,
  useTheme
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

interface SystemOverviewWidgetProps {
  metrics: any;
}

const SystemOverviewWidget: React.FC<SystemOverviewWidgetProps> = ({ metrics }) => {
  const theme = useTheme();
  
  if (!metrics) {
    return (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          System Overview
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography variant="body1" color="text.secondary">
            Loading system metrics...
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Healthy':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'Warning':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'Error':
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      default:
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    }
  };
  
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          System Overview
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Chip 
          icon={getStatusIcon(metrics.system.status)} 
          label={metrics.system.status} 
          color={metrics.system.status === 'Healthy' ? 'success' : metrics.system.status === 'Warning' ? 'warning' : 'error'}
          size="small"
        />
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Users
          </Typography>
          <Typography variant="h4">
            {metrics.users.total}
          </Typography>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {metrics.users.admins} Admins
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {metrics.users.instructors} Instructors
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {metrics.users.students} Students
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Courses
          </Typography>
          <Typography variant="h4">
            {metrics.courses.total}
          </Typography>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {metrics.courses.active} Active
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {metrics.courses.archived} Archived
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary">
            Storage Usage
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Box sx={{ flexGrow: 1, mr: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={metrics.storage.percentage} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: metrics.storage.percentage > 90 ? 'error.main' : 
                                    metrics.storage.percentage > 70 ? 'warning.main' : 
                                    'success.main',
                  }
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {metrics.storage.used} / {metrics.storage.total}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            System Uptime
          </Typography>
          <Typography variant="body1">
            {metrics.system.uptime}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Last Backup
          </Typography>
          <Typography variant="body1">
            {new Date(metrics.system.lastBackup).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SystemOverviewWidget;
