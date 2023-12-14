import TripTable from "../../components/triplibrary/TripTable";
import Router from "next/router";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

export default function TripLibraryPage() {
    
    return (
        <div className="bg-gray-200 min-h-screen flex flex-col items-center">
            <span className="flex flex-row items-center gap-4 m-4">
                <h1 className="text-gray-700 text-xl font-bold">Trip Library</h1>
                <button
                        className="bg-sky-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
                        onClick={() => Router.push("/create")}
                    >
                     <LibraryAddIcon />
                    </button>
            </span>
            <div className="w-5/6 mb-6">
                <TripTable/>
            </div>
        </div>
    );
}