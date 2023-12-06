"use client";

import { useState, useRef } from 'react';
import {
    APIProvider,
    Map,
    useAutocomplete
} from '@vis.gl/react-google-maps';


import SidebarButton from "./SidebarButton";

export default function MapSidebar() {
    const position = { lat: 53.54, lng: 10 };
    const [mapId, setMapId] = useState(process.env.NEXT_PUBLIC_MAP_ID_SILVER);
    const [isChecked, setIsChecked] = useState(false);
    const handleMapModeToggle = () => {
        setMapId((prevMapId) => {
            const newMapId = 
                prevMapId === process.env.NEXT_PUBLIC_MAP_ID_SILVER ?
                    process.env.NEXT_PUBLIC_MAP_ID_LIGHT :
                    process.env.NEXT_PUBLIC_MAP_ID_SILVER
            console.log(newMapId);
            return newMapId;
        });
        setIsChecked((prevIsChecked) => {
            const newIsChecked = !prevIsChecked;
            console.log("New isChecked:", newIsChecked);
            return newIsChecked;
        });
    };
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const onPlaceChanged = place => {
        if (place) {
            setInputValue(place.formatted_address || place.name);
        }
        inputRef.current && inputRef.current.focus();
    };

    useAutocomplete({
        inputField: inputRef && inputRef.current,
        onPlaceChanged
    });

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <button
                type="button"
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>
            <aside
                id="default-sidebar"
                aria-label="Sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <SidebarButton buttonName="Add Markers"/>
                        <SidebarButton buttonName="Link Markers"/>
                        <li>
                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Map Mode</span>
                                <label className="mx-3 relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        onChange={handleMapModeToggle}
                                        checked={isChecked}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </aside>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
            >
                <div style={{ height: "100vh", width: "80%", marginLeft: "256px" }}>
                    <Map
                        zoom={9}
                        center={position}
                        mapId={mapId}
                    >
                    </Map>
                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        className='border'
                    />
                </div>
            </APIProvider>
        </>
    );
};