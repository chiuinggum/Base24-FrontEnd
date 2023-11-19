export default function ResetPwd() {
    return (
        <div className="w-96 border shadow-lg rounded">
            <h1 className="m-5">Change Password</h1>
            <form>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">New Password</label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </span>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirm Password</label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </span>
                <span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-3 focus:outline-none focus:shadow-outline" type="button">Reset Password</button>
                </span>
            </form>
        </div>
    );
};