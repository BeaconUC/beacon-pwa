'use client';
import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper, useTheme, useMediaQuery } from '@mui/material';
import { ChartColumn, Map, TriangleAlert, Truck } from "lucide-react";
import DynamicMap from "../../components/DynamicMap";
import DashboardStats from "../../components/dashboard/DashboardStats";
import OutagesByType from "../../components/dashboard/OutagesByType";
import CrewStatusOverview from "../../components/dashboard/CrewStatusOverview";
import WeatherConditions from "../../components/dashboard/WeatherConditions";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

export default function DashboardPage() {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabLabels = [
    { label: 'Dashboard', icon: <ChartColumn size={20} /> },
    { label: 'Live Map', icon: <Map size={20} /> },
    { label: 'Outages', icon: <TriangleAlert size={20} /> },
    { label: 'Crews', icon: <Truck size={20} /> }
  ];

  return (
    <Box>
      {/* Header */}
      {/*<Box sx={{ mb: 4 }}>*/}
      {/*  <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>*/}
      {/*    Dashboard Overview*/}
      {/*  </Typography>*/}
      {/*  <Typography variant="body1" color="text.secondary">*/}
      {/*    Monitor outages, crew status, and weather conditions in real-time*/}
      {/*  </Typography>*/}
      {/*</Box>*/}

      {/* Tabs */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="dashboard tabs"
            variant="fullWidth"
          >
            {tabLabels.map((tab, index) => (
              <Tab
                key={index}
                icon={isMobile ? undefined : tab.icon}
                label={tab.label}
                iconPosition="start"
                sx={{
                  minHeight: 60,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                }}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>

        {/* Dashboard Tab */}
        <TabPanel value={tabValue} index={0}>
          <DashboardStats />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, pt: 3, px: 2 }}>
            <Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <OutagesByType />
                </Box>
                <Box>
                  <CrewStatusOverview />
                </Box>
              </Box>
            </Box>
            <Box>
              <WeatherConditions />
            </Box>
          </Box>
        </TabPanel>

        {/* Live Map Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ height: '60vh', minHeight: 500 }}>
            <DynamicMap />
          </Box>
        </TabPanel>

        {/* Outages Tab */}
        <TabPanel value={tabValue} index={2}>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TriangleAlert size={48} style={{ color: 'text.secondary', marginBottom: 16 }} />
            <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
              Outage Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Detailed view of all active and resolved outages
            </Typography>
          </Paper>
        </TabPanel>

        {/* Crews Tab */}
        <TabPanel value={tabValue} index={3}>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Truck size={48} style={{ color: 'text.secondary', marginBottom: 16 }} />
            <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
              Crew Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage crew assignments, status, and dispatch
            </Typography>
          </Paper>
        </TabPanel>
      </Box>
    </Box>
  );
}