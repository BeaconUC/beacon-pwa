'use client';
import { Card, CardContent, CardHeader, Typography, Box, Stack, Chip } from '@mui/material';
import { MapPin } from "lucide-react";
import { useOutages } from '@/lib/hooks/use-outages';

export default function OutagesByType() {
  const { outageTypes, stats } = useOutages();

  const totalActive = stats.activeOutages;

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
            <Box sx={{ p: 1, bgcolor: 'primary.50', borderRadius: '50%' }}>
              <MapPin size={20} style={{ color: '#1976d2' }} />
            </Box>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Outages by Type
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current distribution across utility types
              </Typography>
            </Box>
          </Box>
        }
        sx={{ pb: 2 }}
      />
      <CardContent sx={{ '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
        <Stack spacing={2}>
          {outageTypes.map((outage) => (
            <Box
              key={outage.type}
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                <Box
                  sx={{
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    borderRadius: 2,
                    bgcolor: outage.bgColor,
                    border: `1px solid ${outage.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ fontSize: { xs: '0.875rem', sm: '1.25rem' } }}>{outage.icon}</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {outage.type}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    {outage.count === 0 ? "No active outages" : `${outage.count} active outage${outage.count !== 1 ? 's' : ''}`}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={outage.count}
                color={outage.count > 0 ? (outage.color as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning') : 'default'}
                variant={outage.count > 0 ? 'filled' : 'outlined'}
                sx={{
                  transition: 'all 0.2s ease',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            </Box>
          ))}
          
          {/* Summary section */}
          <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Total Active</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{totalActive}</Typography>
            </Box>
            <Stack spacing={1}>
              {outageTypes
                .filter(outage => outage.count > 0)
                .map((outage) => (
                  <Box key={outage.type} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: outage.borderColor,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {outage.type}
                    </Typography>
                  </Box>
                ))
              }
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}