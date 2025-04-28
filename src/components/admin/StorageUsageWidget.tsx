/**
 * Storage Usage Widget
 * 
 * Displays information about storage usage in the system.
 */

import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Divider,
  LinearProgress,
  useTheme
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface StorageUsageWidgetProps {
  metrics: any;
}

const StorageUsageWidget: React.FC<StorageUsageWidgetProps> = ({ metrics }) => {
  const theme = useTheme();
  
  if (!metrics) {
    return (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Storage Usage
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography variant="body1" color="text.secondary">
            Loading storage information...
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  // Mock data for the chart
  const data = [
    { name: 'Course Materials', value: 1.2, color: theme.palette.primary.main },
    { name: 'Submissions', value: 0.8, color: theme.palette.secondary.main },
    { name: 'Profile Images', value: 0.2, color: theme.palette.error.main },
    { name: 'Other', value: 0.1, color: theme.palette.warning.main }
  ];
  
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Storage Usage
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" gutterBottom>
          {metrics.used}
        </Typography>
        
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          of {metrics.total} Used
        </Typography>
        
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={metrics.percentage} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              backgroundColor: theme.palette.grey[200],
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                backgroundColor: metrics.percentage > 90 ? 'error.main' : 
                                metrics.percentage > 70 ? 'warning.main' : 
                                'success.main',
              }
            }}
          />
          <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 0.5 }}>
            {metrics.percentage}% used
          </Typography>
        </Box>
        
        <Box sx={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value} GB`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} GB`, 'Size']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default StorageUsageWidget;
