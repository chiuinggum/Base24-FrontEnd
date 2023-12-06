"use client"

import React, { useEffect, useRef, useState } from 'react';
import {
    APIProvider,
    Map,
    useMapsLibrary,
    AdvancedMarker,
    useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

export default function Test7() {
    return (
        <>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places', 'marker']}
            >
                <div style={{ height: "100vh" }}>
                    <Map
                        zoom={9}
                        center={{lat: 53.54992, lng: 10.00678}}
                        mapId={process.env.NEXT_PUBLIC_MAP_ID_LIGHT}
                    >
                        <AdvancedMarker
                            position={{lat: 53.54992, lng: 10.00678}}
                            onClick={() => console.log("Clicked")}
                        >
                            <div
                                className='border bg-white'
                                onMouseEnter={() => console.log("Mouse enter")}
                                onMouseLeave={() => console.log("Mouse leave")}
                            >
                                <h2>I am so customized</h2>
                                <p>That is pretty awesome!</p>
                            </div>
                        </AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>
        </>
    );
};