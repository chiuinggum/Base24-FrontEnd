import MapDefaultSidebar from '../../components/map/MapDefaultSidebar';
import PlaceSidebar from '../../components/map/PlaceSidebar';
import PathSidebar from '../../components/map/PathSidebar';
import GoogleMap from '../../components/map/GoogleMap';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Map() {
    const router = useRouter();
    const { index } = router.query; // index = map_id
    const [mapId, setMapId] = useState(process.env.NEXT_PUBLIC_MAP_ID_LIGHT);
    const [mapModeIsChecked, setMapModeIsChecked] = useState(false);
    const [drawModeIsChecked, setDrawModeIsChecked] = useState(false);
    const [markerModeIsChecked, setMarkerModeIsChecked] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [markerClicked, setMarkerClicked] = useState(false);
    const [polyClicked, setPolyClicked] = useState(false);

    return (
        <div className='flex flex-row'>
            {/* <h1>Map: {index}</h1> */}
            {
                !markerClicked && !polyClicked && (
                    <MapDefaultSidebar
                        setMapId={setMapId}
                        mapModeIsChecked={mapModeIsChecked}
                        setMapModeIsChecked={setMapModeIsChecked}
                        drawModeIsChecked={drawModeIsChecked}
                        setDrawModeIsChecked={setDrawModeIsChecked}
                        markerModeIsChecked={markerModeIsChecked}
                        setMarkerModeIsChecked={setMarkerModeIsChecked}
                        markers={markers}
                        setMarkers={setMarkers}
                        index={index}
                    />
                )
            }
            {
                markerClicked && (
                    <PlaceSidebar
                        placeName={markerClicked.name}
                        markers={markers}
                        setMarkers={setMarkers}
                        index={index}
                        markerClicked={markerClicked}
                    />
                )
            }
            {
                polyClicked && (
                    <PathSidebar
                        index={index}
                        polyClicked={polyClicked}
                    />
                )
            }
            <div style={{ height: '100vh', width: '75vw'}}>
                <GoogleMap
                    mapId={mapId}
                    markers={markers}
                    setMarkers={setMarkers}
                    // polyPaths={polyPaths}
                    // setPolyPaths={setPolyPaths}
                    drawModeIsChecked={drawModeIsChecked}
                    markerClicked={markerClicked}
                    setMarkerClicked={setMarkerClicked}
                    index={index}
                    markerModeIsChecked={markerModeIsChecked}
                />
            </div>
            {/* <PlaceSidebar placeName='Place Name' /> */}
        </div>
    );
};