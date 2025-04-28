/**
 * Administrative Dashboard
 *
 * Main dashboard for administrators to manage and monitor the entire AIvibLMS system.
 * Provides a centralized interface for content management, user administration,
 * system configuration, and performance monitoring.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  CircularProgress,
  Alert,
  useTheme,
  Avatar,
  Chip
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Description as ContentIcon,
  Storage as StorageIcon,
  Settings as SettingsIcon,
  Assessment as AnalyticsIcon,
  List as LogsIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthContext } from '../../contexts/AuthContext';
import SystemOverviewWidget from '../../components/admin/SystemOverviewWidget';
import RecentActivityWidget from '../../components/admin/RecentActivityWidget';
import UserStatsWidget from '../../components/admin/UserStatsWidget';
import CourseStatsWidget from '../../components/admin/CourseStatsWidget';
import StorageUsageWidget from '../../components/admin/StorageUsageWidget';
import SystemHealthWidget from '../../components/admin/SystemHealthWidget';
import StatsCard from '../../components/dashboard/StatsCard';
import ActionCard from '../../components/dashboard/ActionCard';

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState<any>(null);

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const auth = getAuth();
  const firestore = getFirestore();
  const theme = useTheme();

  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check if user is logged in
        if (!auth.currentUser) {
          setError('You must be logged in to access this page');
          navigate('/signin');
          return;
        }

        // Get user document from Firestore
        const userDoc = await getDoc(doc(firestore, 'users', auth.currentUser.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === 'admin') {
            setIsAdmin(true);
            await fetchSystemMetrics();
          } else {
            setError('You do not have permission to access this page');
            navigate('/unauthorized');
          }
        } else {
          setError('User profile not found');
          navigate('/unauthorized');
        }
      } catch (error: any) {
        console.error('Error checking admin status:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [auth, firestore, navigate]);

  const fetchSystemMetrics = async () => {
    try {
      // Get user count
      const usersQuery = query(collection(firestore, 'users'));
      const userSnapshot = await getDocs(usersQuery);
      const totalUsers = userSnapshot.size;

      // Get admin count
      const adminsQuery = query(collection(firestore, 'users'), where('role', '==', 'admin'));
      const adminSnapshot = await getDocs(adminsQuery);
      const totalAdmins = adminSnapshot.size;

      // Get student count
      const studentsQuery = query(collection(firestore, 'users'), where('role', '==', 'student'));
      const studentSnapshot = await getDocs(studentsQuery);
      const totalStudents = studentSnapshot.size;

      // Get instructor count
      const instructorsQuery = query(collection(firestore, 'users'), where('role', '==', 'instructor'));
      const instructorSnapshot = await getDocs(instructorsQuery);
      const totalInstructors = instructorSnapshot.size;

      // Get course count
      const coursesQuery = query(collection(firestore, 'courses'));
      const courseSnapshot = await getDocs(coursesQuery);
      const totalCourses = courseSnapshot.size;

      // Get content count (simplified)
      const contentQuery = query(collection(firestore, 'content'));
      const contentSnapshot = await getDocs(contentQuery);
      const totalContent = contentSnapshot.size;

      // Set system metrics
      setSystemMetrics({
        users: {
          total: totalUsers,
          admins: totalAdmins,
          students: totalStudents,
          instructors: totalInstructors
        },
        courses: {
          total: totalCourses,
          active: totalCourses, // Simplified
          archived: 0 // Simplified
        },
        content: {
          total: totalContent
        },
        storage: {
          used: '2.3 GB', // Placeholder
          total: '10 GB', // Placeholder
          percentage: 23 // Placeholder
        },
        system: {
          status: 'Healthy', // Placeholder
          uptime: '99.9%', // Placeholder
          lastBackup: new Date().toISOString() // Placeholder
        }
      });
    } catch (error) {
      console.error('Error fetching system metrics:', error);
    }
  };

  if (loading) {
    return (
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <DashboardIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 1.5 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                Administrative Dashboard
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ ml: 0.5 }}>
              Loading dashboard content...
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
              py: 8
            }}
          >
            <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
              Loading Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we fetch the latest data...
            </Typography>
          </Box>
        </Container>
    );
  }

  if (!isAdmin) {
    return (
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <DashboardIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 1.5 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                Administrative Dashboard
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ ml: 0.5 }}>
              Access restricted
            </Typography>
          </Box>

          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 2,
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.error.main + '15',
                color: theme.palette.error.main,
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2
              }}
            >
              <SettingsIcon fontSize="large" />
            </Avatar>

            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              Access Denied
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {error || 'You do not have permission to access this page. Administrator privileges are required.'}
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/dashboard')}
              startIcon={<DashboardIcon />}
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 500,
                px: 3
              }}
            >
              Back to Dashboard
            </Button>
          </Paper>
        </Container>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        {/* Page header */}
        <Box sx={{ mb: theme.spacing(3) }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: theme.spacing(1) }}>
            <DashboardIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: theme.spacing(1) }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              Administrative Dashboard
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 0 }}>
            Welcome to the administrative dashboard. Here you can manage users, courses,
            content, and system settings.
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 1,
                '& .MuiAlert-icon': {
                  alignItems: 'center'
                }
              }}
            >
              {error}
            </Alert>
          )}
        </Box>

        {/* Quick Stats Cards */}
        <Grid container spacing={2} sx={{ mb: theme.spacing(3) }}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StatsCard
              title="Total Users"
              value={systemMetrics?.users?.total || 0}
              subtitle={`${systemMetrics?.users?.active || 0} active users`}
              icon={<PeopleIcon />}
              color="primary"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StatsCard
              title="Total Courses"
              value={systemMetrics?.courses?.total || 0}
              subtitle={`${systemMetrics?.courses?.active || 0} active courses`}
              icon={<SchoolIcon />}
              color="secondary"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StatsCard
              title="Storage Used"
              value={systemMetrics?.storage?.used || '0 GB'}
              subtitle={`${systemMetrics?.storage?.percentage || 0}% of ${systemMetrics?.storage?.total || '0 GB'}`}
              icon={<StorageIcon />}
              color="success"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StatsCard
              title="System Status"
              value={systemMetrics?.system?.status || 'Operational'}
              subtitle={`Uptime: ${systemMetrics?.system?.uptime || '99.9%'}`}
              icon={<SettingsIcon />}
              color="info"
            />
          </Grid>
        </Grid>

        {/* Main Dashboard Sections */}
        <Grid container spacing={2} sx={{ mb: theme.spacing(3) }}>
          {/* System Overview Section */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper
              elevation={2}
              sx={{
                p: 0,
                borderRadius: theme.shape.borderRadius * 2,
                overflow: 'hidden',
                height: '100%',
                boxShadow: theme.shadows[1]
              }}
            >
              <Box sx={{
                p: theme.spacing(2),
                pb: theme.spacing(1.5),
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper
              }}>
                <DashboardIcon sx={{ color: theme.palette.primary.main, mr: theme.spacing(1.5) }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  System Overview
                </Typography>
              </Box>

              <Box sx={{ p: theme.spacing(2) }}>
                {systemMetrics ? (
                  <SystemOverviewWidget metrics={systemMetrics} />
                ) : (
                  <Box sx={{ p: theme.spacing(3), textAlign: 'center' }}>
                    <CircularProgress size={40} sx={{ mb: theme.spacing(2) }} />
                    <Typography variant="body1" color="text.secondary">
                      Loading system metrics...
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Recent Activity Section */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper
              elevation={2}
              sx={{
                p: 0,
                borderRadius: theme.shape.borderRadius * 2,
                overflow: 'hidden',
                height: '100%',
                boxShadow: theme.shadows[1]
              }}
            >
              <Box sx={{
                p: theme.spacing(2),
                pb: theme.spacing(1.5),
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper
              }}>
                <NotificationsIcon sx={{ color: theme.palette.secondary.main, mr: theme.spacing(1.5) }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Activity
                </Typography>
              </Box>

              <Box sx={{ p: 0, height: 'calc(100% - 56px)', overflow: 'auto' }}>
                <RecentActivityWidget />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Detailed Statistics and System Health Section */}
        <Grid container spacing={2} sx={{ mb: theme.spacing(3) }}>
          {/* Detailed Statistics */}
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={2}
              sx={{
                p: 0,
                borderRadius: theme.shape.borderRadius * 2,
                overflow: 'hidden',
                boxShadow: theme.shadows[1],
                height: '100%'
              }}
            >
              <Box sx={{
                p: theme.spacing(1.5),
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper
              }}>
                <AnalyticsIcon sx={{ color: theme.palette.secondary.main, mr: theme.spacing(1) }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Detailed Statistics
                </Typography>
              </Box>

              <Box sx={{ p: theme.spacing(1.5) }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <UserStatsWidget metrics={systemMetrics?.users} />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <CourseStatsWidget metrics={systemMetrics?.courses} />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <StorageUsageWidget metrics={systemMetrics?.storage} />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* System Health Section */}
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={2}
              sx={{
                p: 0,
                borderRadius: theme.shape.borderRadius * 2,
                overflow: 'hidden',
                boxShadow: theme.shadows[1],
                height: '100%'
              }}
            >
              <Box sx={{
                p: theme.spacing(1.5),
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper
              }}>
                <SettingsIcon sx={{ color: theme.palette.success.main, mr: theme.spacing(1) }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  System Health
                </Typography>
              </Box>

              <Box sx={{ p: theme.spacing(1.5) }}>
                <SystemHealthWidget metrics={systemMetrics?.system} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Admin Actions Section */}
        <Box sx={{ mb: theme.spacing(3) }}>
          <Paper
            elevation={2}
            sx={{
              p: 0,
              borderRadius: theme.shape.borderRadius * 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[1]
            }}
          >
            <Box sx={{
              p: theme.spacing(1.5),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DashboardIcon sx={{ color: theme.palette.info.main, mr: theme.spacing(1) }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Administrative Actions
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  py: theme.spacing(0.5)
                }}
              >
                View All
              </Button>
            </Box>

            <Box sx={{ p: theme.spacing(1.5) }}>
              <Grid container spacing={2}>
                {/* User Management */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 0,
                      borderRadius: theme.shape.borderRadius * 2,
                      height: '100%',
                      overflow: 'hidden',
                      boxShadow: theme.shadows[1],
                      transition: theme.transitions.create(['transform', 'box-shadow'], {
                        duration: theme.transitions.duration.standard,
                      }),
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[4]
                      }
                    }}
                  >
                    <Box sx={{ p: theme.spacing(2) }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: theme.spacing(1.5) }}>
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.primary.main + '15',
                            color: theme.palette.primary.main,
                            width: 36,
                            height: 36,
                            mr: theme.spacing(1.5)
                          }}
                        >
                          <PeopleIcon sx={{ fontSize: '1.2rem' }} />
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          User Management
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: theme.spacing(1.5), fontSize: '0.875rem' }}>
                        Manage users, roles, and permissions. Create, edit, or deactivate user accounts.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => navigate('/admin/users')}
                        sx={{
                          borderRadius: theme.shape.borderRadius,
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: '0.8125rem',
                          py: theme.spacing(0.75)
                        }}
                        startIcon={<PeopleIcon sx={{ fontSize: '1.2rem' }} />}
                      >
                        Manage Users
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                {/* Course Management */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 0,
                      borderRadius: 2,
                      height: '100%',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.secondary.main + '15',
                            color: theme.palette.secondary.main,
                            width: 36,
                            height: 36,
                            mr: 1.5
                          }}
                        >
                          <SchoolIcon sx={{ fontSize: '1.2rem' }} />
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Course Management
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                        Manage courses, enrollments, and course content. Create, edit, or archive courses.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => navigate('/admin/courses')}
                        sx={{
                          borderRadius: 1,
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: '0.8125rem',
                          py: 0.75
                        }}
                        startIcon={<SchoolIcon sx={{ fontSize: '1.2rem' }} />}
                      >
                        Manage Courses
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                {/* Content Management */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 0,
                      borderRadius: 2,
                      height: '100%',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.success.main + '15',
                            color: theme.palette.success.main,
                            width: 36,
                            height: 36,
                            mr: 1.5
                          }}
                        >
                          <ContentIcon sx={{ fontSize: '1.2rem' }} />
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Content Management
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                        Manage content such as pages, posts, and announcements. Create, edit, or delete content.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="success"
                        fullWidth
                        onClick={() => navigate('/admin/content')}
                        sx={{
                          borderRadius: 1,
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: '0.8125rem',
                          py: 0.75
                        }}
                        startIcon={<ContentIcon sx={{ fontSize: '1.2rem' }} />}
                      >
                        Manage Content
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                {/* File Management */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 0,
                      borderRadius: 2,
                      height: '100%',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.info.main + '15',
                            color: theme.palette.info.main,
                            width: 36,
                            height: 36,
                            mr: 1.5
                          }}
                        >
                          <StorageIcon sx={{ fontSize: '1.2rem' }} />
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          File Management
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                        Manage files and media. Upload, organize, and delete files. Monitor storage usage.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="info"
                        fullWidth
                        onClick={() => navigate('/admin/files')}
                        sx={{
                          borderRadius: 1,
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: '0.8125rem',
                          py: 0.75
                        }}
                        startIcon={<StorageIcon sx={{ fontSize: '1.2rem' }} />}
                      >
                        Manage Files
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                {/* System Settings */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 0,
                      borderRadius: 2,
                      height: '100%',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.warning.main + '15',
                            color: theme.palette.warning.main,
                            width: 36,
                            height: 36,
                            mr: 1.5
                          }}
                        >
                          <SettingsIcon sx={{ fontSize: '1.2rem' }} />
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          System Settings
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                        Configure system settings, manage integrations, and view system logs.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="warning"
                        fullWidth
                        onClick={() => navigate('/admin/settings')}
                        sx={{
                          borderRadius: 1,
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: '0.8125rem',
                          py: 0.75
                        }}
                        startIcon={<SettingsIcon sx={{ fontSize: '1.2rem' }} />}
                      >
                        System Settings
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                {/* Analytics */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 0,
                      borderRadius: 2,
                      height: '100%',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.error.main + '15',
                            color: theme.palette.error.main,
                            width: 36,
                            height: 36,
                            mr: 1.5
                          }}
                        >
                          <AnalyticsIcon sx={{ fontSize: '1.2rem' }} />
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Analytics
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                        View system analytics, user activity, and course statistics. Generate reports.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() => navigate('/admin/analytics')}
                        sx={{
                          borderRadius: 1,
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: '0.8125rem',
                          py: 0.75
                        }}
                        startIcon={<AnalyticsIcon sx={{ fontSize: '1.2rem' }} />}
                      >
                        View Analytics
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
