import { useState, useEffect } from 'react';

export interface Crew {
  id: string;
  name: string;
  status: 'Available' | 'Dispatched' | 'Busy';
  currentTask: string;
  coordinates?: [number, number]; // [lat, lng] for map display
  assignedOutageId?: string;
  lastUpdated?: string;
  vehicleType?: string;
  crewSize?: number;
}

export interface CrewStatus {
  status: 'Available' | 'Dispatched' | 'Busy';
  count: number;
  color: 'success' | 'info' | 'warning';
  description: string;
}

export interface CrewStats {
  totalCrews: number;
  availableCrews: number;
  dispatchedCrews: number;
  busyCrews: number;
  utilizationRate: number;
  avgResponseTime: string;
}

// Mock data - in a real app, this would come from an API
const mockCrews: Crew[] = [
  { 
    id: "C-001", 
    name: "Alpha Team", 
    status: "Available", 
    currentTask: "None",
    coordinates: [16.4050, 120.5980],
    vehicleType: "Utility Truck",
    crewSize: 4,
    lastUpdated: "2024-01-15T12:00:00Z"
  },
  { 
    id: "C-002", 
    name: "Bravo Team", 
    status: "Dispatched", 
    currentTask: "Power Outage - Main St",
    coordinates: [16.4030, 120.5970],
    assignedOutageId: "O-001",
    vehicleType: "Bucket Truck",
    crewSize: 3,
    lastUpdated: "2024-01-15T11:45:00Z"
  },
  { 
    id: "C-003", 
    name: "Charlie Team", 
    status: "Busy", 
    currentTask: "Gas Leak - Elm Ave",
    coordinates: [16.4085, 120.6015],
    assignedOutageId: "O-002",
    vehicleType: "Emergency Response",
    crewSize: 5,
    lastUpdated: "2024-01-15T11:30:00Z"
  },
  { 
    id: "C-004", 
    name: "Delta Team", 
    status: "Available", 
    currentTask: "None",
    coordinates: [16.4000, 120.5950],
    vehicleType: "Service Van",
    crewSize: 2,
    lastUpdated: "2024-01-15T12:15:00Z"
  },
];

export function useCrews() {
  const [crews, setCrews] = useState<Crew[]>(mockCrews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate derived data
  const crewStatuses: CrewStatus[] = [
    {
      status: "Available",
      count: crews.filter(crew => crew.status === 'Available').length,
      color: "success",
      description: "Ready for assignment"
    },
    {
      status: "Dispatched",
      count: crews.filter(crew => crew.status === 'Dispatched').length,
      color: "info",
      description: "En route to site"
    },
    {
      status: "Busy",
      count: crews.filter(crew => crew.status === 'Busy').length,
      color: "warning",
      description: "Currently working"
    }
  ];

  const totalCrews = crews.length;
  const availableCrews = crewStatuses.find(s => s.status === 'Available')?.count || 0;
  const utilizationRate = totalCrews > 0 ? Math.round(((totalCrews - availableCrews) / totalCrews) * 100) : 0;

  const stats: CrewStats = {
    totalCrews,
    availableCrews,
    dispatchedCrews: crewStatuses.find(s => s.status === 'Dispatched')?.count || 0,
    busyCrews: crewStatuses.find(s => s.status === 'Busy')?.count || 0,
    utilizationRate,
    avgResponseTime: "32 min" // This would be calculated from actual data in a real app
  };

  // Simulate API call for data refresh
  const refreshCrews = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCrews([...mockCrews]); // Refresh with same data for now
      setError(null);
    } catch {
      setError('Failed to refresh crews data');
    } finally {
      setLoading(false);
    }
  };

  // Get crews for map display (only those with coordinates)
  const getCrewsForMap = () => {
    return crews.filter(crew => crew.coordinates);
  };

  // Get crew by ID
  const getCrewById = (id: string) => {
    return crews.find(crew => crew.id === id);
  };

  // Update crew status
  const updateCrewStatus = (crewId: string, status: Crew['status'], task?: string) => {
    setCrews(prevCrews => 
      prevCrews.map(crew => 
        crew.id === crewId 
          ? { 
              ...crew, 
              status, 
              currentTask: task || crew.currentTask,
              lastUpdated: new Date().toISOString()
            }
          : crew
      )
    );
  };

  useEffect(() => {
    // In a real app, this would fetch initial data
    setLoading(true);
    setTimeout(() => {
      setCrews(mockCrews);
      setLoading(false);
    }, 500);
  }, []);

  return {
    crews,
    crewStatuses,
    stats,
    loading,
    error,
    refreshCrews,
    getCrewsForMap,
    getCrewById,
    updateCrewStatus
  };
}