"use client";

import { useState } from 'react';
import {
    APIProvider,
    Map,
} from '@vis.gl/react-google-maps';

export default function MapComponent() {
    const position = { lat: 53.54, lng: 10 };
    const [open, setOpen] = useState(false);
    const [mapId, setMapId] = useState(process.env.NEXT_PUBLIC_MAP_ID_SILVER);
    const handleMapModeToggle = () => {
        setMapId(prevMapId => {
            prevMapId === process.env.NEXT_PUBLIC_MAP_ID_SILVER ?
                process.env.NEXT_PUBLIC_MAP_ID_DARK :
                process.env.NEXT_PUBLIC_MAP_ID_SILVER
        });
        setOpen(prevOpen => !prevOpen);
    };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div style={{ height: "100vh", width: "80%", marginLeft: "256px" }}>
                <Map
                    zoom={9}
                    center={position}
                    mapId={mapId}
                >
                </Map>
            </div>
        </APIProvider>
    );
}