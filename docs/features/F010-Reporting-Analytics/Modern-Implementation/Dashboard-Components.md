# Dashboard Components

The Dashboard Components provide the user interface for displaying analytics data in the Hypatia Modern LMS.

## Dashboard Container

```typescript
// src/components/analytics/Dashboard.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Tabs, 
  Tab, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { RootState } from '../../store';
import { useGetDashboardMetricsQuery } from '../../api/analyticsApi';
import { DashboardHeader } from './DashboardHeader';
import { DateRangeFilter } from './filters/DateRangeFilter';
import { KpiCards } from './KpiCards';
import { ActivityTimeline } from './ActivityTimeline';
import { EngagementChart } from './charts/EngagementChart';
import { CompletionChart } from './charts/CompletionChart';
import { GradeDistribution } from './charts/GradeDistribution';
import { ResourceUsage } from './charts/ResourceUsage';

interface DashboardProps {
  courseId?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ courseId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    new Date()
  ]);
  
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const { data, isLoading, error } = useGetDashboardMetricsQuery({
    userId: currentUser?.uid || '',
    courseId,
    startDate: dateRange[0]?.toISOString(),
    endDate: dateRange[1]?.toISOString()
  }, {
    skip: !currentUser
  });
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  if (!currentUser) {
    return (
      <Container maxWidth="lg">
        <Alert severity="warning">
          Please log in to view analytics dashboard
        </Alert>
      </Container>
    );
  }
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error">
          Error loading dashboard: {error.toString()}
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <DashboardHeader 
        title={courseId ? "Course Analytics" : "My Learning Analytics"} 
        subtitle={courseId ? "Track course performance and engagement" : "Track your learning progress and activity"}
      />
      
      <Box sx={{ mb: 3 }}>
        <DateRangeFilter 
          dateRange={dateRange} 
          onChange={setDateRange} 
        />
      </Box>
      
      <KpiCards metrics={data?.metrics} />
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Overview" />
          <Tab label="Engagement" />
          <Tab label="Performance" />
          <Tab label="Resources" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <EngagementChart data={data?.engagementData} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ActivityTimeline activities={data?.recentActivities} />
              </Grid>
            </Grid>
          )}
          
          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Engagement Over Time
                </Typography>
                <EngagementChart data={data?.engagementData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Time Spent by Content Type
                </Typography>
                <ResourceUsage data={data?.resourceUsage} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Activity Completion
                </Typography>
                <CompletionChart data={data?.completionData} />
              </Grid>
            </Grid>
          )}
          
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Grade Distribution
                </Typography>
                <GradeDistribution data={data?.gradeDistribution} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Assessment Performance
                </Typography>
                <CompletionChart data={data?.assessmentData} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Performance Trends
                </Typography>
                <EngagementChart data={data?.performanceTrends} />
              </Grid>
            </Grid>
          )}
          
          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Resource Usage
                </Typography>
                <ResourceUsage data={data?.resourceUsage} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Popular Content
                </Typography>
                {/* Popular content component */}
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
```

## Dashboard Header

```typescript
// src/components/analytics/DashboardHeader.tsx
import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">Analytics</Typography>
      </Breadcrumbs>
      
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
```

## KPI Cards

```typescript
// src/components/analytics/KpiCards.tsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { 
  AccessTime as TimeIcon,
  MenuBook as ResourceIcon,
  CheckCircle as CompletionIcon,
  Grade as GradeIcon,
  Insights as EngagementIcon
} from '@mui/icons-material';

interface KpiCardsProps {
  metrics?: Record<string, any>;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics }) => {
  if (!metrics) {
    return null;
  }
  
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    
    return `${minutes}m`;
  };
  
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TimeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Time Spent
            </Typography>
          </Box>
          <Typography variant="h5">
            {formatTime(metrics.totalTimeSpent || 0)}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ResourceIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Resources Accessed
            </Typography>
          </Box>
          <Typography variant="h5">
            {metrics.resourcesAccessed || 0}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CompletionIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Completion Rate
            </Typography>
          </Box>
          <Typography variant="h5">
            {`${Math.round((metrics.completionRate || 0) * 100)}%`}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <GradeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Average Grade
            </Typography>
          </Box>
          <Typography variant="h5">
            {metrics.averageGrade ? `${Math.round(metrics.averageGrade)}%` : 'N/A'}
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <EngagementIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Engagement Score
            </Typography>
          </Box>
          <Typography variant="h5">
            {metrics.engagementScore ? Math.round(metrics.engagementScore) : 'N/A'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
```

## Date Range Filter

```typescript
// src/components/analytics/filters/DateRangeFilter.tsx
import React from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DateRangeFilterProps {
  dateRange: [Date | null, Date | null];
  onChange: (dateRange: [Date | null, Date | null]) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ dateRange, onChange }) => {
  const [preset, setPreset] = React.useState('custom');
  
  const handlePresetChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setPreset(value);
    
    const now = new Date();
    let startDate: Date | null = null;
    
    switch (value) {
      case '7days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90days':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'custom':
        // Keep current custom range
        return;
      default:
        return;
    }
    
    onChange([startDate, now]);
  };
  
  const handleStartDateChange = (date: Date | null) => {
    setPreset('custom');
    onChange([date, dateRange[1]]);
  };
  
  const handleEndDateChange = (date: Date | null) => {
    setPreset('custom');
    onChange([dateRange[0], date]);
  };
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="date-range-preset-label">Time Period</InputLabel>
        <Select
          labelId="date-range-preset-label"
          id="date-range-preset"
          value={preset}
          label="Time Period"
          onChange={handlePresetChange}
        >
          <MenuItem value="7days">Last 7 days</MenuItem>
          <MenuItem value="30days">Last 30 days</MenuItem>
          <MenuItem value="90days">Last 90 days</MenuItem>
          <MenuItem value="year">This year</MenuItem>
          <MenuItem value="custom">Custom range</MenuItem>
        </Select>
      </FormControl>
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={dateRange[0]}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} size="small" />}
          maxDate={dateRange[1] || undefined}
        />
        
        <DatePicker
          label="End Date"
          value={dateRange[1]}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} size="small" />}
          minDate={dateRange[0] || undefined}
          maxDate={new Date()}
        />
      </LocalizationProvider>
    </Box>
  );
};
```

