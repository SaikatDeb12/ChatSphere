import axios from "axios";

const axiosIns = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
    withCredentials: false, // Set to false since JWT is used, not cookies
});

// Add interceptor to include JWT token in headers
axiosIns.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

export default axiosIns;
