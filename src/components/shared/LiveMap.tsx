'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { useMapData } from '@/lib/hooks/use-map-data';

// Fix for default icon issue with Webpack
// @ts-expect-error: Leaflet icon URL issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LiveMapProps {
  height?: string;
  showControls?: boolean;
  className?: string;
}

export default function LiveMap({ 
  height = '500px', 
  showControls = true,
  className = '' 
}: LiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerClusterRef = useRef<L.MarkerClusterGroup | null>(null);
  
  const { markers, viewState, fitToMarkers, loading } = useMapData();

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    // Initialize map
    leafletMap.current = L.map(mapRef.current).setView(viewState.center, viewState.zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap.current);

    // Initialize marker cluster group
    markerClusterRef.current = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true
    });
    
    leafletMap.current.addLayer(markerClusterRef.current);

    // Add map controls if enabled
    if (showControls) {
      L.control.scale().addTo(leafletMap.current);
      
      // Add fit bounds button
      const FitBoundsControl = L.Control.extend({
        onAdd: function() {
          const div = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
          div.innerHTML = `
            <button style="
              background: white;
              border: 2px solid rgba(0,0,0,0.2);
              border-radius: 4px;
              padding: 6px 12px;
              cursor: pointer;
              font-weight: bold;
              box-shadow: 0 1px 5px rgba(0,0,0,0.4);
            " title="Fit to markers">
              🎯 Fit View
            </button>
          `;
          div.onclick = () => {
            if (leafletMap.current && markers.length > 0) {
              const group = L.featureGroup(markers.map(m => L.marker(m.position)));
              const bounds = group.getBounds();
              if (bounds.isValid()) {
                leafletMap.current.fitBounds(bounds, { padding: [20, 20] });
              }
            }
          };
          return div;
        }
      });
      
      new FitBoundsControl({ position: 'topright' }).addTo(leafletMap.current);
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [showControls]);

  // Update markers when data changes
  useEffect(() => {
    if (!leafletMap.current || !markerClusterRef.current) return;

    // Clear existing markers
    markerClusterRef.current.clearLayers();

    // Add new markers
    markers.forEach(marker => {
      const customIcon = L.divIcon({
        html: `
          <div style="
            background: ${marker.color || '#3388ff'};
            color: white;
            border: 2px solid white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          ">
            ${marker.icon || '📍'}
          </div>
        `,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const leafletMarker = L.marker(marker.position, { icon: customIcon })
        .bindPopup(marker.popupContent);

      markerClusterRef.current?.addLayer(leafletMarker);
    });

    // Update map view if markers exist
    if (markers.length > 0 && leafletMap.current) {
      const group = L.featureGroup(markers.map(m => L.marker(m.position)));
      const bounds = group.getBounds();
      if (bounds.isValid()) {
        leafletMap.current.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [markers]);

  // Update map view when viewState changes
  useEffect(() => {
    if (leafletMap.current) {
      leafletMap.current.setView(viewState.center, viewState.zoom);
    }
  }, [viewState]);

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Map Legend */}
      <div className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-lg">
        <h4 className="font-semibold mb-2 text-sm">Map Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>High Priority Outage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Medium Priority Outage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Low Priority Outage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Available Crew</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span>Dispatched Crew</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span>Busy Crew</span>
          </div>
        </div>
      </div>

      {/* Statistics Overlay */}
      <div className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-lg">
        <h4 className="font-semibold mb-2 text-sm">Live Statistics</h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between gap-4">
            <span>Outages:</span>
            <span className="font-semibold">{markers.filter(m => m.type === 'outage').length}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Crews:</span>
            <span className="font-semibold">{markers.filter(m => m.type === 'crew').length}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Total:</span>
            <span className="font-semibold">{markers.length}</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        id="live-map"
        style={{ height }}
        className="w-full rounded-lg border"
      />
    </div>
  );
}