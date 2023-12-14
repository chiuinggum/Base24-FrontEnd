import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

let arr = [];

export default function Markers (props) {
    const {
        markers,
        placeFilter,
        dateFilter,
        detailsIsChecked,
        pencilIsChecked,
        setMarkerClicked,
        paths,
        setPaths
    } = props;
    const [highlightedMarker, setHighlightedMarker] = useState(null);

    const handleClickOnMarker = async (marker_id) => {
        if (pencilIsChecked) {
            arr.push(marker_id);
            console.log(arr);
            if (arr.length === 2) {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_PATHS_URL}/create`,
                    {
                        map_id: paths[0].map_id,
                        start_marker_id: arr[0],
                        end_marker_id: arr[1]
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                )
                const data = response.data.data;
                setPaths((prevPaths) => [...prevPaths, data]);
            }
        } else {
            setMarkerClicked(marker_id);
        }
    }

    return (
        <>
            {
                markers.map((marker) => {
                    const isHighlighted = highlightedMarker === marker.id || detailsIsChecked;
                    if (placeFilter !== null) {
                        if (marker.place_tag !== placeFilter) return;
                    }
                    if (dateFilter !== null) {
                        // console.log(marker.dates.data);
                        if (!marker.dates.data.includes(dateFilter)) return;
                    }
                    return (
                        <div key={marker.id}>
                            <AdvancedMarker
                                position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                                onClick={async () => await handleClickOnMarker(marker.id)}
                            >
                                <div
                                    key={marker.id}
                                    className="rounded-full w-15 h-15 flex items-center justify-center relative z-50 "
                                    onMouseEnter={() => {setHighlightedMarker(marker.id)}}
                                    onMouseLeave={() => {setHighlightedMarker(null)}}
                                >
                                    <Icon
                                        placetag={marker.place_tag}
                                    />
                                    {
                                        (isHighlighted) && (
                                            <div className=" bg-sky-700 rounded-lg p-2 w-fit h-30">
                                                <h1
                                                    className="text-white"
                                                >
                                                    {marker.name}
                                                </h1>
                                            </div>
                                        )
                                    }
                                    
                                </div>
                            </AdvancedMarker>
                        </div>
                    )
                })
            }
        </>
    )
}

const Icon = (props) => {
    const {
        placetag,
    } = props;

    return (
        <Image 
            src={`/${placetag}.png`}
            alt={placetag}
            width={35}
            height={35}
        />
    );
}