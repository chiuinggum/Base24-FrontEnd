import Test6 from '../../components/Test6';
import Test10 from '../../components/Test10';
// import MD from '../../components/MD';
import MapDefaultSidebar from '../../components/map/MapDefaultSidebar';
import PlaceSidebar from '../../components/map/PlaceSidebar';
import GoogleMap from '../../components/map/GoogleMap';
import { useState } from 'react';

export default function Map() {
    const [mapId, setMapId] = useState(process.env.NEXT_PUBLIC_MAP_ID_LIGHT);
    const [mapModeIsChecked, setMapModeIsChecked] = useState(false);
    const [drawModeIsChecked, setDrawModeIsChecked] = useState(false);
    const [markerModeIsChecked, setMarkerModeIsChecked] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [polyPaths, setPolyPaths] = useState([]);
    const [markerClicked, setMarkerClicked] = useState();

    return (
        <div className='flex flex-rol'>
            <MapDefaultSidebar
                setMapId={setMapId}
                mapModeIsChecked={mapModeIsChecked}
                setMapModeIsChecked={setMapModeIsChecked}
                drawModeIsChecked={drawModeIsChecked}
                setDrawModeIsChecked={setDrawModeIsChecked}
                markerModeIsChecked={markerModeIsChecked}
                setMarkerModeIsChecked={setMarkerModeIsChecked}
            />
            <GoogleMap
                mapId={mapId}
                markers={markers}
                setMarkers={setMarkers}
                polyPaths={polyPaths}
                setPolyPaths={setPolyPaths}
                drawModeIsChecked={drawModeIsChecked}
                markerClicked={markerClicked}
                setMarkerClicked={setMarkerClicked}
            />
            {/* <PlaceSidebar placeName='Place Name' /> */}
        </div>
    );
};