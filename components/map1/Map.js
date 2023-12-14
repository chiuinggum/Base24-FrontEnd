"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paths from './Paths';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Markers from './Markers';

export default function MapComponent (props) {
    const {
        mapId,
        mapCenter,
        mapZoom,

        markers,
        setMarkers,
        placeFilter,
        dateFilter,

        detailsIsChecked,

        setMarkerClicked,
        pencilIsChecked,
        setPencilIsChecked,

        pathsIsChecked,
        setPathsIsChecked,
        setPathClicked,

        map_id,
        paths,
        setPaths
    } = props;
    return (
        <>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
            >
                <Map
                    mapId={mapId}
                    center={mapCenter}
                    zoom={mapZoom}
                    disableDefaultUI={true}
                >
                    <Markers
                        markers={markers}
                        setMarkers={setMarkers}
                        placeFilter={placeFilter}
                        dateFilter={dateFilter}
                        pencilIsChecked={pencilIsChecked}
                        setPencilIsChecked={setPencilIsChecked}
                        detailsIsChecked={detailsIsChecked}
                        setMarkerClicked={setMarkerClicked}
                        paths={paths}
                        setPaths={setPaths}
                    />
                    {
                    
                        <Paths
                            map_id={map_id}
                            paths={paths}
                            setPaths={setPaths}
                            setPathClicked={setPathClicked}
                            dateFilter={dateFilter}
                            pathsIsChecked={pathsIsChecked}
                        />
                    }
                </Map>
            </APIProvider>
        </>
    )
}