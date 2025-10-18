'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useMapData } from '@/lib/hooks/use-map-data';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import MapLegend from './shared/MapLegend';
import MapStats from './shared/MapStats';
import MobileToggleControl from './shared/MobileToggleControl';
import { useState, useEffect } from 'react';

const MainMap = () => {
    const { markers, viewState, loading } = useMapData();
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileLegend, setShowMobileLegend] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map data...</p>
                </div>
            </div>
        );
    }

    // Create custom icons for different marker types
    const createCustomIcon = (color: string, emoji: string) => {
        return divIcon({
            html: renderToStaticMarkup(
                <div style={{
                    background: color,
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                }}>
                    {emoji}
                </div>
            ),
            className: 'custom-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
    };

    return (
        <div className="relative h-full">
            <MapContainer
                center={viewState.center}
                zoom={viewState.zoom}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Map Legend Control - Hide on mobile when toggle is off */}
                {(!isMobile || showMobileLegend) && (
                    <MapLegend position={isMobile ? "bottomright" : "topright"} />
                )}

                {/* Statistics Overlay Control - Always show on desktop, hide on mobile when toggle is off */}
                {(!isMobile || showMobileLegend) && (
                    <MapStats position={isMobile ? "bottomleft" : "topleft"} />
                )}

                {/* Mobile Toggle Control - Leaflet control */}
                {isMobile && (
                    <MobileToggleControl
                        isVisible={showMobileLegend}
                        onToggle={() => setShowMobileLegend(!showMobileLegend)}
                    />
                )}

                <MarkerClusterGroup>
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            icon={createCustomIcon(marker.color || '#3388ff', marker.icon || '📍')}
                        >
                            <Popup>
                                <div dangerouslySetInnerHTML={{ __html: marker.popupContent }} />
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};

export default MainMap;