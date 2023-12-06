// // experiment with drawing line
"use client"
import { APIProvider, Map, AdvancedMarker, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function Test10 () {
    const [drawingMode, setDrawingMode] = useState(false);
    const [path, setPath] = useState([]);
    const [polyPaths, setPolyPaths] = useState([]);
    function handleDrawingModeClick(position) {
        console.log(position);
        if (drawingMode) {
            const newPath = [...path, position];
            console.log(newPath);
            setPath(newPath);
            if (newPath.length === 2) {
                setPolyPaths((prevPolyPaths) => [...prevPolyPaths, newPath]);
                setPath([]);
            }
        }
    }
    function handleDrawingMode() {
        setDrawingMode(!drawingMode);
        console.log(drawingMode);
    }
    return(
        <>
            <button onClick={handleDrawingMode}>
                Toggle Drawing Mode
            </button>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['drawing', 'places', 'marker', 'maps']}
            >
                <div>
                    <Map
                        style={{ height: '100vh' }}
                        zoom={13}
                        center={{lat: 25.033675, lng: 121.564883}}
                        mapId={process.env.NEXT_PUBLIC_MAP_ID_LIGHT}
                        disableDefaultUI={true}
                        id='map'
                    >
                        <Polylines polyPaths={polyPaths}/>
                        {/* <DrawingManager/> */}
                        <PolylineManager drawingMode={drawingMode} />
                        <AdvancedMarker position={{lat: 25.037049, lng: 121.519236}} onClick={(e) => handleDrawingModeClick(e.latLng.toJSON())}></AdvancedMarker>
                        <AdvancedMarker position={{lat: 25.027223, lng: 121.576499}} onClick={(e) => handleDrawingModeClick(e.latLng.toJSON())}></AdvancedMarker>
                        <AdvancedMarker position={{lat: 25.062866, lng: 121.533873}} onClick={(e) => handleDrawingModeClick(e.latLng.toJSON())}></AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>
        </>
    );
};

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
            })
            polyline.addListener('click', () => console.log(path));
            polyline.addListener('mouseover', (e) => {polyline.setOptions({strokeColor: 'black'})});
            polyline.addListener('mouseout', (e) => {polyline.setOptions({strokeColor: 'grey'})});
        })
    }, [polyPaths])
    return null;
}

function PolylineManager({ drawingMode }) {
    const mapsLib = useMapsLibrary('maps');
    const map = useMap();

    useEffect(() => {
        if (!mapsLib || !map) return;

        
    })

};

function DrawingManager() {
    const drawingLib = useMapsLibrary('drawing');
    const map = useMap();
    const [selectedMarkers, setSelectedMarkers] = useState([]);
    useEffect(() => {
        if (!drawingLib || !map) return;

        const drawingManager = new drawingLib.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    drawingLib.OverlayType.POLYLINE,
                ]
            },
            polylineOptions: {
                clickable: true,
            }
        });

        drawingManager.setMap(map);

        // useEffect(() => {
            
        // });

        drawingManager.addListener('polylinecomplete', (polyline) => {
            console.log(polyline);
            polyline.addListener('click', () => console.log('click'));
        });

        return () => {
            drawingManager.setMap(null);
        };
    }, [drawingLib, map, selectedMarkers]);
    return null;
};