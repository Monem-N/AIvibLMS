/**
 * Header Component
 *
 * Main application header with navigation and user menu.
 */

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from '../../contexts/AuthContext';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, toggleSidebar }) => {
  const { user, signOut } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          AIvibLMS
        </Typography>

        {/* Notifications */}
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationsMenu}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={notificationsAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
          >
            <MenuItem onClick={handleNotificationsClose}>
              New assignment in Web Development
            </MenuItem>
            <MenuItem onClick={handleNotificationsClose}>
              Your submission was graded
            </MenuItem>
            <MenuItem onClick={handleNotificationsClose}>
              New course announcement
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationsClose}>
              View all notifications
            </MenuItem>
          </Menu>

          {/* User Menu */}
          <Tooltip title="Account settings">
            <IconButton
              color="inherit"
              onClick={handleMenu}
              sx={{ ml: 1 }}
            >
              {user?.photoURL ? (
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={RouterLink}
              to="/profile"
              onClick={handleClose}
            >
              <AccountCircleIcon sx={{ mr: 1 }} />
              Profile
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to="/settings"
              onClick={handleClose}
            >
              <SettingsIcon sx={{ mr: 1 }} />
              Settings
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to="/admin-setup"
              onClick={handleClose}
            >
              <SettingsIcon sx={{ mr: 1 }} />
              Admin Setup
            </MenuItem>

            {/* Admin Dashboard - only visible to admin users */}
            {user?.role === 'admin' && (
              <MenuItem
                component={RouterLink}
                to="/admin"
                onClick={handleClose}
              >
                <SettingsIcon sx={{ mr: 1 }} />
                Admin Dashboard
              </MenuItem>
            )}

            <Divider />

            <MenuItem onClick={handleSignOut}>
              <LogoutIcon sx={{ mr: 1 }} />
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
