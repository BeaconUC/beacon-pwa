'use client';
import { Theme, SxProps } from '@mui/material/styles';

/**
 * Reusable Material UI component patterns for the Beacon application
 */

// Card patterns
export const cardStyles = {
  hover: {
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: 6,
    },
  } as SxProps<Theme>,
  elevated: {
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: 3,
  } as SxProps<Theme>,
};

// Button patterns
export const buttonStyles = {
  primary: {
    borderRadius: 2,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  } as SxProps<Theme>,
  outlined: {
    borderRadius: 2,
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
    },
  } as SxProps<Theme>,
};

// Table patterns
export const tableStyles = {
  header: {
    fontWeight: 600,
    backgroundColor: 'action.hover',
  } as SxProps<Theme>,
  row: {
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  } as SxProps<Theme>,
};

// Chip patterns for status indicators
export const chipStyles = {
  status: {
    success: {
      bgcolor: 'success.light',
      color: 'success.dark',
      borderColor: 'success.main',
    } as SxProps<Theme>,
    warning: {
      bgcolor: 'warning.light',
      color: 'warning.dark',
      borderColor: 'warning.main',
    } as SxProps<Theme>,
    error: {
      bgcolor: 'error.light',
      color: 'error.dark',
      borderColor: 'error.main',
    } as SxProps<Theme>,
    info: {
      bgcolor: 'info.light',
      color: 'info.dark',
      borderColor: 'info.main',
    } as SxProps<Theme>,
  },
  priority: {
    high: {
      bgcolor: 'error.main',
      color: 'error.contrastText',
    } as SxProps<Theme>,
    medium: {
      bgcolor: 'warning.main',
      color: 'warning.contrastText',
    } as SxProps<Theme>,
    low: {
      bgcolor: 'info.main',
      color: 'info.contrastText',
    } as SxProps<Theme>,
  },
};

// Layout patterns
export const layoutStyles = {
  container: {
    py: 4,
  } as SxProps<Theme>,
  section: {
    mb: 4,
  } as SxProps<Theme>,
  grid: {
    container: {
      display: 'grid',
      gap: 3,
    } as SxProps<Theme>,
    twoColumn: {
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
    } as SxProps<Theme>,
    threeColumn: {
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
    } as SxProps<Theme>,
  },
};

// Typography patterns
export const typographyStyles = {
  hero: {
    fontSize: { xs: '2.5rem', md: '4rem' },
    fontWeight: 700,
    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    mb: 3,
  } as SxProps<Theme>,
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    mb: 2,
  } as SxProps<Theme>,
  cardTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
  } as SxProps<Theme>,
};

// Utility functions
export const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
  switch (status.toLowerCase()) {
    case 'available':
    case 'resolved':
    case 'success':
      return 'success';
    case 'dispatched':
    case 'medium':
    case 'info':
      return 'info';
    case 'busy':
    case 'warning':
      return 'warning';
    case 'active':
    case 'high':
    case 'error':
      return 'error';
    default:
      return 'default';
  }
};

export const getStatusVariant = (status: string): 'filled' | 'outlined' => {
  switch (status.toLowerCase()) {
    case 'available':
    case 'active':
    case 'high':
      return 'filled';
    case 'dispatched':
    case 'medium':
    case 'resolved':
      return 'outlined';
    default:
      return 'outlined';
  }
};

// Icon wrapper styles
export const iconStyles = {
  small: {
    p: 1,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,
  medium: {
    p: 1.5,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,
  large: {
    p: 2,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,
};

// Gradient backgrounds
export const gradientStyles = {
  primary: {
    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
  } as SxProps<Theme>,
  secondary: {
    background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
  } as SxProps<Theme>,
  success: {
    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
  } as SxProps<Theme>,
  warning: {
    background: 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)',
  } as SxProps<Theme>,
  light: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  } as SxProps<Theme>,
};