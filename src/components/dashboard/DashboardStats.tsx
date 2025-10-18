'use client';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { TriangleAlert, Truck, TrendingUp, Clock } from "lucide-react";
import { useOutages } from '@/lib/hooks/use-outages';
import { useCrews } from '@/lib/hooks/use-crews';

export default function DashboardStats() {
  const { stats: outageStats } = useOutages();
  const { stats: crewStats } = useCrews();

  const stats = [
    {
      title: "Active Outages",
      value: outageStats.activeOutages.toString(),
      subtitle: `${outageStats.criticalOutages} critical, ${outageStats.highPriorityOutages} high priority`,
      progress: Math.min((outageStats.activeOutages / 10) * 100, 100),
      icon: <TriangleAlert size={20} />,
      color: "error" as const,
      borderColor: "error.main"
    },
    {
      title: "Available Crews",
      value: crewStats.availableCrews.toString(),
      subtitle: `${crewStats.dispatchedCrews} dispatched, ${crewStats.busyCrews} busy`,
      progress: Math.min((crewStats.utilizationRate / 100) * 100, 100),
      icon: <Truck size={20} />,
      color: "info" as const,
      borderColor: "info.main"
    },
    {
      title: "Resolution Rate",
      value: `${outageStats.resolutionRate}%`,
      subtitle: `${outageStats.activeOutages} active, ${outageStats.activeOutages + outageStats.resolutionRate} total`,
      progress: outageStats.resolutionRate,
      icon: <TrendingUp size={20} />,
      color: "success" as const,
      borderColor: "success.main"
    },
    {
      title: "Avg Response Time",
      value: crewStats.avgResponseTime,
      subtitle: "From dispatch to arrival",
      progress: null,
      icon: <Clock size={20} />,
      color: "warning" as const,
      borderColor: "warning.main"
    }
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: { xs: 2, sm: 3 }, px: { xs: 1, sm: 2 } }}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          sx={{
            transition: 'all 0.3s ease',
            borderLeft: 4,
            borderColor: stat.borderColor,
            '&:hover': {
              boxShadow: 6,
            },
            // minWidth: 0, // Allow cards to shrink below content size
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {stat.title}
              </Typography>
              <Box
                sx={{
                  p: 1,
                  borderRadius: '50%',
                  bgcolor: `${stat.color}.50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stat.icon}
              </Box>
            </Box>

            {/* Main Value */}
            <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
              {stat.value}
            </Typography>

            {/* Subtitle */}
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              {stat.subtitle}
            </Typography>

            {/* Progress or Status */}
            {stat.progress !== null ? (
              <LinearProgress
                variant="determinate"
                value={stat.progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'action.hover',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    bgcolor: `${stat.color}.main`,
                  },
                }}
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'text.secondary',
                    animation: 'pulse 1.5s infinite',
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Awaiting data
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}