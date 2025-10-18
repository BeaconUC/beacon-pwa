'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapLegendProps {
  position?: 'topright' | 'topleft' | 'bottomright' | 'bottomleft';
}

export default function MapLegend({ position = 'topright' }: MapLegendProps) {
  const map = useMap();

  useEffect(() => {
    // Create control using the correct Leaflet method
    const legend = new L.Control({ position });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.backgroundColor = 'white';
      div.style.padding = '8px';
      div.style.borderRadius = '5px';
      div.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';
      div.style.fontSize = '11px';
      div.style.lineHeight = '16px';
      div.style.maxWidth = window.innerWidth < 768 ? '140px' : '180px';

      // Mobile-friendly compact layout
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        div.innerHTML = `
          <h4 style="margin: 0 0 6px 0; font-weight: bold; font-size: 12px;">Legend</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #f44336; margin-right: 4px;"></div>
              <span>High Outage</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #ff9800; margin-right: 4px;"></div>
              <span>Med Outage</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #2196f3; margin-right: 4px;"></div>
              <span>Low Outage</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #4caf50; margin-right: 4px;"></div>
              <span>Available</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #2196f3; margin-right: 4px;"></div>
              <span>Dispatched</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #ff9800; margin-right: 4px;"></div>
              <span>Busy</span>
            </div>
          </div>
        `;
      } else {
        div.innerHTML = `
          <h4 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">Map Legend</h4>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #f44336; margin-right: 8px;"></div>
            <span>High Priority Outage</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff9800; margin-right: 8px;"></div>
            <span>Medium Priority Outage</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #2196f3; margin-right: 8px;"></div>
            <span>Low Priority Outage</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #4caf50; margin-right: 8px;"></div>
            <span>Available Crew</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #2196f3; margin-right: 8px;"></div>
            <span>Dispatched Crew</span>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff9800; margin-right: 8px;"></div>
            <span>Busy Crew</span>
          </div>
        `;
      }

      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map, position]);

  return null;
}