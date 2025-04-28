/**
 * Course Stats Widget
 * 
 * Displays statistics about courses in the system.
 */

import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Divider,
  LinearProgress,
  Grid,
  useTheme
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CourseStatsWidgetProps {
  metrics: any;
}

const CourseStatsWidget: React.FC<CourseStatsWidgetProps> = ({ metrics }) => {
  const theme = useTheme();
  
  if (!metrics) {
    return (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Course Statistics
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography variant="body1" color="text.secondary">
            Loading course statistics...
          </Typography>
        </Box>
      </Paper>
    );
  }
  
  // Mock data for the chart
  const data = [
    { name: 'Computer Science', courses: 12 },
    { name: 'Mathematics', courses: 8 },
    { name: 'Physics', courses: 5 },
    { name: 'Chemistry', courses: 4 },
    { name: 'Biology', courses: 6 }
  ];
  
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Course Statistics
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" gutterBottom>
          {metrics.total}
        </Typography>
        
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Total Courses
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color={theme.palette.success.main}>
                {metrics.active}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color={theme.palette.text.secondary}>
                {metrics.archived}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Archived
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Typography variant="subtitle2" color="text.secondary" gutterBottom align="left" sx={{ width: '100%' }}>
          Courses by Subject
        </Typography>
        
        <Box sx={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="courses" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default CourseStatsWidget;
