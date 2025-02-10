import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAlert } from "../components/Alert";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const response = await axiosInstance.post("/api/login", { email, password });
            localStorage.setItem("token", response.data.token);
            showAlert("success", "Login successful!", 3000);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            showAlert("error", error?.response?.data?.message ? error?.response?.data?.message : "Error Logging in", 3000);
        } finally {
            setLoader(false);
        }
    };

    return (
        <>
            <form className="w-full" onSubmit={handleLogin}>
                <section className="dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-5">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                {/* <form className="space-y-4 md:space-y-6" action="#"> */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>

                                <button type="submit" className="w-full btn btn-outline btn-sm  bg-slate-600 glass">
                                    {Loader ? (<>Signing in...</>) : (<span className=" ">Sign in</span>)}

                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </section>
            </form >
        </>
    );
};

export default Login;

// <div className="flex flex-col items-center justify-center ">
//     <h1 className="text-2xl font-bold mb-4">Login</h1>
//     <form className="w-1/3" onSubmit={handleLogin}>
//         <div className="mb-4">
//             <label className="block text-sm font-medium">Email</label>
//             <input
//                 type="email"
//                 className="input input-bordered w-full"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//         </div>
//         <div className="mb-4">
//             <label className="block text-sm font-medium">Password</label>
//             <input
//                 type="password"
//                 className="input input-bordered w-full"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//         </div>
//         <button type="submit" className="btn btn-primary w-full">Login</button>
//     </form>
// </div>