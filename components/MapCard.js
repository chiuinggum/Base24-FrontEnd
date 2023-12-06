import Image from "next/image";
export default function MapCard({map}) {
    return (
        <div className="bg-white rounded-lg shadow-lg mx-2 p-2 w-40">
            <div className="text-center">
                <Image src={map?.picture} alt="map" className="w-full rounded-lg" height={200} width={300} />
            </div>
            <hr className="w-full"/>
            <div className="flex justify-between">
                <p>{map?.name}</p>
                <button>...</button>
            </div>

        </div>
            
    );
}