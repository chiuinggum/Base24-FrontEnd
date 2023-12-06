import React, { useRef, useState } from "react";
import { useAutocomplete } from "@vis.gl/react-google-maps";
import axios from "axios";

// still need to add the action after selecting a place

export default function SearchField (props) {
    const {
        setMarkers,
    } = props;

    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const onPlaceChanged = async (place) => {
        if (place) {
            setInputValue(place.formatted_address || place.name);
            const marker = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
            await createMarker();
            setMarkers((markers) => [...markers, marker]);
        }
        inputRef.current && inputRef.current.focus();
    }

    useAutocomplete({
        inputField: inputRef && inputRef.current,
        fields: ['geometry.location', 'place_id', 'name'],
        onPlaceChanged
    })

    const handleInputChange = e => setInputValue(e.target.value);

    return (
        <div className="flex flex-col p-2">
            <span className="ms-3">Add a Place:</span>
                <label
                    className="p-2 mx-1 relative inline-flex items-center"
                >
                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search"
                        className="border"
                    />
                </label>
        </div>
    );
};

async function createMarker() {

};