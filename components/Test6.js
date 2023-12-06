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
import { createRoot } from 'react-dom/client';
import { list } from 'postcss';

const position = { lat: 53.54, lng: 10 };
async function getMarkers() {
    try {
        const res = await axios.get('http://127.0.0.1:4000/marker/1');
        const data = res.data.data;
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
};

function MyMap() {
    const [map, setMap] = useState(null);
    const ref = useRef();

    useEffect(() => {
        // setMap(new window.google.maps.Map(ref.current, {
        //     zoom: 9,
        //     center: position,
        //     mapId: process.env.NEXT_PUBLIC_MAP_ID_LIGHT,
        //     disableDefaultUI: true
        // }))
        setMap(
        <Map
            zoom={9}
            center={position}
            mapId={process.env.NEXT_PUBLIC_MAP_ID_LIGHT}
        ></Map>)
    }, []);

    return (
        <>
            <div ref={ref} id='map' />
            {map && <Info map={map} />}
        </>
    );
};

const mockData = {

}

function Info({ map }) {
    const [info, setInfo] = useState([]);
    const [editing, setEditing] = useState();
    const [highlight, setHighlight] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMarkers();
            data.forEach((marker) => {
                marker.lat = parseFloat(marker.lat);
                marker.lng = parseFloat(marker.lng);
            });
            setInfo(data);
        };
        fetchData();
    }, []);
    if(!info) return null;

    return (
        <>
            {editing && (
                <Editing
                    info={info[editing]}
                    update={(newInfo) => {
                        setInfo((prevInfo) => {
                            return { ...prevInfo, [editing]: { ...newInfo } };
                        })
                    }}
                    close={() => setEditing(null)}
                />
            )}
            {info.map((data, index) => {
                return (
                  <>
                    <MyMarker
                        key={index}
                        map={map}
                        position={{ lat: data.lat, lng: data.lng }}
                        onClick={() => setEditing(index)}
                    >
                        <div
                            className={ `${highlight === index || editing === index ? "bg-red-500" : ""}` }
                            onMouseEnter={() => setHighlight(key)}
                            onMouseLeave={() => setHighlight(null)}
                        >
                            <h2>{data.name}</h2>
                            {highlight === index || editing === index ? (
                                <div>
                                    <p>{data.info}</p>
                                </div> 
                            ) : null}
                        </div>
                    </MyMarker>
                  </>  
                );
            })}
        </>
    );
};

function MyMarker({ map, position, children, onClick }) {
    const markerLib = useMapsLibrary('marker');
    const rootRef = useRef();
    const markerRef = useAdvancedMarkerRef();
    useEffect(() => {
        if (!markerLib) return;
    }, [markerLib]);

    useEffect(() => {
        if (!rootRef.current) {
            const container = document.createElement('div');
            rootRef.current = createRoot(container);
            markerRef.current = new window.google.maps.marker.AdvancedMarkerView({
                position,
                content: container,
                map: map
            });
            // markerRef.current = (<AdvancedMarker 
            //     position={position}
            //     content={container}
            //     map={map}
            // />)
        }

        return () => (markerRef.current.map = null);
    }, []);

    useEffect(() => {
        rootRef.current.render(children);
        markerRef.current.map = map;
        markerRef.current.position = position;
        const listener = markerRef.current.addListener('click', onClick);
        return () => listener.remove();
    }, [map, position, children, onClick]);
};

function Editing({ info, update, close }) {
    return (
        <>
            <div>

            </div>
        </>
    );
}

export default function Test6() {
    return (
        <>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places', 'marker']}
                version='beta'
            >
                <div style={{ height: "100vh" }}>
                    <MyMap />
                </div>
            </APIProvider>
        </>
    );
};