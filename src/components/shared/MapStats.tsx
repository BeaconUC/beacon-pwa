'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useMapData } from '@/lib/hooks/use-map-data';

interface MapStatsProps {
  position?: 'topright' | 'topleft' | 'bottomright' | 'bottomleft';
}

export default function MapStats({ position = 'topleft' }: MapStatsProps) {
  const map = useMap();
  const { markerCounts } = useMapData();

  useEffect(() => {
    // Create control using the correct Leaflet method
    const statsControl = new L.Control({ position });

    statsControl.onAdd = () => {
      const div = L.DomUtil.create('div', 'info stats');
      div.style.backgroundColor = 'white';
      div.style.padding = '8px';
      div.style.borderRadius = '5px';
      div.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';
      div.style.fontSize = '11px';
      div.style.lineHeight = '16px';
      div.style.minWidth = window.innerWidth < 768 ? '100px' : '120px';

      // Mobile-friendly compact layout
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        div.innerHTML = `
          <h4 style="margin: 0 0 6px 0; font-weight: bold; font-size: 12px;">Stats</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
            <span>Out:</span>
            <span style="font-weight: bold;">${markerCounts.outages}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
            <span>Crew:</span>
            <span style="font-weight: bold;">${markerCounts.crews}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Total:</span>
            <span style="font-weight: bold;">${markerCounts.total}</span>
          </div>
        `;
      } else {
        div.innerHTML = `
          <h4 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">Live Statistics</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Outages:</span>
            <span style="font-weight: bold;">${markerCounts.outages}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Crews:</span>
            <span style="font-weight: bold;">${markerCounts.crews}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Total:</span>
            <span style="font-weight: bold;">${markerCounts.total}</span>
          </div>
        `;
      }

      return div;
    };

    statsControl.addTo(map);

    return () => {
      statsControl.remove();
    };
  }, [map, position, markerCounts]);

  return null;
}