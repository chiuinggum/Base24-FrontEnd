import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

export default function Paths (props) {
    const {
        map_id,
        paths,
        setPaths,
        setPathClicked,
        dateFilter,
        pathsIsChecked
    } = props
    const mapsLib = useMapsLibrary('maps');
    const map = useMap();
    const [polylines, setPolylines] = useState([]);
    // console.log(paths);

    useEffect(() => {
        // console.log('paths changed')
        if (!mapsLib || !map || !paths) return;
        const lineSymbol = { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, };
        let polys = [];
        let isVisible;
        if (pathsIsChecked) isVisible = true;
        else isVisible = false;
        if (polylines.length > 0) {
            polylines.map((polyline) => {
                polyline.setMap(null);
            })
        }
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
                visible: isVisible
            })
            polyline.addListener('click', () => {setPathClicked(path.id)});
            polyline.addListener('mouseover', (e) => {polyline.setOptions({strokeColor: 'black'})});
            polyline.addListener('mouseout', (e) => {polyline.setOptions({strokeColor: 'grey'})});
            polyline.dates = path.dates;
            polys.push(polyline);
        })
        setPolylines(polys);
    }, [paths]);

    useEffect(() => {
        if (!pathsIsChecked) {
            // console.log('pathsIsChecked is false')
            // console.log(polylines);
            polylines?.map((polyline) => {
                polyline.setVisible(false);
            })
        } else {
            // console.log('pathIsChecked');
            // console.log(polylines);
            polylines?.map((polyline) => {
                polyline.setVisible(true);
            })
        }
    }, [pathsIsChecked])

    useEffect(() => {
        if (dateFilter === null) {
            polylines?.map((polyline) => {
                polyline.setOptions({vidible: true})
            })
        } else {
            polylines?.map((polyline) => {
                if (!polyline.dates.data.includes(dateFilter)) {
                    polyline.setOptions({visible: false})
                }
            })
        }
        
    }, [dateFilter])

    return null;
}