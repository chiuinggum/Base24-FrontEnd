import SelectDateTagsPath from "./SelectDateTagsPath";
import { useState } from "react";
import dynamic from "next/dynamic";
const NotePadPath = dynamic(() => import("./NotePadPath"), { ssr: false });
import Swal from "sweetalert2";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function PathSidebar(props) {
    const {
        pathClicked,
        setPathClicked,
        paths,
        markers,
        map_id,
    } = props;
    // pathClicked is the id of the path that was clicked
    const path = paths.find((path) => path.id === pathClicked);
    const startMarker = markers.find((marker) => marker.id === path.start_marker_id);
    const endMarker = markers.find((marker) => marker.id === path.end_marker_id);
    const [saveClicked, setSaveClicked] = useState(false);
    return (
        <div
            style={{ width: '25vw', height: '100vh' }}
            className="bg-gray-100 flex flex-col justify-between"
        >
            <div>
                <div className="flex flex-row gap-2 items-center text-white p-2 bg-sky-600 mb-4 justify-center">
                    <h1 className="font-bold text-lg">{startMarker.name}</h1>
                    <ArrowRightAltIcon />
                    <h1 className="font-bold text-lg">{endMarker.name}</h1>
                </div>
                
                <SelectDateTagsPath
                    pathClicked={pathClicked}
                    map_id={map_id}
                    saveClicked={saveClicked}
                />
                <NotePadPath
                    pathClicked={pathClicked}
                    saveClicked={saveClicked}
                    setSaveClicked={setSaveClicked}
                    paths={paths}
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
                            setPathClicked(false)
                        })
                    }}
                >Save</button>
                <button
                    type="button"
                    className="border-2 border-gray-400 text-gray-600 px-5 py-2 rounded-full hover:bg-red-700 hover:text-white hover:border-red"
                    onClick={() => setPathClicked(false)}
                >Back</button>
            </div>
        </div>
    );
}