"use client"

import React, { useEffect, useRef, useState } from 'react';
import {
    APIProvider,
    AdvancedMarker,
    useAdvancedMarkerRef,
    Map,
    useMap,
    useMapsLibrary
} from '@vis.gl/react-google-maps';

// temporary
const position = { lat: 25.033675, lng: 121.564883 };

export default function GoogleMap (props) {
    const {
        mapId,
        markers,
        setMarkers,
        polyPaths,
        setPolyPaths,
        drawModeIsChecked,
    } = props;
    const [map, setMap] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [path, setPath] = useState([]);

    useEffect(() => {
        // initialize markers
        const fetchMarkerData = async () => {
            const data = await getMarkers();
            data.forEach((marker) => {
                marker.lat = parseFloat(marker.lat);
                marker.lng = parseFloat(marker.lng);
            });
            setMarkers(data);
        };
        // initialize map
        const fetchMapData = async () => {
            const data = await getMap();
            data.lat = parseFloat(data.lat);
            data.lng = parseFloat(data.lng);
            setMap(data);
        };
        // initialize polylines
        const fetchPolylineData = async () => {
            const data = await getPolyPaths();
            //
            setPolyPaths(data);
        }

        fetchMapData();
        fetchMarkerData();
        fetchMapData();
    }, [])
    if (!map || !markers || !polyPaths) return null;

    return (
        <div style={{ height: '100vh', width: '75vw' }}>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
            >
                <Map
                    zoom={13}
                    center={position}
                    disableDefaultUI={true}
                    mapId={mapId}
                >
                    <Markers
                        markers={markers}
                        drawModeIsChecked={drawModeIsChecked}
                        polyPaths={polyPaths}
                        setPolyPaths={setPolyPaths}
                        setPath={setPath}
                    />
                    <Polylines polyPaths={polyPaths}/>
                </Map>
            </APIProvider>
        </div>
    )
}

function Polylines({ polyPaths }) {
    const mapsLib = useMapsLibrary('maps');
    const map = useMap();

    useEffect(() => {
        if (!mapsLib || !map) return;
        polyPaths.forEach((path) => {
            const polyline = new mapsLib.Polyline({
                path: path,
                clickable: true,
                map: map,
                strokeWeight: 7,
                strokeColor: 'grey',
                strokeOpacity: 0.5,
            });
            polyline.addListener('click', () => console.log(path));
            polyline.addListener('mouseover', (e) => {polyline.setOptions({strokeColor: 'black'})});
            polyline.addListener('mouseout', (e) => {polyline.setOptions({strokeColor: 'grey'})});
        });
    }, [polyPaths]);
    return null;
}

function Markers({ markers, drawModeIsChecked, polyPaths, setPolyPaths, setPath }) {
    function handleMarkerClick(position) {
        if (drawModeIsChecked) {
            const newPath = [...polyPaths, position];
            setPath(newPath);
            if(newPath.length === 2) {
                setPolyPaths([...polyPaths, newPath]);
                setPath([]);
            }
        } else {
            // open the info sidebar
        }
    }
    return (
        <>
            {
                markers.map((location, index) => {
                    return (
                        <div>
                            <AdvancedMarker
                                key={index}
                                position={location}
                                onClick={(e) => handleMarkerClick(e.latLng.toJSON())}
                            />
                        </div>
                    )
                })
            }
        </>
    )
}

async function getMap() {
    try {
        const response = await axios.get('');
        const { data } = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getMarkers() {
    try {
        const response = await axios.get('');
        const { data } = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getPolyPaths() {

}