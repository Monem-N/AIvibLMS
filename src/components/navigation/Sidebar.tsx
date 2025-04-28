/**
 * Sidebar Component
 *
 * Application sidebar with navigation links.
 */

import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  ListItemButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { useAuthContext } from '../../contexts/AuthContext';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const location = useLocation();
  const { user } = useAuthContext();

  const isInstructor = user?.role === 'instructor' || user?.role === 'admin';

  const drawerWidth = 240;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'fixed',
          height: '100vh',
          zIndex: 1000,
        },
      }}
    >
      <Toolbar /> {/* Spacer for fixed header */}

      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Dashboard */}
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/dashboard"
              selected={isActive('/dashboard')}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* Courses */}
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/courses"
              selected={isActive('/courses')}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
          </ListItem>

          {/* Assignments (for instructors) */}
          {isInstructor && (
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/assignments"
                selected={isActive('/assignments')}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Assignments" />
              </ListItemButton>
            </ListItem>
          )}

          {/* Users (for admins) */}
          {user?.role === 'admin' && (
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/users"
                selected={isActive('/users')}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
          )}

          {/* Admin Dashboard (for admins) */}
          {user?.role === 'admin' && (
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/admin"
                selected={isActive('/admin')}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItemButton>
            </ListItem>
          )}
        </List>

        <Divider />

        <List>
          {/* Settings */}
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/settings"
              selected={isActive('/settings')}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>

          {/* Help */}
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/help"
              selected={isActive('/help')}
            >
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItemButton>
          </ListItem>

          {/* File Upload Test */}
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/test/file-upload"
              selected={isActive('/test/file-upload')}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="File Upload Test" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
