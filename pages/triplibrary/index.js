import TripTable from "../../components/triplibrary/TripTable";

export default function TripLibraryPage() {
    return (
        <div className="bg-gray-200 min-h-screen flex flex-col items-center">
            <h1 className="text-gray-700 text-xl font-bold m-4">Trip Library</h1>
            <div className="w-5/6">
                <TripTable/>
            </div>
            
        </div>
    );
}