// import { APIProvider } from '@vis.gl/react-google-maps';
// import ViewDayTagList from './map/ViewDayTagList';
// import ViewPlaceTagList from './map/ViewPlaceTagList';
// import ModeSwitch from './map/ModeSwitch';
// import SearchField from './map/SearchField';
// import PlaceList from './map/PlaceList';
// import Image from 'next/image';
// import { useState } from 'react';
// import axios from 'axios';

// export default function MapDefaultSidebar(props) {
//     const {
//         setMapId,
//         mapModeIsChecked,
//         setMapModeIsChecked,
//         drawModeIsChecked,
//         setDrawModeIsChecked,
//         markerModeIsChecked,
//         setMarkerModeIsChecked,
//         markers,
//         setMarkers,
//         index
//     } = props;

//     const handleMapModeToggle = () => {
//         setMapId((prevMapId) => {
//             const newMapId = 
//                 prevMapId === process.env.NEXT_PUBLIC_MAP_ID_LIGHT ?
//                     process.env.NEXT_PUBLIC_MAP_ID_SILVER :
//                     process.env.NEXT_PUBLIC_MAP_ID_LIGHT
//             console.log(newMapId);
//             return newMapId;
//         });
//         setMapModeIsChecked(!mapModeIsChecked);
//     }
//     const handleDrawModeToggle = () => {
//         setDrawModeIsChecked(!drawModeIsChecked);
//     }
//     const handleMarkerModeToggle = () => {
//         setMarkerModeIsChecked(!markerModeIsChecked);
//     }

//     return (
//         <div
//             style={{ width: '25vw', height: '100vh' }}
//             className="bg-gray-100 flex flex-col"
//         >
//             <ViewDayTagList />
//             <ViewPlaceTagList />
//             <ModeSwitch modeName={`Map Mode`} handleOnChange={handleMapModeToggle} isChecked={mapModeIsChecked} />
//             <ModeSwitch modeName={`Draw Mode`} handleOnChange={handleDrawModeToggle} isChecked={drawModeIsChecked} />
//             <ModeSwitch modeName={`Marker Mode`} handleOnChange={handleMarkerModeToggle} isChecked={markerModeIsChecked} />
//             <APIProvider
//                 apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//                 libraries={['places']}
//             >
//                 <SearchField 
//                     setMarkers={setMarkers}
//                     index={index}
//                 />
//             </APIProvider>
//             <div className="flex flex-col p-2">
//                 <span className="ms-3">Places:</span>
//                 <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 ms-4 my-1">
//                     {
//                         markers.map((marker, index) => {
//                             // const [editing, setEditing] = useState(false);
//                             // const [editedName, setEditedName] = useState(marker.name);
//                             const handleEdit = () => { setEditing(true); }
//                             const handleSave = async () => {
//                                 console.log('save: ', editedName);
//                                 setEditing(false);
//                                 marker.name = editedName;
//                                 await updateMarkerName(marker.id, editedName);
//                             };
//                             const handleCancel = () => {
//                                 setEditedName(marker.name);
//                                 setEditing(false);
//                             }
//                             const handleDelete = async (marker_id) => {
//                                 const isConfirmed = window.confirm('Are you sure you want to delete this marker?');
//                                 if(isConfirmed) {
//                                     await deleteMarker(marker_id);
//                                     setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== marker_id));
//                                 }
//                             }

//                             return (
//                                 <div
//                                     className='flex flex-row'
//                                 >
//                                     {/* {
//                                         editing ? (
//                                             <>
//                                                 <input 
//                                                     type='text'
//                                                     value={editedName}
//                                                     onChange={(e) => setEditedName(e.target.value)}
//                                                 />
//                                                 <button onClick={handleSave}>Save</button>
//                                                 <button onClick={handleCancel}>Cancel</button>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <li key={index}>{marker.name}</li>
//                                                 <Image
//                                                     src='/edit.png'
//                                                     alt='Edit'
//                                                     width={20}
//                                                     height={10}
//                                                     cursor='pointer'
//                                                     onClick={handleEdit}
//                                                 />
//                                                 <Image
//                                                     src='/trash.png'
//                                                     alt='Delete'
//                                                     width={20}
//                                                     height={10}
//                                                     cursor='pointer'
//                                                     onClick={() => handleDelete(marker.id)}
//                                                 />
//                                             </>
//                                         )
//                                     } */}
//                                 </div>
//                             )
//                         })
//                     }
//                 </ul>
//             </div>
//         </div>
//     );
// }

// async function updateMarkerName(id, name) {
//     try {
//         const response = await axios.put(
//             'http://localhost:4000/marker/name',
//             { marker_id: id, name: name },
//             { headers: { 'Content-Type': 'application/json' } }
//         )
//     } catch (err) {
//         console.error(err);
//     }
// };

// async function deleteMarker(id) {
//     try {
//         const response = await axios.put(
//             'http://localhost:4000/marker/delete',
//             { marker_id: id },
//             { headers: { 'Content-Type': 'application/json' } }
//         )
//     } catch (err) {
//         console.error(err);
//     }
// }