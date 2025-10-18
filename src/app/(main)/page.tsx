'use client';
import Link from "next/link";
import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material';
import { Bolt, Map, BarChart3, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        {/* Hero Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 3,
            }}
          >
            Smart Outage Manager
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Efficient outage reporting and dispatch system with GIS maps and real-time analytics for utilities.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              href="/auth/login"
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Login
            </Button>
            <Button
              component={Link}
              href="/auth/signup"
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>

        {/* Features Grid */}
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 600 }}>
            Key Features
          </Typography>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{ mb: 8 }}
          >
            {[
              {
                icon: <Bolt size={40} style={{ color: '#1976d2' }} />,
                title: 'Real-time Monitoring',
                description: 'Live tracking of outages and crew movements'
              },
              {
                icon: <Map size={40} style={{ color: '#1976d2' }} />,
                title: 'GIS Integration',
                description: 'Interactive maps with outage visualization'
              },
              {
                icon: <BarChart3 size={40} style={{ color: '#1976d2' }} />,
                title: 'Advanced Analytics',
                description: 'Predictive insights and performance metrics'
              },
              {
                icon: <Shield size={40} style={{ color: '#1976d2' }} />,
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security and reliability'
              }
            ].map((feature, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  p: 3,
                  flex: 1,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    elevation: 6,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* Stats Section */}
        <Paper
          elevation={1}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: '800px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="space-around">
            {[
              { value: '99.9%', label: 'Uptime' },
              { value: '< 30min', label: 'Avg Response' },
              { value: '24/7', label: 'Support' },
              { value: '1000+', label: 'Users' }
            ].map((stat, index) => (
              <Box key={index} textAlign="center">
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}