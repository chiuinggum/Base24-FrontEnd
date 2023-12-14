import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import MapSidebar from '../../components/map1/MapSidebar';
import PathSidebar from '../../components/map1/PathSidebar';
import axios from 'axios';
import MapComponent from '../../components/map1/Map';
import MarkerSidebar from '../../components/map1/MarkerSidebar';
import { parseCookies, setCookie } from 'nookies';

export default function MapPage () {
    const router = useRouter();
    const map_id = router.query.index;
    const trip_id = parseCookies().trip_id;
    const [trip, setTrip] = useState(null);
    const [mapId, setMapId] = useState(process.env.NEXT_PUBLIC_MAP_ID_LIGHT);
    const [mapCenter, setMapCenter] = useState({});
    const [mapZoom, setMapZoom] = useState();

    const [placeFilter, setPlaceFilter] = useState(null);
    const [dateFilter, setDateFilter] = useState(null);

    const [focusIsChecked, setFocusIsChecked] = useState(false);
    const [detailsIsChecked, setDetailsIsChecked] = useState(false);
    const [pencilIsChecked, setPencilIsChecked] = useState(false);
    const [pathsIsChecked, setPathsIsChecked] = useState(false);

    const [markers, setMarkers] = useState([]);
    const [paths, setPaths] = useState([]);

    const [markerClicked, setMarkerClicked] = useState(false);
    const [pathClicked, setPathClicked] = useState(false);

    useEffect(() => {
        if (!map_id) return;
        const fetchMarkers = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_MARKERS_URL}/get/${map_id}`);
            const data = response.data.markers;
            data.forEach((marker) => {
                localStorage.setItem(marker.id, JSON.stringify(marker.info));
            })
            // for (let marker of data) {
            //     localStorage.setItem(marker.id, JSON.stringify(marker.info));
            //     const markerDateRes = await 
            // }
            setMarkers(data);
        }
        const fetchMap = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_MAPS_URL}/${map_id}`);
            const data = response.data.data;
            setMapCenter({ lat: parseFloat(data.center_lat), lng: parseFloat(data.center_lng) });
            setMapZoom(parseInt(data.zoom));
        }
        const fetchPaths = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_PATHS_URL}/get/${map_id}`);
            const data = response.data.data.paths;
            data.forEach((path) => {
                localStorage.setItem(`path-${path.id}`, JSON.stringify(path.info));
            })
            // console.log(data);
            setPaths(data);
        }

        fetchMarkers();
        fetchMap();
        fetchPaths();
    }, [map_id, pathsIsChecked]); // change from [map_id] to [map_id, markers, paths]
    
    useEffect(() => {
        if (!trip_id) return;
        const fetchTrip = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_TRIPS_URL}/get/${trip_id}`);
                const data = response.data.data;
                setTrip(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchTrip();
    }, [trip_id])

    if (!map_id || !mapCenter || !mapZoom) return (<div>loading...</div>)

    return (
        <div className='flex flex-row'>
            {
                !markerClicked && !pathClicked && (
                    <MapSidebar
                        setMapId={setMapId}

                        placeFilter={placeFilter}
                        setPlaceFilter={setPlaceFilter}
                        dateFilter={dateFilter}
                        setDateFilter={setDateFilter}

                        focusIsChecked={focusIsChecked}
                        setFocusIsChecked={setFocusIsChecked}

                        detailsIsChecked={detailsIsChecked}
                        setDetailsIsChecked={setDetailsIsChecked}

                        pencilIsChecked={pencilIsChecked}
                        setPencilIsChecked={setPencilIsChecked}

                        pathsIsChecked={pathsIsChecked}
                        setPathsIsChecked={setPathsIsChecked}

                        map_id={map_id}
                        setMarkers={setMarkers}

                        markers={markers}
                    />
                )
            }
            {
                markerClicked && (
                    <MarkerSidebar
                        markerClicked={markerClicked}
                        setMarkerClicked={setMarkerClicked}
                        markers={markers}
                        trip={trip}
                        map_id={map_id}
                    />
                )
            }
            {
                pathClicked && (
                    <PathSidebar
                        pathClicked={pathClicked}
                        setPathClicked={setPathClicked}
                        paths={paths}
                        markers={markers}
                        map_id={map_id}
                    />
                )
            }
            <div style={{ height: '100vh', width: '75vw'}}>
                <MapComponent
                    mapId={mapId}
                    mapCenter={mapCenter}
                    mapZoom={mapZoom}

                    markers={markers}
                    setMarkers={setMarkers}
                    placeFilter={placeFilter}
                    dateFilter={dateFilter}

                    detailsIsChecked={detailsIsChecked}

                    setMarkerClicked={setMarkerClicked}
                    pencilIsChecked={pencilIsChecked}
                    setPencilIsChecked={setPencilIsChecked}

                    pathsIsChecked={pathsIsChecked}
                    setPathsIsChecked={setPathsIsChecked}
                    setPathClicked={setPathClicked}

                    map_id={map_id}
                    paths={paths}
                    setPaths={setPaths}
                />
            </div>
        </div>
    )
}