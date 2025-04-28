/**
 * User Stats Widget
 * 
 * Displays statistics about users in the system.
 */

import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Divider,
  useTheme
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface UserStatsWidgetProps {
  metrics: any;
}

const UserStatsWidget: React.FC<UserStatsWidgetProps> = ({ metrics }) => {
  const theme = useTheme();
  
  if (!metrics) {
    return (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          User Statistics
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography variant="body1" color="text.secondary">
            Loading user statistics...
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  const data = [
    { name: 'Students', value: metrics.students, color: theme.palette.primary.main },
    { name: 'Instructors', value: metrics.instructors, color: theme.palette.secondary.main },
    { name: 'Admins', value: metrics.admins, color: theme.palette.error.main }
  ];
  
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        User Statistics
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" gutterBottom>
          {metrics.total}
        </Typography>
        
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Total Users
        </Typography>
        
        <Box sx={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} (${((value / metrics.total) * 100).toFixed(1)}%)`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mt: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color={theme.palette.primary.main}>
              {metrics.students}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Students
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color={theme.palette.secondary.main}>
              {metrics.instructors}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Instructors
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color={theme.palette.error.main}>
              {metrics.admins}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Admins
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserStatsWidget;
