import {Rnd} from 'react-rnd';
import GoogleMap from './map/GoogleMap';

function Box(props) {
    const {
        mapId,
        markers,
        setMarkers,
        drawModeIsChecked,
        index,
        setMarkerClicked,
        markerModeIsChecked
    } = props;
    return (
        <>
            <GoogleMap
                mapId={mapId}
                markers={markers}
                setMarkers={setMarkers}
                drawModeIsChecked={drawModeIsChecked}
                index={index}
                setMarkerClicked={setMarkerClicked}
                markerModeIsChecked={markerModeIsChecked}
            />
        </>
    );
};

export default function Rnd1(props) {
    const {
        mapId,
        markers,
        setMarkers,
        drawModeIsChecked,
        index,
        setMarkerClicked,
        markerModeIsChecked
    } = props;
    return (
    
        <div>
            <Rnd
                default={{
                    x: 0,
                    y: 0,
                    width: 500,
                    height: 400,
                }}
                className='border w-fit'
                // minWidth={500}
                // minHeight={100}
                // bounds="parent"
            >
                <Box
                    mapId={mapId}
                    markers={markers}
                    setMarkers={setMarkers}
                    drawModeIsChecked={drawModeIsChecked}
                    index={index}
                    setMarkerClicked={setMarkerClicked}
                    markerModeIsChecked={markerModeIsChecked}
                />
            </Rnd>
        </div>
    
    );
};