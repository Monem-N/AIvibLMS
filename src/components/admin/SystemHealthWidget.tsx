/**
 * System Health Widget
 * 
 * Displays information about the health and status of the system.
 */

import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Divider,
  Grid,
  Chip,
  useTheme
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SystemHealthWidgetProps {
  metrics: any;
}

const SystemHealthWidget: React.FC<SystemHealthWidgetProps> = ({ metrics }) => {
  const theme = useTheme();
  
  if (!metrics) {
    return (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          System Health
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography variant="body1" color="text.secondary">
            Loading system health information...
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
  
  // Mock data for the chart
  const data = [
    { time: '00:00', cpu: 15, memory: 30, users: 5 },
    { time: '04:00', cpu: 10, memory: 25, users: 3 },
    { time: '08:00', cpu: 25, memory: 40, users: 12 },
    { time: '12:00', cpu: 45, memory: 60, users: 30 },
    { time: '16:00', cpu: 50, memory: 65, users: 35 },
    { time: '20:00', cpu: 30, memory: 50, users: 20 },
    { time: 'Now', cpu: 20, memory: 40, users: 15 }
  ];
  
  // Mock service status
  const services = [
    { name: 'Authentication', status: 'Healthy' },
    { name: 'Database', status: 'Healthy' },
    { name: 'Storage', status: 'Healthy' },
    { name: 'Email', status: 'Warning' },
    { name: 'Background Jobs', status: 'Healthy' }
  ];
  
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          System Health
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Chip 
          icon={getStatusIcon(metrics.status)} 
          label={metrics.status} 
          color={metrics.status === 'Healthy' ? 'success' : metrics.status === 'Warning' ? 'warning' : 'error'}
          size="small"
        />
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            System Uptime
          </Typography>
          <Typography variant="h6">
            {metrics.uptime}
          </Typography>
          
          <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
            Last Backup
          </Typography>
          <Typography variant="h6">
            {new Date(metrics.lastBackup).toLocaleDateString()}
          </Typography>
          
          <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
            Service Status
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {services.map((service) => (
              <Chip 
                key={service.name}
                label={service.name} 
                icon={getStatusIcon(service.status)}
                color={service.status === 'Healthy' ? 'success' : service.status === 'Warning' ? 'warning' : 'error'}
                size="small"
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            System Load (24h)
          </Typography>
          <Box sx={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" stroke={theme.palette.primary.main} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke={theme.palette.secondary.main} name="Memory %" />
                <Line type="monotone" dataKey="users" stroke={theme.palette.error.main} name="Active Users" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SystemHealthWidget;
