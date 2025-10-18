'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = () => {
    // Use useMemo to prevent the component from being re-imported on every render
    const Map = useMemo(() => dynamic(
        () => import('@/components/MainMap'),
        {
            loading: () => (
                <div className="flex items-center justify-center h-full bg-gray-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading map...</p>
                    </div>
                </div>
            ),
            ssr: false
        }
    ), []);

    return <Map />;
};

export default DynamicMap;