import SelectPlaceTagList from "./place/SelectPlaceTagList";
import SelectDayTagList from "./place/SelectDayTagList";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

export default function PlaceSidebar(props) {
    
    return (
        <div
            style={{ width: '25vw', height: '100vh' }}
            className="bg-gray-100 flex flex-col"
        >
            {/* need to modify the tag list */}
            <SelectPlaceTagList />
            <SelectDayTagList />
            <div className="mx-2">
                <Editor
                    markers={markers}
                    index={index}
                    markerClicked={markerClicked}
                />
            </div>
        </div>
    );
};