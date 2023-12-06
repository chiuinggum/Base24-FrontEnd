"use client"

import React, { useEffect, useRef, useState } from 'react';
import {
    APIProvider,
    Map,
    useAutocomplete,
    useMapsLibrary,
    AdvancedMarker,
    useAdvancedMarkerRef,
    InfoWindow
} from '@vis.gl/react-google-maps';
import axios from 'axios';
import ReactDom from 'react-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import dynamic from "next/dynamic";
import { ClassNames } from '@emotion/react';
const Editor = dynamic(() => import("./Editor"), { ssr: false });


// export default function Test9() {
//     return (
//         <>
//             <APIProvider
//                 apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//                 libraries={['places', 'marker']}
//             >
//                 <div style={{ height: '100vh' }}>
//                     <Map
//                         zoom={13}
//                         center={{lat: 25.033675, lng: 121.564883}}
//                         mapId={process.env.NEXT_PUBLIC_MAP_ID_LIGHT}
//                     >
//                         <AdvancedMarker
//                             position={{lat: 25.033675, lng: 121.564883}}
//                         >
//                             <div>
//                                 <h1>Hello World</h1>
//                                 <p>This is a test</p>
//                             </div>
//                         </AdvancedMarker>
//                     </Map>
//                 </div>
//             </APIProvider>
//         </>
//     );
// };

const Test9 = () => {
    const [editing, setEditing] = useState();
    const [send, setSend] = useState();
    return (
        <div className='flex flex-row'>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places', 'marker']}
            >
                <div>
                    <Map
                    style={{ height: '100vh', width: '50vw' }}
                    zoom={12}
                    center={{lat: 53.54992, lng: 10.00678}}
                    mapId={process.env.NEXT_PUBLIC_MAP_ID_LIGHT}>
                        <AdvancedMarker
                        //   className={customMarker}
                        position={{lat: 53.54992, lng: 10.00678}}
                        onClick={() => setEditing(true)}
                        >
                            <div
                            >
                                <h1>Marker</h1>
                            </div>
                        </AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>
            <div style={{width: '50vw'}}>
                {editing && (
                    <>
                        <Editor />
                        {/* <span className="flex flex-row gap-2">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
                                Create
                            </button>
                            <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
                                Cancel
                            </button>
                        </span> */}
                    </>
                )}
            </div>
        </div>
    );
};
export default Test9;