import dynamic from "next/dynamic";
const NotePad = dynamic(() => import("./NotePad"), { ssr: false });
import { useState } from "react";
import SelectPlaceTag from "./SelectPlaceTag";
import SelectDateTags from "./SelectDateTags";
import Swal from "sweetalert2";

export default function MarkerSidebar (props) {
    const {
        markerClicked,
        setMarkerClicked,
        markers,
        trip,
        map_id
    } = props;
    // markerClicked is the id of the marker
    const marker = markers.find((marker) => marker.id === markerClicked);
    const [saveClicked, setSaveClicked] = useState(false);
    
    return (
        <div
            style={{ width: '25vw', height: '100vh' }}
            className="bg-gray-100 flex flex-col justify-between"
        >   <div className="w-full">
            <h1 className="font-bold p-2 text-xl bg-sky-600 text-white flex justify-center mb-4">{marker.name}</h1>
            <SelectPlaceTag
                markers={markers}
                markerClicked={markerClicked}

                saveClicked={saveClicked}
                setSaveClicked={setSaveClicked}
            />
            {/* add day tags */}
            <SelectDateTags
                markers={markers}
                markerClicked={markerClicked}

                saveClicked={saveClicked}
                setSaveClicked={setSaveClicked}

                trip={trip}
                map_id={map_id}
            />
            <NotePad
                markerClicked={markerClicked}
                saveClicked={saveClicked}
                setSaveClicked={setSaveClicked}
                markers={markers}
            />
            </div>
            <div className="flex flex-row items-center gap-2 self-center mb-4">
                <button
                    type="button"
                    className="bg-sky-600 text-white px-5 py-2 rounded-full hover:bg-sky-700"
                    onClick={() => {
                        setSaveClicked(true)
                        Swal.fire({
                            title: 'Saved!' ,
                            icon: 'success',
                            timer: 1000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            didOpen: () => {
                                Swal.showLoading()
                            }
                        }).then(() =>{
                            setMarkerClicked(false)
                        })
                    }}
                >Save</button>
                <button
                    type="button"
                    className="border-2 border-gray-400 text-gray-600 px-5 py-2 rounded-full hover:bg-red-700 hover:text-white hover:border-red"
                    onClick={() => setMarkerClicked(false)}
                >Back</button>
            </div>
        </div>
    )
}