"use client"

import React, { useEffect, useRef, useState } from 'react';
import {
    APIProvider,
    Map,
    useAutocomplete,
    useMapsLibrary,
} from '@vis.gl/react-google-maps';


export default function Test() {
    return (
        <APIProvider
            apiKey='process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'
            libraries={['places']}
        >
            <Autocomplete />
        </APIProvider>
    );
}

function Autocomplete() {
    const placesLibLoaded = useMapsLibrary('places');
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);


    useEffect(() => {
        if(!placesLibLoaded) return;
        const autocomplete = new placesLibLoaded.Autocomplete();
    }, [placesLibLoaded])
};