"use client"

import React, { useEffect, useRef, useState } from 'react';
import {
    APIProvider,
    Map,
    useAutocomplete,
    useMapsLibrary,
} from '@vis.gl/react-google-maps';

const AutocompleteComponent = () => {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const onPlaceChanged = place => {
        // place is the selected place result
        if (place) {
            setInputValue(place.formatted_address || place.name);
            // do something with place
            console.log(place.geometry.location);
            
        }

        inputRef.current && inputRef.current.focus();
    };

    useAutocomplete({
        inputField: inputRef && inputRef.current,
        fields: ['geometry.location', 'place_id', 'name'],
        onPlaceChanged
    });

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    return (
        <input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for a place"
            className="border"
        />
    );
}

export default function Test2() {
    return (
        <>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
            >
                <div style={{ height: "100vh" }}>
                    <h1>autocomplete</h1>
                    <AutocompleteComponent />
                </div>
            </APIProvider>
        </>
    );
};