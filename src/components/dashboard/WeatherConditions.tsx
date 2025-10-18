'use client';
import { Card, CardContent, CardHeader, Typography, TextField, Button, Box, Chip, Stack } from '@mui/material';
import { Cloud, Search, MapPin, Thermometer, Droplets, Wind, Eye, Sunrise, Sunset } from "lucide-react";
import Image from 'next/image';

export default function WeatherConditions() {
  const weatherData = {
    location: "New York, US",
    temperature: 16,
    condition: "clear sky",
    feelsLike: 16,
    icon: "https://openweathermap.org/img/wn/01n@2x.png",
    details: {
      tempRange: "16°C - 16°C",
      humidity: "75%",
      wind: "1.49 m/s WNW",
      visibility: "10.0 km",
      pressure: "1024 hPa",
      cloudiness: "5%",
      sunrise: "06:56 AM",
      sunset: "06:31 PM"
    }
  };

  const weatherMetrics = [
    {
      icon: <Thermometer size={20} style={{ color: '#d32f2f' }} />,
      label: 'Temperature',
      value: weatherData.details.tempRange,
      color: '#d32f2f'
    },
    {
      icon: <Droplets size={20} style={{ color: '#1976d2' }} />,
      label: 'Humidity',
      value: weatherData.details.humidity,
      color: '#1976d2'
    },
    {
      icon: <Wind size={20} style={{ color: '#2e7d32' }} />,
      label: 'Wind',
      value: weatherData.details.wind,
      color: '#2e7d32'
    },
    {
      icon: <Eye size={20} style={{ color: '#7b1fa2' }} />,
      label: 'Visibility',
      value: weatherData.details.visibility,
      color: '#7b1fa2'
    }
  ];

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
              <Cloud size={20} style={{ color: '#1976d2' }} />
            </Box>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Weather Conditions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time weather monitoring
              </Typography>
            </Box>
          </Box>
        }
        action={
          <Chip
            label="Correlate with outages"
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        }
        sx={{ pb: 2 }}
      />
      <CardContent sx={{ '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
        <Stack spacing={3}>
          {/* Search Bar */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Search city..."
              size="small"
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }
              }}
            />
            <Button variant="contained" size="small" sx={{ minWidth: 'auto', px: { xs: 1.5, sm: 2 } }}>
              <Search size={16} />
            </Button>
          </Box>

          {/* Current Weather */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #e3f2fd 0%, #b3e5fc 100%)',
              borderRadius: 3,
              p: { xs: 2, sm: 3 },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MapPin size={16} style={{ color: 'text.secondary' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {weatherData.location}
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 300, fontSize: { xs: '2rem', sm: '3rem' } }}>
                  {weatherData.temperature}°C
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  {weatherData.condition}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Feels like {weatherData.feelsLike}°C
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Image
                  alt={weatherData.condition}
                  width={80}
                  height={80}
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                  src={weatherData.icon}
                />
              </Box>
            </Box>
          </Box>

          {/* Weather Details Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {weatherMetrics.map((metric, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 1.5, sm: 2 },
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  bgcolor: 'action.hover',
                }}
              >
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${metric.color}15` }}>
                  {metric.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    {metric.label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    {metric.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Additional Weather Info */}
          <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 2, sm: 3 } }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Pressure</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{weatherData.details.pressure}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Cloudiness</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{weatherData.details.cloudiness}</Typography>
                </Box>
              </Stack>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Sunrise size={16} style={{ color: '#ff9800' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Sunrise</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{weatherData.details.sunrise}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Sunset size={16} style={{ color: '#9c27b0' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Sunset</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{weatherData.details.sunset}</Typography>
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* Weather Alert */}
          <Chip
            icon={
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main', animation: 'pulse 1.5s infinite' }} />
            }
            label="Weather conditions optimal for outage response"
            variant="outlined"
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              bgcolor: 'warning.light',
              color: 'warning.dark',
              borderColor: 'warning.main',
              py: 1.5,
              '& .MuiChip-label': {
                fontSize: '0.875rem',
              },
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}