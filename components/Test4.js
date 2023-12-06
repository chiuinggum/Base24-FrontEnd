// can add markers to the map
// maybe can send marker data to the backend
// can show markers on the map
// can show info windows when clicking on markers



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
import axios from 'axios';

export default function Test4() {
    const [markers, setMarkers] = useState([]);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const [mapData, setMapData] = useState(null);
    const [markerData, setMarkerData] = useState([]);
    const [mapId, setMapId] = useState(process.env.NEXT_PUBLIC_MAP_ID_LIGHT);
    const [isChecked, setIsChecked] = useState(false); //
    const handleMapModeToggle = () => {
        setMapId((prevMapId) => {
            const newMapId = 
                prevMapId === process.env.NEXT_PUBLIC_MAP_ID_LIGHT ?
                    process.env.NEXT_PUBLIC_MAP_ID_SILVER :
                    process.env.NEXT_PUBLIC_MAP_ID_LIGHT
            console.log(newMapId);
            return newMapId;
        });
        setIsChecked((prevIsChecked) => {
            const newIsChecked = !prevIsChecked;
            console.log("New isChecked:", newIsChecked);
            return newIsChecked;
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMap();
            data.lat = parseFloat(data.lat);
            data.lng = parseFloat(data.lng);
            setMapData(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMarkers();
            data.forEach((marker) => {
                marker.lat = parseFloat(marker.lat);
                marker.lng = parseFloat(marker.lng);
            });
            setMarkerData(data);
        };
        fetchData();
    }, []);

    if(!mapData) return null;
    if(!markerData) return null;
    const position = { lat: mapData.lat, lng: mapData.lng };
    const toggleInfoWindow = () => {
        setInfoWindowShown(previousState => !previousState);
    }
    const closeInfoWindow = () => setInfoWindowShown(false);

    return (
        <>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
            >
                <div style={{ height: "100vh" }}>
                    {/* <Autocomplete setMarkers={setMarkers} /> */}
                    <Autocomplete setMarkerData={setMarkerData} />
                    <div
                        className='flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                        <span className='ms-3'>Map Mode</span>
                        <label
                            className='mx-3 relative inline-flex items-center cursor-pointer'
                        >
                            <input
                                type='checkbox'
                                className='sr-only peer'
                                onChange={handleMapModeToggle}
                                checked={isChecked}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <Map
                        zoom={13}
                        center={position}
                        mapId={mapId}
                        disableDefaultUI={true}
                    >
                        {/* {markers.map((location, index) => {
                            return (
                                <div>
                                    <AdvancedMarker 
                                        ref={markerRef}
                                        key={index}
                                        position={location}
                                        onClick={toggleInfoWindow}
                                    />

                                    {infoWindowShown && (
                                        <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
                                            you can drag and drop me
                                        </InfoWindow>
                                    )}
                                </div>
                            )
                        })} */}
                        {markerData.map((location, index) => {
                            return (
                                <div>
                                    <AdvancedMarker 
                                        ref={markerRef}
                                        key={index}
                                        position={location}
                                        onClick={toggleInfoWindow}
                                    />
                                    {infoWindowShown && (
                                        <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
                                            hi
                                        </InfoWindow>
                                    )}
                                </div>
                            )
                        })}
                    </Map>
                </div>
            </APIProvider>
        </>
    );
};

async function getMap() {
    try {
        const res = await axios.get('http://127.0.0.1:4000/map/1');
        const data = res.data.data;
        return data;
    } catch (err) {
        console.error(err);
    }
}

async function getMarkers() {
    try {
        const res = await axios.get('http://127.0.0.1:4000/marker/1');
        const data = res.data.data;
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}

async function createMarker(name, place_id, lat, lng) {
    try {
        const markerLocation = await axios.post(
            'http://127.0.0.1:4000/marker/create',
            {
                name,
                place_id,
                lat,
                lng
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = markerLocation.data.data;
        const markerInfo = await axios.post(
            'http://127.0.0.1:4000/marker/info',
            {
                "map_id": 1,
                "marker_id": data.id,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

    } catch (err) {
        console.error(err);
    }
};

function Autocomplete({ setMarkerData }) {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const onPlaceChanged = async (place) => {
        if (place) {
            setInputValue(place.formatted_address || place.name);
            const marker = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            // setMarkers((markers) => [...markers, marker]);
            await createMarker(place.name, place.place_id, place.geometry.location.lat(), place.geometry.location.lng());
            setMarkerData((markerData) => [...markerData, marker]);
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
}