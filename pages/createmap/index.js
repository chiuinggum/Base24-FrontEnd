import { useRef, useState, useEffect } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { parseCookies, setCookie } from "nookies";
import axios from "axios";
import DatePicker from "../../components/create/DatePicker";
import Router from "next/router";

export default function CreateMapPage () {
    const locationRef = useRef();
    const nameRef = useRef();
    const [mapName, setMapName] = useState("");
    const [address, setAddress] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    function handleCreateButtonClick() {
        setAddress(locationRef.current.value);
        setMapName(nameRef.current.value);
        console.log(address);
    };

    return (
        <div className="flex bg-gray-200 min-h-screen  items-center justify-center">
            <form className="flex flex-col items-center">
                <span className="flex flex-col w-fit mb-3 gap-3 ">
                    <span className="flex flex-row items-center gap-3">
                        <label className="text-gray-700 text-md font-bold" htmlFor="location">
                            Location:
                        </label>
                        <input
                            ref={locationRef}
                            className="rounded-lg appearance-none border border-gray-300 bg-gray-50 w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="location"
                            placeholder="Paris"
                        />
                        </span>
                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                        <Geocoding
                            address={address}
                            mapName={mapName}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </APIProvider>
                    <span className="flex flex-row items-center gap-8">
                        <label className="text-gray-700 text-md font-bold" htmlFor="mapName">
                            Name:
                        </label>
                        <input
                            ref={nameRef}
                            className="rounded-lg appearance-none border border-gray-300 bg-gray-50 w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="mapName"
                            placeholder="Paris Map"
                        />
                    </span>
                </span>
                <span className="flex flex-col gap-3">
                    <span className="flex flex-row items-center gap-2">
                        <label className="text-gray-700 text-md font-bold">Start Date: </label>
                        <DatePicker date={startDate} setDate={setStartDate}/>
                    </span>
                    <span className="flex flex-row items-center gap-4">
                        <label className="text-gray-700 text-md font-bold">End Date: </label>
                        <DatePicker date={endDate} setDate={setEndDate}/>
                    </span>
                    
                </span>
                <span className="flex flex-row gap-2 mt-3">
                    <button
                        type="button"
                        className="bg-sky-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
                        onClick={handleCreateButtonClick}
                    >
                        Create
                    </button>
                    <button
                        type="button"
                        className="bg-gray-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
                        onClick={() => Router.push('/triplibrary')}
                    >
                        Cancel
                    </button>
                </span>
            </form>
        </div>
    );
};

const createMap = async (address, lat, lng, mapName, startDate, endDate) => {
    try {
        const cookies = parseCookies();
        console.log({ cookies });
        const trip_id = cookies.trip_id;
        console.log(trip_id);
        const data = {
            trip_id,
            location: address,
            center_lat: lat,
            center_lng: lng,
            name: mapName,
            start_date: startDate,
            end_date: endDate,
        }
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_MAPS_URL}/create`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        )
        const map_id = response.data.data.id;
        Router.push(`/map/${map_id}`);
    } catch (err) {
        console.error(err);
    }
}

// async function createMap(address, lat, lng) {
//     try {
//         const cookies = parseCookies();
//         const access_token = cookies.access_token;
//         const user_id = cookies.user_id;
//         console.log(access_token, user_id);
//         const response = await axios.post(
//             'http://localhost:4000/map/create',
//             {
//                 name: address,
//                 lat,
//                 lng,
//                 user_id
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${access_token}`
//                 }
//             }
//         );
//         const map_id = response.data.data.id;
//         setCookie(null, 'map_id', map_id, { path: '/' });
//     } catch (err) {
//         console.error(err);
//     }
// }

function Geocoding(props) {
    const {
        address,
        mapName,
        startDate,
        endDate
    } = props;
    const geocodingApiLoaded = useMapsLibrary('geocoding');
    const [geocodingService, setGeocodingService] = useState();
    const [geocodingResult, setGeocodingResult] = useState();

    useEffect(() => {
        if (!geocodingApiLoaded) return;
        setGeocodingService(new window.google.maps.Geocoder());
    }, [geocodingApiLoaded]);

    useEffect(() => {
        if (!geocodingService || !address) return;
        geocodingService.geocode({ address }, (results, status) => {
            if (results && status === 'OK') {
                setGeocodingResult(results[0]);
            } else { console.log(status) }
        })
    }, [geocodingService, address])

    useEffect(() => {
        async function createAndSaveMap() {
            if (geocodingResult) {
                console.log(geocodingResult.formatted_address);
                const lat = geocodingResult.geometry.location.lat();
                const lng = geocodingResult.geometry.location.lng();
                console.log(lat, lng);
                await createMap(address, lat, lng, mapName, startDate, endDate);
            }
        }
        createAndSaveMap();
    }, [geocodingResult]);

    // if (!geocodingService) return <div>Loading...</div>
    // if (!geocodingResult) return <div>Geocoding...</div>

    // return (
    //     <div >
    //         <h1>{geocodingResult.formatted_address}</h1>
    //         <h2>{geocodingResult.geometry.location.lat()}</h2>
    //         <h2>{geocodingResult.geometry.location.lng()}</h2>
    //     </div>
    // );
    return null;
}