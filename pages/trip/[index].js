import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function TripPage() {
    const router = useRouter();
    const trip_id = router.query.index;
    const [maps, setMaps] = useState([]);
    const [trip, setTrip] = useState(null);
    const [mapId, setMapId] = useState(process.env.NEXT_PUBLIC_MAP_ID_LIGHT);
    
    const [tripFocusIsChecked, setTripFocusIsChecked] = useState(false);
    const [tripDetailIsChecked, setTripModeIsChecked] = useState(false);
    const [tripDateIsChecked, setTripDateIsChecked] = useState(false);
    
    const [drawMapId, setDrawMapId] = useState(null);
    const [drawMapLat, setDrawMapLat] = useState(null);
    const [drawMapLng, setDrawMapLng] = useState(null);
    const [drawMapZoom, setDrawMapZoom] = useState(null);


    useEffect(() => {
        if (!trip_id) return;
        // store trip id in local storage
        if (typeof window !== 'undefined') localStorage.setItem('trip_id', trip_id);
        // initialize maps
        const fetchMap = async () => {
            const url = `${process.env.NEXT_PUBLIC_MAPS_URL}/get/${trip_id}`
            const response = await axios.get(url);
            const data = response.data.data;
            data.forEach((map) => {
                map.center_lat = parseFloat(map.center_lat);
                map.center_lng = parseFloat(map.center_lng);
            })
            setMaps(data);
        }
        const fetchTrip = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_TRIPS_URL}/get/${trip_id}`);
                const data = response.data.data;
                setTrip(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchMap();
        fetchTrip();
    }, [trip_id])
    

    return (
        <div className="flex flex-row">
            <div
                style={{ height: "100vh", width: "20vw", zIndex: "2"}}
                className="bg-gray-200"
            >
                <div className="flex flex-col">
                    <button
                        onClick={() => router.push(`/createmap`)}
                    >
                        Create Map
                    </button>
                    <h1>Maps: </h1>
                    <ul>
                        {
                            maps.map((map) => {
                                return (
                                    <li key={map.id}>
                                        <button
                                            onDoubleClick={() => router.push(`/map1/${map.id}`)}
                                        >
                                            {map.name}
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div
                style={{ height: "100vh", width: "80vw" }}
            >
                
            </div>
        </div>
    )
}