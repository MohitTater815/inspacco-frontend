import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/middleware";

const Home = () => {
    const isAuthenticatedValue = isAuthenticated();
    return (
        <div className="w-full bg-gray-900   glass">

            <section className="text-center  py-20 px-6">
                <h2 className="text-4xl font-bold text-gray-100 mb-4">
                    Efficiently Manage Your Assets
                </h2>
                <p className="text-gray-100 max-w-2xl mx-auto">
                    Our asset management module helps you track, organize, and optimize
                    your assets effortlessly. Get started today and streamline your
                    workflow.
                </p>

                {!isAuthenticatedValue ? (
                    <Link to="/auth" className="mt-6 btn btn-secondary">
                        Get Started
                    </Link>
                ) : (
                    <Link to="/Dashboard" className="mt-6 btn btn-secondary">
                        Dashboard
                    </Link>
                )}
            </section>
        </div>
    );
};


export default Home;