import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

export default function Paths (props) {
    const {
        map_id,
        paths,
        setPaths,
        setPathClicked
    } = props
    const mapsLib = useMapsLibrary('maps');
    const map = useMap();
    console.log(paths);

    useEffect(() => {
        if (!mapsLib || !map || !paths) return;
        const lineSymbol = { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, };
        paths?.map((path) => {
            const polyline = new mapsLib.Polyline({
                path: [
                    { lat: parseFloat(path.start_marker_lat), lng: parseFloat(path.start_marker_lng) },
                    { lat: parseFloat(path.end_marker_lat), lng: parseFloat(path.end_marker_lng) }
                ],
                clickable: true,
                map: map,
                icons: [
                    {
                        icon: lineSymbol,
                        offset: '100%'
                    }
                ],
                strokeWeight: 5,
                strokeColor: 'grey',
                strokeOpacity: 0.5,
            })
            polyline.addListener('click', () => {setPathClicked(path.id)});
            polyline.addListener('mouseover', (e) => {polyline.setOptions({strokeColor: 'black'})});
            polyline.addListener('mouseout', (e) => {polyline.setOptions({strokeColor: 'grey'})});
        })
    }, [paths, map]);

    return null;
}