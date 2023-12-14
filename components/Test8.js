// "use client"

// import React, { useEffect, useRef, useState } from 'react';
// import {
//     APIProvider,
//     Map,
//     useMapsLibrary,
//     AdvancedMarker,
//     useAdvancedMarkerRef,
// } from '@vis.gl/react-google-maps';
// import axios from 'axios';

// async function getMarkers() {
//     try {
//         const res = await axios.get('http://127.0.0.1:4000/marker/1');
//         const data = res.data.data;
//         console.log(data);
//         return data;
//     } catch (err) {
//         console.error(err);
//     }
// }

// export default function Test8() {
//     const [markerData, setMarkerData] = useState([]);
//     const [highlight, setHighlight] = useState();
//     const [editing, setEditing] = useState();
//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await getMarkers();
//             data.forEach((marker) => {
//                 marker.lat = parseFloat(marker.lat);
//                 marker.lng = parseFloat(marker.lng);
//             });
//             setMarkerData(data);
//         };
//         fetchData();
//     }, []);
//     if(!markerData) return null;

//     return (
//         <>
//             <APIProvider
//                 apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//                 libraries={['places', 'marker']}
//             >
//                 {editing && (
//                     <Editing
//                         marker={markerData[editing]}
//                     />
//                 )}
//                 <div style={{ height:'90vh' }}>
//                     <Map
//                         zoom={13}
//                         center={{lat: 25.033675, lng: 121.564883}}
//                         mapId={process.env.NEXT_PUBLIC_MAP_ID_LIGHT}
//                     >
//                         {markerData.map((marker, index) => {
//                             return (
//                                 <div>
//                                     <AdvancedMarker
//                                         // className={customMarker}
//                                         key={index}
//                                         position={{ lat: marker.lat, lng: marker.lng }}
//                                         onClick={() => setEditing(index)}
//                                     >
//                                         <div
//                                             className='border bg-white'
//                                             onMouseEnter={() => setHighlight(index)}
//                                             onMouseLeave={() => setHighlight(null)}
//                                         >
//                                             <h2>{marker.name}</h2>
//                                             {highlight === index ? (
//                                                 <div>
//                                                     <p>{marker.info}: hovering</p>
//                                                 </div> 
//                                             ) : null}
//                                             {editing === index ? (
//                                                 <Editing 
//                                                     marker={markerData[editing]}
//                                                 />
//                                             ) : null}
//                                         </div>
//                                     </AdvancedMarker>
//                                 </div>
//                             )
//                         })}
//                     </Map>
//                 </div>
//             </APIProvider>
//         </>
//     );
// };

// function Editing({ marker }) {
//     const [input, setInput] = useState(marker.info);

//     return (
//         <div
//             className='bg-black text-white'
//         >
//             <form
//                 id='edit-form'
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     console.log(input);
//                 }}
//             >
//                 <label htmlFor='edit-field'>Edit</label>
//                 <input
//                     type='text'
//                     id='edit-field'
//                     className='text-black'
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                 />
//             </form>
//         </div>
//     )
// };