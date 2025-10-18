'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface MobileToggleControlProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function MobileToggleControl({ isVisible, onToggle }: MobileToggleControlProps) {
  const map = useMap();

  useEffect(() => {
    // Create control using Leaflet's built-in control system
    const toggleControl = new L.Control({ position: 'topright' });

    toggleControl.onAdd = () => {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      div.style.backgroundColor = 'white';
      div.style.borderRadius = '50%';
      div.style.width = '40px';
      div.style.height = '40px';
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.justifyContent = 'center';
      div.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';
      div.style.cursor = 'pointer';
      div.style.margin = '10px';

      const icon = L.DomUtil.create('span');
      icon.innerHTML = isVisible ? '👁️' : '📖';
      icon.style.fontSize = '16px';
      
      div.appendChild(icon);

      // Add click event
      L.DomEvent.on(div, 'click', (e) => {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        onToggle();
      });

      // Prevent map events when interacting with control
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);

      return div;
    };

    toggleControl.addTo(map);

    return () => {
      toggleControl.remove();
    };
  }, [map, isVisible, onToggle]);

  return null;
}