## Activity Timeline

```typescript
// src/components/analytics/ActivityTimeline.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Paper,
  Divider
} from '@mui/material';
import { 
  MenuBook as CourseIcon,
  VideoLibrary as VideoIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Forum as ForumIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { UserActivity } from '../../types/analytics';

interface ActivityTimelineProps {
  activities?: UserActivity[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" align="center">
          No recent activities
        </Typography>
      </Paper>
    );
  }
  
  const getActivityIcon = (activity: UserActivity) => {
    switch (activity.resourceType) {
      case 'course':
        return <CourseIcon />;
      case 'video':
        return <VideoIcon />;
      case 'assignment':
        return <AssignmentIcon />;
      case 'quiz':
        return <QuizIcon />;
      case 'discussion':
        return <ForumIcon />;
      default:
        return <CourseIcon />;
    }
  };
  
  const getActivityTitle = (activity: UserActivity) => {
    const activityTypeMap: Record<string, string> = {
      'course_view': 'Viewed course',
      'video_view': 'Watched video',
      'assignment_submit': 'Submitted assignment',
      'quiz_attempt': 'Attempted quiz',
      'discussion_post': 'Posted in discussion'
    };
    
    return activityTypeMap[activity.activityType] || 'Interacted with';
  };
  
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      
      <List sx={{ width: '100%' }}>
        {activities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            {index > 0 && <Divider component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                {getActivityIcon(activity)}
              </ListItemIcon>
              <ListItemText
                primary={getActivityTitle(activity)}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {activity.resourceId}
                    </Typography>
                    <Box component="span" sx={{ display: 'block' }}>
                      {format(new Date(activity.endTime), 'PPp')}
                      {activity.duration && (
                        <span> • {Math.round(activity.duration / 60)} min</span>
                      )}
                    </Box>
                  </React.Fragment>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};
```

## Role-Specific Dashboards

### Student Dashboard

```typescript
// src/components/analytics/StudentDashboard.tsx
import React from 'react';
import { Dashboard } from './Dashboard';

export const StudentDashboard: React.FC = () => {
  return <Dashboard />;
};
```

### Instructor Dashboard

```typescript
// src/components/analytics/InstructorDashboard.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent 
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetInstructorCoursesQuery } from '../../api/coursesApi';
import { Dashboard } from './Dashboard';

export const InstructorDashboard: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const { data: courses } = useGetInstructorCoursesQuery(
    currentUser?.uid || '', 
    { skip: !currentUser }
  );
  
  const handleCourseChange = (event: SelectChangeEvent) => {
    setSelectedCourseId(event.target.value);
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="course-select-label">Select Course</InputLabel>
          <Select
            labelId="course-select-label"
            id="course-select"
            value={selectedCourseId}
            label="Select Course"
            onChange={handleCourseChange}
          >
            <MenuItem value="">All Courses</MenuItem>
            {courses?.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Dashboard courseId={selectedCourseId || undefined} />
    </Container>
  );
};
```

### Admin Dashboard

```typescript
// src/components/analytics/AdminDashboard.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Tabs, 
  Tab, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent 
} from '@mui/material';
import { useGetSystemMetricsQuery } from '../../api/analyticsApi';
import { useGetAllCoursesQuery } from '../../api/coursesApi';
import { Dashboard } from './Dashboard';
import { SystemOverview } from './admin/SystemOverview';
import { UserAnalytics } from './admin/UserAnalytics';
import { CourseComparison } from './admin/CourseComparison';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  
  const { data: systemMetrics } = useGetSystemMetricsQuery();
  const { data: courses } = useGetAllCoursesQuery();
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  const handleCourseChange = (event: SelectChangeEvent) => {
    setSelectedCourseId(event.target.value);
  };
  
  const handleUserChange = (event: SelectChangeEvent) => {
    setSelectedUserId(event.target.value);
  };
  
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Analytics Dashboard
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="System Overview" />
          <Tab label="Course Analytics" />
          <Tab label="User Analytics" />
          <Tab label="Course Comparison" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <SystemOverview metrics={systemMetrics} />
          )}
          
          {activeTab === 1 && (
            <>
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="admin-course-select-label">Select Course</InputLabel>
                  <Select
                    labelId="admin-course-select-label"
                    id="admin-course-select"
                    value={selectedCourseId}
                    label="Select Course"
                    onChange={handleCourseChange}
                  >
                    <MenuItem value="">Select a course</MenuItem>
                    {courses?.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              
              {selectedCourseId && (
                <Dashboard courseId={selectedCourseId} />
              )}
            </>
          )}
          
          {activeTab === 2 && (
            <UserAnalytics userId={selectedUserId} onUserChange={handleUserChange} />
          )}
          
          {activeTab === 3 && (
            <CourseComparison />
          )}
        </Box>
      </Paper>
    </Container>
  );
};
```
