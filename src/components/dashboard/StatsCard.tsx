import React from 'react';
import { Paper, Box, Typography, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = 'primary' 
}) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={2}
      sx={{
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 1.5,
        backgroundColor: theme.palette[color].main + '08',
        borderBottom: `1px solid ${theme.palette[color].main}15`
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette[color].main }}>
          {title}
        </Typography>
        <Avatar
          sx={{
            bgcolor: theme.palette[color].main + '15',
            color: theme.palette[color].main,
            width: 28,
            height: 28
          }}
        >
          {React.isValidElement(icon) 
            ? React.cloneElement(icon, { sx: { fontSize: '1rem' } }) 
            : icon}
        </Avatar>
      </Box>
      <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 700, 
            color: theme.palette[color].main, 
            mb: 0.5 
          }}
        >
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatsCard;
