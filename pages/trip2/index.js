import Rnd1 from '../../components/Rnd1';
import MapDefaultSidebar from '../../components/map/MapDefaultSidebar';
import { useState } from 'react';
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

export default function Trip(){
    const index = 1
    const [mapId, setMapId] = useState(process.env.NEXT_PUBLIC_MAP_ID_LIGHT);
    const [mapModeIsChecked, setMapModeIsChecked] = useState(false);
    const [drawModeIsChecked, setDrawModeIsChecked] = useState(false);
    const [markerModeIsChecked, setMarkerModeIsChecked] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [markerClicked, setMarkerClicked] = useState(false);
    const [polyClicked, setPolyClicked] = useState(false);
    return (
        <div className='flex flex-row'>
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
            <div style={{ height: '100vh', width: '75vw' }} className='border'>
                <Rnd1
                    mapId={mapId}
                    markers={markers}
                    setMarkers={setMarkers}
                    drawModeIsChecked={drawModeIsChecked}
                    index={index}
                    setMarkerClicked={setMarkerClicked}
                    markerModeIsChecked={markerModeIsChecked}
                />
            </div>
        </div>
    );
}