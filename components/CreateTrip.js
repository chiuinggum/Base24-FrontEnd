export default function CreateTrip() {
    return (
        <div className="flex w-96 mx-5 my-3 flex-col">
            <h1 className="m-5">Create a Trip!</h1>
            <form>
                <span className="flex mx-5 my-3 flex-col">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">Name Your Trip</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="e.g. 1/10 - 1/18, Tokyo"/>
                </span>
                <span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-3 focus:outline-none focus:shadow-outline" type="button">Create</button>
                </span>
            </form>
        </div>
    );
};