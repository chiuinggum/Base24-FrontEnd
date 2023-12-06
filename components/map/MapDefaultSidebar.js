import { APIProvider } from '@vis.gl/react-google-maps';
import ViewDayTagList from './map/ViewDayTagList';
import ViewPlaceTagList from './map/ViewPlaceTagList';
import ModeSwitch from './map/ModeSwitch';
import SearchField from './map/SearchField';
import PlaceList from './map/PlaceList';
import {
    handleMapModeToggle
} from '../../pages/map/index'

export default function MapDefaultSidebar(props) {
    const {
        setMapId,
        mapModeIsChecked,
        setMapModeIsChecked,
        drawModeIsChecked,
        setDrawModeIsChecked,
        markerModeIsChecked,
        setMarkerModeIsChecked,
        markers,
        setMarkers,
    } = props;
    const handleMapModeToggle = () => {
        setMapId((prevMapId) => {
            const newMapId = 
                prevMapId === process.env.NEXT_PUBLIC_MAP_ID_LIGHT ?
                    process.env.NEXT_PUBLIC_MAP_ID_SILVER :
                    process.env.NEXT_PUBLIC_MAP_ID_LIGHT
            console.log(newMapId);
            return newMapId;
        });
        setMapModeIsChecked(!mapModeIsChecked);
    }
    const handleDrawModeToggle = () => {
        setDrawModeIsChecked(!drawModeIsChecked);
    }
    const handleMarkerModeToggle = () => {
        setMarkerModeIsChecked(!markerModeIsChecked);
    }

    return (
        <div
            style={{ width: '25vw', height: '100vh' }}
            className="bg-gray-100 flex flex-col"
        >
            <ViewDayTagList />
            <ViewPlaceTagList />
            <ModeSwitch modeName={`Map Mode`} handleOnChange={handleMapModeToggle} isChecked={mapModeIsChecked} />
            <ModeSwitch modeName={`Draw Mode`} handleOnChange={handleDrawModeToggle} isChecked={drawModeIsChecked} />
            <ModeSwitch modeName={`Marker Mode`} handleOnChange={handleMarkerModeToggle} isChecked={markerModeIsChecked} />
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
            >
                <SearchField 
                    setMarkers={setMarkers}
                />
            </APIProvider>
            <PlaceList />
        </div>
    );
}