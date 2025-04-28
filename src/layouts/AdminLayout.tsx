import React from 'react';
import { Outlet, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  IconButton,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import ContentIcon from '@mui/icons-material/Description';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Define the breadcrumb item interface
  interface BreadcrumbItem {
    name: string;
    path: string;
    icon?: React.ReactNode;
  }

  // Function to generate breadcrumb items based on current path
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(x => x);

    // Start with Dashboard
    const breadcrumbs: BreadcrumbItem[] = [
      {
        name: 'Dashboard',
        path: '/admin',
        icon: <DashboardIcon sx={{ mr: 0.5, fontSize: 18 }} />
      }
    ];

    // Add additional path segments
    if (pathnames.length > 1) {
      const lastSegment = pathnames[pathnames.length - 1];

      // Format the last segment for display (capitalize, replace hyphens with spaces)
      const formattedName = lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        name: formattedName,
        path: `/${pathnames.join('/')}`,
        icon: undefined
      });
    }

    return breadcrumbs;
  };

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Common styles for selected items
  const selectedStyle = {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  };

  const breadcrumbItems = getBreadcrumbs();

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Navigation */}
      <Box sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: '#f5f5f5',
        height: '100%',
        overflow: 'auto',
        borderRight: '1px solid #e0e0e0'
      }}>
        {/* Admin header in sidebar */}
        <Box sx={{
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center'
        }}>
          <DashboardIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Dashboard / Admin
          </Typography>
        </Box>

        <List sx={{ p: 0 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/admin"
              selected={isActive('/admin') && location.pathname === '/admin'}
              sx={{
                py: 1.5,
                '&.Mui-selected': selectedStyle
              }}
            >
              <ListItemIcon sx={{
                color: (isActive('/admin') && location.pathname === '/admin')
                  ? '#fff'
                  : 'inherit',
                minWidth: 40
              }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/admin/users"
              selected={isActive('/admin/users')}
              sx={{
                py: 1.5,
                '&.Mui-selected': selectedStyle
              }}
            >
              <ListItemIcon sx={{
                color: isActive('/admin/users')
                  ? '#fff'
                  : 'inherit',
                minWidth: 40
              }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/admin/courses"
              selected={isActive('/admin/courses')}
              sx={{
                py: 1.5,
                '&.Mui-selected': selectedStyle
              }}
            >
              <ListItemIcon sx={{
                color: isActive('/admin/courses')
                  ? '#fff'
                  : 'inherit',
                minWidth: 40
              }}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Course Management" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/admin/content"
              selected={isActive('/admin/content')}
              sx={{
                py: 1.5,
                '&.Mui-selected': selectedStyle
              }}
            >
              <ListItemIcon sx={{
                color: isActive('/admin/content')
                  ? '#fff'
                  : 'inherit',
                minWidth: 40
              }}>
                <ContentIcon />
              </ListItemIcon>
              <ListItemText primary="Content Management" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/admin/settings"
              selected={isActive('/admin/settings')}
              sx={{
                py: 1.5,
                '&.Mui-selected': selectedStyle
              }}
            >
              <ListItemIcon sx={{
                color: isActive('/admin/settings')
                  ? '#fff'
                  : 'inherit',
                minWidth: 40
              }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="System Settings" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 2 }} />

          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/dashboard"
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Back to Main Site" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main Content Area */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
        bgcolor: theme.palette.background.default
      }}>
        {/* Top AppBar */}
        <AppBar
          position="static"
          color="primary"
          elevation={0}
        >
          <Toolbar>
            {/* Back button */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => navigate('/dashboard')}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AIvibLMS Admin
            </Typography>

            {/* Home button */}
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/dashboard')}
            >
              MAIN SITE
            </Button>
          </Toolbar>
        </AppBar>

        {/* Breadcrumb navigation */}
        <Box sx={{
          bgcolor: theme.palette.background.paper,
          px: 3,
          py: 1,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return isLast ? (
                <Typography
                  key={item.path}
                  color="text.primary"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 500
                  }}
                >
                  {item.icon}
                  {item.name}
                </Typography>
              ) : (
                <Link
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      textDecoration: 'none'
                    }
                  }}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto'
          }}
        >
          {children || <Outlet />}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
