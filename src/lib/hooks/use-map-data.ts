import { useState, useEffect } from 'react';
import { useOutages } from './use-outages';
import { useCrews } from './use-crews';

export interface MapMarker {
  id: string;
  type: 'outage' | 'crew';
  position: [number, number]; // [lat, lng]
  title: string;
  description: string;
  status?: string;
  priority?: string;
  icon?: string;
  color?: string;
  popupContent: string;
}

export interface MapViewState {
  center: [number, number];
  zoom: number;
  bounds?: [[number, number], [number, number]];
}

export function useMapData() {
  const { outages, getOutagesForMap, loading: outagesLoading } = useOutages();
  const { crews, getCrewsForMap, loading: crewsLoading } = useCrews();
  
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [viewState, setViewState] = useState<MapViewState>({
    center: [16.4023, 120.5960], // Default center (Baguio City)
    zoom: 13
  });

  // Helper functions for marker styling - moved outside useEffect to prevent recreation
  const getOutageIcon = (type: string): string => {
    switch (type) {
      case 'Power': return '⚡';
      case 'Water': return '💧';
      case 'Gas': return '🔥';
      case 'Internet': return '📱';
      default: return '⚠️';
    }
  };

  const getOutageColor = (priority: string): string => {
    switch (priority) {
      case 'High': return '#f44336'; // red
      case 'Medium': return '#ff9800'; // orange
      case 'Low': return '#2196f3'; // blue
      default: return '#9e9e9e'; // gray
    }
  };

  const getCrewIcon = (status: string): string => {
    switch (status) {
      case 'Available': return '✅';
      case 'Dispatched': return '🚗';
      case 'Busy': return '🛠️';
      default: return '👷';
    }
  };

  const getCrewColor = (status: string): string => {
    switch (status) {
      case 'Available': return '#4caf50'; // green
      case 'Dispatched': return '#2196f3'; // blue
      case 'Busy': return '#ff9800'; // orange
      default: return '#9e9e9e'; // gray
    }
  };

  // Generate map markers from outages and crews
  useEffect(() => {
    const outageMarkers: MapMarker[] = outages
      .filter(outage => outage.coordinates)
      .map(outage => ({
        id: outage.id,
        type: 'outage',
        position: outage.coordinates!,
        title: `${outage.type} Outage`,
        description: outage.location,
        status: outage.status,
        priority: outage.priority,
        icon: getOutageIcon(outage.type),
        color: getOutageColor(outage.priority),
        popupContent: `
          <div>
            <h3>${outage.type} Outage</h3>
            <p><strong>Location:</strong> ${outage.location}</p>
            <p><strong>Status:</strong> ${outage.status}</p>
            <p><strong>Priority:</strong> ${outage.priority}</p>
            <p><strong>Affected Customers:</strong> ${outage.affectedCustomers || 'Unknown'}</p>
            <p><strong>Reported:</strong> ${new Date(outage.reportedAt || '').toLocaleString()}</p>
            ${outage.estimatedRestoration ? `<p><strong>Estimated Restoration:</strong> ${new Date(outage.estimatedRestoration).toLocaleString()}</p>` : ''}
          </div>
        `
      }));

    const crewMarkers: MapMarker[] = crews
      .filter(crew => crew.coordinates)
      .map(crew => ({
        id: crew.id,
        type: 'crew',
        position: crew.coordinates!,
        title: crew.name,
        description: crew.currentTask,
        status: crew.status,
        icon: getCrewIcon(crew.status),
        color: getCrewColor(crew.status),
        popupContent: `
          <div>
            <h3>${crew.name}</h3>
            <p><strong>Status:</strong> ${crew.status}</p>
            <p><strong>Current Task:</strong> ${crew.currentTask}</p>
            <p><strong>Vehicle:</strong> ${crew.vehicleType || 'Unknown'}</p>
            <p><strong>Crew Size:</strong> ${crew.crewSize || 'Unknown'}</p>
            <p><strong>Last Updated:</strong> ${new Date(crew.lastUpdated || '').toLocaleString()}</p>
          </div>
        `
      }));

    setMarkers([...outageMarkers, ...crewMarkers]);
  }, [outages, crews]);

  // Fit map to show all markers
  const fitToMarkers = () => {
    if (markers.length === 0) return;

    const lats = markers.map(marker => marker.position[0]);
    const lngs = markers.map(marker => marker.position[1]);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    setViewState({
      center: [(minLat + maxLat) / 2, (minLng + maxLng) / 2],
      zoom: 12,
      bounds: [[minLat, minLng], [maxLat, maxLng]]
    });
  };

  // Filter markers by type
  const getOutageMarkers = () => markers.filter(marker => marker.type === 'outage');
  const getCrewMarkers = () => markers.filter(marker => marker.type === 'crew');

  // Get marker counts
  const markerCounts = {
    outages: getOutageMarkers().length,
    crews: getCrewMarkers().length,
    total: markers.length
  };

  return {
    markers,
    outageMarkers: getOutageMarkers(),
    crewMarkers: getCrewMarkers(),
    markerCounts,
    viewState,
    setViewState,
    fitToMarkers,
    loading: outagesLoading || crewsLoading
  };
}