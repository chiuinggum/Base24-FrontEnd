import { useState } from "react";
import axios from "axios";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!username || !email || !password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = { username, email, password, conf_password: confirmPassword };

        try {
            const response = axios.post(NEXT_PUBLIC_SIGNUP_URL, user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const { data } = response;
            console.log('Sign up response', data);
        } catch (err) {
            console.error('error signing up', err);
        }
    };

    return (
        <div className="w-96 border shadow-lg rounded">
            <h1 className="m-5">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input
                        required value={username} onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Username"
                    />
                </span>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        required value={email} onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Email"
                    />
                </span>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        required value={password} onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="********"
                    />
                </span>
                <span className="flex mx-5 my-3 flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirm Password</label>
                    <input
                        required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="********"
                    />
                </span>
                <span className="flex mx-5 my-1 text-sm">
                    <p>Already have an account? <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="./signin">Log in</a>.</p>
                </span>
                <span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-3 focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
                </span>
            </form>
        </div>
    );
};