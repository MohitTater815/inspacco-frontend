import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://insapcco-project.vercel.app",
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Add authentication token or other headers if needed
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;