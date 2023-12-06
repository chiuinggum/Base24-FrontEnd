import { useRef, useState } from "react";
import { useRouter } from "next/router";
import DatePicker from '../../components/create/DatePicker';

export default function CreatePage() {
    const nameRef = useRef();
    const router = useRouter();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="flex bg-gray-200 min-h-screen  items-center justify-center">
            <form className="flex flex-col items-center">
                <span className="flex flex-row w-fit mb-4 gap-1 items-center">
                    <label className="text-gray-700 text-md font-bold" htmlFor="tripName">
                        Trip
                    </label>
                    <label className="text-gray-700 text-md font-bold" htmlFor="tripName">
                        Name:
                    </label>
                    <input
                        ref={nameRef}
                        className="rounded-lg appearance-none border border-gray-300 bg-gray-50 w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tripName"
                        type="text"
                        placeholder="Paris Trip"
                    />
                </span>
                <span className="flex flex-row w-fit mb-4 gap-1 items-center">
                    <label className="text-gray-700 text-md font-bold" htmlFor="tripName">
                        Trip Start Date:
                    </label>
                    <DatePicker date={startDate} setDate={setStartDate}/>
                </span>
                <span className="flex flex-row w-fit mb-4 gap-1 items-center">
                    <label className="text-gray-700 text-md font-bold" htmlFor="tripName">
                        Trip End Date:
                    </label>
                    <DatePicker date={endDate} setDate={setEndDate}/>
                </span>
                <span className="flex flex-row gap-2">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
                        Create
                    </button>
                    <button type="button" onClick={() => router.push('/triplibrary')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
                        Cancel
                    </button>
                </span>
                
            </form>
        </div>
    );
};