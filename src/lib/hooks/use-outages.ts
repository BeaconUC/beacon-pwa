import { useState, useEffect } from 'react';

export interface Outage {
  id: string;
  type: 'Power' | 'Water' | 'Gas' | 'Internet' | 'Other';
  location: string;
  status: 'Active' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  coordinates?: [number, number]; // [lat, lng] for map display
  reportedAt?: string;
  estimatedRestoration?: string;
  affectedCustomers?: number;
}

export interface OutageType {
  type: 'Power' | 'Water' | 'Gas' | 'Internet' | 'Other';
  icon: string;
  count: number;
  color: 'warning' | 'info' | 'error' | 'secondary' | 'default';
  bgColor: string;
  borderColor: string;
}

export interface OutageStats {
  activeOutages: number;
  criticalOutages: number;
  highPriorityOutages: number;
  resolutionRate: number;
  avgResponseTime: string;
}

// Mock data - in a real app, this would come from an API
const mockOutages: Outage[] = [
  { 
    id: "O-001", 
    type: "Power", 
    location: "Main Street", 
    status: "Active", 
    priority: "High",
    coordinates: [16.4023, 120.5960],
    reportedAt: "2024-01-15T10:30:00Z",
    estimatedRestoration: "2024-01-15T16:00:00Z",
    affectedCustomers: 150
  },
  { 
    id: "O-002", 
    type: "Gas", 
    location: "Elm Avenue", 
    status: "Active", 
    priority: "Medium",
    coordinates: [16.4080, 120.6020],
    reportedAt: "2024-01-15T11:15:00Z",
    estimatedRestoration: "2024-01-15T14:30:00Z",
    affectedCustomers: 45
  },
  { 
    id: "O-003", 
    type: "Internet", 
    location: "Oak Lane", 
    status: "Resolved", 
    priority: "Low",
    coordinates: [16.3950, 120.5900],
    reportedAt: "2024-01-15T08:00:00Z",
    estimatedRestoration: "2024-01-15T10:30:00Z",
    affectedCustomers: 80
  },
];

export function useOutages() {
  const [outages, setOutages] = useState<Outage[]>(mockOutages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate derived data
  const activeOutages = outages.filter(outage => outage.status === 'Active');
  const resolvedOutages = outages.filter(outage => outage.status === 'Resolved');
  
  const outageTypes: OutageType[] = [
    {
      type: "Power",
      icon: "⚡",
      count: outages.filter(o => o.type === 'Power' && o.status === 'Active').length,
      color: "warning",
      bgColor: "#fff3e0",
      borderColor: "#ff9800"
    },
    {
      type: "Water",
      icon: "💧",
      count: outages.filter(o => o.type === 'Water' && o.status === 'Active').length,
      color: "info",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3"
    },
    {
      type: "Gas",
      icon: "🔥",
      count: outages.filter(o => o.type === 'Gas' && o.status === 'Active').length,
      color: "error",
      bgColor: "#ffebee",
      borderColor: "#f44336"
    },
    {
      type: "Internet",
      icon: "📱",
      count: outages.filter(o => o.type === 'Internet' && o.status === 'Active').length,
      color: "secondary",
      bgColor: "#f3e5f5",
      borderColor: "#9c27b0"
    },
    {
      type: "Other",
      icon: "⚠️",
      count: outages.filter(o => o.type === 'Other' && o.status === 'Active').length,
      color: "default",
      bgColor: "#f5f5f5",
      borderColor: "#9e9e9e"
    }
  ];

  const stats: OutageStats = {
    activeOutages: activeOutages.length,
    criticalOutages: outages.filter(o => o.priority === 'High' && o.status === 'Active').length,
    highPriorityOutages: outages.filter(o => (o.priority === 'High' || o.priority === 'Medium') && o.status === 'Active').length,
    resolutionRate: outages.length > 0 ? Math.round((resolvedOutages.length / outages.length) * 100) : 0,
    avgResponseTime: "45 min" // This would be calculated from actual data in a real app
  };

  // Simulate API call for data refresh
  const refreshOutages = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutages([...mockOutages]); // Refresh with same data for now
      setError(null);
    } catch {
      setError('Failed to refresh outages data');
    } finally {
      setLoading(false);
    }
  };

  // Get outages for map display (only active ones with coordinates)
  const getOutagesForMap = () => {
    return activeOutages.filter(outage => outage.coordinates);
  };

  useEffect(() => {
    // In a real app, this would fetch initial data
    setLoading(true);
    setTimeout(() => {
      setOutages(mockOutages);
      setLoading(false);
    }, 500);
  }, []);

  return {
    outages,
    activeOutages,
    outageTypes,
    stats,
    loading,
    error,
    refreshOutages,
    getOutagesForMap
  };
}