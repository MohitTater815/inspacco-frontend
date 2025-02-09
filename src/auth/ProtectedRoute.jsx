import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/middleware";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const auth = isAuthenticated();

    // If user is authenticated and tries to access `/auth`, redirect to home
    if (auth && location.pathname === "/auth") {
        return <Navigate to="/" replace />;
    }

    // If user is not authenticated and tries to access any other page, redirect to `/auth`
    if (!auth && location.pathname !== "/auth") {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};