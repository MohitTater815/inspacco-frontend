import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        visible: false,
        type: "success",
        message: "",
    });

    const showAlert = (type, message, duration = 3000) => {
        console.log("this is react ")
        setAlert({ visible: true, type, message });

        setTimeout(() => {
            setAlert((prev) => ({ ...prev, visible: false }));
        }, duration);
    };

    const hideAlert = () => {
        setAlert((prev) => ({ ...prev, visible: false }));
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert.visible && (
                <div
                    className={`alert shadow-lg w-full max-w-md mx-auto mb-4 fixed top-5 left-1/2 transform -translate-x-1/2 z-50 ${alert.type === "success"
                        ? "alert-success"
                        : alert.type === "error"
                            ? "alert-error"
                            : alert.type === "warning"
                                ? "alert-warning"
                                : "alert-info"
                        }`}
                >
                    <div className="flex items-center justify-between w-full">
                        <span>{alert.message}</span>
                        <button onClick={hideAlert} className="btn btn-ghost btn-sm">
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
};
AlertProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensures that `children` is a React node and is required
};