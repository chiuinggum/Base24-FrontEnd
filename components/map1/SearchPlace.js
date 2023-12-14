import React, { useState, useRef } from "react";
import { useAutocomplete } from "@vis.gl/react-google-maps";
import axios from "axios";

export default function SearchPlace(props) {
    const {
        map_id,
        setMarkers,
    } = props;
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    // if (!map_id) return (<div>loading...</div>)

    const onPlaceChanged = async (place) => {
        if (place) {
            setInputValue(place.formatted_address || place.name);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_MARKERS_URL}/create`,
                {
                    map_id,
                    name: place.name,
                    place_id: place.place_id,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            const data = response.data.data;
            setMarkers((markers) => [...markers, data]);
        };
        inputRef.current && inputRef.current.focus();
    }

    useAutocomplete({
        inputField: inputRef.current || null,
        fields: ['geometry.location', 'place_id', 'name'],
        onPlaceChanged
    })

    return (
        <div className="flex flex-col m-2">
                <label
                    className="relative inline-flex items-center"
                >
                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add a Place:"
                        className="border border-gray-700 bg-gray-100 rounded-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-80"
                    />
                </label>
        </div>
    )
}