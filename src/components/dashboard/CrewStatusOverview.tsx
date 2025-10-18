'use client';
import { Card, CardContent, CardHeader, Typography, Box, Stack, LinearProgress, Chip } from '@mui/material';
import { Users } from "lucide-react";
import { useCrews } from '@/lib/hooks/use-crews';

export default function CrewStatusOverview() {
  const { crewStatuses, stats } = useCrews();

  const totalCrews = stats.totalCrews;
  const utilizationRate = stats.utilizationRate;

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'success': return '#2e7d32';
      case 'info': return '#0288d1';
      case 'warning': return '#ed6c02';
      default: return '#757575';
    }
  };

  const getStatusBgColor = (color: string) => {
    switch (color) {
      case 'success': return '#e8f5e9';
      case 'info': return '#e3f2fd';
      case 'warning': return '#fff3e0';
      default: return '#f5f5f5';
    }
  };

  return (
    <Card
      sx={{
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
        },
        minWidth: 0, // Allow card to shrink below content size
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1, bgcolor: 'secondary.50', borderRadius: '50%' }}>
              <Users size={20} style={{ color: '#9c27b0' }} />
            </Box>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Crew Status Overview
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time crew availability and assignments
              </Typography>
            </Box>
          </Box>
        }
        sx={{ pb: 2 }}
      />
      <CardContent sx={{ '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
        <Stack spacing={3}>
          {/* Crew Status List */}
          <Stack spacing={2}>
            {crewStatuses.map((status) => (
              <Box
                key={status.status}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, flex: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: getStatusColor(status.color),
                      boxShadow: 1,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {status.status}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      {status.description}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={status.count}
                  size="medium"
                  sx={{
                    minWidth: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    borderRadius: 4,
                    fontSize: { xs: '0.875rem', sm: '1.125rem' },
                    fontWeight: 600,
                    bgcolor: status.count > 0 ? getStatusBgColor(status.color) : 'action.disabledBackground',
                    color: status.count > 0 ? getStatusColor(status.color) : 'text.disabled',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>

          {/* Utilization Progress */}
          <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Crew Utilization
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {utilizationRate}% of crews actively working
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {utilizationRate}%
              </Typography>
            </Box>
            
            {/* Progress Bar */}
            <LinearProgress
              variant="determinate"
              value={utilizationRate}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  bgcolor: 'primary.main',
                },
              }}
            />
            
            {/* Progress Indicators */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">0%</Typography>
              <Typography variant="caption" color="text.secondary">50%</Typography>
              <Typography variant="caption" color="text.secondary">100%</Typography>
            </Box>
          </Box>

          {/* Quick Stats */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: { xs: 1.5, sm: 2 }, pt: 1 }}>
            <Box
              sx={{
                textAlign: 'center',
                p: { xs: 1.5, sm: 2 },
                borderRadius: 2,
                bgcolor: 'action.hover',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {totalCrews}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Total Crews
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                p: { xs: 1.5, sm: 2 },
                borderRadius: 2,
                bgcolor: 'action.hover',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                0
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Avg Response
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}