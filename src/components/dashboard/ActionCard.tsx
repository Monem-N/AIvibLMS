import React from 'react';
import { Paper, Box, Typography, Avatar, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  description, 
  icon, 
  buttonText, 
  buttonColor = 'primary',
  onClick 
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
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette[buttonColor].main + '15',
              color: theme.palette[buttonColor].main,
              width: 36,
              height: 36,
              mr: 1.5
            }}
          >
            {React.isValidElement(icon) 
              ? React.cloneElement(icon, { sx: { fontSize: '1.2rem' } }) 
              : icon}
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
          {description}
        </Typography>
        <Button
          variant="outlined"
          color={buttonColor}
          fullWidth
          onClick={onClick}
          sx={{
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.8125rem',
            py: 0.75
          }}
          startIcon={icon && React.isValidElement(icon) 
            ? React.cloneElement(icon, { sx: { fontSize: '1.2rem' } }) 
            : icon}
        >
          {buttonText}
        </Button>
      </Box>
    </Paper>
  );
};

export default ActionCard;
