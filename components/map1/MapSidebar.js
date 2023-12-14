import ModeSwitch from '../map/map/ModeSwitch';
import ViewDayTagList from '../map/map/ViewDayTagList';
import ViewPlaceTagList from '../map/map/ViewPlaceTagList';
import { APIProvider } from '@vis.gl/react-google-maps';
import SearchPlace from './SearchPlace';
import PlaceTagsFilter from './PlaceTagsFilter';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButtonsMultiple from './ToggleButtonsMultiple';
import Swal from 'sweetalert2';
import DateTagsFilter from './DateTagsFilter';

export default function MapSidebar (props) {
    const {
        setMapId,

        placeFilter,
        setPlaceFilter,

        dateFilter,
        setDateFilter,

        focusIsChecked,
        setFocusIsChecked,

        detailsIsChecked,
        setDetailsIsChecked,

        pencilIsChecked,
        setPencilIsChecked,

        pathsIsChecked,
        setPathsIsChecked,

        map_id,
        setMarkers,

        markers
    } = props
    const [editing, setEditing] = useState('');
    const [editedName, setEditedName] = useState('');

    const handleFocusToggle = () => {
        setMapId((prevMapId) => {
            const newMapId = 
                prevMapId === process.env.NEXT_PUBLIC_MAP_ID_LIGHT ?
                    process.env.NEXT_PUBLIC_MAP_ID_SILVER :
                    process.env.NEXT_PUBLIC_MAP_ID_LIGHT
            console.log(newMapId);
            return newMapId;
        });
        setFocusIsChecked(!focusIsChecked);
    }

    return (
        <div
            style={{ width: '25vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
            className="bg-gray-100 flex flex-col"
        >
            <div>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={['places']}
            >
                <SearchPlace
                    map_id={map_id}
                    setMarkers={setMarkers}
                />
            </APIProvider>
            {/* <ViewDayTagList /> */}
            <PlaceTagsFilter
                setPlaceFilter={setPlaceFilter}
            />
            <DateTagsFilter
                map_id={map_id}
                setDateFilter={setDateFilter}
            />
            <div className='flex flex-col ml-2 mt-4'>
                <span className="ms-3 font-semibold">Places</span>
                <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 max-h-80 overflow-scroll ms-4 my-1">
                    {
                        markers.map((marker) => {
                            if (placeFilter !== null) {
                                if (marker.place_tag !== placeFilter) return;
                                    
                            }
                            if (!editing) {
                                return (
                                    <div key={marker.id} className="flex flex-row gap-1">
                                        <li>{marker.name}</li>
                                        <EditIcon
                                            className='cursor-pointer'
                                            onClick={() => {
                                                setEditing(marker.id);
                                                setEditedName(marker.name);
                                            }}
                                        />
                                        <DeleteIcon
                                            className='cursor-pointer'
                                            onClick={async () => {
                                                Swal.fire({
                                                    title: 'Are you sure?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, delete it!'
                                                  }).then(async (result) => {
                                                    if (result.isConfirmed) {
                                                        await axios.put(
                                                            `${process.env.NEXT_PUBLIC_MARKERS_URL}/delete`,
                                                            { id: marker.id },
                                                            { headers: { 'Content-Type': 'application/json' } }
                                                        );
                                                        setMarkers((prevMarkers) => prevMarkers.filter((prevMarker) => prevMarker.id !== marker.id));
                                                        Swal.fire(
                                                            'Deleted!',
                                                            'Your file has been deleted.',
                                                            'success'
                                                        )
                                                    }
                                                  })
                                                // const isConfirmed = window.confirm('Are you sure you want to delete this marker?');
                                                // if (isConfirmed) {
                                                //     await axios.put(
                                                //         `${process.env.NEXT_PUBLIC_MARKERS_URL}/delete`,
                                                //         { id: marker.id },
                                                //         { headers: { 'Content-Type': 'application/json' } }
                                                //     );
                                                //     setMarkers((prevMarkers) => prevMarkers.filter((prevMarker) => prevMarker.id !== marker.id));
                                                // }
                                            }}/>
                                    </div>
                                )
                            } else {
                                if (editing === marker.id) {
                                    return (
                                        <li key={marker.id}>
                                            <input 
                                                type='text'
                                                value={editedName}
                                                className='mr-2 border border-gray-700 bg-gray-100 rounded-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/5'
                                                onChange={(e) => setEditedName(e.target.value)}
                                            />
           
                                            <DoneIcon
                                                className='cursor-pointer'
                                                onClick={async () => {
                                                    setEditing('');
                                                    marker.name = editedName;
                                                    setEditedName('');
                                                    await axios.put(
                                                        `${process.env.NEXT_PUBLIC_MARKERS_URL}/update/name`,
                                                        { id: marker.id, name: editedName },
                                                        { headers: { 'Content-Type': 'application/json' } }
                                                    )
                                                    setEditedName('');
                                                }} 
                                            />
                                            <CloseIcon
                                                className='cursor-pointer'
                                                onClick={async () => {
                                                    setEditing('');
                                                    setEditedName('');
                                                }}
                                            />
                                        </li>
                                    )
                                }
                                return (
                                    <div key={marker.id}>
                                        <li>{marker.name}</li>
                                    </div>
                                )
                            }
                        })
                    }
                </ul>
                
            </div>
            </div>
            <ToggleButtonsMultiple
                    setMapId={setMapId}
                    setFocusIsChecked={setFocusIsChecked}
                    setPencilIsChecked={setPencilIsChecked}
                    setDetailsIsChecked={setDetailsIsChecked}
                    setPathsIsChecked={setPathsIsChecked}
                />
        </div>
    )
}