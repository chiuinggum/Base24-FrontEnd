export default function SignUp() {
    return (
        <div className="w-96 border shadow-lg rounded">
            <h1 className="m-5">Sign Up</h1>
            <form>
                <span className="flex mx-5 my-3 flex-col">
                    <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                </span>
                <span className="flex mx-5 my-3 flex-col">
                    <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"/>
                </span>
                <span className="flex mx-5 my-3 flex-col">
                    <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </span>
                <span className="flex mx-5 my-3 flex-col">
                    <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirm Password</label>
                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </span>
                <span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-3 focus:outline-none focus:shadow-outline" type="button">Sign Up</button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">Forgot Password?</a>
                </span>
            </form>
        </div>
    );
};