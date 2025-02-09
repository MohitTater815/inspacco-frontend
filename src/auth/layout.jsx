import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./login";
import SignUp from "./SignUp";

const AuthLayout = () => {
    const [activeTab, setActiveTab] = useState("login");

    // Animation variants for smooth transitions
    const tabVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <div className="mt-5 flex items-center justify-center  dark:bg-gray-800 ">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                {/* Tabs */}
                <div role="tablist" className="tabs tabs-lifted">
                    <button
                        role="tab"
                        className={`tab ${activeTab === "login" ? "text-white bg-gray-600" : " border-b-1 border-gray-600"}`}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </button>
                    <button
                        role="tab"
                        className={`tab ${activeTab === "signup" ? "text-white bg-gray-600" : " border-b-1 border-gray-600"}`}
                        onClick={() => setActiveTab("signup")}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Animated Content */}
                <div className="mt-4">
                    <AnimatePresence mode="wait">
                        {activeTab === "login" && (
                            <motion.div
                                key="login"
                                variants={tabVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <Login />
                            </motion.div>
                        )}
                        {activeTab === "signup" && (
                            <motion.div
                                key="signup"
                                variants={tabVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <SignUp />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
