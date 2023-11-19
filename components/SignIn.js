export default function SignIn() {
    return (
        <div className="w-96 border shadow-lg rounded">
            <h1 className="m-5">Sign In</h1>
            <form>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameOrEmail">Username/Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="usernameOrEmail" type="text" placeholder="Username or Email"/>
                </span>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </span>
                <span className="flex mx-5 my-1 text-sm">
                    <p>Don't have an account yet? <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="./signup">Create one</a>.</p>
                </span>
                <span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-3 focus:outline-none focus:shadow-outline" type="button">Sign In</button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="./forgotpwd">Forgot Password?</a>
                </span>
            </form>
        </div>
    );
};