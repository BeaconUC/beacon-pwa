'use client';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Chip, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { Zap, Users, Settings, Truck } from "lucide-react";

function a11yProps(index: number) {
  return {
    id: `header-tab-${index}`,
    'aria-controls': `header-tabpanel-${index}`,
  };
}

export default function Header() {
  const [tabValue, setTabValue] = useState(1); // Default to dispatcher
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabLabels = [
    { label: 'Citizen', icon: <Users size={16} /> },
    { label: 'Dispatcher', icon: <Settings size={16} /> },
    { label: 'Crew', icon: <Truck size={16} /> }
  ];

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              p: 1,
              backgroundColor: 'primary.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={24} style={{ color: 'white' }} aria-hidden="true" />
              {/*<Image*/}
              {/*    src=''*/}
              {/*/>*/}
          </Box>
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Beacon
            </Typography>
            {!isMobile && (
              <Typography variant="caption" color="text.secondary">
                Real-time Utility Management & Dispatch
              </Typography>
            )}
          </Box>
        </Box>

        {/* Status and Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* System Status */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Chip
              icon={
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'success.main',
                    animation: 'pulse 1.5s infinite'
                  }}
                />
              }
              label="System Active"
              variant="outlined"
              size="small"
              sx={{
                borderColor: 'success.main',
                color: 'success.dark',
                '& .MuiChip-icon': {
                  marginLeft: 1,
                },
              }}
            />
          </Box>

          {/* Role Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="user role tabs"
            sx={{
              minHeight: 'auto',
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            {tabLabels.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                label={isMobile ? undefined : tab.label}
                iconPosition="start"
                sx={{
                  minHeight: 40,
                  minWidth: 'auto',
                  px: 2,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                  '& .MuiTab-iconWrapper': {
                    marginRight: isMobile ? 0 : 1,
                  },
                }}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}