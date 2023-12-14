import { useRef, useState } from "react";
import { useRouter } from "next/router";
import DatePicker from '../../components/create/DatePicker';
import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";

export default function CreatePage() {
    const nameRef = useRef();
    const router = useRouter();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleCreate = async () => {
        const tripName = nameRef.current.value;
        // const tripStart = startDate.toISOString().split('T')[0];
        // const tripEnd = endDate.toISOString().split('T')[0];
        // const tripStart = (new Date(startDate)).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-');
        // const tripEnd = (new Date(endDate)).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').reverse().join('-');
        console.log(startDate, endDate);
        // console.log(tripStart, tripEnd);
        const user_id = parseCookies().user_id;
        console.log(tripName, startDate, endDate, user_id);
        const tripData = {
            name: tripName,
            user_id,
            start_date: startDate,
            end_date: endDate
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_TRIPS_URL}/create`, tripData, {headers: { 'Content-Type': 'application/json' }});
            const data = response.data.data;
            const trip_id = data.id;
            const trip_id_cookie = parseCookies().trip_id;
            if (trip_id_cookie) {
                destroyCookie(null, 'trip_id');
            }
            setCookie(null, 'trip_id', trip_id, { path: '/' });
            // router.push(`/trip/${trip_id}`);
            router.push('/triplibrary');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex bg-gray-200 min-h-screen  items-center justify-center">
            <form className="flex flex-col items-start">
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
                <span className="flex flex-row w-fit mb-4 gap-2 items-center">
                    <label className="text-gray-700 text-md font-bold" htmlFor="tripName">
                        Start Date:
                    </label>
                    <DatePicker setDate={setStartDate}/>
                </span>
                <span className="flex flex-row w-fit mb-4 gap-4 items-center">
                    <label className="text-gray-700 text-md font-bold" htmlFor="tripName">
                        End Date:
                    </label>
                    <DatePicker setDate={setEndDate}/>
                </span>
                <span className="flex flex-row gap-2 self-center">
                    <button
                        type="button" className="bg-sky-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
                        onClick={handleCreate}
                    >
                        Create
                    </button>
                    <button type="button" onClick={() => router.push('/triplibrary')} className="bg-gray-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
                        Cancel
                    </button>
                </span>
                
            </form>
        </div>
    );
};