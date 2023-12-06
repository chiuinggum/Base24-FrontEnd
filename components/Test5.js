// try to implement a map with markers that have editable info windows

"use client"

import React, { useEffect, useRef, useState } from 'react';
import {
    APIProvider,
    Map,
    useAutocomplete,
    useMapsLibrary,
    AdvancedMarker,
    useAdvancedMarkerRef,
    InfoWindow
} from '@vis.gl/react-google-maps';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

export default function Test5() {
    const [markers, setMarkers] = useState([]);
    const position = { lat: 53.54, lng: 10 };
    return (
        <>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
            >
                <div style={{ height: "100vh" }}>
                    <Autocomplete setMarkers={setMarkers} />
                    <MyMap />
                    {/* <Map
                        zoom={9}
                        center={position}
                        mapId={process.env.NEXT_PUBLIC_MAP_ID_LIGHT}
                    >
                        {markers.map((location, index) => {
                            return (
                                <div>
                                    <AdvancedMarker 
                                        key={index}
                                        position={location}
                                    />
                                </div>
                            )
                        })}
                    </Map> */}
                </div>
            </APIProvider>
        </>
    );
}

function Autocomplete({ setMarkers }) {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const onPlaceChanged = place => {
        if (place) {
            setInputValue(place.formatted_address || place.name);
            const marker = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setMarkers((markers) => [...markers, marker]);
        }

        inputRef.current && inputRef.current.focus();
    };

    useAutocomplete({
        inputField: inputRef && inputRef.current,
        fields: ['geometry.location', 'place_id', 'name'],
        onPlaceChanged
    });

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    return (
        <input 
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Search for a place'
            className='border'
        />
    );
};

function MyMap() {
    const [map, setMap] = useState();
    const ref = useRef();

    useEffect(() => {
        setMap(new window.google.maps.Map(ref.current, {
            zoom: 9,
            center: position,
            mapId: process.env.NEXT_PUBLIC_MAP_ID_LIGHT,
            disableDefaultUI: true
        }))
    }, []);

    return (
        <>
            <div ref={ref} id="map" />
            {map && <Info map={map} />}
        </>
    )
};

function Info({ map }) {
    const [text, setText] = useState('hello');
    const [highlight, setHighlight] = useState();
    const [editing, setEditing] = useState();

    return (
        <>
            {editing && (
                <Editing

                />
            )}
            {markerInfo.map((info, index) => {
                <MyMarker
                    key={index}
                    map={map}
                    position={{ lat: info.lat, lng: info.lng }}
                    // onClick
                >
                    <div
                        className='bg-black text-white ${highlight === index || editing === index ? "bg-red-500" : "" }'
                        onMouseEnter={() => setHighlight(index)}
                        onMouseLeave={() => setHighlight(null)}
                    >
                        <h2>{info.name}</h2>
                        {highlight === index || editing === index ? (
                            <div>
                                <p>{info.info}</p>
                            </div> 
                        ) : null }
                    </div>
                </MyMarker>
            })}
        </>
    );
};

function Editing() {

};