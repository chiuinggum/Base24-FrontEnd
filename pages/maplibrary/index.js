import MapCard from "@/components/MapCard";
export default function MapLibraryPage() {
    const mapData = [
        {
            id:1,
            name:"Tokyo Trip",
            picture:"",
        },
        {
            id:2,
            name:"France Trip",
            picture:"",
        }
    ]
    return (
        <div className="flex items-center justify-center">
            {mapData.map((map) => (
                <MapCard key={map.id} map={map}/>
            ))}
        </div>
    );
}