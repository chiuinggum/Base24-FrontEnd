"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
    APIProvider,
    AdvancedMarker,
    useAdvancedMarkerRef,
    Map,
    useMap,
    useMapsLibrary
} from '@vis.gl/react-google-maps';
import axios from 'axios';

// temporary
let position;

export default function GoogleMap (props) {
    const {
        mapId,
        markers,
        setMarkers,
        // polyPaths: initialPolyPaths,
        // setPolyPaths,
        drawModeIsChecked,
        index,
        setMarkerClicked,
        markerModeIsChecked
    } = props;
    const [map, setMap] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [path, setPath] = useState([]);
    // const [polyPaths, setPolyPathsState] = useState(initialPolyPaths || []);
    const [polyPaths, setPolyPaths] = useState([]);

    useEffect(() => {
        // initialize markers
        const fetchMarkerData = async () => {
            if (!index) return;
            console.log('fetchMarkerData');
            const data = await getMarkers(index);
            data.forEach((marker) => {
                marker.lat = parseFloat(marker.lat);
                marker.lng = parseFloat(marker.lng);
            });
            setMarkers(data);
        };
        // initialize map
        const fetchMapData = async () => {
            if (!index) return;
            console.log('fetchMapData');
            const data = await getMap(index);
            data.lat = parseFloat(data.lat);
            data.lng = parseFloat(data.lng);
            setMap(data);
        };
        // initialize polylines
        const fetchPolylineData = async () => {
            if (!index) return;
            console.log('fetchPolylineData');
            const data = await getPolyPaths(index);
            data.forEach((path) => {
                path.start_lat = parseFloat(path.start_lat);
                path.start_lng = parseFloat(path.start_lng);
                path.end_lat = parseFloat(path.end_lat);
                path.end_lng = parseFloat(path.end_lng);
                const newPath = [
                    {
                        lat: path.start_lat,
                        lng: path.start_lng
                    },
                    {
                        lat: path.end_lat,
                        lng: path.end_lng
                    }
                ]
                setPolyPaths((prevPolyPaths) => [...prevPolyPaths, newPath]);
            })
        };

        fetchMapData();
        fetchMarkerData();
        fetchPolylineData();
    }, [index]);
    if (!map || !markers || !polyPaths) return <div>Loading...</div>;

    return (
        <>
        {/* <div style={{ height: '100vh', width: '75vw' }}> */}
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
            >
                <Map
                    zoom={13}
                    center={{lat: map.lat, lng: map.lng}}
                    disableDefaultUI={true}
                    mapId={mapId}
                >
                    <Markers
                        markers={markers}
                        index={index}
                        drawModeIsChecked={drawModeIsChecked}
                        polyPaths={polyPaths}
                        setPolyPaths={setPolyPaths}
                        path={path}
                        setPath={setPath}
                        setMarkerClicked={setMarkerClicked}
                        markerModeIsChecked={markerModeIsChecked}
                    />
                    <Polylines polyPaths={polyPaths}/>
                </Map>
            </APIProvider>
        {/* </div> */}
        </>
    )
}

function Polylines({ polyPaths }) {
    const mapsLib = useMapsLibrary('maps');
    const map = useMap();

    useEffect(() => {
        console.log(polyPaths);
        if (!mapsLib || !map || !polyPaths) return;
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
    }, [polyPaths, map]);
    return null;
}

function Markers({ markers, drawModeIsChecked, polyPaths, setPolyPaths, path, setPath, index, setMarkerClicked, markerModeIsChecked }) {
    const [highlight, setHighlight] = useState();
    async function handleMarkerClick(position) {
        console.log(position);
        if (drawModeIsChecked) {
            const newPath = [...path, position];
            console.log(newPath);
            setPath(newPath);
            if(newPath.length === 2) {
                if (!polyPaths) {
                    setPolyPaths([newPath]);
                } else {
                    setPolyPaths((prevPolyPaths) => [...prevPolyPaths, newPath]);
                }
                await createPolyPath(index, newPath);
                setPath([]);
            }
        } else {
            for (let i = 0; i < markers.length; i++) {
                if (markers[i].lat === position.lat && markers[i].lng === position.lng) {
                    console.log(markers[i].id);
                    setMarkerClicked(markers[i]); // marker_id
                    break;
                }
            }
        }
    }
    return (
        <>
            {
                markers.map((location, index) => {
                    return (
                        <div key={index}>
                            <AdvancedMarker
                                key={index}
                                position={location}
                                onClick={(e) => handleMarkerClick(e.latLng.toJSON())}
                                
                            >
                                <div
                                    className='border rounded-full w-15 h-15 flex items-center justify-center relative'
                                    onMouseEnter={() => setHighlight(index)}
                                    onMouseLeave={() => setHighlight(null)}
                                >
                                    {/* <Image
                                        src="/other.png"
                                        alt='flag'
                                        width={30}
                                        height={30} 
                                    /> */}
                                    <CustomImage placetag={location.place_tag} />
                                    {
                                        highlight === index && (
                                            <div className="absolute top-0 left-0 bg-blue-500 rounded-lg p-2 w-30 h-30">
                                                <h1
                                                    className="text-white"
                                                >
                                                    {location.name}
                                                </h1>
                                            </div>
                                        )
                                    }
                                    {
                                        markerModeIsChecked && (
                                            <div className="absolute top-0 left-0 bg-blue-500 rounded-lg p-2 w-30 h-30">
                                                <h1
                                                    className="text-white"
                                                >
                                                    {location.name}
                                                </h1>
                                            </div>
                                        )
                                    }
                                </div>
                                {/* <h1>{location.name}</h1> */}
                            </AdvancedMarker>
                        </div>
                    )
                })
            }
        </>
    )
}

function CustomImage ({ placetag }) {
    const src = `/${placetag}.png`
    return (
        <Image 
            src={src}
            alt={placetag}
            width={35}
            height={35}
        />
    );
}

async function getMap(index) {
    try {
        console.log('getMap');
        const url = `http://localhost:4000/map/${index}`
        console.log(url);
        const response = await axios.get(url);
        const data = response.data.data;
        console.log(data);
        return data;
        // {
        //     "id": 1,
        //     "name": "Taipei",
        //     "user_id": 1,
        //     "lat": "25.032964",
        //     "lng": "121.565427"
        // }
    } catch (error) {
        console.error(error);
    }
}

async function getMarkers(index) {
    try {
        console.log('getMarkers');
        const url = `http://localhost:4000/marker/${index}`
        console.log(url);
        const response = await axios.get(url);
        const data = response.data.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getPolyPaths(index) {
    try {
        const url = `http://localhost:4000/marker/path/${index}`
        const response = await axios.get(url);
        const data = response.data.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function createPolyPath(index, path) {
    console.log(index, path);
    try {
        const url = `http://localhost:4000/marker/path/${index}`
        const response = await axios.post(
            url,
            { path },
            { headers: { 'Content-Type': 'application/json' } }
        );
        const data = response.data.data;
    } catch (err) {
        console.error(err);
    }
}