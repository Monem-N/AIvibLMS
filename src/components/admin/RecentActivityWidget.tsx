/**
 * Recent Activity Widget
 * 
 * Displays recent system activity for administrative monitoring.
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Divider,
  Chip,
  Button
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  Description as ContentIcon,
  Storage as StorageIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const RecentActivityWidget: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const firestore = getFirestore();
        // This is a placeholder - in a real app, you would have an 'activities' collection
        // For now, we'll create mock data
        
        // Uncomment this when you have an activities collection
        /*
        const activitiesQuery = query(
          collection(firestore, 'activities'),
          orderBy('timestamp', 'desc'),
          limit(5)
        );
        
        const snapshot = await getDocs(activitiesQuery);
        const activityData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setActivities(activityData);
        */
        
        // Mock data for demonstration
        setActivities([
          {
            id: '1',
            type: 'user',
            action: 'created',
            entityName: 'John Smith',
            timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
            user: 'Admin'
          },
          {
            id: '2',
            type: 'course',
            action: 'updated',
            entityName: 'Introduction to AI',
            timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
            user: 'Instructor'
          },
          {
            id: '3',
            type: 'content',
            action: 'deleted',
            entityName: 'Outdated Announcement',
            timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
            user: 'Admin'
          },
          {
            id: '4',
            type: 'file',
            action: 'uploaded',
            entityName: 'Course Materials.zip',
            timestamp: new Date(Date.now() - 240 * 60000).toISOString(),
            user: 'Instructor'
          },
          {
            id: '5',
            type: 'setting',
            action: 'changed',
            entityName: 'System Theme',
            timestamp: new Date(Date.now() - 1440 * 60000).toISOString(),
            user: 'Admin'
          }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
        setLoading(false);
      }
    };
    
    fetchRecentActivity();
  }, []);
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <PersonIcon />;
      case 'course':
        return <SchoolIcon />;
      case 'content':
        return <ContentIcon />;
      case 'file':
        return <StorageIcon />;
      case 'setting':
        return <SettingsIcon />;
      default:
        return <ContentIcon />;
    }
  };
  
  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return 'success';
      case 'updated':
        return 'info';
      case 'deleted':
        return 'error';
      case 'uploaded':
        return 'success';
      case 'changed':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.floor(diffMins / 1440);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  };
  
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography variant="body1" color="text.secondary">
            Loading activity...
          </Typography>
        </Box>
      ) : (
        <>
          <List sx={{ mb: 2 }}>
            {activities.map((activity) => (
              <ListItem key={activity.id} alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemIcon>
                  {getActivityIcon(activity.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" component="span">
                        {activity.entityName}
                      </Typography>
                      <Box sx={{ flexGrow: 1, minWidth: 10 }} />
                      <Chip
                        label={activity.action}
                        size="small"
                        color={getActionColor(activity.action) as any}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary" component="span">
                        by {activity.user} • {formatTimeAgo(activity.timestamp)}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button size="small" variant="outlined">
              View All Activity
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default RecentActivityWidget;
