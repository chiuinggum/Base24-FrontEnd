// import React, { useRef, useState } from "react";
// import { useAutocomplete } from "@vis.gl/react-google-maps";
// import axios from "axios";

// // still need to add the action after selecting a place

// export default function SearchField (props) {
//     const {
//         setMarkers,
//         index
//     } = props;
//     if(!index) return null;
//     console.log('index', index);
//     const inputRef = useRef(null);
//     const [inputValue, setInputValue] = useState("");

//     const onPlaceChanged = async (place) => {
//         if (place) {
//             setInputValue(place.formatted_address || place.name);
//             const id = await createMarker(place.name, place.place_id, place.geometry.location.lat(), place.geometry.location.lng());
//             const marker = {
//                 id,
//                 name: place.name,
//                 place_id: place.place_id,
//                 lat: place.geometry.location.lat(),
//                 lng: place.geometry.location.lng(),
//                 place_tag: 'other'
//             }; 
//             setMarkers((markers) => [...markers, marker]);
//         }
//         inputRef.current && inputRef.current.focus();
//     }

//     useAutocomplete({
//         inputField: inputRef && inputRef.current,
//         fields: ['geometry.location', 'place_id', 'name'],
//         onPlaceChanged
//     })

//     const handleInputChange = e => setInputValue(e.target.value);

//     async function createMarker(name, place_id, lat, lng) {
//         try {
//             const markerLocation = await axios.post(
//                 'http://127.0.0.1:4000/marker/create',
//                 {
//                     name,
//                     place_id,
//                     lat,
//                     lng
//                 },
//                 { headers: { 'Content-Type': 'application/json' } }
//             );
//             const data = markerLocation.data.data;
//             const id = data.id;
//             const markerInfo = await axios.post(
//                 'http://127.0.0.1:4000/marker/info',
//                 {
//                     "map_id": index,
//                     "marker_id": id,
//                 },
//                 { headers: { 'Content-Type': 'application/json' } }
//             )
//             return id;
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <div className="flex flex-col p-2">
//             <span className="ms-3">Add a Place:</span>
//                 <label
//                     className="p-2 mx-1 relative inline-flex items-center"
//                 >
//                     <input
//                         ref={inputRef}
//                         value={inputValue}
//                         onChange={handleInputChange}
//                         placeholder="Search"
//                         className="border"
//                     />
//                 </label>
//         </div>
//     );
// };